import Api from '@/api/Api'

var hotelservice = {
  getAllCarPriceByCarTransType (params) {
    console.log(params)
    return Api().get('cardetailprice/m/getallcarpricebycartranstype/' + params)
  },
  getAllCarPriceBySupplier (params) {
    console.log(params)
    return Api().get('cardetailprice/m/getallcarpricebysupplier/' + params)
  },
  getAllCarPricePromotion () {
    return Api().get('cardetailprice/m/getallpromotioncarprice/')
  },

  getAllCarPrice () {
    console.log()
    return Api().get('cardetailprice/m/getallcarprice/')
  },
  getAllCarPriceByCarType (params) {
    console.log(params)
    return Api().get('cardetailprice/m/getallcarpricebycartype/' + params)
  },
  postRequestCar (params) {
    console.log(params)
    return Api().post('mail/m/car-booking/', params)
  }
}

export default hotelservice
