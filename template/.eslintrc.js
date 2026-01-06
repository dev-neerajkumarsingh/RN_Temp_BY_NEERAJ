module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // 1. Unused Vars: You likely want this to be an ERROR to keep code clean.
    // If you truly want to disable it, change 'error' to 'off'.
    '@typescript-eslint/no-unused-vars': 'error',

    // 2. Inline Styles: As a Lead, you should strictly forbid this for performance.
    // Use 'error' to enforce styling via StyleSheet.
    'react-native/no-inline-styles': 'error',

    // 3. Strict Equality: 'off' is valid, but I highly recommend 'error'.
    // It forces developers to use === instead of == (prevents type coercion bugs).
    'eqeqeq': 'off', 

    // 4. Max Lines: This configuration is CORRECT.
    'max-lines': [
      'error', 
      { 
        max: 300, 
        skipBlankLines: true, 
        skipComments: true 
      }
    ],
  },
};
