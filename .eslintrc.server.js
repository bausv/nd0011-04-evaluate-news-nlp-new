module.exports = {
    env: {
        'browser': true,
        'commonjs': true,
        'es2021': true,
    },
    extends: 'google',
    overrides: [{
        files: ['*.js'],
        rules: {
            'max-len': ["error", {"code": 120}]
        }
    }],
    parserOptions: {
        'ecmaVersion': 'latest',
    },
    rules: {},
};
