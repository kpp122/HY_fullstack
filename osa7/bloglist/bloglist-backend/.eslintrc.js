module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-console': 0,
        eqeqeq: 'error',
    },
}
