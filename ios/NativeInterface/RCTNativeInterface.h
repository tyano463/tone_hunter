//
//  RCTNativeInterface.h
//  tone_hunter
//
//  Created by Yano, Takayuki on 2025/06/12.
//

#import <Foundation/Foundation.h>
#import <NativeInterface/NativeInterface.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTNativeInterface : RCTEventEmitter <NativeInterfaceSpec>

+ (instancetype)sharedInstance;
- (void)stopAudioEngine;
- (void)initAudioEngine;

@end

NS_ASSUME_NONNULL_END
