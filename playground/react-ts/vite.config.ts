import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "pkg-other": path.resolve(__dirname, '../../packages/pkg-other/src'),
      "pkg-placeholder": path.resolve(__dirname, '../../packages/pkg-placeholder/src'),
    }
  },
})
