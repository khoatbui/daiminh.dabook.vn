import Api from '@/api/Api'

var destinationservice = {
  getDestinationById (params) {
    console.log(params)
    return Api().get('destination/m/getdestinationbyid/' + params)
  },
  getTop10CityByDestination () {
    console.log(params)
    return Api().get('destination/m/gettop10citybydestination/')
  }
}

export default destinationservice
