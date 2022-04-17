module.exports = {
    env: {
        es2021: true,
        node: true,
        browser: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            modules: true,
            jsx: true
        }
    },
    plugins: [
        'react'
    ],
    rules: {
        "no-unused-vars": "off",
        "react/prop-types": "off",
        "react/no-unescaped-entities": "off",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    }
}