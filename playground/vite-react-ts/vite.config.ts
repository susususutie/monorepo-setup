import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "pkg-react-ui": path.resolve(__dirname, '../../packages/pkg-react-ui/src'),
      "pkg-other": path.resolve(__dirname, '../../packages/pkg-other/src'),
    }
  },
})
