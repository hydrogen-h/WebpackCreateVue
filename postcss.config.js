const flexbugsFixes = require('postcss-flexbugs-fixes')
const presetEnv = require('postcss-preset-env')
const normalize = require('postcss-normalize')
const nested = require('postcss-nested')

// 导出一个配置对象，用于PostCSS的处理
module.exports = {
    // 标识这个配置是为PostCSS准备的
    ident: 'postcss',
    // 使用的插件列表
    plugins: [
        flexbugsFixes,
        presetEnv({
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
        }),
        normalize(),
        nested
    ],
    sourceMap: true
}