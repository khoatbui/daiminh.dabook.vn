<template>
  <div>
    <div class="row p-0 m-0">
      <carouselss
        :items="1"
        :autoplay="true"
        :nav="false"
        :dots="false"
        :loop="true"
        class="w-100 m-0 p-0 banner_filter"
      >
        <img
          v-for="(img,i) in blogDetailByLang.blogId.blogImages"
          :key="'iii'+i"
          class="w-100"
          v-bind:src="`/${img.filePath}`"
          :alt="img.fileName"
        />
        <img
          v-if="blogDetailByLang.blogId.blogImages.length==0"
          :key="'iii'+i"
          class="w-100"
          v-bind:class="{'small-loading-img':blogDetailByLang.blogId.blogImages.length==0}"
          v-bind:src="'/img/defaultloading.gif'"
        />
      </carouselss>
    </div>
    <div class="row h-100 p-0 px-4 m-0 text-left">
      <div class="col-12 p-0 m-0 full-img" v-html="blogDetailByLang.block01"></div>
      <div class="col-12 p-0 m-0 full-img" v-html="blogDetailByLang.block02"></div>
      <div class="col-12 p-0 m-0 full-img" v-html="blogDetailByLang.block03"></div>
      <div class="col-12 p-0 m-0 full-img" v-html="blogDetailByLang.block04"></div>
      <div class="col-12 p-0 m-0 full-img" v-html="blogDetailByLang.block05"></div>
    </div>
    <div class="row h-100 p-0 px-4 pb-4 m-0" v-if="blog.ctaId !=null && componentLoaded.blog">
      <a class="btn btn-sm btn-info w-100 text-white border-radius-100" :href="blog.link">{{blog.ctaId.ctaName}}</a>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import i18n from "@/i18n";
import carouselss from "vue-owl-carousel";
import { Carousel, Slide } from "vue-carousel";
import SkeletonBox from "@/components/SkeletonBox.vue";
import BlogService from "@/api/BlogService";

function randomArray(array) {
  const array2 = [];
  while (array.length !== 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    array2.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return array2;
}

export default {
  components: {
    carouselss,
    Carousel,
    Slide
  },
  name: "BlogDetailComponent",
  props: {},
  data() {
    return {
      search: "",
      moment: moment,
      componentLoaded: {
        blogList: false,
        blogDetailList: false,
        blog: false
      },
      priceformat: v => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND"
        }).format(v);
      },
      blogList: [],
      blogDetailList: [],
      blog: {},
      filterCondition: {
        sortBy: ""
      },
      pageNumber: 1,
      size: 10
    };
  },
  created() {
    this.initialAll();
  },
  methods: {
    initialAll() {
      this.initial(this.$route.query.blogid);
      this.getBlogById(this.$route.query.blogid);
      this.getBlogList();
    },
    async initial(id) {
      this.$store.commit("showHideLoading", true);
      const response = await BlogService.getBlogDetailById(id);
      this.blogDetailList = response.data;
      this.$store.commit("showHideLoading", false);
      this.componentLoaded.blogDetailList = true;
    },
    async getBlogById(id) {
      this.$store.commit("showHideLoading", true);
      const response = await BlogService.getBlogById(id);
      this.blog = response.data;
      this.componentLoaded.blog = true;
      this.$store.commit("showHideLoading", false);
    },
    async getBlogList() {
      this.$store.commit("showHideLoading", true);
      const response = await BlogService.getAllBlog();
      this.blogList = randomArray(response.data);
      this.$store.commit("showHideLoading", false);
      this.componentLoaded.blogList = true;
    },
    redirectToDetailBlog(des) {
      this.$router.push(`/blog/detail?blogid=${des._id}`);
    },
    changeFilterAction() {
      this.filterCondition.price.isFilter = true;
    },
    resetFilter() {}
  },
  computed: {
    blogListByLang() {
      if (this.componentLoaded.blogList === false) {
        return;
      }
      this.blogList.forEach(element => {
        element.blogIntros.forEach(area => {
          if (area.lang.toUpperCase() === i18n.locale.toUpperCase()) {
            element.blogName = area.blogName;
            element.blogIntro = area.blogIntro;
          }
        });
      });
      return this.blogList;
    },
    blogRelateByLang() {
      if (this.componentLoaded.blog === false) {
        return;
      }
      var that = this;
      return this.blogListByLang.filter(function(blogs) {
        return blogs.blogTypeId._id == that.blog.blogTypeId._id;
      });
    },
    blogDetailByLang() {
      try {
        if (this.componentLoaded.blogDetailList === false) {
          return;
        }
        var temp = this.blogDetailList.filter(function(blogs) {
          return blogs.lang.toUpperCase() === i18n.locale.toUpperCase();
        });
        temp.forEach(element => {
          element.blogId.blogIntros.forEach(blog => {
            if (blog.lang.toUpperCase() === i18n.locale.toUpperCase()) {
              element.blogId.blogName = blog.blogName;
              element.blogId.blogIntro = blog.blogIntro;
            }
          });
        });
        return temp[0];
      } catch (error) {}
    },
    pageCount() {
      let l = this.blogList.length,
        s = this.size;
      return Math.ceil(l / s);
    }
  },
  watch: {
    $route: "initialAll"
  }
};
</script>
<style lang="scss">
</style>
