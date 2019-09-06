<template>
  <div>
    <div class="row m-0 p-0">
      <div class="col-6 p-1">
        <div class="card my-2" v-for="(blog,i) in blogListByLang.slice(0,blogListByLang.length/2)" :key="'teml'+i" @click="redirectToDetailBlog(blog)">
          <div class="card-body position-relative m-0 p-0">
            <img
              v-bind:src="blog.blogImages.length>0?`/${blog.blogImages[0].filePath}`:'/img/hotel/roomtype/default.jpg'"
              class="d-block border-radius-5 w-100 cursor-pointer"
              :alt="blog.blogName"
            />
             <div class="w-100 m-0 p-1 card-body-bottom-left">
              <p class="w-90">{{blog.blogName}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 p-1">
        <div class="card my-2" v-for="(blog,i) in blogListByLang.slice(blogListByLang.length/2,blogListByLang.length)" :key="'teml'+i" @click="redirectToDetailBlog(blog)">
          <div class="card-body position-relative m-0 p-0">
            <img
              v-bind:src="blog.blogImages.length>0?`/${blog.blogImages[0].filePath}`:'/img/hotel/roomtype/default.jpg'"
              class="d-block border-radius-5 w-100 cursor-pointer"
              :alt="blog.blogName"
            />
            <div class="w-100 m-0 p-1 card-body-bottom-left">
              <p class="w-90">{{blog.blogName}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Navbar v-bind:current="'home'"></Navbar>
  </div>
</template>
<script>
function randomArray(array) {
  const array2 = [];
  while (array.length !== 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    array2.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return array2;
}
import axios from "axios";
import i18n from "@/i18n";
import BlogService from "@/api/BlogService.js";
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      blogList: [],
      componentLoaded: {
        blogList: false
      }
    };
  },
  created() {
    console.log("go toblog");
    this.initial();
  },
  methods: {
    async initial() {
      console.log("aa");
      this.$store.commit("showHideLoading", true);
      const response = await BlogService.getAllBlog();
      this.blogList = randomArray(response.data);
      console.log(this.blogList);
      this.$store.commit("showHideLoading", false);
      this.componentLoaded.blogList = true;
    },
    redirectMain: function() {
      this.$router.push({ path: "main" });
    },
    redirectPromotion: function() {
      this.$router.push({ path: "promotion" });
    },
    redirectToDetailBlog(des) {
      this.$router.push(`/blog/detail?blogid=${des._id}`);
    },
    changeLocale(locale) {
      i18n.locale = locale;
      this.$router.push({ path: "main" });
    },
  },
  computed: {
    blogListByLang() {
      return this.blogList;
    }
  }
};
</script>
<style lang="scss">
.w-90{
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
}
.pinterest-layout{
    min-height: 100vh;
    height: 100vh;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: flex-start;
}
.position-relative{
  overflow: hidden;
}
.position-relative::after,.position-relative::before{
    position: absolute;
    bottom:0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-image: linear-gradient(0deg, #111 0%, #111 100%);
    z-index: 2;
    opacity: 0.15;
}
.card-body-bottom-left{
    position:absolute;
    bottom: 10px;
    left: 0px;
    color: #FFFFFF;
    z-index: 4;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
