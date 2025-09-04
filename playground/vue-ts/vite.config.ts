import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "pkg-vue-ui": path.resolve(__dirname, '../../packages/pkg-vue-ui/src'),
      "pkg-other": path.resolve(__dirname, '../../packages/pkg-other/src'),
    }
  },
})
