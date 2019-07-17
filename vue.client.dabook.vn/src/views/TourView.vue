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
      <div class="col-12 px-2 d-flex flex-row justify-content-between align-items-center">
        <Datetime id="icheckinout" radius="border-radius-100" placeholder="Dates"></Datetime>
      </div>
    </div>
    <div class="data-section padding-top-100 w-100">
     <TourPromotionSection></TourPromotionSection>
    </div>
    <Navbar v-bind:current="'tour'"></Navbar>
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
import TourPromotionSection from "@/components/TourPromotionSection.vue"

@Component({
  components: {
    Datetime,
    Navbar,
    MainNavBar,
    LocationSearchComponent,
    LanguageComponent,
    ComingSoonComponent,
    TourPromotionSection
  }
})
export default class Promotion extends Vue {
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
