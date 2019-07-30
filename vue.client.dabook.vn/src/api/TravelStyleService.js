import Api from '@/api/Api'

var travelstyleservice = {
  getAllTravelStyle () {
    return Api().get('travelstyle/getUsed')
  },
  getTravelStyleById (parram) {
    return Api().get('travelstyle/m/gettravelstylebyid/'+parram)
  }
}

export default travelstyleservice
