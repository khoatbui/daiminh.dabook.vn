import Api from '@/api/Api'

var areaservice = {
  getAllArea () {
    return Api().get('area/')
  }
}

export default areaservice
