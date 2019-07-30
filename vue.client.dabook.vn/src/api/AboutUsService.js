import Api from '@/api/Api'

var aboutUsservice = {
  getAllAboutUs () {
    return Api().get('aboutus/')
  }
}

export default aboutUsservice
