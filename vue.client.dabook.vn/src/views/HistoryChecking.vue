<template>
  <div class="container-fluid main h-100 p-0 m-0 promotion-container">
    <div class="search-section mb-4">
      <div class="row w-100 p-0 m-0 pb-3 border-bottom fixed-top bg-white search-section-modal z-index-10000 d-flex align-items-center">
        <div class="col-10 p-2">
          <HistorySearchComponent></HistorySearchComponent>
        </div>
        <div class="col-2">
          <LanguageComponent></LanguageComponent>
        </div>
      </div>
    </div>
    <div class="data-section pb-4">
       <HistoryResultComponent></HistoryResultComponent>
    </div>
    <div class="relate-section">
      <div class="row w-100 pb-4 top-city-destination">
          <div class="col-12 text-left">
            <h6 class="m-2 text-left">
              <b>Top City Destination</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/phuquoc_1.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Ho Chi Minh</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/phuquoc_2.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Ha Noi</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/phuquoc_3.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Danang</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/quynhon_1.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Phu Quoc</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/quynhon_2.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Hoi An</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/quynhon_3.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Quang Binh</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/sapa.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Sapa.</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/sapa_2.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Ha Long.</p>
              </div>
            </div>
          </div>
        </div>
      <div class="row w-100 p-0 bottom-page">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left">
            <h6>
              <b>Hotel you may like!</b>
            </h6>
          </div>
        </div>
        <div class="col-12 px-3 m-0 scroll-ngang">
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
      </div>
    </div>
    <div class="action-section">
    </div>
    <div class="general-section">
    </div>
        <Navbar v-bind:current="'history'"></Navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Datetime from "@/components/Datetime2.vue"; // @ is an alias to /src
import DatetimeAutoShow from "@/components/DatetimeAutoShow.vue";
import Navbar from "@/components/Navbar.vue";
import CustomerBookedAlert from "@/components/CustomerBookedAlert.vue";
import HistorySearchComponent from "@/components/HistorySearchComponent.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";
import HistoryResultComponent from "@/components/HistoryResultComponent.vue"


@Component({
  components: {
    Navbar,
    CustomerBookedAlert,
    DatetimeAutoShow,
    HistorySearchComponent,
    LanguageComponent,
    HistoryResultComponent
  }
})
export default class Promotion extends Vue {

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
.hotel-owner-avatar {
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: #ffffff;
  border: 1px solid #007bff;
}
</style>
