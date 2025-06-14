const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    minifierConfig: {
      keep_classnames: true,
      keep_fnames: true,
      mangle: {
        toplevel: false,
      },
      compress: {
        drop_console: false,
      },
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
