import Api from '@/api/Api'

var hotelservice = {
  getHotelBySupplier (params) {
    return Api().get('hotel/gethotelbysupplier/' + params.id)
  },

  getlisthotelpromotion (params) {
    return Api().post('posts', params)
  },

  getHotelDetailById (params) {
    console.log(params)
    return Api().get('hotel/gethoteldetailbyid/' + params.id)
  }
}

export default hotelservice
