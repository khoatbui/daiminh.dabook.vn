import Api from '@/api/Api'

var cartype = {
  getCarTypeById(params) {
    console.log(params)
    return Api().get('cartype/m/getcartypebyid/' + params)
  }
}

export default cartype
