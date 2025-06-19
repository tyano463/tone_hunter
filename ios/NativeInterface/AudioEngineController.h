#ifndef AudioEngineController_h
#define AudioEngineController_h

#import <Foundation/Foundation.h>

@interface AudioEngineController : NSObject

+ (instancetype)sharedInstance;

- (void)stopAudioEngineForExit;
- (void)startAudioEngine;

@end

#endif /* AudioEngineController_h */
