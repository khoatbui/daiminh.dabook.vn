import moment from 'moment'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      login:{
        fullName:"Guest",
        userName:"Guest"
      },
      status:false
    }
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },updateWrongLogin(state,payload){
      state.user.status = payload;
    }
  },
  actions: {
    updateUserAction({ commit }, selectedUser) {
      commit('updateUser', selectedUser)
    },
    updateLoginStatusAction({ commit }, status) {
      commit('updateWrongLogin', status)
    }
  },
  getters : {
    isLoggedIn: state => !!state.user.status,
    authStatus: state => state.user.login,
  }
})
