<template>
  <div>
       <CheckBoxGroup class="px-2 pt-4" v-bind:name="'aboutus'" v-bind:data="aboutus" v-bind:icon="'star'" @select="selectItem=$event"></CheckBoxGroup>
    <div class="row text-left p-2" v-if="aboutdetail.length>0">
        <div class="col-12 m-0" v-html="tourDetailByLang.block01">

        </div>
        <div class="col-12 m-0" v-html="tourDetailByLang.block02">

        </div>
        <div class="col-12 m-0" v-html="tourDetailByLang.block03">

        </div>
        <div class="col-12 m-0" v-html="tourDetailByLang.block04">

        </div>
        <div class="col-12 m-0" v-html="tourDetailByLang.block05">

        </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import i18n from "@/i18n";
import AboutUsService from "@/api/AboutUsService";
import BlogService from "@/api/BlogService";
import CheckBoxGroup from "@/components/CheckBoxGroup.vue";

export default {
    components:{
     CheckBoxGroup
    },
  data() {
    return {
      selectItem:"",
  aboutus:[],
  aboutdetail:[]
    };
  },
  mounted() {
    this.initial();
  },
  methods: {
    redirectMain: function() {
      this.$router.push({ path: "main" });
    },
    redirectPromotion: function() {
      this.$router.push({ path: "promotion" });
    },
    changeLocale(locale) {
      i18n.locale = locale;
      this.$router.push({ path: "main" });
    },
    async initial() {
      var response = await AboutUsService.getAllAboutUs();
      response.data.forEach(element => {
          this.aboutus.push({
          value: element._id,
          text: element.aboutUsName,
          isIcon: false
        })
      });
        this.selectItem=this.aboutus[0]
      var detailres=await BlogService.getAllAboutUsBlog();
      this.aboutdetail=detailres.data;
      console.log(this.aboutdetail)
    }
  },
  computed: {
    tourDetailByLang(){
        console.log(this.selectItem)
      var result= this.aboutdetail.filter(item =>{
        return item.lang.toUpperCase()==this.$store.state.currentLang.toUpperCase() &&
        item.blogId.aboutUsId.toUpperCase()==this.selectItem.value.toUpperCase();
      })
      return result[0];
    }}
};
</script>
<style lang="scss">
.welcome-component .ads-banner-img {
  height: 70px;
  color: #fff !important;
}
.ads-banner-component {
  position: relative;
  bottom: 0;
}
.ads-banner-component .card {
  border: none !important;
  overflow: hidden !important;
}
.ads-banner-component .carousel-control-next,
.ads-banner-component .carousel-control-prev {
  position: absolute;
  bottom: 0;
  left: 50%;
  visibility: hidden;
}
.top-brand {
  border-bottom-left-radius: 25%;
  border-bottom-right-radius: 25%;
  height: 30%;
  background: #56ccf2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #2f80ed,
    #56ccf2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #2f80ed,
    #56ccf2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.promotion img {
  height: 100px;
  width: 140px;
}
.promotion .card-text {
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.promotion a {
  color: #fff !important;
}
.promotion .card-img-overlay {
  background: rgb(5, 25, 55); /* Fallback color */
  background: rgba(5, 25, 55, 0.5); /* Black background with 0.5 opacity */
}
.cover-img {
  position: relative;
}
.cover-img::before,
.cover-img::after {
  z-index: 10;
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  background: #111;
  opacity: 1;
}
.welcome-langauge-button img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
