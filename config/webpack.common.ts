import { BannerPlugin, Configuration, RuleSetUseItem } from 'webpack'
import { resolve } from 'path'
import WebpackBar from 'webpackbar'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'
import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'

import { PROJECT_NAME, PROJECT_ROOT, IS_DEV } from '../constant/env'
import htmlMinifyOptions from '../constant/html-minify-options'
import getCssLoaders from '../constant/get-css-loaders'

const commonConfig: Configuration = {
    context: resolve(PROJECT_ROOT),
    output: {
        path: resolve(PROJECT_ROOT, 'dist'),
        filename: '[name].[hash].bundle.js',
        hashSalt: PROJECT_NAME,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: getCssLoaders(0),
            },
            {
                test: /\.less$/,
                use: [
                    ...(getCssLoaders(1) as RuleSetUseItem[]),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[hash].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new WebpackBar(),
        new BannerPlugin({
            raw: true,
            banner: `/** @preserve Powered by ${PROJECT_NAME} (https://github.com/LaamGinghong/react-typescript-babel-demo) */`,
        }),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBuildNotifierPlugin({ suppressCompileStart: true }),
        new CaseSensitivePathsWebpackPlugin(),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: PROJECT_ROOT,
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            minify: IS_DEV ? false : htmlMinifyOptions,
            title: PROJECT_NAME,
            template: resolve(PROJECT_ROOT, 'template', 'index.html'),
            cdn: {
                js: IS_DEV
                    ? []
                    : [
                          'https://cdn.bootcss.com/react/16.13.1/umd/react.production.min.js',
                          'https://cdn.bootcss.com/react-dom/16.13.1/umd/react-dom.production.min.js',
                      ],
            },
        }),
        new CopyWebpackPlugin(
            [{ from: '*', to: resolve(PROJECT_ROOT, 'dist'), toType: 'dir', ignore: ['index.html'] }],
            { context: resolve(PROJECT_ROOT, 'template') },
        ),
        new HardSourceWebpackPlugin({ info: { mode: 'none', level: 'warn' } }),
    ],
}

export default commonConfig
