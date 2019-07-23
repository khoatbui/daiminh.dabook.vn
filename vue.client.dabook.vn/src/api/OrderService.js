import Api from '@/api/Api';

var orderservice = {
  getHistoryByTransCode (params) {
    console.log(params);
    return Api().get('hotelorder/gethotelbytrans/' + params);
  },
  getCarHistoryByTransCode (params) {
    console.log(params);
      return Api().get('carorder/getcarbytrans/' + params);
  },
  getTourHistoryByTransCode (params) {
       return Api().get('tourorder/gettourbytrans/' + params);
  }
};

export default orderservice;
