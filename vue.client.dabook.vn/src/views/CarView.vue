<template>
  <div class="container-fluid main h-100 p-0 m-0 promotion-container text-sm">
    <div class="row w-100 p-0 m-0 pb-3 border-bottom fixed-top bg-white search-section">
      <div class="col-12 p-2">
        <div class="row">
          <div class="col-2 d-flex justify-content-center align-items-center">
            <MainNavBar></MainNavBar>
          </div>
          <div class="col-10">
            <LocationSearchComponent></LocationSearchComponent>
          </div>
        </div>
      </div>
      <div class="col-12 px-2 d-flex flex-row justify-content-between align-items-center">
        <Datetime id="icheckinout" radius="border-radius-100" placeholder="Dates"></Datetime>
        <GuestSelect></GuestSelect>
      </div>
    </div>
    <div class="data-section">
      <div class="row w-100 p-0 mx-0 bottom-page">
        <div class="col-12 p-1 m-0">
          <div class="m-2 text-left">
            <h4>
              <b>Ha Long, Quang Ninh</b>
            </h4>
          </div>
        </div>
        <div class="col-6 p-1 m-0">
          <div class="card m-2 d-inline-block border-0">
            <img
              class="card-img-top border-radius-5"
              src="img/topdestination/sapa_2.jpg"
              alt="Card image cap"
            >
            <div class="card-body text-left p-1">
              <p class="card-text text-uppercase p-0 m-0 text-sm">DELUXURE 1BED</p>
              <p class="card-text font-weight-bolder p-0 m-0">FLC HaLong Golf Resort.</p>
              <p class="card-text text-sm p-0 m-0">$156 per night</p>
              <p class="card-text text-sm">
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
              </p>
            </div>
          </div>
        </div>
        <div class="col-6 p-1 m-0">
          <div class="card m-2 d-inline-block border-0">
            <img
              class="card-img-top border-radius-5"
              src="img/topdestination/sapa_2.jpg"
              alt="Card image cap"
            >
            <div class="card-body text-left p-1">
              <p class="card-text text-uppercase p-0 m-0 text-sm">DELUXURE 1BED</p>
              <p class="card-text font-weight-bolder p-0 m-0">FLC HaLong Golf Resort.</p>
              <p class="card-text text-sm p-0 m-0">$156 per night</p>
              <p class="card-text text-sm">
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
              </p>
            </div>
          </div>
        </div>
        <div class="col-6 p-1 m-0">
          <div class="card m-2 d-inline-block border-0">
            <img
              class="card-img-top border-radius-5"
              src="img/topdestination/sapa_2.jpg"
              alt="Card image cap"
            >
            <div class="card-body text-left p-1">
              <p class="card-text text-uppercase p-0 m-0 text-sm">DELUXURE 1BED</p>
              <p class="card-text font-weight-bolder p-0 m-0">FLC HaLong Golf Resort.</p>
              <p class="card-text text-sm p-0 m-0">$156 per night</p>
              <p class="card-text text-sm">
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
              </p>
            </div>
          </div>
        </div>
        <div class="col-6 p-1 m-0">
          <div class="card m-2 d-inline-block border-0">
            <img
              class="card-img-top border-radius-5"
              src="img/topdestination/sapa_2.jpg"
              alt="Card image cap"
            >
            <div class="card-body text-left p-1">
              <p class="card-text text-uppercase p-0 m-0 text-sm">DELUXURE 1BED</p>
              <p class="card-text font-weight-bolder p-0 m-0">FLC HaLong Golf Resort.</p>
              <p class="card-text text-sm p-0 m-0">$156 per night</p>
              <p class="card-text text-sm">
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
              </p>
            </div>
          </div>
        </div>
        <div class="col-6 p-1 m-0">
          <div class="card m-2 d-inline-block border-0">
            <img
              class="card-img-top border-radius-5"
              src="img/topdestination/sapa_2.jpg"
              alt="Card image cap"
            >
            <div class="card-body text-left p-1">
              <p class="card-text text-uppercase p-0 m-0 text-sm">DELUXURE 1BED</p>
              <p class="card-text font-weight-bolder p-0 m-0">FLC HaLong Golf Resort.</p>
              <p class="card-text text-sm p-0 m-0">$156 per night</p>
              <p class="card-text text-sm">
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                <font-awesome-icon class="ml-1 text-primary" icon="star"/>
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 p-1 m-0">
          <div class="m-2">
            <button class="btn btn-primary w-100" @click="redirectToPromotionAll">Show all(2016+)</button>
          </div>
        </div>
      </div>
    </div>
    <Navbar v-bind:current="'car'"></Navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Datetime from "@/components/Datetime2.vue"; // @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import GuestSelect from "@/components/GuestSelect.vue";
import MainNavBar from "@/components/MainNavBar.vue";
import LocationSearchComponent from "@/components/LocationSearchComponent.vue";


@Component({
  components: {
    Datetime,
    Navbar,
    GuestSelect,
    MainNavBar,
    LocationSearchComponent
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
.data-section {
  margin-top: 130px !important;
}
</style>
