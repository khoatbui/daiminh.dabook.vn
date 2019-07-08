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
        <Datetime id="icheckinout" radius="border-radius-100" placeholder="Dates"></Datetime>
        <GuestSelect></GuestSelect>
        <FilterCar></FilterCar>
      </div>
    </div>
    <div class="search-section margin-top-130 pb-4">
      <div class="row w-100 p-2 mx-0">
        <div class="col-12 m-0 p-1">
          <div class="card p-2 border-0 border-radius-10 shadow">
            <div class="row m-0 p-1 my-2">
              <div class="col-4 p-0 text-left">
                <span>
                  Roudtrip
                  <font-awesome-icon class="ml-1 text-primary" icon="chevron-down" />
                </span>
              </div>
              <div class="col-4 p-0 text-left">
                <span>
                  Seats
                  <font-awesome-icon class="ml-1 text-primary" icon="chevron-down" />
                </span>
              </div>
            </div>
            <div class="row m-0 mb-2 float-component-parent">
              <div class="col-6 p-1">
                <input
                  class="form-control border-radius-5 text-center"
                  type="text"
                  placeholder="Điểm đi"
                />
              </div>
              <div class="float-component shadow-sm">
                <font-awesome-icon class="ml-1 text-primary text-md" icon="car-side" />
              </div>
              <div class="col-6 p-1">
                <input
                  class="form-control border-radius-5 text-center"
                  type="text"
                  placeholder="Điểm đến"
                />
              </div>
            </div>
            <div class="row m-0 mb-2">
              <div class="col-12 p-1">
                <Datetime class="text-center"></Datetime>
              </div>
            </div>
            <div class="row m-0 mb-2">
              <div class="col-12 p-1 text-right">
                <button class="btn btn-sm btn-primary">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="trans-section px-2 pb-4">
      <div class="row m-0 top-city-destination">
        <div class="col-12 text-left">
          <h4>
            <b>Car service by type</b>
          </h4>
        </div>
        <div class="col-12 scroll-ngang">
          <div class="card m-2 d-inline-block border-0">
            <img
              class="card-img-top shadow border-radius-100"
              src="img/car/trans/golf.jpg"
              alt="Card image cap"
            />
            <div class="card-body p-1 text-center">
              <p class="card-text font-weight-bolder">Golf</p>
            </div>
          </div>
          <div class="card m-2 d-inline-block border-0">
            <img
              class="card-img-top shadow border-radius-100"
              src="img/car/trans/airport.jpg"
              alt="Card image cap"
            />
            <div class="card-body p-1 text-center">
              <p class="card-text font-weight-bolder">Air port</p>
            </div>
          </div>
          <div class="card m-2 d-inline-block border-0">
            <img
              class="card-img-top shadow border-radius-100"
              src="img/car/trans/industries.jpg"
              alt="Card image cap"
            />
            <div class="card-body p-1 text-center">
              <p class="card-text font-weight-bolder">Industry</p>
            </div>
          </div>
          <div class="card m-2 d-inline-block border-0">
            <img
              class="card-img-top shadow border-radius-100"
              src="img/car/trans/hanoi.jpg"
              alt="Card image cap"
            />
            <div class="card-body p-1 text-center">
              <p class="card-text font-weight-bolder">HaNoi Inbound</p>
            </div>
          </div>
          <div class="card m-2 d-inline-block border-0">
            <img
              class="card-img-top shadow border-radius-100"
              src="img/car/trans/tourtrip.jpg"
              alt="Card image cap"
            />
            <div class="card-body p-1 text-center">
              <p class="card-text font-weight-bolder">TourTrip</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-section pb-4">
      <div class="row w-100 p-2 mx-0">
        <div class="col-12 text-left">
          <h4>
            <b>Today great deal</b>
          </h4>
        </div>
        <div class="col-12 m-0 p-0">
          <div class="card mx-2 my-4 p-0 border-0 border-radius-5 shadow-sm">
            <div class="row no-gutters">
              <div class="col-5 m-0 p-0">
                <img class="border-left-radius-5 car-img" src="img/topdestination/sapa_2.jpg" alt />
              </div>
              <div class="col-7 p-2 d-flex flex-column justify-content-between">
                <div
                  class="row w-100 m-0 justify-content-between aling-items-center font-weight-bolder text-smd border-bottom-dash"
                >
                  <div class="col-5 p-0 text-left">
                    <span>Ha Noi</span>
                  </div>
                  <div class="col-2 p-0 text-center">
                    <font-awesome-icon class="ml-1 text-default" icon="car-side" />
                  </div>
                  <div class="col-5 p-0 text-right">
                    <span>Sai Gon</span>
                  </div>
                </div>
                <div class="row w-100 m-0">
                  <div class="col-12 p-0 text-left">
                    <span>Seats:12</span>
                  </div>
                  <div class="col-12 p-0 text-left">
                    <span>120km | 3night</span>
                  </div>
                </div>
                <div class="row w-100 m-0">
                  <div class="col-12 p-0 text-right">
                    <div class="d-inline-block font-weight-bolder">
                      <span class="text-default">2.300.đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mx-2 my-4 p-0 border-0 border-radius-5 shadow-sm">
            <div class="row no-gutters">
              <div class="col-5 m-0 p-0">
                <img class="border-left-radius-5 car-img" src="img/topdestination/sapa_2.jpg" alt />
              </div>
              <div class="col-7 p-2 d-flex flex-column justify-content-between">
                <div
                  class="row w-100 m-0 justify-content-between aling-items-center font-weight-bolder text-smd border-bottom-dash"
                >
                  <div class="col-5 p-0 text-left">
                    <span>Ha Noi</span>
                  </div>
                  <div class="col-2 p-0 text-center">
                    <font-awesome-icon class="ml-1 text-default" icon="car-side" />
                  </div>
                  <div class="col-5 p-0 text-right">
                    <span>Sai Gon</span>
                  </div>
                </div>
                <div class="row w-100 m-0">
                  <div class="col-12 p-0 text-left">
                    <span>Seats:12</span>
                  </div>
                  <div class="col-12 p-0 text-left">
                    <span>120km | 3night</span>
                  </div>
                </div>
                <div class="row w-100 m-0">
                  <div class="col-12 p-0 text-right text-sm">
                    <div class="d-inline-block font-weight-bolder">
                      <span class="text-success border-radius-5 success-opac-50 px-1">GREAT VALUE:</span>
                      <span class="text-success">2.300.đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mx-2 my-4 p-0 border-0 border-radius-5 shadow-sm">
            <div class="row no-gutters">
              <div class="col-5 m-0 p-0">
                <img class="border-left-radius-5 car-img" src="img/topdestination/sapa_2.jpg" alt />
              </div>
              <div class="col-7 p-2 d-flex flex-column justify-content-between">
                <div
                  class="row w-100 m-0 justify-content-between aling-items-center font-weight-bolder text-smd border-bottom-dash"
                >
                  <div class="col-5 p-0 text-left">
                    <span>Ha Noi</span>
                  </div>
                  <div class="col-2 p-0 text-center">
                    <font-awesome-icon class="ml-1 text-default" icon="car-side" />
                  </div>
                  <div class="col-5 p-0 text-right">
                    <span>Sai Gon</span>
                  </div>
                </div>
                <div class="row w-100 m-0">
                  <div class="col-12 p-0 text-left">
                    <span>Seats:12</span>
                  </div>
                  <div class="col-12 p-0 text-left">
                    <span>120km | 3night</span>
                  </div>
                </div>
                <div class="row w-100 m-0">
                  <div class="col-12 p-0 text-right">
                    <div class="d-inline-block font-weight-bolder">
                      <span class="text-default">2.300.đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mx-2 my-4 p-0 border-0 border-radius-5 shadow-sm">
            <div class="row no-gutters">
              <div class="col-5 m-0 p-0">
                <img class="border-left-radius-5 car-img" src="img/topdestination/sapa_2.jpg" alt />
              </div>
              <div class="col-7 p-2 d-flex flex-column justify-content-between">
                <div
                  class="row w-100 m-0 justify-content-between aling-items-center font-weight-bolder text-smd border-bottom-dash"
                >
                  <div class="col-5 p-0 text-left">
                    <span>Ha Noi</span>
                  </div>
                  <div class="col-2 p-0 text-center">
                    <font-awesome-icon class="ml-1 text-default" icon="car-side" />
                  </div>
                  <div class="col-5 p-0 text-right">
                    <span>Sai Gon</span>
                  </div>
                </div>
                <div class="row w-100 m-0">
                  <div class="col-12 p-0 text-left">
                    <span>Seats:12</span>
                  </div>
                  <div class="col-12 p-0 text-left">
                    <span>120km | 3night</span>
                  </div>
                </div>
                <div class="row w-100 m-0">
                  <div class="col-12 p-0 text-right">
                    <div class="d-inline-block font-weight-bolder">
                      <span class="text-default">2.300.đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 m-0 p-0">
          <div class="m-2">
        <button class="btn btn-primary w-100" @click="redirectToCarViewAll">{{$t('btn_showall')}}(20+)</button>
      </div>
        </div>
      </div>
    </div>
    <div>
      <div class="row w-100 p-0 mx-0 bottom-page">
        <div class="col-12 p-1 m-0">
          <div class="m-2 text-left">
            <h4>
              <b>Best hotel for you</b>
            </h4>
          </div>
        </div>
        <HotelPromotionSection v-bind:showTitle="false"></HotelPromotionSection>
      </div>
    </div>
    <Navbar v-bind:current="'car'"></Navbar>
  </div>
</template>

<script >
import { Component, Vue } from "vue-property-decorator";
import Datetime from "@/components/Datetime2.vue"; // @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import GuestSelect from "@/components/GuestSelect.vue";
import MainNavBar from "@/components/MainNavBar.vue";
import LocationSearchComponent from "@/components/LocationSearchComponent.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";
import FilterCar from "@/components/FilterCar.vue";
import HotelPromotionSection from "@/components/HotelPromotionSection.vue";

export default {
  components: {
    Datetime,
    Navbar,
    GuestSelect,
    MainNavBar,
    LocationSearchComponent,
    LanguageComponent,
    FilterCar,
    HotelPromotionSection
  },
  data: () => ({}),

  computed: {},

  watch: {},

  created() {},

  methods: {
    redirectToCarViewAll(){
      this.$router.push({ path: "carviewall" });
    }
  }
};
</script>
<style scoped>
.float-component {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  line-height: 30px;
  background-color: #fff !important;
  border: none;
  z-index: 2;
  border-radius: 50%;
}
.float-component-parent {
  position: relative;
}
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
.search input {
  border-left: none;
}
.search input:focus {
  border-left: none !important;
}
/* ========DATA SECTION=========== */
.car-img {
  height: 100% !important;
  width: 100% !important;
}
.border-bottom-dash {
  border-bottom: 1px dashed #ced4da;
}
</style>
