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
  getAllTourBySearch (search) {
    console.log()
    return Api().post('tourlist/m/getalltourbysearch/',{ 'keyword': search })
  },
  getAllTourByCity (city) {
    console.log()
    return Api().get('tourlist/m/getalltourbycity/'+city)
  },
  getTourByStyle (style) {
    console.log()
    return Api().get('tourlist/m/gettourbytravelstyle/'+style)
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
