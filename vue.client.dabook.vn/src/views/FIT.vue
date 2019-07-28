/* eslint-disable */
<template>
  <div class="container-fluid main h-100 p-0 m-0 promotion-container text-sm">
    <div class="row w-100 p-0 m-0 pb-3 border-bottom fixed-top bg-white search-section">
      <div class="col-12 p-2">
        <div class="row">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <MainNavBar></MainNavBar>
          </div>
          <div class="col-8">
            <LocationSearchComponent></LocationSearchComponent>
          </div>
          <div class="col-2">
            <LanguageComponent></LanguageComponent>
          </div>
        </div>
      </div>
    </div>
    <div class="data-section margin-top-130 w-100">
     <AreaSectionHorizontal></AreaSectionHorizontal>
     <Top10CityByCountrySectionHorizontal v-bind:countryId="'5d2955c872cb0e0df0fc7822'"></Top10CityByCountrySectionHorizontal>
          <Top10CityByCountrySectionHorizontal v-bind:countryId="'5d29569f2455e216e89330e0'"></Top10CityByCountrySectionHorizontal>
      <div class="col-12">
        <div class="row pb-4 ads-section">
          <div class="col-12 p-0 scroll-ngang">
            <div class="card text-white text-left border-0">
              <img src="/img/promotion/ads/korea02.jpg" class="card-img" alt="..." />
            </div>
          </div>
        </div>
      </div>
      <HotelTop10PromotionSectionHorizontal></HotelTop10PromotionSectionHorizontal>
      <div class="col-12">
        <div class="row pb-4 ads-section">
          <div class="col-12 p-0 scroll-ngang">
            <div class="card text-white text-left border-0">
              <img src="/img/promotion/ads/airasia.jpg" class="card-img" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Navbar v-bind:current="'home'"></Navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Datetime from "@/components/Datetime2.vue"; // @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import MainNavBar from "@/components/MainNavBar.vue";
import LocationSearchComponent from "@/components/LocationSearchComponent.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";
import ComingSoonComponent from "@/components/ComingSoon.vue";
import TourPromotionSection from "@/components/TourPromotionSection.vue";
import HotelTop10PromotionSectionHorizontal from "@/components/HotelTop10PromotionSectionHorizontal.vue";
import AreaSectionHorizontal from "@/components/AreaSectionHorizontal.vue";
import Top10CityByCountrySectionHorizontal from "@/components/Top10CityByCountrySectionHorizontal.vue";

@Component({
  components: {
    Datetime,
    Navbar,
    MainNavBar,
    LocationSearchComponent,
    LanguageComponent,
    ComingSoonComponent,
    TourPromotionSection,
    HotelTop10PromotionSectionHorizontal,
    AreaSectionHorizontal,
    Top10CityByCountrySectionHorizontal
  }
})
export default class Destination extends Vue {
  naviBack() {
    this.$router.go(-1);
  }
  redirectToPromotionAll() {
    this.$router.push({ path: "promotionall" });
  }
}
</script>
<style >
</style>
