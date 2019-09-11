import axios from 'axios';

const api = 'http://103.237.144.222:3000';

const Ads = {
  getAllAds() {
    return axios.get(`${api}/adslist/getused`);
  },
  getAllAdsType() {
    return axios.get(`${api}/adstype/getused`);
  },
  getAllAdsByType(parram) {
    return axios.get(`${api}/adslist/m/getadsbytype/${parram}`);
  },
  getAdsDetailById(parram) {
    return axios.get(`${api}/adsdetail/m/getadsdetailbyid/${parram}`);
  },
  getAdsById(parram) {
    return axios.get(`${api}/adslist/m/getadslistbyid/${parram}`);
  },
  getTopAds() {
    return axios.get(`${api}/ads/m/getlistadspromotion`);
  },
  getTopPromotionAdsPackage() {
    return axios.get(`${api}/adslist/m/getalladspromotion`);
  },
};

export default Ads;
