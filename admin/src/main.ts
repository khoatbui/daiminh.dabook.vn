import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import User from './mixins/User';
Vue.use(Vuetify, {
  iconfont: 'fa'
 })
Vue.config.productionTip = false
// inject a handler for `myOption` custom option
Vue.mixin(User)
import 'babel-polyfill'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
