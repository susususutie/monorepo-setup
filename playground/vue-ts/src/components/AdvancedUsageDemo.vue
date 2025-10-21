<template>
  <div class="advanced-demo">
    <h3>🚀 动态导入演示</h3>
    <p>智能化动态加载组件，适合条件渲染场景</p>
    
    <div class="demo-controls">
      <button @click="toggleButton" class="toggle-btn">
        {{ showButton ? '隐藏 Button' : '显示 Button' }}
      </button>
      <button @click="toggleCard" class="toggle-btn">
        {{ showCard ? '隐藏 Card' : '显示 Card' }}
      </button>
    </div>
    
    <div class="dynamic-components">
      <component 
        v-if="showButton && ButtonComponent" 
        :is="ButtonComponent" 
        type="primary" 
        @click="handleClick"
      >
        动态加载的 Button
      </component>
      
      <component 
        v-if="showCard && CardComponent" 
        :is="CardComponent" 
        title="动态加载的 Card"
        content="这个组件是通过动态 import() 加载的"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, shallowRef, markRaw } from 'vue'

// 动态组件状态 - 使用 shallowRef 避免组件对象被深度响应式化
const ButtonComponent = shallowRef<any>(null)
const CardComponent = shallowRef<any>(null)
const showButton = ref(false)
const showCard = ref(false)

// 智能化动态加载函数
const loadComponent = async (name: string) => {
  // 使用明确的路径映射，避免Vite动态导入警告
  const componentMap: Record<string, () => Promise<any>> = {
    button: () => import('@monorepo-setup/pkg-vue-ui/button'),
    card: () => import('@monorepo-setup/pkg-vue-ui/card')
  }
  
  const loadModule = componentMap[name]
  if (!loadModule) {
    throw new Error(`组件 '${name}' 不存在`)
  }
  
  const module = await loadModule()
  return module.default
}

// 监听显示状态，自动加载组件
watch(showButton, async (show) => {
  if (show && !ButtonComponent.value) {
    const component = await loadComponent('button')
    ButtonComponent.value = markRaw(component) // 使用 markRaw 标记组件为非响应式
  }
})

watch(showCard, async (show) => {
  if (show && !CardComponent.value) {
    const component = await loadComponent('card')
    CardComponent.value = markRaw(component) // 使用 markRaw 标记组件为非响应式
  }
})

// 切换显示状态
const toggleButton = () => { showButton.value = !showButton.value }
const toggleCard = () => { showCard.value = !showCard.value }

const handleClick = () => {
  alert('动态加载的组件被点击！')
}
</script>

<style scoped>
.advanced-demo {
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  margin: 20px 0;
  border: 2px solid #6366f1;
}

.demo-controls {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.toggle-btn {
  padding: 8px 16px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.dynamic-components {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 15px 0;
  min-height: 60px;
}
</style>