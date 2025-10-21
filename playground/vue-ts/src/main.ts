import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 全局导入 pkg-vue-ui（注释掉表示未启用）
// import PkgVueUi from '@monorepo-setup/pkg-vue-ui'

const app = createApp(App)

// 全局注册 pkg-vue-ui 组件（取消注释以启用）
// app.use(PkgVueUi)

app.mount('#app')
