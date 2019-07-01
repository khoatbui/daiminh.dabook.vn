import Api from '@/api/Api'

var orderservice = {
  getHistoryByTransCode (params) {
    console.log(params)
    return Api().get('hotelorder/gethotelbytrans/' + params)
  }
}

export default orderservice
