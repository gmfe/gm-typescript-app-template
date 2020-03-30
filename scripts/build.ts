import webpack, { Stats } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { IS_ANALYZE } from '../constant/env'
import prodConfig from '../config/webpack.prod'

if (IS_ANALYZE) {
    prodConfig.plugins!.push(new BundleAnalyzerPlugin())
}

const compiler = webpack(prodConfig)

compiler.run((err, stats) => {
    if (err) {
        console.error(err)
        return
    }

    const option: Stats.ToStringOptions = {
        modules: IS_ANALYZE,
        colors: true,
    }

    console.log(stats.toString(option))
})
