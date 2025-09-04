# pkg-vue-ui

现代化的Vue 3 + TypeScript UI组件库，支持多种导入方式。

## 🚀 特性

- 🎯 **多种导入方式**：支持完整导入、按需导入、路径导入等方式
- 📦 **Vue 3 + TypeScript**：完整的类型支持和现代Vue特性
- 🌳 **Tree-shaking 友好**：优化的构建配置，支持按需打包
- 🔧 **插件系统**：支持Vue插件方式全局注册
- 📝 **TypeScript 优先**：完整的类型定义和IntelliSense支持

## 📦 安装

```bash
pnpm add pkg-vue-ui
# 或
npm install pkg-vue-ui
# 或
yarn add pkg-vue-ui
```

## 🎯 使用方式

### 1. 完整导入 + 全局注册（推荐用于小项目）

```typescript
// main.ts
import { createApp } from 'vue'
import PkgVueUi from 'pkg-vue-ui'
import App from './App.vue'

const app = createApp(App)
app.use(PkgVueUi)
app.mount('#app')
```

```vue
<!-- 在任何组件中直接使用 -->
<template>
  <PkgButton type="primary" @click="handleClick">主要按钮</PkgButton>
  <PkgCard title="卡片标题" content="卡片内容" />
</template>
```

### 2. 按需导入（推荐用于大项目）

```vue
<template>
  <Button type="primary" @click="handleClick">主要按钮</Button>
  <Card title="卡片标题" content="卡片内容" />
</template>

<script setup lang="ts">
import { Button, Card } from 'pkg-vue-ui'
import type { ButtonProps, CardProps } from 'pkg-vue-ui'

const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

### 3. 路径导入（最佳tree-shaking）

```vue
<template>
  <Button type="success" @click="handleClick">成功按钮</Button>
</template>

<script setup lang="ts">
import Button from 'pkg-vue-ui/button'
import type { ButtonProps } from 'pkg-vue-ui/button'

const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

### 4. 动态导入（按需加载）

```vue
<template>
  <component :is="ButtonComponent" v-if="ButtonComponent" type="warning">
    动态按钮
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const ButtonComponent = ref(null)

onMounted(async () => {
  // 动态导入组件
  const { default: Button } = await import('pkg-vue-ui/button')
  ButtonComponent.value = Button
})
</script>
```

## 🧩 组件列表

### Button 按钮组件

支持多种按钮类型和状态。

```vue
<template>
  <Button type="primary">主要按钮</Button>
  <Button type="secondary">次要按钮</Button>
  <Button type="success">成功按钮</Button>
  <Button type="warning">警告按钮</Button>
  <Button type="danger">危险按钮</Button>
  <Button :disabled="true">禁用按钮</Button>
</template>
```

**Props:**
- `text?: string` - 按钮文本
- `type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'` - 按钮类型
- `disabled?: boolean` - 是否禁用

**Events:**
- `click` - 点击事件

### Card 卡片组件

灵活的卡片容器组件，支持插槽。

```vue
<template>
  <!-- 简单用法 -->
  <Card title="卡片标题" content="卡片内容" />
  
  <!-- 使用插槽 -->
  <Card>
    <template #header>
      <h3>自定义头部</h3>
    </template>
    <p>自定义内容</p>
    <template #footer>
      <span>自定义页脚</span>
    </template>
  </Card>
</template>
```

**Props:**
- `title?: string` - 卡片标题
- `content?: string` - 卡片内容
- `hoverable?: boolean` - 是否显示悬浮效果，默认`true`

**Slots:**
- `header` - 头部插槽
- `default` - 内容插槽
- `footer` - 页脚插槽

## 📚 TypeScript 支持

完整的TypeScript类型定义：

```typescript
import type { 
  ButtonProps, 
  ButtonType, 
  CardProps 
} from 'pkg-vue-ui'

// 使用类型
const buttonConfig: ButtonProps = {
  type: 'primary',
  disabled: false
}

const cardConfig: CardProps = {
  title: '标题',
  content: '内容',
  hoverable: true
}
```

## 🛠️ 高级用法

### 工具函数

```typescript
import { createVueMessage, ComponentNames, ComponentPaths } from 'pkg-vue-ui'

// 创建消息
const message = createVueMessage('Hello World') // "[Vue UI]: Hello World"

// 获取组件名称映射
console.log(ComponentNames.Button) // "PkgButton"
console.log(ComponentNames.Card) // "PkgCard"

// 获取组件路径
console.log(ComponentPaths.Button) // "./components/Button.vue"
console.log(ComponentPaths.Card) // "./components/Card.vue"
```

### 版本信息

```typescript
import { version } from 'pkg-vue-ui'

console.log('当前版本:', version) // "0.0.0"
```

## 🎨 自定义主题

组件使用CSS变量，可以轻松自定义主题：

```css
:root {
  --pkg-primary-color: #1890ff;
  --pkg-success-color: #52c41a;
  --pkg-warning-color: #faad14;
  --pkg-danger-color: #ff4d4f;
}
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License