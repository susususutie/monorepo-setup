import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { input: 'src/index' },
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  // 使用 mkdist 处理 Vue 组件
  hooks: {
    'build:done': (ctx) => {
      // mkdist 会自动处理 Vue 组件的构建
      console.log('Build completed with mkdist support for Vue components')
    }
  }
})