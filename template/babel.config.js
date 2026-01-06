module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@icons': './src/assets/icons/index.ts',
          '@fonts': './src/assets/fonts/index.ts',
          '@components': './src/common/components/index.ts',
          '@constants': './src/common/constants/index.ts',
          '@hooks': './src/common/hooks/index.ts',
          '@routes': './src/routes/index.ts',
          '@screens': './src/screens/index.ts',
          '@network': './src/network/index.ts',
          '@redux': './src/redux/index.ts',
          '@themes': './src/themes/index.ts',
          '@utils': './src/utils/index.ts',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
