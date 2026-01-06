module.exports = {
  project: {
    ios: {
      sourceDir: './ios',
    },
    android: {},
  },
  assets: ['./src/assets/fonts/list/'],
  dependencies: {
    'react-native-config': { platforms: { android: null } },
  },
};
