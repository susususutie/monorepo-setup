import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@monorepo-setup/pkg-react-ui": path.resolve(__dirname, '../../packages/pkg-react-ui/src'),
      "@monorepo-setup/pkg-utils": path.resolve(__dirname, '../../packages/pkg-utils/src'),
    }
  },
})
