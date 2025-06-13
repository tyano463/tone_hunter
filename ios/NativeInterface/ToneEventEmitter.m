#import "ToneEventEmitter.h"
#import <React/RCTLog.h>

static RCTBridge *bridgeRef = nil;

@implementation ToneEventEmitter

RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *)zone {
  static ToneEventEmitter *shared = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    shared = [super allocWithZone:zone];
  });
  return shared;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onMeasureUpdate"];
}

+ (void)sendMeasureUpdate:(NSDictionary *)data {
  RCTLogInfo(@"bridgeRef:%p", bridgeRef);
  if (bridgeRef != nil) {
    [bridgeRef enqueueJSCall:@"RCTDeviceEventEmitter"
                      method:@"emit"
                        args:@[@"onMeasureUpdate", data]
                  completion:NULL];
  }
}

- (void)startObserving {
  bridgeRef = self.bridge;
}

- (void)stopObserving {
  bridgeRef = nil;
}

@end
