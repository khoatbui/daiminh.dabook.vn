import Api from '@/api/Api'

var cityservice = {
  getCityDetailById (params) {
    console.log(params)
    return Api().get('city/m/getcitybyid/' + params)
  },

  getAllCity() {
    return Api().get('city/m/gettop10city')
  },
  getCityByAreaContry(){
    return Api().get('city/m/getcitybyareacountry')
  },
  getTop10CityByContry(param){
    return Api().get('city/m/gettop10citybycountry/'+param)
  }
}

export default cityservice
