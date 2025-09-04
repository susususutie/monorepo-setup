import type { App, Plugin } from 'vue'
import Button from '../components/Button.vue'
import Card from '../components/Card.vue'
import type { ButtonProps, ButtonType, CardProps } from '../types'

// Vue插件安装函数
const install: Plugin['install'] = (app: App) => {
  // 全局注册组件
  app.component('PkgButton', Button)
  app.component('PkgCard', Card)

  console.log('[pkg-vue-ui] 组件已全局注册: PkgButton, PkgCard')
}

// 默认导出 - 支持 app.use(PkgVueUi) 方式
const PkgVueUi: Plugin = {
  install,
}

// 导出插件
export default PkgVueUi

// 导出版本信息
export const version = '0.0.0'
