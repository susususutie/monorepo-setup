<template>
  <div class="import-demo">
    <h3>🎯 路径导入 (Path Import)</h3>
    <p class="description">
      通过具体路径导入单个组件，具有最佳的 tree-shaking 效果。
    </p>

    <div class="code-example">
      <h4>导入代码：</h4>
      <pre><code>import Button from 'pkg-vue-ui/button'
import Card from 'pkg-vue-ui/card'
import type { ButtonProps } from 'pkg-vue-ui/button'
import type { CardProps } from 'pkg-vue-ui/card'</code></pre>
    </div>

    <div class="demo-section">
      <h4>组件演示：</h4>

      <div class="component-showcase">
        <Button type="primary" @click="handleClick('主要按钮')">
          主要按钮（路径导入）
        </Button>
        <Button type="success" @click="handleClick('成功按钮')">
          成功按钮
        </Button>
        <Button type="warning" @click="handleClick('警告按钮')">
          警告按钮
        </Button>
      </div>

      <div class="card-showcase">
        <Card title="路径导入示例" content="这个卡片通过精确路径导入，具有最佳的 tree-shaking 效果" />

        <Card title="Tree-shaking 优势">
          <div class="advantages">
            <p>✅ 最小化最终构建产物体积</p>
            <p>✅ 按需加载，提升性能</p>
            <p>✅ 只打包实际使用的组件代码</p>
          </div>
          <template #footer>
            <small>路径导入 | 最佳性能选择</small>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 路径导入 - 最佳 tree-shaking 效果
import Button from 'pkg-vue-ui/button'
import Card from 'pkg-vue-ui/card'
// 路径导入类型定义
// import type { ButtonProps } from 'pkg-vue-ui/button'
// import type { CardProps } from 'pkg-vue-ui/card'

// 事件处理函数
const handleClick = (name: string) => {
  console.log(`路径导入的 ${name} 被点击了！\n\n这个组件通过路径导入，具有最佳的 tree-shaking 效果。`)
}
</script>

<style scoped>
.import-demo {
  padding: 20px;
  background: #f0f9ff;
  border-radius: 8px;
  margin: 20px 0;
  border: 2px solid #0ea5e9;
}

.description {
  color: #0369a1;
  font-size: 14px;
  margin-bottom: 15px;
}

.code-example {
  background: #1e293b;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
  border-left: 4px solid #0ea5e9;
}

.code-example h4 {
  margin-top: 0;
  color: #0ea5e9;
  font-size: 14px;
}

.code-example pre {
  background: transparent;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 8px 0 0 0;
}

.demo-section h4 {
  color: #0369a1;
  margin: 20px 0 15px 0;
}

.component-showcase {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 15px 0;
}

.card-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
  margin: 15px 0;
}

.advantages p {
  margin: 8px 0;
  color: #374151;
}
</style>