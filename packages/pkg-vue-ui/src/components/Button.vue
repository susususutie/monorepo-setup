<template>
  <div class="vue-demo-button" :class="{ [`vue-demo-button--${type}`]: type }">
    <button 
      @click="handleClick" 
      :disabled="disabled"
      class="button"
    >
      <slot>{{ text || 'Vue Button' }}</slot>
    </button>
  </div>
</template>

<script setup lang="ts">
// 组件类型定义
export type ButtonType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

export interface ButtonProps {
  text?: string
  type?: ButtonType
  disabled?: boolean
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<ButtonProps>(), {
  text: 'Vue Button',
  type: 'primary',
  disabled: false,
})

const emit = defineEmits<Emits>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<script lang="ts">
// 组件名称 - 用于 app.component 注册
export default {
  name: 'PkgButton'
}
</script>

<style scoped>
.vue-demo-button {
  display: inline-block;
}

.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.vue-demo-button--primary .button {
  background-color: #1890ff;
  color: white;
}

.vue-demo-button--primary .button:hover:not(:disabled) {
  background-color: #40a9ff;
}

.vue-demo-button--secondary .button {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #d9d9d9;
}

.vue-demo-button--secondary .button:hover:not(:disabled) {
  background-color: #e6f7ff;
  border-color: #91d5ff;
}

.vue-demo-button--success .button {
  background-color: #52c41a;
  color: white;
}

.vue-demo-button--success .button:hover:not(:disabled) {
  background-color: #73d13d;
}

.vue-demo-button--warning .button {
  background-color: #faad14;
  color: white;
}

.vue-demo-button--warning .button:hover:not(:disabled) {
  background-color: #ffc53d;
}

.vue-demo-button--danger .button {
  background-color: #ff4d4f;
  color: white;
}

.vue-demo-button--danger .button:hover:not(:disabled) {
  background-color: #ff7875;
}
</style>