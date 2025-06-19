#ifndef AudioEngineWrapper_h
#define AudioEngineWrapper_h

#import <Foundation/Foundation.h>

@interface AudioEngineWrapper : NSObject
+ (instancetype)shared;
- (void)stop;
- (void)start;
@end

#endif /* AudioEngineWrapper_h */
