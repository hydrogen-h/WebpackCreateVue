/**
 * 引入Node.js的path模块
 * 该模块提供了一系列处理文件路径的函数。
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// Css提取分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 是否开发环境
const IsDev = process.env.NODE_ENV === 'development'
// 进度条美化
const WebpackBar = require('webpackbar')

module.exports = {
    // 配置模块解析规则
    resolve: {
        // 后缀名自动补全，当引入模块时，可以不写具体的后缀名，这里指定了可用的后缀名列表
        extensions: [
            '.js', '.vue', '.css', 'less'
        ],
        // 配置别名，方便在import时使用简写，提高编码效率
        alias: {
            // 使用'@'作为简写，指向项目的src目录
            '@': path.resolve(__dirname, '../src'),
            // 'cmp'别名指向组件目录，方便直接引入组件
            'cmp': path.resolve(__dirname, '../src/components'),
            // 'api'别名指向API接口目录，便于调用接口
            'api': path.resolve(__dirname, '../src/api')
        }
    },
    // 配置入口文件
    entry: path.resolve(__dirname, '../src/main.js'),
    // 配置输出选项
    output: {
        // 指定输出的文件名，[chunkhash:8]表示使用8位的块哈希值作为文件名的一部分
        filename: '[name].[chunkhash:8].js',
        // 指定输出文件的路径
        path: path.resolve(__dirname, '../dist'),
        // 启用异步块加载
        asyncChunks: true,
        // 设置资源的公共路径，对于在页面中引用的静态资源，都将以此路径为基础
        publicPath: '/',
        // 清除上一次打包构建出来的文件
        clean: true,
        // 用于指定非入口(non-initial) chunk 文件的名称，这通常是用于懒加载模块时Webpack按需加载的块
        chunkFilename: '[name].js'
    },
    // 定义模块的规则配置
    module: {
        rules: [
            // 这里是模块规则的数组，用于配置不同类型的文件如何被处理
            // 每个规则包括测试表达式（test）、加载器（loader）和选项（options）等
            {
                // 匹配.vue文件
                test: /\.vue$/,
                // 使用vue-loader处理
                loader: 'vue-loader'
            },
            {
                // 匹配.css文件
                test: /\.css$/,
                use: [
                    // 将CSS样式插入到DOM中
                    // 根据开发环境选择使用style-loader或将CSS提取到单独的文件中
                    IsDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    // 处理CSS文件，支持模块化、压缩等
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                // 匹配.less文件
                test: /\.less$/,
                use: [
                    // 将CSS样式插入到DOM中
                    // 同上，根据开发环境选择合适的CSS加载器
                    IsDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    // 处理CSS文件，支持模块化、压缩等
                    "css-loader",
                    "postcss-loader",
                    // 编译LESS到CSS
                    "less-loader"
                ]
            },
            {
                test: /\.js$/,
                use: [
                    'thread-loader', // 在这里添加`thread-loader`
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                // 处理图像文件的规则配置
                test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/, // 匹配多种图像文件格式
                type: "asset", // 将图像文件作为资产处理
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 图片大小小于10KB将会被转成base64
                    },
                },
                generator: {
                    filename: "static/images/[hash:8][ext]", // 输出文件的命名规则，在images目录下，使用8位哈希值加原始扩展名
                }
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[hash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[hash:8][ext]', // 文件输出目录和命名
                },
            }
        ]
    },
    // 插件配置数组
    plugins: [
        // 这里放置项目使用的插件列表
        // 插件可以执行各种任务，如自动优化和压缩代码、注入环境变量等

        // VueLoaderPlugin是一个Vue.js的加载器插件，它自动处理Vue组件的加载
        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html',
            title: 'Vue3 + webpack -> Web App',
            minify: {
                collapseWhitespace: true, // 去掉空格
                removeComments: true // 去掉注释
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name]_[chunkhash:8].css'
        }),

        // 进度条插件：用于显示webpack构建的进度
        new WebpackBar({
            color: "#85d",  // 默认green，进度条颜色支持HEX
            basic: false,   // 默认true，启用一个简单的日志报告器
            profile: false,  // 默认false，启用探查器。
        }),
    ]
}