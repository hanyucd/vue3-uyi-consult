module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {},
  // 指定如何解析语法
  parser: 'vue-eslint-parser',
  // 优先级低于 parse 的语法解析配置
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
  },
  // 继承某些已有的规则
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    // 'prettier',
  ],
  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    semi: ['error', 'always'], // 强制在语句末尾使用分号
    quotes: ['error', 'single', { allowTemplateLiterals: true }], // 强制使用单引号 & 允许字符串使用反勾号

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // vue (https://eslint.vuejs.org/rules)
    'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容前后需要换行符
    'vue/require-default-prop': 'off', // 关闭 props 需要默认值
    'vue/no-v-html': 'off', // 关闭 Disallow use of v-html to prevent XSS attack
    'vue/multi-word-component-names': 'off', // 关闭 组件名称始终是多个单词
    'no-unused-vars': 'off', // 禁止使用未声明的变量
    'vue/v-on-event-hyphenation': 'off', // 禁止对模板中的自定义组件强制执行 v-on 事件命名样式
    // 控制一/多行可接受的属性量
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 10 },
        multiline: { max: 1 },
      },
    ],
    // 空标签需要自闭合
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
};
