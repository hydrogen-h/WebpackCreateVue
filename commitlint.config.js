module.exports = {
    // 定义忽略某些提交的规则
    ignores: [(commit) => commit.includes('init')],
    // 基于 conventional-changelog 的规则来验证提交信息
    extends: ['@commitlint/config-conventional'],
    // 自定义解析器配置
    parserPreset: {
        // 定义提交头的匹配模式
        parserOpts: {
            // 匹配提交头的正则表达式，用于解析 type、scope 和 subject
            headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[(（](.*)[)）])?[:：] (.*)/,
            // 定义提交头的各个部分（type, scope, subject）的对应关系
            headerCorrespondence: ['type', 'scope', 'subject'],
            // 定义可以关闭 issue 的关键词
            referenceActions: [
                'close',
                'closes',
                'closed',
                'fix',
                'fixes',
                'fixed',
                'resolve',
                'resolves',
                'resolved',
            ],
            // 定义 issue 前缀
            issuePrefixes: ['#'],
            // 定义表示不兼容变更的关键词
            noteKeywords: ['BREAKING CHANGE'],
            // 定义自定义字段的模式
            fieldPattern: /^-(.*?)-$/,
            // 定义 revert 提交的解析规则
            revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
            revertCorrespondence: ['header', 'hash'],
            // mergePattern 和 mergeCorrespondence 未配置，使用默认值
            mergePattern: null,
            mergeCorrespondence: null,
        },
    },
    // 自定义提交信息的校验规则
    rules: {
        // 要求 body 部分以空行开头
        'body-leading-blank': [2, 'always'],
        // 要求 footer 部分以空行开头
        'footer-leading-blank': [1, 'always'],
        // 定义 header 部分的最大长度
        'header-max-length': [2, 'always', 108],
        // 禁止 subject 为空
        'subject-empty': [2, 'never'],
        // 禁止 type 为空
        'type-empty': [2, 'never'],
        // 定义 type 的有效取值
        'type-enum': [
            2,
            'always',
            /**
             * 列出了一系列的 Commit 类型标签，用于版本控制中的提交信息分类。
             * 这些标签代表了不同的代码更改类型，有助于自动化 changelog 生成和版本发布。
             *
             * @type {Array<string>}
             * @enum {CommitType}
             *
             * Commit 类型解释:
             * 1. 'feat' - 新功能的添加。
             * 2. 'fix' - 修复已知问题和错误。
             * 3. 'perf' - 性能优化。
             * 4. 'style' - 代码格式和风格的调整，不影响行为。
             * 5. 'docs' - 文档相关的更改。
             * 6. 'test' - 测试代码和测试用例的更改。
             * 7. 'refactor' - 代码重构，不改变行为。
             * 8. 'build' - 构建过程或工具配置的更改。
             * 9. 'ci' - 持续集成流程的更改。
             * 10. 'chore' - 与项目构建或辅助工具相关的杂项更改。
             * 11. 'revert' - 撤销之前的提交。
             * 12. 'wip' - 工作进行中，通常用于暂存未完成的变更。
             * 13. 'workflow' - 工作流或流程相关的更改。
             * 14. 'types' - 类型定义的更改。
             * 15. 'release' - 发布相关的更改。
             * 16. 'update' - 通常用于库或依赖的更新。
             */
            [
                'feat',
                'fix',
                'perf',
                'style',
                'docs',
                'test',
                'refactor',
                'build',
                'ci',
                'chore',
                'revert',
                'wip',
                'workflow',
                'types',
                'release',
                'update'
            ]
        ]
    }
}