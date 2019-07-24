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
  getTop10PackagePromotion () {
    return Api().get('packagehotelrel/m/gettop10promotionpackage/')
  },
  getAllPackage () {
    console.log()
    return Api().get('packagehotelrel/m/getallpackage/')
  },
  getAllPackageByLocationTime (search,from,to) {
    console.log(search)
    return Api().post('packagehotelrel/m/postpackagebysearch/', { 'keyword': search });
  },
   getAllPackageByCity (city) {
    console.log(city)
    return Api().get('packagehotelrel/m/getallpackagebycity/'+city);
  },
  getPackageDetail (params) {
    console.log(params)
    return Api().get('packagehotelrel/m/getpackagedetail/' + params)
  },
  postRequestHotel (params) {
    console.log(params)
    return Api().post('mail/m/hotel-booking/', params)
  }
}

export default hotelservice
