import Api from '@/api/Api'

var destinationservice = {
  getDestinationById (params) {
    console.log(params)
    return Api().get('destination/m/getdestinationbyid/' + params)
  }
}

export default destinationservice
