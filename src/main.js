import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import App from './App.vue'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'adamTheme',
    themes: {
      adamTheme: {
        dark: false,
        colors: {
          primary: '#2563eb',
          secondary: '#0f172a',
          accent: '#14b8a6',
          background: '#f8fafc',
          surface: '#ffffff'
        }
      }
    }
  }
})

createApp(App).use(vuetify).mount('#app')
