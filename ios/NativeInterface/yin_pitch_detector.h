//
//  yin_pitch_detector.h
//  tone_hunter
//
//  Created by Yano, Takayuki on 2025/06/12.
//

#ifndef yin_pitch_detector_h
#define yin_pitch_detector_h

#ifdef __cplusplus
extern "C" {
#endif

#include <stdio.h>

float yin_get_pitch(const float* audioBuffer, int length, int sampleRate);

#ifdef __cplusplus
}
#endif
#endif /* yin_pitch_detector_h */
