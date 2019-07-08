<template>
  <div class="container-fluid main h-100 p-0 m-0 promotion-container">
    <div class="search-section">
      <div class="row w-100 p-0 m-0 pb-3 border-bottom fixed-top bg-white search-section-modal z-index-10000">
        <div class="col-12 p-2">
          <LocationSearchComponent></LocationSearchComponent>
        </div>
        <div
          class="col-12 px-2 d-flex flex-row justify-content-between align-items-center scroll-ngang"
        >
          <Datetime id="icheckinout" radius="border-radius-100" placeholder="Dates"></Datetime>
          <GuestSelect></GuestSelect>
          <FilterHotel></FilterHotel>
        </div>
      </div>
    </div>
    <div class="data-section margin-top-130 pb-4">
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 p-0 m-0">
          <div class="card d-inline-block border-0">
            <img
              class="card-img-top border-radius-none"
              src="img/topdestination/sapa_2.jpg"
              alt="Card image cap"
            >
          </div>
        </div>
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left">
            <h4>
              <b>FLC Halong Bay Golf & Resort</b>
            </h4>
          </div>
        </div>
        <div class="col-12 px-3 m-0">
          <div class="m-2 d-flex justify-content-between align-items-center">
            <span>HaLong</span>
            <img class="hotel-owner-avatar shadow" src="img/hotel/hotel-owner/vinpearl.jpg" alt>
          </div>
        </div>
        <div class="col-12 px-3 m-0 text-left">
          <div class="m-2 pb-4 border-bottom">
            <h6 class="font-weight-bolder">Deluxury Room, moutant view</h6>
            <div>
              <span class="text-sm">1 guest - 1 bed - 1 bath</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left">
            <p
              class="text-sm"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perferendis tempore a cupiditate mollitia nostrum doloremque deserunt ut numquam sapiente tenetur optio in nihil ducimus ab illum modi, aliquam dolorum?</p>
          </div>
        </div>
        <div class="col-12 px-3 m-0 text-left">
          <div class="m-2 pb-4 border-bottom">
            <p class="text-sm">Contact host</p>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left pb-4 border-bottom">
            <h6 class="font-weight-bolder">Room Info</h6>
            <div class="w-100 d-flex justify-content-between align-items-center flex-wrap">
              <span class="text-sm">
                <font-awesome-icon class="m-1" icon="bed"/>1kingbed
              </span>
              <span class="text-sm">
                <font-awesome-icon class="m-1" icon="wifi"/>Wifi
              </span>
              <span class="text-sm">
                <font-awesome-icon class="m-1" icon="swimming-pool"/>Swimming pool
              </span>
              <span class="text-sm">
                <font-awesome-icon class="m-1" icon="swimming-pool"/>Swimming pool
              </span>
              <span class="text-sm">
                <font-awesome-icon class="m-1" icon="swimming-pool"/>Swimming pool
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left pb-4 border-bottom">
            <h6 class="font-weight-bolder">Avaibility</h6>
          </div>
        </div>
        <div class="col-12 px-3 m-0"></div>
      </div>
    </div>
    <div class="relate-section">
      <div class="row w-100 p-0 mx-0 bottom-page">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left">
            <h4>
              <b>Hotel you may like!</b>
            </h4>
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
      <div class="row w-100 p-0 mx-0 fixed-bottom border-top py-4 bg-white action-section-modal z-index-10001">
        <div class="col-6 text-left">
          <div>
            <span class="font-weight-bolder">800.000 đ</span>
            <span class="text-sm">/ per night</span>
          </div>
          <p class="card-text text-sm">
            <font-awesome-icon class="ml-1 text-primary" icon="star"/>
            <font-awesome-icon class="ml-1 text-primary" icon="star"/>
            <font-awesome-icon class="ml-1 text-primary" icon="star"/>
            <font-awesome-icon class="ml-1 text-primary" icon="star"/>
          </p>
        </div>
        <div class="col-6">
          <ConfirmBooking></ConfirmBooking>
        </div>
      </div>
    </div>
    <div class="general-section">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Datetime from '@/components/Datetime2.vue'
import DatetimeAutoShow from '@/components/DatetimeAutoShow.vue'
import Navbar from '@/components/Navbar.vue'
import GuestSelect from '@/components/GuestSelect.vue'
import FilterHotel from '@/components/FilterHotel.vue'
import CustomerBookedAlert from '@/components/CustomerBookedAlert.vue'
import LocationSearchComponent from '@/components/LocationSearchComponent.vue'
@Component({
  components: {
    Datetime,
    Navbar,
    GuestSelect,
    FilterHotel,
    CustomerBookedAlert,
    DatetimeAutoShow,
    LocationSearchComponent
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
.search input {
  border-left: none;
}
.search input:focus {
  border-left: none !important;
}
/* ========DATA SECTION=========== */

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
