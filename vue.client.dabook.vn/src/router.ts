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
import CarConfirmBooking from '@/components/CarConfirmBooking.vue'
import CarRequestBooking from '@/components/CarRequestBooking.vue'
import CarDetailSection from '@/components/CarDetailSection.vue'
import TourConfirmBooking from '@/components/TourConfirmBooking.vue'
import TourDetailSection from '@/components/TourDetailSection.vue'
import TravelStyleDetail from '@/components/TravelStyleDetail.vue'
import TravelStyleAll from '@/components/TravelStyleAll.vue'
import TravelServiceDetail from '@/components/TravelServiceDetail.vue'
import TravelServiceAll from '@/components/TravelServiceAll.vue'
import FITDetail from '@/components/FITDetail.vue'
import FITAll from '@/components/FITAll.vue'
// import TourRequestBooking from '@/components/TourRequestBooking.vue'
import MainSearch from '@/views/MainSearch.vue'
import Destination from '@/views/Destination.vue'
import TravelStyleView from '@/views/TravelStyleView.vue'
import TravelServiceView from '@/views/TravelServiceView.vue'
import AboutUs from '@/views/About.vue'
import MICE from '@/views/MICE.vue'
import FITView from '@/views/FITView.vue'
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
    },{
      path: '/mainsearch',
      name: 'mainsearch',
      component: MainSearch
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
      path: '/carviewall',
      name: 'carviewall',
      component:CarViewAll
    },
    {
      path: '/cardetail',
      name: 'cardetail',
      component:CarViewDetail,
      children: [
        {
          path: 'confirm',
          name: 'cardetailconfirm',
          component: CarConfirmBooking
        },
        {
          path: 'request',
          name: 'cardetailrequest',
          component: CarRequestBooking,
          props: true
        },
        {
          path: '',
          name: 'cardetailsection',
          component: CarDetailSection
        }
      ]
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
      component:TourViewDetail,
      children: [
        {
          path: 'confirm',
          name: 'tourdetailconfirm',
          component: TourConfirmBooking
        },
        // {
        //   path: 'request',
        //   name: 'tourdetailrequest',
        //   component: TourRequestBooking,
        //   props: true
        // },
        {
          path: '',
          name: 'tourdetailsection',
          component: TourDetailSection
        }
      ]
    },
    {
      path: '/historychecking',
      name: 'historychecking',
      component:HistoryChecking
    },
    {
      path: '/destination',
      name: 'destination',
      component:Destination,
      children: [
        {
          path: 'country',
          name: 'country',
          component: TourConfirmBooking
        },
        {
          path: 'city',
          name: 'city',
          component: TourConfirmBooking,
          props: true
        },
        {
          path: 'destination',
          name: 'destination',
          component: TourConfirmBooking,
          props: true
        },
        {
          path: '',
          name: 'destination',
          component: Destination
        }
      ]
    },
    {
      path: '/travelstyle',
      component:TravelStyleView,
      children: [
        {
          path: 'detail',
          name: 'travelstyledetail',
          component: TravelStyleDetail
        },
        {
          path: '',
          name: 'travelstyleAll',
          component: TravelStyleAll
        }
      ]
    },
    {
      path: '/travelservice',
      component:TravelServiceView,
      children: [
        {
          path: 'detail',
          name: 'travelservicedetail',
          component: TravelServiceDetail
        },
        {
          path: '',
          name: 'travelserviceAll',
          component: TravelServiceAll
        }
      ]
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component:AboutUs
    },
    {
      path: '/mice',
      name: 'mice',
      component:MICE
    },
    {
      path: '/fit',
      component:FITView,
      children: [
        {
          path: 'detail',
          name: 'fitdetail',
          component: FITDetail
        },
        {
          path: '',
          name: 'fitall',
          component: FITAll
        }
      ]
    }
  ]
})
