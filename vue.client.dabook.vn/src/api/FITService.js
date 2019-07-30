import Api from '@/api/Api'

var fitservice = {
  getAllFIT () {
    return Api().get('fit/getUsed')
  },
  getFITById (parram) {
    return Api().get('fit/m/getfitbyid/'+parram)
  }
}

export default fitservice
