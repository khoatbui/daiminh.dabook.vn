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
      <div
        class="col-12 px-2 d-flex flex-row justify-content-between align-items-center scroll-ngang"
      >
        <Datetime id="icheckinout" radius="border-radius-100" :placeholder="$t('search_date')"></Datetime>
        <GuestSelect></GuestSelect>
        <FilterHotel></FilterHotel>
      </div>
    </div>
    <div class="data-section">
      <HotelAllSection></HotelAllSection>
    </div>
    <Navbar v-bind:current="'hotel'"></Navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Datetime from "@/components/Datetime2.vue"; // @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import GuestSelect from "@/components/GuestSelect.vue";
import FilterHotel from "@/components/FilterHotel.vue";
import CustomerBookedAlert from "@/components/CustomerBookedAlert.vue";
import MainNavBar from "@/components/MainNavBar.vue";
import LocationSearchComponent from "@/components/LocationSearchComponent.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";
import HotelAllSection from "@/components/HotelAllSection.vue";

@Component({
  components: {
    Datetime,
    Navbar,
    GuestSelect,
    FilterHotel,
    CustomerBookedAlert,
    MainNavBar,
    LocationSearchComponent,
    LanguageComponent,
    HotelAllSection
  }
})
export default class Promotion extends Vue {}
</script>
<style >
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
.promotion-container .input-group-text {
  background-color: #fff;
  border-right: none;
}
/* ========SEARCH SECTION======== */
.search-section {
  z-index: 1000000000000 !important;
}
/* ========DATA SECTION=========== */
.data-section {
  margin-top: 130px !important;
}

.page-item:last-child .page-link,
.page-item:first-child .page-link {
  border-radius: none !important;
  border: 1px solid #007bff !important;
}
.page-link.prev,
.page-link.next {
  width: 30px;
  height: 30px;
  border-radius: 100px !important;
  line-height: 30px !important;
  padding: 0;
  margin: 0 5px;
}
.page-item .page-link {
  z-index: 1;
  color: #007bff;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  line-height: 30px !important;
  padding: 0;
  margin: 0 5px;
}
.page-item.active .page-link {
  z-index: 1;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  line-height: 30px !important;
  padding: 0;
}
</style>
