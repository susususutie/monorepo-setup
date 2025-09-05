/**
 * 基础常量定义
 */

// 数值常量
export const one = 12
export const two = 234

// 应用配置
export const CONFIG = {
  API_BASE_URL: 'https://api.example.com',
  TIMEOUT: 5000,
  VERSION: '1.0.0',
  FEATURES: {
    ENABLE_CACHE: true,
    ENABLE_LOGGING: false,
  },
} as const

// 状态枚举
export enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
  CANCELLED = 'cancelled',
}

// 优先级枚举
export enum Priority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  URGENT = 4,
}