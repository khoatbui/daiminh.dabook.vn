import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  iconfont: 'fa'
 })
Vue.config.productionTip = false

import 'babel-polyfill'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
