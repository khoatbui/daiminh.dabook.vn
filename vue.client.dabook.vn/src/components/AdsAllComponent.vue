//src/components/Navbar.vue
<template>
  <div class="ads-all">
    <div class="row m-0 p-0">
      <div class="col-12 m-0 p-2">
        <div class="card ads-card shadow my-2" v-for="(ads,i) in adsListByLang" :key="'asds'+i">
          <img
              v-bind:src="ads.adsImages.length>0?`/${ads.adsImages[0].filePath}`:'/img/hotel/roomtype/default.jpg'"
              class="card-img-top d-block border-radius-5 w-100 cursor-pointer"
              :alt="ads.adsName"
               @click="redirectToDetailAds(ads)"
            />
          <div class="card-body text-left">
            <h5 class="card-title">{{ads.adsName}}</h5>
            <p class="card-text one-line w-90" v-html="ads.adsIntro"></p>
            <p class="card-text"><span>{{moment(ads.createDate).format('YYYY-DD-MM')}}</span> / {{ads.createBy}}</p>
            <p class="d-flex justify-content-between align-items-center mb-0">
              <span class="bg-danger text-white font-bold text-left p-2 border-radius-100">{{moment(ads.endDate).diff(moment(), 'days')>0?`${moment(ads.endDate).diff(moment(), 'days')} days left`:'End'}}</span>
              <a  @click="redirectToDetailAds(ads)" class="text-info text-x1">Read more</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import i18n from "@/i18n";
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
  name: "AdsAllComponent",
  props: {},
  data() {
    return {
      search: "",
      moment: moment,
      componentLoaded: {
        adsList: false,
        adsTypeList: false
      },
      priceformat: v => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND"
        }).format(v);
      },
      adsList: [],
      adsTypeList: [],
      filterCondition: {
        adsTypeList: {
          filterAdsTypeList: [],
          isFilter: false
        },
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
      this.initial();
      this.getAdsType();
    },
    async initial() {
      this.$store.commit("showHideLoading", true);
      const response = await AdsService.getAllAds();
      this.adsList = randomArray(response.data);
      console.log(this.adsList);
      this.$store.commit("showHideLoading", false);
      this.componentLoaded.adsList = true;
    },
    async getAdsType() {
      this.$store.commit("showHideLoading", true);
      const response = await AdsService.getAllAdsType();
      this.adsTypeList = randomArray(response.data);
      this.$store.commit("showHideLoading", false);
      this.componentLoaded.adsTypeList = true;
    },
    redirectToDetailAds(des) {
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
    adsTypeListByLang() {
      return this.adsTypeList;
    },
    pageCount() {
      let l = this.adsList.length,
        s = this.size;
      return Math.ceil(l / s);
    }
  }
};
</script>
<style lang="scss" scoped>
.ads-card{
  overflow: hidden;
}
</style>
