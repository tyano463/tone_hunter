#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface ToneEventEmitter : RCTEventEmitter <RCTBridgeModule>

+ (void)sendMeasureUpdate:(NSDictionary *)data;

- (void)startObserving; 
- (void)stopObserving; 

@end

NS_ASSUME_NONNULL_END
