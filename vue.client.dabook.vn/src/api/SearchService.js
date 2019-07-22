import Api from '@/api/Api';

var hotelservice = {
  getAllBySearch (params) {
    return Api().post('hotel/m/posthotelbysearch/', { keyword: params });
  },
  getHotelBySearch (params) {
    return Api().post('packagehotelrel/m/postpackagebysearch/', { keyword: params });
  },

  getPromotionHotelBySearch (params) {
    return Api().post('packagehotelrel/m/postpromotionpackagebysearch/', {
      keyword: params
    });
  }
};

export default hotelservice;
