import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faCoffee,faSearchLocation,faChevronRight,faChevronLeft,faPlus,faMinus,faStar,faAngleDoubleRight,faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUserCircle as farUserCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

library.add(faUserSecret,faCoffee,faSearchLocation,farUserCircle,faChevronRight,faChevronLeft,faPlus,faMinus,faStar,faAngleDoubleRight,faAngleDoubleLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
