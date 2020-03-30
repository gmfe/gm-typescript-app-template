import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { resolve } from 'path'

import devConfig from '../config/webpack.dev'
import { PROJECT_ROOT } from '../constant/env'

const server = new WebpackDevServer(webpack(devConfig), {
    contentBase: resolve(PROJECT_ROOT, 'dist'),
    hot: true,
    open: 'Google Chrome',
    host: 'localhost',
    port: 8080,
    historyApiFallback: {
        disableDotRule: true,
    },
    inline: true,
    stats: 'errors-only',
})

server.listen(8080)
