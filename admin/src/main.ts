import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import User from './mixins/User'
import JsonExcel from 'vue-json-excel'
import Vuex from 'vuex'
import 'es6-promise/auto'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret,faUser)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('downloadExcel', JsonExcel)
Vue.use(Vuetify, {
  iconfont: 'fa'
 })
 Vue.use(Vuex) 
Vue.config.productionTip = false
// inject a handler for `myOption` custom option
Vue.mixin(User)
import 'babel-polyfill'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
