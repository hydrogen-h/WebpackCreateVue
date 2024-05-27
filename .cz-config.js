module.exports = {
    // 可选类型，和上面commitlint.config.js配置的规则一一对应
    types: [
      {value: 'feat', name: 'feat: 添加新功能'},
      {value: 'fix', name: 'fix: 修复已知问题和错误'},
      {value: 'docs', name: 'docs: 文档变更'},
      {value: 'style', name: 'style: 代码格式和风格的调整(不影响代码运行的变动)'},
      {value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)'},
      {value: 'perf', name: 'perf: 性能优化'},
      {value: 'test', name: 'test: 添加测试代码和测试用例'},
      {value: 'chore', name: 'chore: 构建过程或辅助工具的变动'},
      {value: 'revert', name: 'revert: 版本回退'},
      {value: 'build', name: 'build: 打包'},
      {value: 'ci', name: 'ci: 持续集成流程'},
      {value: 'types', name: 'types: 类型定义的更改'},
      {value: 'wip', name: 'wip: 工作进行中，通常用于暂存未完成'},
      {value: 'workflow', name: 'workflow: 工作流或流程变更'},
      {value: 'release', name: 'release: 发布相关的更改'},
      {value: 'update', name: 'update: 库或依赖更新'}
    ],
    // 消息步骤，正常只需要选择
    messages: {
      type: '请选择提交类型:',
      customScope: '请输入修改范围(可选):',
      subject: '请简要描述提交(必填):',
      body: '请输入详细描述(可选):',
      footer: '请输入要关闭的issue(可选):',
      confirmCommit: '确认使用以上信息提交？(y/n)'
    },
    // 跳过问题：修改范围，自定义修改范围，详细描述，issue相关
    //skipQuestions: ['scope', 'customScope', 'body', 'footer'],
    // subject描述文字长度最长是72
    subjectLimit: 72
  }