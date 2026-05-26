module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|expo|@expo|@react-navigation|react-native-safe-area-context|react-native-screens|react-native-vector-icons|react-native-get-random-values|react-native-progress|react-native-svg|@react-native-async-storage/async-storage|@react-native-community/slider)/)",
  ],
  setupFiles: [],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
