import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import PromotionView from './views/PromotionView.vue'
import PromotionViewAll from './views/PromotionViewAll.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Home
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/promotion',
      name: 'promotion',
      component:PromotionView
    },
    {
      path: '/promotionall',
      name: 'promotionall',
      component:PromotionViewAll
    }
  ]
})
