import Api from '@/api/Api'

var countryservice = {
  getCountryDetailById (params) {
    console.log(params)
    return Api().get('country/m/getcountrybyid/' + params)
  },

  getAllCountry() {
    return Api().get('country/m/gettop10country')
  },
  getCountryByArea(){
    return Api().get('country/m/getcountrybyareaarea')
  },
  getTop10CountryByArea(param){
    return Api().get('country/m/gettop10countrybyarea/'+param)
  }
}

export default countryservice
