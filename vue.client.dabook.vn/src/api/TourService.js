import Api from '@/api/Api'

var tourservice = {
  getPromoteTourBySupplier (params) {
    console.log(params)
    return Api().get('packagehotelrel/m/getallpromotepackagebysupplier/' + params)
  },
  getAllPackageBySupplier (params) {
    console.log(params)
    return Api().get('packagehotelrel/m/getallpackagebysupplier/' + params)
  },
  getAllTourPromotion () {
    return Api().get('tourlist/m/getalltourpromotion')
  },
  getTop10TourPromotion () {
    return Api().get('tourlist/m/gettop10tourpromotion/')
  },
  getAllTour () {
    console.log()
    return Api().get('tourlist/m/getalltour/')
  },
  getTourDetailById (params) {
    console.log(params)
    return Api().get('tourdetail/m/gettourdetailbyid/' + params)
  },
  postRequestTour (params) {
    console.log(params)
    return Api().post('mail/m/tour-booking/', params)
  }
}

export default tourservice
