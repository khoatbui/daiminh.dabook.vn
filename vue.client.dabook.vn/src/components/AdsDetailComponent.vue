<template>
  <div>
    <div class="row p-0 m-0" v-if="componentLoaded.adsDetailList">
      <carouselss
        :items="1"
        :autoplay="true"
        :nav="false"
        :dots="false"
        :loop="true"
        class="w-100 m-0 p-0 banner_filter"
      >
        <img
          v-for="(img,i) in adsDetailByLang.adsId.adsImages"
          :key="'iii'+i"
          class="w-100"
          v-bind:src="`/${img.filePath}`"
          :alt="img.fileName"
        />
        <img
          v-if="adsDetailByLang.adsId.adsImages.length==0"
          :key="'iii'+i"
          class="w-100"
          v-bind:class="{'small-loading-img':adsDetailByLang.adsId.adsImages.length==0}"
          v-bind:src="'/img/defaultloading.gif'"
        />
      </carouselss>
    </div>
    <div class="row h-100 p-0 px-4 m-0 text-left"  v-if="componentLoaded.adsDetailList">
      <div class="col-12 p-0 m-0 full-img" v-html="adsDetailByLang.block01"></div>
      <div class="col-12 p-0 m-0 full-img" v-html="adsDetailByLang.block02"></div>
      <div class="col-12 p-0 m-0 full-img" v-html="adsDetailByLang.block03"></div>
      <div class="col-12 p-0 m-0 full-img" v-html="adsDetailByLang.block04"></div>
      <div class="col-12 p-0 m-0 full-img" v-html="adsDetailByLang.block05"></div>
    </div>
    <div class="row h-100 p-0 px-4 pb-4 m-0" v-if="ads.ctaId !=null && componentLoaded.ads">
      <a class="btn btn-sm btn-info w-100 text-white border-radius-100" :href="ads.link">{{ads.ctaId.ctaName}}</a>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import i18n from "@/i18n";
import carouselss from "vue-owl-carousel";
import { Carousel, Slide } from "vue-carousel";
import SkeletonBox from "@/components/SkeletonBox.vue";
import AdsService from "@/api/AdsService";

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
  name: "adsDetailComponent",
  props: {},
  data() {
    return {
      search: "",
      moment: moment,
      componentLoaded: {
        adsList: false,
        adsDetailList: false,
        ads: false
      },
      priceformat: v => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND"
        }).format(v);
      },
      adsList: [],
      adsDetailList: [],
      ads: {},
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
      this.initial(this.$route.query.adsid);
      this.getAdsById(this.$route.query.adsid);
      this.getadsList();
    },
    async initial(id) {
      this.$store.commit("showHideLoading", true);
      const response = await AdsService.getAdsDetailById(id);
      this.adsDetailList = response.data;
      this.$store.commit("showHideLoading", false);
      this.componentLoaded.adsDetailList = true;
    },
    async getAdsById(id) {
      this.$store.commit("showHideLoading", true);
      const response = await AdsService.getAdsById(id);
      this.ads = response.data;
      this.componentLoaded.ads = true;
      this.$store.commit("showHideLoading", false);
    },
    async getadsList() {
      this.$store.commit("showHideLoading", true);
      const response = await AdsService.getAllAds();
      this.adsList = randomArray(response.data);
      this.$store.commit("showHideLoading", false);
      this.componentLoaded.adsList = true;
    },
    redirectToDetailads(des) {
      this.$router.push(`/ads/detail?adsid=${des._id}`);
    },
    changeFilterAction() {
      this.filterCondition.price.isFilter = true;
    },
    resetFilter() {}
  },
  computed: {
    adsListByLang() {
      if (this.componentLoaded.adsList === false) {
        return;
      }
      this.adsList.forEach(element => {
        element.adsIntros.forEach(area => {
          if (area.lang.toUpperCase() === i18n.locale.toUpperCase()) {
            element.adsName = area.adsName;
            element.adsIntro = area.adsIntro;
          }
        });
      });
      return this.adsList;
    },
    adsRelateByLang() {
      if (this.componentLoaded.ads === false) {
        return;
      }
      var that = this;
      return this.adsListByLang.filter(function(adss) {
        return adss.adsTypeId._id == that.ads.adsTypeId._id;
      });
    },
    adsDetailByLang() {
      try {
        if (this.componentLoaded.adsDetailList === false) {
          return;
        }
        var temp = this.adsDetailList.filter(function(adss) {
          return adss.lang.toUpperCase() === i18n.locale.toUpperCase();
        });
        temp.forEach(element => {
          element.adsId.adsIntros.forEach(ads => {
            if (ads.lang.toUpperCase() === i18n.locale.toUpperCase()) {
              element.adsId.adsName = ads.adsName;
              element.adsId.adsIntro = ads.adsIntro;
            }
          });
        });
        return temp[0];
      } catch (error) {}
    },
    pageCount() {
      let l = this.adsList.length,
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
