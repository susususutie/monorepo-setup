<script setup lang="ts">
import { version as viteVersion } from 'vite/package.json'
import { version as vueVersion } from 'vue'
import { formatDate, capitalize, one, test, Status, CONFIG } from 'pkg-utils'
import { createVueMessage, version as vueUiVersion } from 'pkg-vue-ui'
import HelloWorld from './components/HelloWorld.vue'
import ImportDemo from './components/NamedImportDemo.vue'
// import ImportDemo from './components/PathImportDemo.vue'
// import ImportDemo from './components/AdvancedUsageDemo.vue'

// 使用pkg-utils工具函数
const currentTime = formatDate(new Date(), 'YYYY-MM-DD HH:mm')
const appTitle = capitalize('vue playground demo')
const mathResult = test(one, 1)
const message = createVueMessage('支持多种导入方式的Vue UI组件库已加载')

// 演示pkg-vue-ui的功能
const showComponentInfo = () => {
  console.log('log')
}
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <h1>{{ appTitle }}</h1>
  <p>Vite@{{ viteVersion }} + Vue@{{ vueVersion }} + pkg-vue-ui@{{ vueUiVersion }}</p>
  <p>当前时间: {{ currentTime }}</p>
  <p>状态: {{ Status.SUCCESS }} | API: {{ CONFIG.API_BASE_URL }}</p>
  <p>计算结果: {{ mathResult }}</p>
  <p>{{ message }}</p>

  <!-- pkg-vue-ui 多种导入方式演示 -->
  <div class="demo-container">
    <ImportDemo />

    <!-- 全局导入演示 (适合小项目) -->
    <!-- 启用全局导入后，取消下面注释即可直接使用 -->
    <!-- <PkgButton type="primary" @click="showComponentInfo">全局 PkgButton</PkgButton> -->
    <!-- <PkgCard title="全局卡片" content="无需导入，直接使用" /> -->

    <div class="usage-tips">
      <h3>💡 使用建议</h3>
      <ul>
        <li><strong>按需导入</strong>: 开发便利，支持 IDE 智能提示</li>
        <li><strong>路径导入</strong>: 最佳 tree-shaking，生产环境首选</li>
        <li><strong>全局导入</strong>: 使用最简单，适合小型项目</li>
        <li><strong>动态导入</strong>: 条件渲染场景，按需加载</li>
      </ul>
    </div>
  </div>

  <div style="margin: 20px 0; padding: 20px; border: 2px solid #646cff; border-radius: 8px; background: #f9f9f9;">
    <h3>🛠️ pkg-utils 工具库演示</h3>
    <p>数学工具: test({{ one }}, 1) = {{ mathResult }}</p>
    <p>字符串工具: capitalize('vue playground demo') = {{ appTitle }}</p>
    <p>日期工具: formatDate(当前时间) = {{ currentTime }}</p>
    <button @click="showComponentInfo"
      style="margin-top: 10px; padding: 8px 16px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer;">
      查看 pkg-vue-ui 多种导入方式支持
    </button>
  </div>

  <HelloWorld :msg="`Vite@${viteVersion} + Vue@${vueVersion}`" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.demo-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.usage-tips {
  background: #f8fafc;
  padding: 25px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  margin: 30px 0;
}

.usage-tips h3 {
  margin-top: 0;
  color: #2d3748;
  border-bottom: 2px solid #4299e1;
  padding-bottom: 10px;
}

.usage-tips ul {
  margin: 15px 0;
  padding-left: 0;
  list-style: none;
}

.usage-tips li {
  background: white;
  padding: 12px 20px;
  margin: 10px 0;
  border-radius: 6px;
  border-left: 4px solid #4299e1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.usage-tips strong {
  color: #2b6cb0;
}
</style>
