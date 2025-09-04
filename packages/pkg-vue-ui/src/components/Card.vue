<template>
  <div class="vue-demo-card" :class="{ 'vue-demo-card--hoverable': hoverable }">
    <div v-if="$slots.header || title" class="vue-demo-card__header">
      <slot name="header">
        <h3>{{ title }}</h3>
      </slot>
    </div>
    <div class="vue-demo-card__body">
      <slot>
        <p>{{ content || 'Vue Card 组件内容' }}</p>
      </slot>
    </div>
    <div v-if="$slots.footer" class="vue-demo-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件类型定义
export interface CardProps {
  title?: string
  content?: string
  hoverable?: boolean
}

withDefaults(defineProps<CardProps>(), {
  title: '',
  content: '',
  hoverable: true,
})
</script>

<script lang="ts">
// 组件名称 - 用于 app.component 注册
export default {
  name: 'PkgCard'
}
</script>

<style scoped>
.vue-demo-card {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: white;
  overflow: hidden;
  transition: all 0.2s;
}

.vue-demo-card--hoverable:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.vue-demo-card__header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.vue-demo-card__header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #262626;
}

.vue-demo-card__body {
  padding: 20px;
}

.vue-demo-card__body p {
  margin: 0;
  color: #595959;
  line-height: 1.6;
}

.vue-demo-card__footer {
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}
</style>