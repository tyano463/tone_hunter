#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <complex.h>

#define YIN_THRESHOLD 0.15f
#define PI 3.1415926535

// YINアルゴリズムで基本周波数を推定する関数
// audioBuffer: 入力信号（長さ length）
// length: バッファ長（サンプル数）
// sampleRate: サンプリング周波数
float yin_get_pitch(const float* audioBuffer, int length, int sampleRate) {
    int tau;
    int maxTau = length / 2;
    float *difference = (float*)malloc(sizeof(float) * maxTau);
    float *cumulativeMeanNormalizedDifference = (float*)malloc(sizeof(float) * maxTau);
    if (!difference || !cumulativeMeanNormalizedDifference) {
        if(difference) free(difference);
        if(cumulativeMeanNormalizedDifference) free(cumulativeMeanNormalizedDifference);
        return -1.f;  // メモリエラーなど
    }

    // 1. difference function
    for (tau = 0; tau < maxTau; tau++) {
        difference[tau] = 0;
        for (int i = 0; i < maxTau; i++) {
            float delta = audioBuffer[i] - audioBuffer[i + tau];
            difference[tau] += delta * delta;
        }
    }

    // 2. cumulative mean normalized difference function
    cumulativeMeanNormalizedDifference[0] = 1.0f;
    float runningSum = 0;
    for (tau = 1; tau < maxTau; tau++) {
        runningSum += difference[tau];
        cumulativeMeanNormalizedDifference[tau] = difference[tau] * tau / runningSum;
    }

    // 3. absolute threshold
    int tauEstimate = -1;
    for (tau = 2; tau < maxTau; tau++) {
        if (cumulativeMeanNormalizedDifference[tau] < YIN_THRESHOLD) {
            while (tau + 1 < maxTau && cumulativeMeanNormalizedDifference[tau + 1] < cumulativeMeanNormalizedDifference[tau]) {
                tau++;
            }
            tauEstimate = tau;
            break;
        }
    }

    if (tauEstimate == -1) {
        // 見つからなければ基本周波数検出失敗
        free(difference);
        free(cumulativeMeanNormalizedDifference);
        return -1.f;
    }

    // 4. parabolic interpolation to refine tauEstimate
    if (tauEstimate > 0 && tauEstimate < maxTau - 1) {
        float x0 = cumulativeMeanNormalizedDifference[tauEstimate - 1];
        float x1 = cumulativeMeanNormalizedDifference[tauEstimate];
        float x2 = cumulativeMeanNormalizedDifference[tauEstimate + 1];
        float betterTau = tauEstimate + (x2 - x0) / (2 * (2 * x1 - x2 - x0));
        tauEstimate = (int)betterTau;
    }

    // 5. convert tauEstimate to frequency
    float pitch = sampleRate / (float)tauEstimate;

    free(difference);
    free(cumulativeMeanNormalizedDifference);

    return pitch;
}

static void fft(complex float *buf, int n) {
    if (n <= 1) return;

    // divide
    complex float *even = (complex float*)malloc(n / 2 * sizeof(complex float));
    complex float *odd = (complex float*)malloc(n / 2 * sizeof(complex float));
    for (int i = 0; i < n / 2; i++) {
        even[i] = buf[i * 2];
        odd[i] = buf[i * 2 + 1];
    }

    // conquer
    fft(even, n / 2);
    fft(odd, n / 2);

    // combine
    for (int k = 0; k < n / 2; k++) {
        complex float t = cexpf(-2.0f * I * PI * k / n) * odd[k];
        buf[k] = even[k] + t;
        buf[k + n / 2] = even[k] - t;
    }

    free(even);
    free(odd);
}

float fft_get_pitch(const float* audioBuffer, int length, int sampleRate) {
    // FFT length: 次の2の累乗に切り上げ
    int n = 1;
    while (n < length) n <<= 1;

    // 入力バッファを複素数配列にコピー（虚部0）
    complex float *buf = (complex float*)malloc(n * sizeof(complex float));
    for (int i = 0; i < length; i++) {
        buf[i] = audioBuffer[i] + 0.0f * I;
    }
    for (int i = length; i < n; i++) {
        buf[i] = 0.0f + 0.0f * I;  // zero padding
    }

    // FFT実行
    fft(buf, n);

    // パワースペクトル計算 & 最大ピーク検出 (0 ~ n/2)
    int maxIndex = 1;  // 0Hz除外
    float maxPower = 0.0f;
    for (int i = 1; i < n / 2; i++) {
        float power = cabsf(buf[i]);
        if (power > maxPower) {
            maxPower = power;
            maxIndex = i;
        }
    }

    free(buf);

    // 最大ピークの周波数計算
    float pitch = ((float)maxIndex * sampleRate) / (float)n;
    return pitch;
}
