/**
 * LM Web 项目的共享 Prettier 配置
 */
export default {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  bracketSameLine: false,
  arrowParens: 'avoid',
  vueIndentScriptAndStyle: true,
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
};
