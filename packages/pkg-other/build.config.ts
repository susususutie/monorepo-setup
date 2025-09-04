import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // 主入口文件
    'src/index',
    // 各个模块的单独入口，支持按需导入
    'src/constants',
    'src/types',
    'src/math',
    'src/string',
    'src/array',
    'src/object',
    'src/async',
    'src/date',
    'src/validator',
    'src/event',
    'src/cache',
    'src/error',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true, // 同时生成 CommonJS 格式
    inlineDependencies: true, // 内联依赖，确保包的独立性
  },
  // 确保生成的代码支持 tree-shaking
  failOnWarn: false,
})
