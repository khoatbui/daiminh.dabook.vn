import Api from '@/api/Api'

var travelserviceservice = {
  getAllTravelService () {
    return Api().get('travelservice/')
  }
}

export default travelserviceservice
