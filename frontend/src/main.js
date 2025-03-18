import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Tạo Pinia instance
const pinia = createPinia()

// Đăng ký Pinia và Router vào ứng dụng Vue
app.use(pinia)
app.use(router)

// Gắn ứng dụng vào DOM
app.mount('#app')
