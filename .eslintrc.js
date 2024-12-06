module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    "react-native/react-native": true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react-native/all",
    "plugin:react/recommended",

    "plugin:import/typescript",
    "standard-with-typescript",
    "@react-native-community",
    "eslint:recommended",
    "prettier",
  ],
  settings: {
    "import/ignore": ["react-native"],
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-native", "@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "no-undef": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "import/order": [
      1,
      {
        groups: [
          "external",
          "builtin",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    "spaced-comment": ["error", "always"],
    "@typescript-eslint/ban-types": "error",
    "react-native/no-inline-styles": "error",
    "react-native/no-color-literals": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 0 }],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      { allowAny: true },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "react/jsx-pascal-case": [
      "error",
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    "react-native/no-raw-text": [
      "error",
      {
        skip: ["TextInput", "ThemedText"],
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase", "camelCase"],
        prefix: ["is", "should", "has", "can", "did", "will"],
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: true,
        },
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": "allow-with-description",
      },
    ],
  },
};
