#import "AudioEngineController.h"
#import "RCTNativeInterface.h"

@implementation AudioEngineController

+ (instancetype)sharedInstance {
  static AudioEngineController *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [[self alloc] init];
  });
  return sharedInstance;
}

- (void)stopAudioEngineForExit {
  [[RCTNativeInterface sharedInstance] stopAudioEngine];
}

- (void)startAudioEngine {
  [[RCTNativeInterface sharedInstance] initAudioEngine];
}
@end
