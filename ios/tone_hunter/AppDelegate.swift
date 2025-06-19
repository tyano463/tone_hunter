import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import AVFoundation

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {

    RCTSetLogThreshold(.info)

    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    RCTEnableTurboModule(true)
    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "tone_hunter",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }

  func stopMicrophone() {
    let session = AVAudioSession.sharedInstance()
    do {
      try session.setActive(false, options: .notifyOthersOnDeactivation)
      print("Audio session deactivated")
    } catch {
      print("Failed to deactivate audio session: \(error)")
    }
  }

  func stopAudio(){
    AudioEngineWrapper.shared().stop()
    stopMicrophone()
  }

  func resumeAudio() {
    AudioEngineWrapper.shared().start()
  }

  func applicationDidEnterBackground(_ application: UIApplication) {
    stopAudio()
  }

  func sceneWillEnterForeground(_ scene: UIScene) {
    // resumeAudio()
  }

  func applicationWillTerminate(_ application: UIApplication) {
    stopAudio()
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}

