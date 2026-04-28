import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const copyHtaccessPlugin = () => ({
  name: 'copy-htaccess-to-dist',
  closeBundle() {
    const source = resolve(__dirname, 'public/.htaccess')
    const target = resolve(__dirname, 'dist/.htaccess')

    if (existsSync(source)) {
      copyFileSync(source, target)
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyHtaccessPlugin(),
  ],
})