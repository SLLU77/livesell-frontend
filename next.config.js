const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ANALYZE = process.env.ANALYZE
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const dev = process.env.NODE_ENV !== 'production'

const cssModulesConfig = {
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 2,
        localIdentName: '[local]_[name]_[hash:base64:5]'
    }
}
const nextConfiguration = {
    webpack: config => {
        config.resolve.alias['@components'] = path.join(__dirname, 'components')
        config.resolve.alias['@utils'] = path.join(__dirname, 'utils')
        config.resolve.alias['@hocs'] = path.join(__dirname, 'hocs')
        config.resolve.alias['@styles'] = path.join(__dirname, 'styles')

     
        //檢測 webpack bundle js 工具
        if (ANALYZE) {
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'server',
                    analyzerPort: 8888,
                    openAnalyzer: true
                })
            )
        }
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        })
        return config
    }
}

module.exports = withPlugins([
    [withSass, cssModulesConfig]
], nextConfiguration)