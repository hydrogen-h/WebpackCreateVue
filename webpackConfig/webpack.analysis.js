const { merge } = require("webpack-merge")
const prodConfig = require("./webpack.prod.js")
// 构建速度分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new SpeedMeasurePlugin()
// 引入分析打包结果插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = smp.wrap(
    merge(prodConfig, {
        plugins: [
            new BundleAnalyzerPlugin() // 配置分析打包结果插件
        ]
    })
)