import Api from '@/api/Api'

var blogservice = {
  getAllBlog () {
    return Api().get('blog/')
  },
  getAllAboutUsBlog () {
    return Api().get('blogdetail/aboutus')
  }
}

export default blogservice
