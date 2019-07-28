To//src/components/Navbar.vue
<template>
  <div class="row px-0 mx-0 pb-4 hot-destination">
          <div class="col-12 text-left px-0 mx-0 ">
            <h6 class="pl-2">
              <b>{{citylist[0].countryId.countryNameEN}}</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang px-0 mx-0 ">
            <div class="card m-2 text-white d-inline-block shadow-box" v-for="pac in citylist">
              <a v-bind:href="`/promotiondetail?packagehotelrelid=${pac._id}`">
              <img  v-bind:src="pac.cityImages.length>0?pac.cityImages[0].filePath:'img/hotel/roomtype/default.jpg'" class="card-img  overlay-img" alt="...">
              <div class="card-img-overlay">
                <h5 class="card-title text-white text-uppercase text-ssm hidden-outof-text">{{pac.cityNameEN}}</h5>
              </div>
              </a>
            </div>
          </div>
        </div>
</template>
<script>
import DestinationService from "@/api/DestinationService";
import CityService from "@/api/CityService";
import PackageService from "@/api/PackageService";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent
  },
  name: "Top10CityByDestinationSectionHorizontal",
  props: ["current","showTitle","countryId"],
  data() {
    return {
      citylist: [],
      isLoadding: false
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      this.$store.commit('showHideLoading',true);
      var response = await CityService.getTop10CityByContry(this.countryId);
      this.citylist = randomArray(response.data);
      console.log('city');
      console.log(this.citylist);
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
