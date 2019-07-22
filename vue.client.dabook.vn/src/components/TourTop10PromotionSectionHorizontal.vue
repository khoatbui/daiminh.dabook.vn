To//src/components/Navbar.vue
<template>
  <div class="row px-0 mx-0 pb-4 hot-destination">
          <div class="col-12 px-0 mx-0 text-left">
            <h6 class="pl-2">
              <b>{{$t("pmain_h6_recomendforyou")}}</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang px-0 mx-0">
            <div class="card m-2 text-white d-inline-block shadow-box" v-for="pac in tourlist">
              <a v-bind:href="`/promotiondetail?packagetourrelid=${pac._id}`">
              <img  v-bind:src="pac.tourImages.length>0?pac.tourImages[0].filePath:'img/tour/roomtype/default.jpg'" class="card-img  overlay-img" alt="...">
              <div class="card-img-overlay">
                <h5 class="card-title text-white text-uppercase text-ssm hidden-outof-text">{{pac.tourName}}</h5>
                <h6 class="card-title text-white text-sm hidden-outof-text">from {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pac.price) }}</h6>
              </div>
              </a>
            </div>
          </div>
        </div>
</template>
<script>
import TourService from "@/api/TourService";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent
  },
  name: "TourTop10PromotionSectionHorizontal",
  props: ["current","showTitle"],
  data() {
    return {
      tourlist: [],
      isLoadding: false
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      this.$store.commit('showHideLoading',true);
      var response = await TourService.getTop10TourPromotion();
      this.tourlist = randomArray(response.data);
      console.log(this.tourlist);
      this.$store.commit('showHideLoading',false);
    }
  },
  computed: {
  }
};

function randomArray(array){
        let array2=[];
        while(array.length!==0){
        let randomIndex=Math.floor(Math.random()*array.length);
        array2.push(array[randomIndex]);
        array.splice(randomIndex,1);
        }
        return array2;
    }
</script>
<style lang="scss" scoped>
.hot-destination .card-img {
  height: 100px;
  width: 140px;
}
</style>
