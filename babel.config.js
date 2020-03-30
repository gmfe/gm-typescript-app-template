const envPreset = [
    '@babel/preset-env',
    {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
    },
]

module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['@babel/preset-typescript', envPreset],
        plugins: [
            '@babel/plugin-transform-runtime',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
        ],
        env: {
            development: {
                presets: [['@babel/preset-react', { development: true }]],
                plugins: ['react-hot-loader/babel'],
            },
            production: {
                presets: ['@babel/preset-react'],
                plugins: [
                    '@babel/plugin-transform-react-constant-elements',
                    '@babel/plugin-transform-react-inline-elements',
                ],
            },
        },
    }
}
