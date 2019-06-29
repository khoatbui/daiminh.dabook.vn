import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import PromotionView from './views/PromotionView.vue'
import PromotionViewAll from './views/PromotionViewAll.vue'
import PromotionViewDetail from './views/PromotionViewDetail.vue'
import TourView from './views/TourView.vue'
import TourViewAll from './views/TourViewAll.vue'
import TourViewDetail from './views/TourViewDetail.vue'
import CarView from './views/CarView.vue'
import CarViewAll from './views/CarViewAll.vue'
import CarViewDetail from './views/CarViewDetail.vue'
import HistoryChecking from './views/HistoryChecking.vue'
import HotelConfirmBooking from '@/components/HotelConfirmBooking.vue'
import HotelRequestBooking from '@/components/HotelRequestBooking.vue'
import HotelDetailSection from '@/components/HotelDetailSection.vue'

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
    },
    {
      path: '/promotiondetail',
      name: 'promotiondetail',
      component:PromotionViewDetail,
      children: [
        {
          path: 'confirm',
          name: 'promotiondetailconfirm',
          component: HotelConfirmBooking
        },
        {
          path: 'request',
          name: 'promotiondetailrequest',
          component: HotelRequestBooking,
          props: true
        },
        {
          path: '',
          name: 'promotiondetailsection',
          component: HotelDetailSection
        }
      ]
    },
    {
      path: '/car',
      name: 'car',
      component:CarView
    },
    {
      path: '/carall',
      name: 'carall',
      component:CarViewAll
    },
    {
      path: '/cardetail',
      name: 'cardetail',
      component:CarViewDetail
    },
    {
      path: '/tour',
      name: 'tour',
      component:TourView
    },
    {
      path: '/tourall',
      name: 'tourall',
      component:TourViewAll
    },
    {
      path: '/tourdetail',
      name: 'tourdetail',
      component:TourViewDetail
    },
    {
      path: '/historychecking',
      name: 'historychecking',
      component:HistoryChecking
    }
  ]
})
