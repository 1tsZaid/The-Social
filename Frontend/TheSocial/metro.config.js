const { getDefaultConfig } = require("expo/metro-config");

// Default Expo config
const config = getDefaultConfig(__dirname);

// Fix tslib for web by aliasing it to the ES6 build
const ALIASES = {
  tslib: require.resolve("tslib/tslib.es6.js"),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Only apply alias when bundling for web
  if (platform === "web" && ALIASES[moduleName]) {
    return context.resolveRequest(context, ALIASES[moduleName], platform);
  }
  // Fallback to default resolution
  return context.resolveRequest(context, moduleName, platform);

//  same bundling for all platforms
//   return context.resolveRequest(
//     context,
//     ALIASES[moduleName] ?? moduleName,
//     platform
//   );
};

module.exports = config;
