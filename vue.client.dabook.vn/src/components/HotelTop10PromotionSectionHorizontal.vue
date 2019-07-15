To//src/components/Navbar.vue
<template>
  <div class="row pb-4 hot-destination">
          <div class="col-12 text-left">
            <h6 class="pl-2">
              <b>{{$t("pmain_h6_recomendforyou")}}</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <div class="card m-2 text-white d-inline-block shadow-box overlay-img" v-for="pac in packagelist">
              <a v-bind:href="`/promotiondetail?packagehotelrelid=${pac._id}`">
              <img  v-bind:src="pac.roomTypeId.roomImages.length>0?pac.roomTypeId.roomImages[0].filePath:'img/hotel/roomtype/default.jpg'" class="card-img" alt="...">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase text-ssm hidden-outof-text">{{pac.hotelId.hotelName}}</h5>
                <h6 class="card-title text-sm hidden-outof-text">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pac.price) }} per night</h6>
              </div>
              </a>
            </div>
          </div>
        </div>
</template>
<script>
import HotelService from "@/api/HotelService";
import PackageService from "@/api/PackageService";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent
  },
  name: "HotelTop10PromotionSectionHorizontal",
  props: ["current","showTitle"],
  data() {
    return {
      packagelist: [],
      isLoadding: false
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      this.$store.commit('showHideLoading',true);
      var response = await PackageService.getAllPackagePromotion();
      this.packagelist = randomArray(response.data);
      console.log(this.packagelist);
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
