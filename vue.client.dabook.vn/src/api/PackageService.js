import Api from '@/api/Api'

var hotelservice = {
  getPackageBySupplier (params) {
    return Api().get('hotel/gethotelbysupplier/' + params.id)
  },

  getAllPackagePromotion () {
    return Api().get('packagehotelrel/m/getallpromotionpackage/')
  },

  getAllPackage () {
    console.log()
    return Api().get('packagehotelrel/m/getallpackage/')
  }
}

export default hotelservice
