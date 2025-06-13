#import "RCTNativeInterface.h"
#import <ReactCommon/RCTTurboModule.h>
#import <React/RCTUtils.h>
#import <React/RCTBridge+Private.h>
#import <React/RCTBridge.h>
#import <React/RCTLog.h>
#import <AVFoundation/AVFoundation.h>
#import "ToneEventEmitter.h"
#import "yin_pitch_detector.h"

using namespace facebook;


@interface RCTNativeInterface ()<AVAudioRecorderDelegate> {
  NSTimer *measureTimer;
  NSInteger currentTone;
}
@property (nonatomic, strong) AVAudioEngine *audioEngine;
@property (nonatomic, assign) AVAudioFrameCount bufferCapacity;
@property (nonatomic, assign) AVAudioFrameCount writePosition;
@property (nonatomic, strong) AVAudioPCMBuffer *circularBuffer;
@end

@implementation RCTNativeInterface

- (instancetype)init {
  if (self = [super init]) {
    _audioEngine = [[AVAudioEngine alloc] init];
    _bufferCapacity = 44100 * 2;
    AVAudioInputNode *inputNode = _audioEngine.inputNode;
    AVAudioFormat *format = [inputNode inputFormatForBus:0];

    _circularBuffer = [[AVAudioPCMBuffer alloc] initWithPCMFormat:format frameCapacity:_bufferCapacity];

//    _circularBuffer = [[AVAudioPCMBuffer alloc] initWithPCMFormat:_audioEngine.inputNode.inputFormatForBus:0
//                                                    frameCapacity:_bufferCapacity];
    _writePosition = 0;
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeInterfaceSpecJSI>(params);
}

- (void)test {
  RCTLogInfo(@"aiueo");
}

- (void)checkPermission:(RCTResponseSenderBlock)callback {
  @try {
    AVAudioSessionRecordPermission permissionStatus = [[AVAudioSession sharedInstance] recordPermission];
    RCTLogInfo(@"checkPermission IN");
    
    switch (permissionStatus) {
      case AVAudioSessionRecordPermissionGranted:
        callback(@[@(0), @(YES)]);
        break;
        
      case AVAudioSessionRecordPermissionDenied:
        callback(@[@(0), @(NO)]);
        break;
        
      case AVAudioSessionRecordPermissionUndetermined: {
        [[AVAudioSession sharedInstance] requestRecordPermission:^(BOOL granted) {
          dispatch_async(dispatch_get_main_queue(), ^{
            callback(@[@(0), @(granted)]);
          });
        }];
        break;
      }
        
      default:
        callback(@[@(1), @(NO)]);
        break;
    }
  }
  @catch (NSException *exception) {
    RCTLogInfo(@"Exception occurred: %@ %@", exception.name, exception.reason);
    callback(@[@(2), @(NO)]);
  }
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onMeasureUpdate"];
}


- (void)measureStart:(NSInteger)tone {
  RCTLogInfo(@"[NativeInterface] measureStart called with tone: %ld", (long)tone);
  currentTone = tone;
  
  
  [measureTimer invalidate];
  measureTimer = nil;
  
  [self startAudioEngine];
  RCTLogInfo(@"Measure started tone:%d", currentTone);
}

- (void)measureStop {
  RCTLogInfo(@"[NativeInterface] measureStop called");
  [measureTimer invalidate];
  measureTimer = nil;
  [self stopAudioEngine];
}

- (void)confirmed:(NSInteger)order cb:(RCTResponseSenderBlock)callback {
  RCTLogInfo(@"[NativeInterface] confirmed called with order: %ld", (long)order);
  if (order >= 0) {
    NSString *result = [NSString stringWithFormat:@"Confirmed order: %ld", (long)order];
    callback(@[@(0), result]);
  } else {
    callback(@[@(1), [NSNull null]]);
  }
}

- (void)startAudioEngine {
  AVAudioInputNode *inputNode = self.audioEngine.inputNode;
  AVAudioFormat *format = [inputNode inputFormatForBus:0];
  
  [inputNode installTapOnBus:0
                  bufferSize:1024
                      format:format
                       block:^(AVAudioPCMBuffer *buffer, AVAudioTime *when) {
    [self processAudioBuffer:buffer];
  }];
  
  NSError *error = nil;
  [self.audioEngine startAndReturnError:&error];
  if (error) {
    RCTLogError(@"Error starting audio engine: %@", error);
  } else {
    RCTLogInfo(@"Audio engine started");
  }
}

- (void)stopAudioEngine {
  [self.audioEngine.inputNode removeTapOnBus:0];
  [self.audioEngine stop];
  RCTLogInfo(@"Audio engine stopped");
}

- (void)dumpFloatBufferAsHex:(float *)buffer length:(NSUInteger)length{
    const uint8_t *bytePtr = (const uint8_t *)buffer;
    NSUInteger totalBytes = length * sizeof(float);

    NSMutableString *output = [NSMutableString string];

    for (NSUInteger i = 0; i < totalBytes; i++) {
        if (i % 16 == 0 && i != 0) {
            [output appendString:@"\n"];
        }
        [output appendFormat:@"%02X ", bytePtr[i]];
    }

    RCTLogInfo(@"\n%@", output);
}

- (void)processAudioBuffer:(AVAudioPCMBuffer *)buffer {
  AVAudioFrameCount frameLength = buffer.frameLength;
  float *sourceData = buffer.floatChannelData[0];
  float *destData = self.circularBuffer.floatChannelData[0];
  
  for (AVAudioFrameCount i = 0; i < frameLength; i++) {
    destData[(self.writePosition + i) % self.bufferCapacity] = sourceData[i];
  }
  self.writePosition = (self.writePosition + frameLength) % self.bufferCapacity;
  
  static AVAudioFrameCount lastAnalysisPosition = 0;
  AVAudioFrameCount distance = (self.writePosition + self.bufferCapacity - lastAnalysisPosition) % self.bufferCapacity;
  
  if (distance >= 4410) {
    lastAnalysisPosition = self.writePosition;
    
    float analysisBuffer[4410];
    for (int i = 0; i < 4410; i++) {
      int pos = (self.writePosition + self.bufferCapacity - 4410 + i) % self.bufferCapacity;
      analysisBuffer[i] = destData[pos];
    }
    float *p = analysisBuffer;
    // [self dumpFloatBufferAsHex:p length:48];
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
      float pitch = [self analyzePitchWithBuffer:p length:4410];
      RCTLogInfo(@"Pitch: %f", pitch);
      NSDictionary *body = @{
        @"tone": @(currentTone),
        @"pitch": @(pitch)
      };
      [ToneEventEmitter sendMeasureUpdate:body];
    });
  }
}

- (float)analyzePitchWithBuffer:(float *)buffer length:(int)length {
  return yin_get_pitch(buffer, length, 44100);
}


+ (NSString *)moduleName {
  return @"NativeInterface";
}

@end
