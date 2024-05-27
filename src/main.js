/*
 * @Description: Vue入口文件
 * @Author: 5t5
 * @Time: 2024/5/17 17:04
 */
// 创建Vue
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 引入Pinia
// import store from './store/store'
// app.use(store)

// 引入Router
import router from './router/router'
app.use(router)


app.mount('#app')