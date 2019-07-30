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
     <div class="row p-0 m-0 hidden-background">
      <img src="/img/general/travelstyle.jpg" alt="" class="w-100 h-100 m-0 p-0">
      <h4 class="hidden-bg-text">Travel Style</h4>
      </div>
    <div class="data-section margin-top-330 w-100">
      <router-view></router-view>
            <AdsSectionHorizontal></AdsSectionHorizontal>
      <HotelTop10PromotionSectionHorizontal></HotelTop10PromotionSectionHorizontal>
            <AdsSectionHorizontal></AdsSectionHorizontal>
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
import AdsSectionHorizontal from "@/components/AdsSectionHorizontal.vue"


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
    AdsSectionHorizontal
  }
})
export default class TravelStyle extends Vue {
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
