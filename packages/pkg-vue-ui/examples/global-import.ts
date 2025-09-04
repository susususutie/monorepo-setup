import { createApp } from 'vue'
import PkgVueUi from 'pkg-vue-ui'

const app = createApp(App)

// 方式1: 使用Vue插件方式全局注册
app.use(PkgVueUi)

app.mount('#app')

// 现在可以在任何组件中直接使用：
// <PkgButton type="primary">主要按钮</PkgButton>
// <PkgCard title="卡片标题">卡片内容</PkgCard>