import Api from '@/api/Api'

var travelserviceservice = {
  getAllTravelService () {
    return Api().get('travelservice/getUsed')
  },
  getTravelServiceById (parram) {
    return Api().get('travelservice/m/gettravelservicebyid/'+parram)
  }
}

export default travelserviceservice
