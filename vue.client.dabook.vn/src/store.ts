import moment from 'moment'
import Vue from 'vue'
import Vuex from 'vuex'
import { start } from 'repl';
import { pathToFileURL } from 'url';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedHotel: {
      guest: {
        adult: {
          name: 'adult',
          qty: 0
        },
        children: {
          less4: {
            name: 'less4',
            qty: 0
          },
          less12: {
            name: 'less12',
            qty: 0
          }
        },
        golfer:{
          golfer:{
            name:'golfer',
            qty:0
          },
          nongolfer:{
            name:'nongolfer',
            qty:0
          }
        }
      },
      package: {
        priceRanges: [{
          startDate: '',
          endDate: ''
        }]
      },
      priceByTime: {
        price: 0,
        diffTime: 0,
        smallPrice: 0,
        avgPrice: 0,
        avgChild: 0
      },
      selectOptionService:{
        selectedOption:[],
        totalPrice:0
      },
      totalPrice:0
    },
    selectDate: {
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
    },
    customer:{
      fullName:'',
      email:'',
      phone:'',
      question:''
    },
    search:{
      isSearch:false,
      historySearch:"",
      locationSearch:"",
      searchResult:[]
    },
    loading:{
      isShow:false
    }
  },
  mutations: {
    plusAdult (state) {
      state.selectedHotel.guest.adult.qty=state.selectedHotel.guest.adult.qty+1
    },
    minusAdult (state) {
      state.selectedHotel.guest.adult.qty=state.selectedHotel.guest.adult.qty-1
    },
    plusChildLess4 (state) {
      state.selectedHotel.guest.children.less4.qty=state.selectedHotel.guest.children.less4.qty+1
    },
    minusChildLess4 (state) {
      state.selectedHotel.guest.children.less4.qty=state.selectedHotel.guest.children.less4.qty-1
    },
    plusChildLess12 (state) {
      state.selectedHotel.guest.children.less12.qty=state.selectedHotel.guest.children.less12.qty+1
    },
    minusChildLess12 (state) {
      state.selectedHotel.guest.children.less12.qty=state.selectedHotel.guest.children.less12.qty-1
    },
    selectDate (state, payload) {
      state.selectDate.startDate = payload.startDate
      state.selectDate.endDate = payload.endDate
    },
    updateselectedHotelDetail (state, payload) {
      state.selectedHotel.package = payload
    },
    updateSelectedPriceByTime (state) {
      var totalPrice = 0
      var diffTime = 0
      var avgPrice = 0
      var avgChild = 0
      var detailPriceByRange: any =[]
      var startSelectDate = moment(state.selectDate.startDate, 'YYYY-MM-DD')
      var endSelectDate = moment(state.selectDate.endDate, 'YYYY-MM-DD')
      var priceRange = state.selectedHotel.package.priceRanges
      priceRange.forEach(element => {
        var startDate = moment(element.startDate, 'YYYY-MM-DD')
        var endDate = moment(element.endDate, 'YYYY-MM-DD')
        if (startDate.isSameOrBefore(startSelectDate, 'days') && endDate.isSameOrAfter(startSelectDate, 'days')) {
          if (endDate.isSameOrBefore(endSelectDate, 'days')) {
            detailPriceByRange.push({
              start: startSelectDate,
              end: endDate,
              price: element,
              diff: endDate.diff(startSelectDate, 'days')
            })
          } else if (endDate.isSameOrAfter(endSelectDate, 'days')) {
            detailPriceByRange.push({
              start: startSelectDate,
              end: endSelectDate,
              price: element,
              diff: endSelectDate.diff(startSelectDate, 'days')

            })
          } else if (endDate.isSameOrBefore(startSelectDate, 'days')) {

          }
        } else if (startDate.isSameOrAfter(startSelectDate, 'days') && startDate.isSameOrBefore(endSelectDate, 'days')) {
          if (endDate.isSameOrBefore(endSelectDate, 'days')) {
            detailPriceByRange.push({
              start: startDate,
              end: endDate,
              price: element,
              diff: endDate.diff(startDate, 'days')

            })
          } else if (endDate.isSameOrAfter(endSelectDate, 'days')) {
            detailPriceByRange.push({
              start: startDate,
              end: endSelectDate,
              price: element,
              diff: endSelectDate.diff(startDate, 'days')

            })
          } else if (endDate.isSameOrBefore(startSelectDate, 'days')) {

          }
        } else {

        }
      })
      detailPriceByRange.forEach((element: any ) => {
        if (element.price.markUpPercent !== 0) {
          totalPrice = totalPrice +
            element.diff * element.price.price * element.price.markUpPercent +
            element.price.markUpPlus +
            element.diff * state.selectedHotel.guest.children.less12.qty * element.price.less12Price +
            element.diff * state.selectedHotel.guest.children.less4.qty * element.price.less4Price

            avgPrice += element.diff * element.price.price * element.price.markUpPercent +
            element.price.markUpPlus

            avgChild += element.diff * state.selectedHotel.guest.children.less12.qty * element.price.less12Price +
            element.diff * state.selectedHotel.guest.children.less4.qty * element.price.less4Price
        } else {
          totalPrice = totalPrice +
            element.diff * element.price.price +
            element.price.markUpPlus +
            element.diff * state.selectedHotel.guest.children.less12.qty * element.price.less12Price +
            element.diff * state.selectedHotel.guest.children.less4.qty * element.price.less4Price

            avgChild += element.diff * state.selectedHotel.guest.children.less12.qty * element.price.less12Price +
            element.diff * state.selectedHotel.guest.children.less4.qty * element.price.less4Price

            avgPrice += element.diff * element.price.price +
            element.price.markUpPlus
        }
        diffTime += element.diff
      })
      state.selectedHotel.priceByTime = {
        price: totalPrice,
        diffTime: diffTime,
        smallPrice: avgPrice / diffTime,
        avgPrice: avgPrice,
        avgChild: avgChild
      }
    },
    updateCustomerInfo(state,payload){
      state.customer=payload;
    },
    updateSelectOptionService(state,payload){
      state.selectedHotel.selectOptionService=payload;
    },
    updateTotalPrice(state){
      state.selectedHotel.totalPrice=state.selectedHotel.selectOptionService.totalPrice + state.selectedHotel.priceByTime.price;
    },
    updateHistorySearch(state,payload){
      state.search.historySearch=payload;
    },
    asignSearchResult(state,payload){
      state.search.searchResult=payload;
    },
    showHideLoading(state,payload){
      state.loading.isShow=payload;
    }
  },
  actions: {
    updateselectedHotelDetailAction ({ commit }, selectedHotelpackage) {
      commit('updateselectedHotelDetail', selectedHotelpackage)
      commit('updateSelectedPriceByTime')
      commit('updateTotalPrice')
    },
    updateSelectOptionService({commit},selectedOptionService){
      commit('updateSelectOptionService',selectedOptionService)
      commit('updateSelectedPriceByTime')
      commit('updateTotalPrice')
    },
    updateSelectDate({commit},selectDate){
      commit('selectDate',selectDate)
      commit('updateSelectedPriceByTime')
      commit('updateTotalPrice')
    },
    updateGuest({commit},action){
      commit(action)
      commit('updateSelectedPriceByTime')
      commit('updateTotalPrice')
    }
  }
})
