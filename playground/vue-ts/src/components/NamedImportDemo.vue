<template>
  <div class="import-demo">
    <h3>🎯 按需导入 (Named Import)</h3>
    <p class="description">
      从 pkg-vue-ui 中按需导入指定组件，这是推荐的使用方式。
    </p>

    <div class="code-example">
      <h4>导入代码：</h4>
      <pre><code>import { Button, Card } from 'pkg-vue-ui'
import type { ButtonProps, CardProps } from 'pkg-vue-ui'</code></pre>
    </div>

    <div class="demo-section">
      <h4>组件演示：</h4>

      <!-- Button 组件演示 -->
      <div class="component-showcase">
        <Button type="primary" @click="handleClick('主要按钮')">主要按钮</Button>
        <Button type="success" @click="handleClick('成功按钮')">成功按钮</Button>
        <Button type="warning" @click="handleClick('警告按钮')">警告按钮</Button>
        <Button :disabled="true">禁用按钮</Button>
      </div>

      <!-- Card 组件演示 -->
      <div class="card-showcase">
        <Card title="按需导入示例" content="这个卡片通过按需导入方式使用" />

        <Card title="自定义内容">
          <p>✅ 支持按需导入</p>
          <p>✅ 完整的 TypeScript 类型支持</p>
          <p>✅ 良好的代码提示</p>
          <template #footer>
            <small>按需导入演示</small>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 按需导入组件（实际使用时就是这样导入）
import { Button, Card } from 'pkg-vue-ui'
// 导入类型定义
// import type { ButtonProps } from 'pkg-vue-ui'

// 事件处理
const handleClick = (buttonType: string) => {
  console.log(`按需导入的 ${buttonType} 被点击了！`)
}
</script>

<style scoped>
.import-demo {
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  margin: 20px 0;
  border: 2px solid #1890ff;
}

.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

.code-example {
  background: #f6f6f6;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
  border-left: 4px solid #1890ff;
}

.code-example h4 {
  margin-top: 0;
  color: #1890ff;
  font-size: 14px;
}

.code-example pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 8px 0 0 0;
}

.demo-section h4 {
  color: #2c3e50;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin: 15px 0;
}
</style>