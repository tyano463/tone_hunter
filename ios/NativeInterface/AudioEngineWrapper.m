#import "AudioEngineWrapper.h"
#import "AudioEngineController.h"

@implementation AudioEngineWrapper
+ (instancetype)shared {
    static AudioEngineWrapper *instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [AudioEngineWrapper new];
    });
    return instance;
}

- (void)stop {
    [[AudioEngineController sharedInstance] stopAudioEngineForExit];
}
- (void)start {
    [[AudioEngineController sharedInstance] startAudioEngine];
}
@end
