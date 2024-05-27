/*
 * @Description: router.js
 * @Author: 5t5
 * @Time: 2024/5/20 12:05
 */
import {createRouter, createWebHistory} from 'vue-router'

// #region routes
// 静态路由
const staticRoutes = [
//   {
//     path: '/Login',
//     name: 'Login',
//     component: () => import('@/views/Login/No-Found.vue'),
//     meta: {title: '登录', icon: '', hidden: true}
//   },
//   {
//     path: '/404',
//     name: '404',
//     component: () => import('@/views/Login/Login.vue'),
//     meta: {title: '404', hidden: true}
//   }
]

// 动态路由
const dynamicRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {title: 'Home', hidden: false}
  }
]
// #endregion

export {staticRoutes, dynamicRoutes} // 暴露路由

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 创建HTML5模式
  routes: [...staticRoutes, ...dynamicRoutes] // routes
})

export default router