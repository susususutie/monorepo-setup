import { defineBuildConfig } from 'unbuild'
import vue from '@vitejs/plugin-vue'

export default defineBuildConfig({
  entries: [
    // 主入口文件 - 支持完整导入和按需导入
    'src/index',
    // 单独组件入口 - 支持 import Button from 'pkg-vue-ui/button' 方式
    'src/button/index',
    'src/card/index',
  ],
  declaration: true,
  clean: true,
  failOnWarn: false,
  stub: true, // 开发模式使用 stub，支持Vue组件
  rollup: {
    emitCJS: true,
    // 只在非-stub模式下使用Vue插件
    plugins: process.env.NODE_ENV !== 'stub' ? [] : [vue()]
  },
  externals: ['vue'],
})