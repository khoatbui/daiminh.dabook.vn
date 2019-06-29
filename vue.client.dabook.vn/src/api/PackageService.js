import Api from '@/api/Api'

var hotelservice = {
  getPromotePackageBySupplier (params) {
    console.log(params)
    return Api().get('packagehotelrel/m/getallpromotepackagebysupplier/' + params)
  },
  getAllPackageBySupplier (params) {
    console.log(params)
    return Api().get('packagehotelrel/m/getallpackagebysupplier/' + params)
  },
  getAllPackagePromotion () {
    return Api().get('packagehotelrel/m/getallpromotionpackage/')
  },

  getAllPackage () {
    console.log()
    return Api().get('packagehotelrel/m/getallpackage/')
  },
  getPackageDetail (params) {
    console.log(params)
    return Api().get('packagehotelrel/m/getpackagedetail/' + params)
  },
  postRequestHotel (params) {
    console.log(params)
    return Api().get('packagehotelrel/m/getpackagedetail/' + params)
  }
}

export default hotelservice
