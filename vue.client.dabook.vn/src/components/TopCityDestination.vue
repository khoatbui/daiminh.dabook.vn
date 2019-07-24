<template>
  <div class="row pb-4 top-city-destination">
          <div class="col-12 text-left">
            <h6 class="pl-2">
              <b>{{$t("pmain_h6_topcity")}}</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <div class="card m-2 d-inline-block border-0" v-for="city in cities">
                <a @click="assignSearchAndRedirect(city)">
              <img
                class="card-img-top shadow border-radius-100"
               v-bind:src="city.cityImages.length>0?city.cityImages[0].filePath:'img/hotel/roomtype/default.jpg'"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">{{city.cityNameEN}}</p>
              </div>
                </a>
            </div>
          </div>
        </div>
</template>
<script>
import axios from "axios";
import CityService from "@/api/CityService";

export default {
  props: ["rootUrl","showTitle"],
  name: "TopCityDestination",
  created() {
      this.initial();
  },
  methods: {
       async initial() {
      this.$store.commit('showHideLoading',true);
      var response = await CityService.getAllCity();
      this.cities = response.data;
      console.log(this.cities);
      this.$store.commit('showHideLoading',false);
    },
    assignSearchAndRedirect(item){
            console.log(item.cityNameEN);
      this.$store.commit('asignSearchField',item.cityNameEN);
      this.$router.push({
      path:`${this.rootUrl}/?cityid=${item._id}`
    });
    }
  },
  data: function() {
    return {
        cities:[]
    };
  }
};
</script>
<style lang="scss">

</style>
