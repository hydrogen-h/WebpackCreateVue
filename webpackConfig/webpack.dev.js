/**
 * 合并基础的webpack配置文件与开发环境的特定配置。
 *
 * @module exports
 * @param {Object} base - 来自webpack.common.js的基础配置对象。
 * @returns {Object} 返回一个合并后的webpack配置对象，专用于开发环境。
 */
const webpack = require("webpack")
const { merge } = require("webpack-merge") // 引入webpack合并配置的工具
const base = require("./webpack.common.js") // 引入基础的webpack配置文件
// 编译过程终端美化
const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin')
// 终端检查代码
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = merge(base, {
    cache: {
        type: 'filesystem'
    },
    stats: 'errors-only',
    mode: 'development', // 设置为开发模式
    devtool: "source-map", // 启用source-map，便于调试
    devServer: {
        compress: true, // 启用gzip压缩
        port: 3000, // 设置监听的端口号
        hot: true, // 启用热更新
        open: true, // 自动打开浏览器
        historyApiFallback: true, // 使得HTML5 History API可以正常工作
        client: {
            progress: true, // 显示编译进度
            logging: 'error', // 仅输出错误日志
            overlay: {
                errors: true, // 在浏览器上覆盖错误警告
                warnings: true // 在浏览器上覆盖警告
            }
        },
        proxy: [
            {
                context: ['/api'], // 设置对"/apis"开头的请求的代理
                target: 'your-target-url', // 目标服务器URL
                changeOrigin: true, // 设置请求的origin为目标服务器的origin
                pathRewrite: { '^/api': '' }, // 将请求路径中的"/apis"移除
                secure: false // 目标服务器地址是否为https，false表示不是
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new ESLintPlugin({
            //运行的时候自动帮你修复错误
            fix: true,
            exclude: 'node_modules',
            extensions: ['js', 'vue']
        })
    ]
})