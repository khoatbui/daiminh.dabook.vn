import Api from '@/api/Api'

var travelstyleservice = {
  getAllTravelStyle () {
    return Api().get('travelstyle/')
  }
}

export default travelstyleservice
