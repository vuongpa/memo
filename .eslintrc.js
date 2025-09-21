module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    // Customize rules as needed for React Native/Expo
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.tsx', '.jsx'] },
    ],
    
    // Disable problematic import rules temporarily
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    
    // Adjust some Airbnb rules for React Native development
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: false, // Allow variables like styles to be used before definition
        typedefs: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off', // We use TypeScript for prop validation
    'react/require-default-props': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'react/jsx-props-no-spreading': 'off',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '.expo/',
    'expo-env.d.ts',
    'scripts/',
    '.eslintrc.js',
  ],
};