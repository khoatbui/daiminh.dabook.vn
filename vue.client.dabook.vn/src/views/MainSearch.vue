<template>
  <div class="container-fluid main h-100 p-0 m-0 text-sm">
    <div class="row w-100 p-0 m-0 pb-3 border-bottom fixed-top bg-white search-section">
      <div class="col-12 p-2">
        <div class="row">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <MainNavBar></MainNavBar>
          </div>
          <div class="col-8">
            <LocationSearchComponent v-bind:searchtype="'PROMOTION_HOTEL'"></LocationSearchComponent>
          </div>
          <div class="col-2">
            <LanguageComponent></LanguageComponent>
          </div>
        </div>
      </div>
      <div class="col-12 px-2 d-flex flex-row justify-content-between align-items-center">
        <Datetime id="icheckinout" radius="border-radius-100" :placeholder="$t('search_date')"></Datetime>
        <GuestSelect></GuestSelect>
      </div>
    </div>
    <div class="data-section margin-top-130">
      <div class="row m-0 p-0">
        <div class="col-12">
          <div class="m-2 text-left">
            <h4>
              <b>{{searchStore.locationSearch.length==0?"All hotel promotion":`${searchStore.locationSearch} 'hotel`}}</b>
            </h4>
          </div>
        </div>
        <div class="col-12">
          <HotelSearchSection v-bind:showTitle="false"></HotelSearchSection>
        </div>
        <div class="col-12">
          <div class="row pb-4 ads-section">
            <div class="col-12 p-0 scroll-ngang">
              <div class="card text-white text-left border-0">
                <img src="/img/promotion/ads/korea02.jpg" class="card-img" alt="..." />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="m-2 text-left">
            <h4>
              <b>{{searchStore.locationSearch.length==0?"All car promotion":searchStore.locationSearch}}</b>
            </h4>
          </div>
        </div>
        <div class="col-12">
          <CarSearchSection v-bind:showTitle="false"></CarSearchSection>
        </div>
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
    </div>
    <Navbar v-bind:current="'main'"></Navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Datetime from "@/components/Datetime2.vue"; // @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import GuestSelect from "@/components/GuestSelect.vue";
import MainNavBar from "@/components/MainNavBar.vue";
import LocationSearchComponent from "@/components/LocationSearchComponent.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";
import HotelSearchSection from "@/components/HotelSearchSection.vue";
import CarSearchSection from "@/components/CarSearchSection.vue";

@Component({
  components: {
    Datetime,
    Navbar,
    GuestSelect,
    MainNavBar,
    LocationSearchComponent,
    LanguageComponent,
    HotelSearchSection,
    CarSearchSection
  }
})
export default class Main extends Vue {
  get searchStore() {
    return this.$store.state.search;
  }
}
</script>
<style scoped>
.main-section {
  background-color: #ffffff;
  height: 100%;
  box-sizing: border-box;
}
.scroll-ngang {
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  white-space: nowrap;
}
.scroll-ngang::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.top-destination img {
  height: 100px;
  width: 140px;
}
.top-destination .card-text {
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-img-overlay > h6 {
  font-size: 0.8rem;
}
.card-img-overlay > h5 {
  font-size: 1.1rem;
}
.card-img-overlay > a,
.card-img-overlay > a:active,
.card-img-overlay > a:hover,
.card-img-overlay > a:visited {
  color: #fff;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}

.hot-destination .card-img {
  height: 100px;
  width: 140px;
}
.link,
.link:hover,
.link:active,
.link:focus {
  color: #fff !important;
  text-decoration: none !important;
}
</style>
