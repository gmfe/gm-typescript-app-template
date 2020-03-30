import webpackMerge from 'webpack-merge'
import { Configuration } from 'webpack'
import { resolve } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import SpeedMeasureWebpackPlugin from 'speed-measure-webpack-plugin'
import SizePlugin from 'size-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

import commonConfig from './webpack.common'
import { PROJECT_ROOT } from '../constant/env'

const prodConfig: Configuration = {
    mode: 'production',
    entry: resolve(PROJECT_ROOT, 'src', 'index.tsx'),
    plugins: [
        new ForkTsCheckerWebpackPlugin({ memoryLimit: 1024 * 2, tsconfig: resolve(PROJECT_ROOT, 'tsconfig.json') }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
            ignoreOrder: false,
        }),
        new CompressionPlugin({
            cache: true,
            include: /\.js$/,
            exclude: /node_modules/,
            threshold: 8192,
        }),
        new SizePlugin({ writeFile: false }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false }), new OptimizeCssAssetsPlugin()],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
}

const mergeConfig = webpackMerge(commonConfig, prodConfig)
const smp = new SpeedMeasureWebpackPlugin()
export default smp.wrap(mergeConfig)
