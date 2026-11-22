import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/CV_AnmierulEhsan/' : '/',
  plugins: [vue(), vuetify({ autoImport: true })]
})
