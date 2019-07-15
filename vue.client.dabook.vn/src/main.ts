import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faCoffee,faSearchLocation,faChevronRight,faChevronLeft,faChevronDown,faPlus,faMinus,faStar,faAngleDoubleRight,faAngleDoubleLeft,faBed,faWifi,faSwimmingPool,faTimes,faCar,faUmbrellaBeach,faHotel, faAlignLeft,faBarcode,faCloudSun,faTv,faUtensils,faDumbbell,faArrowLeft,faCartPlus,faClock,faSearch,faExclamationCircle,faCarSide,faArrowDown,faRulerCombined,faTruckPickup,faPaintRoller,faFileSignature,faPhone,faPlaneDeparture} from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUserCircle as farUserCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import i18n from './i18n'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)
library.add(faAlignLeft,faUserSecret,faCoffee,faSearchLocation,farUserCircle,faChevronRight,faChevronLeft,faChevronDown,faPlus,faMinus,faStar,faAngleDoubleRight,faAngleDoubleLeft,faBed,faWifi,faSwimmingPool,faTimes,faCar,faUmbrellaBeach,faHotel,faBarcode,faCloudSun,faTv,faUtensils,faDumbbell,faArrowLeft,faCartPlus,faClock,faSearch,faExclamationCircle,faCarSide,faArrowDown,faRulerCombined,faTruckPickup,faPaintRoller,faFileSignature,faPhone,faPlaneDeparture)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
