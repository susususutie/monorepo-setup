# @monorepo-setup/pkg-vue-ui

Vue 3 组件库，基于 unbuild + mkdist 构建

## 特性

- 使用 Vue 3 + TypeScript 开发
- 基于 unbuild + mkdist 构建工具
- 支持按需引入组件
- 支持 TypeScript 类型定义
- 支持 CSS 样式提取

## 安装

```bash
pnpm add @monorepo-setup/pkg-vue-ui
```

## 使用

### 全量引入

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Card } from '@monorepo-setup/pkg-vue-ui'

const app = createApp(App)
app.component('Button', Button)
app.component('Card', Card)
app.mount('#app')
```

### 按需引入

```javascript
import { Button, Card } from '@monorepo-setup/pkg-vue-ui'

export default {
  components: {
    Button,
    Card
  }
}
```

### 直接引入单个组件

```javascript
import Button from '@monorepo-setup/pkg-vue-ui/button'
import Card from '@monorepo-setup/pkg-vue-ui/card'
```

## 组件

### Button 按钮

```vue
<template>
  <Button text="点击我" @click="handleClick" />
</template>

<script setup>
const handleClick = (event) => {
  console.log('按钮被点击了', event)
}
</script>
```

## 构建

```bash
# 构建组件库
pnpm build

# 开发模式（监听文件变化）
pnpm dev
```

## License

MIT