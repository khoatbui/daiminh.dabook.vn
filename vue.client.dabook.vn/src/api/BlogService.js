import Api from '@/api/Api';

var blogservice = {
  getAllAboutUsBlog () {
    return Api().get('blogdetail/aboutus');
  },
  getAllMICE () {
    return Api().get(`mice`);
  },
  getMICEById (parram) {
    return Api().get(`mice/m/getmicebyid/${parram}`);
  },
  getBlogByMICEId (parram) {
    return Api().get(`bloglist/m/getbloglistbymiceid/${parram}`);
  },
  getAllBlog () {
    return Api().get(`bloglist/getusedblog`);
  },
  getAllHotBlog () {
    return Api().get(`bloglist/getusedhotblog`);
  },
  getAllBlogType () {
    return Api().get(`blogtype/getused`);
  },
  getBlogById (parram) {
    return Api().get(`bloglist/m/getbloglistbyid/${parram}`);
  },
  getBlogByType (parram) {
    return Api().get(`bloglist/m/getbloglistbytypeid/${parram}`);
  },
  getBlogDetailById (parram) {
    return Api().get(`blogdetail/m/getblogdetailbyid/${parram}`);
  }
};

export default blogservice;
