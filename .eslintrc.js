const { resolve } = require

module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:eslint-comments/recommended',
        'plugin:react/recommended',
        'prettier',
        'prettier/react',
    ],
    settings: {
        'import/resolver': {
            typescript: {
                directory: [resolve('./tsconfig.json')],
            },
        },
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'import/extensions': [2, 'ignorePackages', { ts: 'never', tsx: 'never', json: 'never', js: 'never' }],
        'no-useless-constructor': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
        'react/state-in-constructor': [2, 'never'],
    },
    overrides: [
        {
            files: ['**/*.d.ts'],
            rules: {
                'import/no-duplicate': 'off',
            },
        },
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: [
                'airbnb',
                'airbnb/hooks',
                'plugin:eslint-comments/recommended',
                'plugin:import/typescript',
                'plugin:react/recommended',
                'plugin:@typescript-eslint/recommended',
                'prettier',
                'prettier/react',
                'prettier/@typescript-eslint',
            ],
            rules: {
                'import/extensions': [2, 'ignorePackages', { ts: 'never', tsx: 'never', json: 'never', js: 'never' }],
                'no-useless-constructor': 'off',
                '@typescript-eslint/no-useless-constructor': 'error',
                'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
                'react/state-in-constructor': [2, 'never'],
                '@typescript-eslint/no-empty-interface': 'warn',
            },
        },
    ],
}
