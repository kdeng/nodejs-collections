import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'home',
        path: '/',
        component: () => import('../components/Home.vue')
      },
      {
        name: 'about',
        path: '/about',
        component: () => import('../components/About.vue')
      },
      {
        name: 'item',
        path: '/item/:id',
        component: () => import('../components/Item.vue')
      }
    ]
  })
}
