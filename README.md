# Tone Hunter

## Overview

Tone Hunter is a React Native app for pitch measurement and game-like interaction.  
This README provides the minimum necessary instructions for developers to set up the environment and build the app for iOS.

## Development Environment

- Node.js v24.2.0
- Xcode 15.1 (15C65)
- React Native (version as specified in package.json)
- iOS only (Android support is not provided)

## Setup & Build Instructions (iOS Only)

1. **Clone the repository**

```bash
git clone https://github.com/tyano463/tone_hunter
cd tone_hunter
```

2. **Install dependencies**

```bash
npm install
```

3. **Install CocoaPods dependencies**

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

4. **Run the app**

- Start Metro bundler

```bash
npm start --reset-cache
```

- Build and run on iOS simulator or device

```bash
npx react-native run-ios
```


## Notes

- Android platform is not supported.
- Ensure you have Xcode 15.1 installed and properly configured.
- If you encounter build errors, try cleaning the build folder in Xcode:  
`Product > Clean Build Folder`.


## License

MIT License (or your chosen license)  
See LICENSE file for details.


## Contact

For development questions, please contact the maintainer.
