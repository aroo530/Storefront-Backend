module.exports = {
    env: {
        node: true,
        es6: true,
    },
    extends: 'eslint:recommended',
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': ['error', { args: 'all' }],
        'no-useless-catch': 'off',
    },
    parserOptions: {
        sourceType: 'module',
    },
};
