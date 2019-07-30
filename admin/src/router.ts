import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
var Auth = require('./controllers/auth.middleware');

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/tour-supplier',
      name: 'toursupplier',
      component: () => import(/* webpackChunkName: "about" */ './views/TourSupplier.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tour-type',
      name: 'tourtype',
      component: () => import(/* webpackChunkName: "about" */ './views/TourType.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tour-list',
      name: 'tourlist',
      component: () => import(/* webpackChunkName: "about" */ './views/TourList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/destination',
      name: 'destination',
      component: () => import(/* webpackChunkName: "about" */ './views/Destination.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/area',
      name: 'area',
      component: () => import(/* webpackChunkName: "about" */ './views/Area.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/city',
      name: 'city',
      component: () => import(/* webpackChunkName: "about" */ './views/City.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/country',
      name: 'country',
      component: () => import(/* webpackChunkName: "about" */ './views/Country.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tour-detail',
      name: 'tourdetail',
      component: () => import(/* webpackChunkName: "about" */ './views/TourDetail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/travel-style',
      name: 'travelstyle',
      component: () => import(/* webpackChunkName: "about" */ './views/TravelStyle.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import(/* webpackChunkName: "about" */ './views/Payments.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "about" */ './views/Order.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/service-include',
      name: 'serviceinclude',
      component: () => import(/* webpackChunkName: "about" */ './views/ServiceInclude.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/hotel',
      name: 'hotel',
      component: () => import(/* webpackChunkName: "about" */ './views/Hotel.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: () => import(/* webpackChunkName: "about" */ './views/Supplier.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/package',
      name: 'package',
      component: () => import(/* webpackChunkName: "about" */ './views/Package.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/room-type',
      name: 'room-type',
      component: () => import(/* webpackChunkName: "about" */ './views/RoomType.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/option-service',
      name: 'option-service',
      component: () => import(/* webpackChunkName: "about" */ './views/OptionService.vue'),
      meta: { requiresAuth: true }
    }
    ,
    {
      path: '/package-hotel-rel',
      name: 'package-hotel-rel',
      component: () => import(/* webpackChunkName: "about" */ './views/PackageHotelREL.vue'),
      meta: { requiresAuth: true }
    }
    ,
    {
      path: '/roomtype-hotel-rel',
      name: 'roomtype-hotel-rel',
      component: () => import(/* webpackChunkName: "about" */ './views/RoomTypeHotelREL.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/carsupplier',
      name: 'carsupplier',
      component: () => import(/* webpackChunkName: "about" */ './views/CarSupplier.vue'),
      meta: { requiresAuth: true }
    }
    ,
    {
      path: '/carcartype',
      name: 'carcartype',
      component: () => import(/* webpackChunkName: "about" */ './views/CarType.vue'),
      meta: { requiresAuth: true }
    }
    ,
    {
      path: '/cartranstype',
      name: 'cartranstype',
      component: () => import(/* webpackChunkName: "about" */ './views/CarTransType.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/cardetailprice',
      name: 'cardetailprice',
      component: () => import(/* webpackChunkName: "about" */ './views/CarDetailPriceREL.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/adsmanager',
      name: 'adsmanager',
      component: () => import(/* webpackChunkName: "about" */ './views/Ads.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/blogtype',
      name: 'blogtype',
      component: () => import(/* webpackChunkName: "about" */ './views/BlogType.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/bloglist',
      name: 'bloglist',
      component: () => import(/* webpackChunkName: "about" */ './views/BlogList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/blogdetail',
      name: 'blogdetail',
      component: () => import(/* webpackChunkName: "about" */ './views/BlogDetail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mice',
      name: 'mice',
      component: () => import(/* webpackChunkName: "about" */ './views/MICE.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/fit',
      name: 'fit',
      component: () => import(/* webpackChunkName: "about" */ './views/FIT.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/travel-service',
      name: 'travelservice',
      component: () => import(/* webpackChunkName: "about" */ './views/TravelService.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import(/* webpackChunkName: "about" */ './views/AboutUs.vue'),
      meta: { requiresAuth: true }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})
export default router