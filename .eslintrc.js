module.exports = {
    // 配置文件根设置，确保规则在所有文件中生效
    root: true,
    // 指定解析器用于解析Vue文件
    'parser': 'vue-eslint-parser',
    // 解析器选项，指定JavaScript源码类型为ES模块
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module'
    },
    // 定义执行环境，启用对浏览器、Node.js环境及ES6语法的支持
    env: {
        browser: true,
        node: true,
        es2022: true
    },
    // 基于ESLint推荐规则进行扩展，并启用Vue 3的推荐规则
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
    rules: {
        // region Vue相关配置

        // 禁用Vue中模板内箭头函数的使用。设置为'off'表示不禁用。
        'vue/no-arrow-functions-in-default': 'off',

        // 确保在Vue的<script setup>语法中使用到的变量都被正确声明。
        'vue/script-setup-uses-vars': 2,

        // 设置Vue模板中每行的最大属性数量。
        'vue/max-attributes-per-line': [2, {
            'singleline': {
                'max': 10 // 单行模式下最大允许的属性数量。
            }
        }],

        // 规定v-on事件绑定的命名风格。设置为'never'表示禁止使用连字符命名风格。
        'vue/v-on-event-hyphenation': [2, 'never', {
            'autofix': false, // 是否自动修复不合规的命名。
            'ignore': ['custom-event'] // 忽略特定的事件名，这里忽略'custom-event'。
        }],

        // 规定Vue组件的命名，不允许使用多个单词，但可以忽略特定名称（如'home'和'login'）
        'vue/multi-word-component-names': [
            2,
            {
                'ignores': [
                    'Home',
                    'Login'
                ]
            }
        ],

        // 规则：控制Vue组件中块标签的新行格式
        // 'singleline': 'always' - 单行标签总是需要换行
        // 'multiline': 'always' - 多行标签总是需要换行
        // 'maxEmptyLines': 0 - 允许的最大空行数
        'vue/block-tag-newline': [2, {
            'singleline': 'always',
            'multiline': 'always',
            'maxEmptyLines': 0,
            // 针对特定块的配置，例如script和template
            'blocks': {
                'script': {
                    'singleline': 'always',
                    'multiline': 'always',
                    'maxEmptyLines': 0
                },
                'template': {
                    'singleline': 'always',
                    'multiline': 'always',
                    'maxEmptyLines': 0
                },
                // 自定义块配置示例
                'my-block': {
                    'singleline': 'always',
                    'multiline': 'always',
                    'maxEmptyLines': 0
                }
            }
        }],

        // 规则：禁止在Vue组件中使用未声明的属性
        'vue/no-unused-properties': [2],

        // endregion Vue相关配置


        // region JavaScript相关配置

        // 禁止在对象的大括号前后添加空格
        'object-curly-spacing': [2, 'never'],

        // 禁止在数组的大括号前后添加空格
        'array-bracket-spacing': [2, 'never'],

        // 箭头函数的左右应该有空格
        'arrow-spacing': 2,

        // 使用4个空格作为缩进，但在switch语句的case部分使用1个空格
        indent: [
            2,
            2
        ],

        // 规则：确保访问器对存在配对
        'accessor-pairs': 2,

        // 规则：确保数组方法返回数组
        'array-callback-return': 2,

        // 规则：使用块作用域变量
        'block-scoped-var': 2,

        // 规则：控制循环和条件语句的复杂度
        'complexity': 2,

        // 规则：控制this关键字的一致性
        // [2, 'self', 'that'] - 允许使用'self'和'that'作为this的别名
        'consistent-this': [2, 'self', 'that'],

        // 规则：确保花括号总是出现在条件语句的合适位置
        // [2, 'multi-line', 'consistent'] - 多行语句必须使用花括号，保持一致
        'curly': [2, 'multi-line', 'consistent'],

        // 规则：总是包含default情况
        'default-case': 2,

        // 规则：使用===代替==
        // [2, 'always', {'null': 'ignore'}] - 总是使用===，但忽略对null的比较
        'eqeqeq': [2, 'always', { 'null': 'ignore' }],

        // 规则：确保for循环的direction正确
        'for-direction': 2,

        // 规则：getter函数必须有返回值
        // [2, {allowImplicit: true}] - 允许隐式返回
        'getter-return': [2, { allowImplicit: true }],

        // 确保for-in循环有相应的守卫条件
        'guard-for-in': 2,

        // 要求处理回调函数中的错误
        'handle-callback-err': 2,

        // 规定在JSX属性中首选双引号
        'jsx-quotes': [2, 'prefer-double'],

        // 要求关键字周围有适当的空间
        'keyword-spacing': 2,

        // 设置最大嵌套回调深度
        'max-depth': [2, 5],

        // 设置最大嵌套回调函数的数量
        'max-nested-callbacks': [2, 3],

        // 设置函数最大参数数量
        'max-params': [2, 8],

        // 要求构造函数的首字母大写
        'new-cap': [2, {
            'capIsNew': false
        }],

        // 要求在创建新对象时使用括号
        'new-parens': 2,

        // 提醒避免使用alert
        'no-alert': 1,

        // 禁止使用数组构造函数
        'no-array-constructor': 2,

        // 禁止在循环中使用await
        'no-await-in-loop': 2,

        // 禁止使用buffer构造函数
        'no-buffer-constructor': 2,

        // 禁止使用caller属性
        'no-caller': 2,

        // 禁止在switch语句中声明函数
        'no-case-declarations': 2,

        // 禁止捕获变量shadowing
        'no-catch-shadow': 2,

        // 禁止类赋值
        'no-class-assign': 2,

        // 禁止比较负零
        'no-compare-neg-zero': 2,

        // 禁止在箭头函数中造成困惑的箭头
        'no-confusing-arrow': [2, { 'allowParens': true }],

        // 在条件语句中禁止常量条件
        'no-constant-condition': [2, { 'checkLoops': false }],

        // 禁止修改const变量
        'no-const-assign': 2,

        // 禁止控制字符在正则表达式中
        'no-control-regex': 2,

        // 提醒避免使用debugger
        'no-debugger': 1,

        // 禁止删除变量
        'no-delete-var': 2,

        // 禁止重复的函数参数
        'no-dupe-args': 2,

        // 禁止对象字面量中重复的键
        'no-dupe-keys': 2,

        // 禁止类成员重复
        'no-dupe-class-members': 2,

        // 禁止在switch语句中出现重复的case
        'no-duplicate-case': 2,

        // 禁止重复的导入
        'no-duplicate-imports': 2,

        // 禁止在正则表达式中使用空字符类
        'no-empty-character-class': 2,

        // 允许空函数，但不推荐
        'no-empty-function': 0,

        // 禁止空模式
        'no-empty-pattern': 2,

        // 禁止空catch块，但允许空的catch块来捕获并处理异常
        'no-empty': [2, { 'allowEmptyCatch': true }],

        // 禁止使用eval
        'no-eval': 2,

        // 禁止赋值给except关键字
        'no-ex-assign': 2,

        // 禁止扩展原生对象，除非指定例外
        'no-extend-native': [2, { 'exceptions': ['Array', 'Object'] }],

        // 禁止不必要的bind调用
        'no-extra-bind': 2,

        // 禁止不必要的布尔转换
        'no-extra-boolean-cast': 2,

        // 禁止多余的标签
        'no-extra-label': 2,

        // 禁止不必要的括号，但允许在函数声明中
        'no-extra-parens': [2, 'functions'],

        // 禁止多余的分号
        'no-extra-semi': 2,

        // 禁止case语句中代码的穿透行为，要求对每个case都显式处理
        'no-fallthrough': [2, { 'commentPattern': '.' }],

        // 禁止小数点前的浮点数表示
        'no-floating-decimal': 2,

        // 禁止函数赋值，防止意外的全局函数
        'no-func-assign': 2,

        // 禁止隐式的类型转换
        'no-implicit-coercion': [2, {
            'allow': ['+', '!!']
        }],

        // 禁止使用eval()类似的函数
        'no-implied-eval': 2,

        // 禁止创建隐式的全局变量
        'no-implicit-globals': 2,

        // 禁止在函数内部和外部都声明变量
        'no-inner-declarations': [2, 'both'],

        // 禁止无效的正则表达式字符串
        'no-invalid-regexp': 2,

        // 禁止不规范的空白字符，但在字符串、注释中忽略
        'no-irregular-whitespace': [2, {
            'skipStrings': true,
            'skipComments': true,
            'skipRegExps': true,
            'skipTemplates': true
        }],

        // 要求逗号前无空格，逗号后有空格
        'comma-spacing': [2, { 'before': false, 'after': true }],

        // 禁止使用iterator关键字
        'no-iterator': 2,

        // 禁止标签变量与其它变量同名
        'no-label-var': 2,

        // 禁止使用独立的block语句
        'no-lone-blocks': 2,

        // 禁止在循环中定义函数
        'no-loop-func': 2,

        // 禁止混合使用不同的操作符
        'no-mixed-operators': [2, {
            'groups': [['&&', '||']]
        }],

        // 禁止混合使用空格和制表符
        'no-mixed-spaces-and-tabs': 2,

        // 禁止多次赋值
        'no-multi-assign': 2,

        // 禁止多次使用空格
        'no-multi-spaces': 2,

        // 禁止使用多行字符串
        'no-multi-str': 2,

        // 禁止使用过多的空行
        'no-multiple-empty-lines': [2, {
            max: 3,
            maxEOF: 1,
            maxBOF: 1
        }],

        // 禁止使用new关键字创建Object
        'no-new-object': 2,

        // 禁止使用new关键字调用require
        'no-new-require': 2,

        // 禁止使用new关键字创建symbol
        'no-new-symbol': 2,

        // 禁止使用new关键字创建包装器
        'no-new-wrappers': 2,

        // 禁止使用new操作符
        'no-new': 2,

        // 禁止对象字面量中使用非法的函数调用
        'no-obj-calls': 2,

        // 禁止使用八进制转义序列
        'no-octal-escape': 2,

        // 禁止使用八进制字面量
        'no-octal': 2,

        // 禁止使用path concatenation
        'no-path-concat': 2,

        // 禁止重新赋值参数
        'no-param-reassign': 2,

        // 禁止使用proto关键字
        'no-proto': 2,

        // 禁止重新声明变量
        'no-redeclare': 2,

        // 禁止正则表达式中的多个空格
        'no-regex-spaces': 2,

        // 禁止使用受限的模块
        'no-restricted-modules': 'off',

        // 禁止在return语句中使用赋值表达式
        'no-return-assign': 2,

        // 禁止使用script url
        'no-script-url': 2,

        // 禁止自我赋值
        'no-self-assign': 2,

        // 禁止自我比较
        'no-self-compare': 2,

        // 禁止序列表达式
        'no-sequences': 2,

        // 禁止使用受限的名字
        'no-shadow-restricted-names': 2,

        // 禁止变量名遮蔽
        'no-shadow': 2,

        // 禁止稀疏数组
        'no-sparse-arrays': 2,

        // 禁止在模板字符串中使用插值表达式
        'no-template-curly-in-string': 2,

        // 禁止在super()调用之前使用this或super
        'no-this-before-super': 2,

        // 禁止抛出字面量作为异常
        'no-throw-literal': 2,

        // 禁止末尾存在多余空格
        'no-trailing-spaces': [2,
            {
                'skipBlankLines': true,
                'ignoreComments': true
            }],

        // 禁止未定义变量的初始化
        'no-undef-init': 2,

        // 禁止使用未定义的变量
        'no-undef': 2,

        // 禁止使用undefined
        'no-undefined': 2,

        // 禁止不期望的多行表达式
        'no-unexpected-multiline': 2,

        // 禁止未修改的循环条件
        'no-unmodified-loop-condition': 2,

        // 禁止不必要的三元操作符
        'no-unneeded-ternary': [2, { 'defaultAssignment': false }],

        // 禁止不可到达的代码
        'no-unreachable': 2,

        // 禁止在finally块中使用不安全的语句
        'no-unsafe-finally': 2,

        // 禁止使用否定形式的比较
        'no-unsafe-negation': 2,

        // 禁止未使用的表达式
        'no-unused-expressions': [2,
            {
                'allowShortCircuit': true,
                'allowTernary': true,
                'allowTaggedTemplates': true
            }],

        // 禁止未使用的标签
        'no-unused-labels': 2,

        // 禁止未使用的变量
        'no-unused-vars': [2,
            {
                'vars': 'all',
                'args': 'none',
                'ignoreRestSiblings': true,
                'caughtErrors': 'none'
            }],

        // 禁止在定义之前使用变量或函数
        'no-use-before-define': [1,
            {
                'functions': false,
                'classes': false
            }],

        // 禁止不必要的调用
        'no-useless-call': 2,

        // 禁止不必要的计算键
        'no-useless-computed-key': 2,

        // 禁止不必要的concat操作
        'no-useless-concat': 2,

        // 禁止不必要的构造函数调用
        'no-useless-constructor': 2,

        // 禁止不必要的转义
        'no-useless-escape': 2,

        // 禁止不必要的重命名
        'no-useless-rename': 2,

        // 禁止var关键字，推荐使用let和const
        'no-var': 2,

        // 禁止void操作符
        'no-void': 2,

        // 禁止警告注释
        'no-warning-comments': 0,

        // 禁止在属性前后的空白
        'no-whitespace-before-property': 2,

        // 禁止使用with语句
        'no-with': 2,

        // 确保非块语句位于块的合适位置
        'nonblock-statement-body-position': 2,

        // 推荐使用let而不是var，对于const声明禁止使用var
        'one-var': [2, {
            'const': 'never'
        }],

        // 推荐使用Promise.reject()代替直接返回错误
        'prefer-promise-reject-errors': 2,

        // 使用rest参数而不是arguments
        'prefer-rest-params': 2,

        // 引号使用规则：优先使用单引号，允许模板字符串不转义
        'quotes': [2, 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true
        }],

        // 数字转换为二进制时必须指定基数
        'radix': 2,

        // Generator函数中必须有yield
        'require-yield': 2,

        // 扩展运算符与对象之间不允许有空格
        'rest-spread-spacing': [2, 'never'],

        // 语句末尾分号风格：优先放在最后
        'semi-style': [2, 'last'],

        // 语句末尾是否使用分号：从不使用
        'semi': [2, 'never'],

        // 中缀操作符周围需要有空格
        'space-infix-ops': 2,

        // 一元操作符周围空格规则：单词操作符允许有空格，非单词操作符不允许
        'space-unary-ops': [0, {
            'words': true,
            'nonwords': false
        }],

        // 注释风格：总是使用always，块注释有特殊配置
        'spaced-comment': [2, 'always', {
            'block': {
                exceptions: ['*'], // 对于block注释，允许'*'作为异常
                balanced: true // 块注释必须平衡，即有开始就有结束
            }
        }],

        // 严格模式配置：从不使用严格模式
        'strict': [2, 'never'],

        // 数组和对象字面量末尾逗号规则：从不使用
        'comma-dangle': [2, 'never'],

        // 符号描述必须存在
        'symbol-description': 2,

        // 识别Unicode BOM
        'unicode-bom': 2,

        // 使用isNaN检查是否为NaN，而不是==或!=
        'use-isnan': 2,

        // typeof操作符的检查必须正确
        'valid-typeof': 2,

        // 立即执行函数表达式(IIFE)的包装规则：内部包装
        'wrap-iife': [2, 'inside'],

        // Yoda条件风格：不使用
        'yoda': 2

        // endregion JavaScript相关配置
    }
}