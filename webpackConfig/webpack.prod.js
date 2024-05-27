const path = require('path')
const { merge } = require("webpack-merge")
const base = require("./webpack.common.js")
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
// Css Tree-Shaking优化
const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
// 清除上次打包的残留
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = merge(base, {
    mode: 'production',
    plugins: [
        new PurgeCSSPlugin({
            // paths是一个配置项，该项接受一个文件路径数组。
            // 这些路径指向你的项目中的HTML文件或者模板，以及可能包含CSS类的JavaScript组件文件。
            paths: glob.sync([
                // path.join(__dirname, './public/index.html')生成了指向项目中的index.html文件的绝对路径。
                // __dirname是Node.js中的一个全局变量，它返回当前正在执行的脚本所在的目录。
                path.join(__dirname, '../index.html'),

                // path.join(__dirname, './src/**/*')生成了一个glob模式，这个模式匹配src目录及其所有子目录下的所有文件。
                // './src/**/*' 是一个使用glob语法的模式字符串，表示src目录下的任意深度的所有文件。
                // ** 是一个glob星号，匹配任意数量的目录和子目录。
                // * 是一个glob星号，匹配任意数量的字符，除了路径分隔符（如/）。
                path.join(__dirname, '../src/**/*'),
            ],
                // nodir选项设置为true，意味着返回的匹配结果中不包含目录路径，只有文件路径。
                // 这确保PurgeCSSPlugin只会接收到文件路径，而不是目录路径，因为插件需要文件内容来确定哪些CSS类是被使用的。
                { nodir: true }),
        }),
        new CleanWebpackPlugin({
            // cleanStaleWebpackAssets: 当值为true时，插件将会在构建完成后，
            // 清理Webpack在上一次构建时生成，但这一次构建未再次生成的文件资产（assets）。
            // 这是一个用于控制是否应该清理在重新构建时不再使用的旧文件的布尔值。
            // 默认情况下，这个值是true——每次只有新产生的文件会被保留，
            // 所有的旧文件会在下一次构建完成之后被删除。
            cleanStaleWebpackAssets: true,

            // cleanOnceBeforeBuildPatterns: 这个选项允许你定义一个模式数组（patterns array），
            // 插件会在Webpack构建前根据这些模式清理文件和目录。
            // 不同的模式可以匹配不同的文件或目录，以供清理。
            // 在此例中，它使用glob模式，以确保Webpack在构建之前清理指定目录。
            // path.resolve(__dirname, "../dist") 用于生成“dist”目录的绝对路径。
            // 通常 "__dirname" 是Node.js中的一个全局变量，
            // 它返回代表当前执行脚本所在的目录的路径。
            // 通过 ".." 返回到上一级目录，再与 "dist" 连接起来形成清理路径，
            // 确保不管在哪个工作目录下执行Webpack，指定的“dist”文件夹路径都是正确的。
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "../dist")]
        }),
    ],
    optimization: {
        minimize: true, // 开启代码压缩
        minimizer: [
            new TerserPlugin({ // 使用TerserPlugin作为压缩工具
                terserOptions: {
                    mangle: { // 代码混淆相关选项
                        safari10: true, // 处理Safari 10/11的bug，避免在这些老版本Safari浏览器中出现的“删除”bug（删除let和const变量会抛出错误）
                    },
                    compress: { // 代码压缩相关选项
                        // 下面的选项都是用来指定terser在压缩过程中是否应用某些转换
                        arrows: false, // 不转换箭头函数为ES5函数表达式
                        collapse_vars: false, // 不折叠具有单一使用的变量
                        comparisons: false, // 不进行优化比较操作
                        computed_props: false, // 不优化计算属性
                        hoist_funs: false, // 不提升函数声明
                        hoist_props: false, // 不提升对象属性
                        hoist_vars: false, // 变量提升关闭 (var 声明会被提升至函数作用域的顶部)
                        inline: false, // 不内联函数
                        loops: false, // 不优化循环
                        negate_iife: false, // 不否定立即执行的函数表达式
                        properties: false, // 不优化属性访问
                        reduce_funcs: false, // 不内联仅用一次的函数
                        reduce_vars: false, // 不减少非常量变量的引用
                        switches: false, // 不移除switch的分支
                        toplevel: false, // 不删除顶级函数和变量定义
                        typeofs: false, // 不进行typeofs优化

                        // 以下选项开启了一些常见的压缩优化策略
                        booleans: true, // 优化布尔表达式
                        if_return: true, // 优化if-return和if-continue
                        sequences: true, // 使用逗号运算符合并多个语句到一个表达式
                        unused: true, // 删除未使用的变量/function
                        conditionals: true, // 优化if-s和条件表达式
                        dead_code: true, // 移除不可到达的代码
                        evaluate: true, // 计算常量表达式
                        warnings: false, // 关闭Terser的警告信息，使构建输出更干净
                        drop_console: true, // 删除所有的console语句，可以减少最终输出的文件大小，对于生产环境是推荐的
                        pure_funcs: ['console.log'], // 移除代码中的console.log调用
                        // 与drop_console相似，但是提供了更细致的控制，可以指定只删除某些特定的console方法
                    }
                },
                parallel: true, // 并行压缩以提升构建速度
                extractComments: false, // 不把注释提取到一个单独的文件中，即去掉所有注释
            }),
            // 使用css-minimizer-webpack-plugin插件实例进行CSS优化
            new CssMinimizerWebpackPlugin({
                // 启用并行处理，提高构建性能，特别是在有大量CSS文件需要被压缩的情况下
                parallel: true,

                // minimizerOptions用于传递选项到cssnano，它是css-minimizer-webpack-plugin背后的CSS压缩工具
                minimizerOptions: {
                    // 'default'预设意味着使用cssnano的默认压缩选项，
                    // 这是一个适用于大多数场景的平衡配置，它既压缩了代码，也考虑了性能和兼容性
                    preset: 'default'
                },
            }),
        ],
        // splitChunks 用于控制如何拆分代码块
        splitChunks: {
            chunks: "all", // 对所有类型的chunks进行拆分（包括动态和非动态模块）
            minSize: 20000, // 新chunk的最小体积为20KB
            maxAsyncRequests: 6, // 每个异步加载的模块最多能被拆分成6个chunks
            maxInitialRequests: 6, // 入口点的最大并行请求数量
            enforceSizeThreshold: 50000, // 忽视其他限制，强制拆分体积为50KB的chunks
            // cacheGroups 用于定义如何共享模块/合并chunks
            cacheGroups: {
                libs: { // 针对从node_modules中导入的模块
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的模块
                    priority: 10, // 优先级
                    chunks: "initial" // 仅对入口块进行处理
                },
                echarts: { // 针对ECharts的单独拆分
                    name: "chunk-echarts",
                    test: /[\\/]node_modules[\\/]echarts[\\/]/,
                    priority: 20 // 优先级高于libs
                },
                elementPlus: { // Element Plus 单独拆包
                    name: "chunk-elementPlus",
                    test: /[\\/]node_modules[\\/]element-plus[\\/]/, // 更新匹配 Element Plus 的路径
                    priority: 20 // 权重要大于 libs
                },
                src: { // 对src目录下的文件进行拆分
                    name: "chunk-src",
                    test: /[\\/]src[\\/]/,
                    chunks: 'all',
                    priority: 10 // 优先级等于libs，但因为特定配置可能在实际中优先级表现不同
                },
                commons: { // 针对公共模块的拆分
                    name: `chunk-commons`,
                    minChunks: 2, // 最小引用次数
                    priority: 0, // 低优先级
                    reuseExistingChunk: true // 如果一个模块已经被打包过，则复用它而不是再次打包
                }
            }
        }
    }
})