/* eslint-disable */
<template>
  <div class="hotel-confirm-component p-2">
    <div class="container m-0 p-0 w-100">
      <div class="row d-flex align-items-center border-bottom p-2 m-0">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div class="text-left">
            <h5>
              <span
                class="font-weight-bolder text-lg"
              >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(packagedetail.packageId.price)}}</span>
              <span class="text-sm">/ per night</span>
            </h5>
            <p class="text-sm">
              <font-awesome-icon class="ml-1 text-primary" icon="star"/>
              <font-awesome-icon class="ml-1 text-primary" icon="star"/>
              <font-awesome-icon class="ml-1 text-primary" icon="star"/>
              <font-awesome-icon class="ml-1 text-primary" icon="star"/>
            </p>
          </div>
          <button
            type="button"
            class="close border-radius-100 shadow close-btn mx-1 text-sm"
            @click="backStep"
          >
            <font-awesome-icon icon="times"/>
          </button>
        </div>
      </div>
      <div class="row p-4 justify-content-start align-items-center m-0">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="icheckinout">
              <span class="text-sm">Date</span>
            </label>
            <Datetime id="icheckinout" v-bind:startdate="selectTime.starDate" v-bind:enddate="selectTime.endDate"></Datetime>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="iguest">
              <span class="text-sm">Guest</span>
            </label>
            <GuestSelectDropDown
              v-bind:id="'confirm-guest'"
              v-bind:data="guest"
              v-bind:maxguest="packagedetail.roomTypeId.maxGuest"
            ></GuestSelectDropDown>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="iwhere">
              <span class="text-sm">Option Service</span>
            </label>
            <input type="email" class="form-control" id="iwhere" placeholder="Option">
          </div>
        </div>
        <div class="col-12">
          <div class="row text-smd">
            <div class="col-12 border-bottom p-2">
              <div class="d-flex justify-content-between align-items-center">
                <span>
                  {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(packagedetail.packageId.price)}} x
                  <span
                    class="text-sm"
                  >3 night</span>
                </span>
                <span>2.400.000 đ</span>
              </div>
            </div>
            <div class="col-12 border-bottom p-2">
              <div class="d-flex justify-content-between align-items-center">
                <span>
                  Phụ thu trẻ em x
                  <span class="text-sm">3 children</span>
                </span>
                <span>2.400.000 đ</span>
              </div>
            </div>
            <div class="col-12 border-bottom p-2">
              <div class="d-flex justify-content-between align-items-center">
                <span>OptionService</span>
                <span>2.400.000 đ</span>
              </div>
            </div>
            <div class="col-12 border-bottom p-2">
              <div class="d-flex justify-content-between align-items-center text-success">
                <span>Discount</span>
                <span>- 2.400.000 đ</span>
              </div>
            </div>
            <div class="col-12 p-2">
              <div class="d-flex justify-content-between align-items-center font-weight-bolder">
                <span>Total</span>
                <span>2.400.000 đ</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 px-2 mt-4">
          <button
            type="button"
            class="btn btn-danger w-100"
            @click="redirectToRequest"
          >{{$t('btn_confirm')}}</button>
        </div>
      </div>
      <div class="row px-2 m-0">
        <div class="col-12">
          <div class="text-sm text-left">
            <span class="text-danger">Note :</span>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, consequatur. Labore alias natus iusto, illum deleniti ipsa fuga incidunt voluptatum voluptatibus ab vitae dolores eos tempore aut est libero exercitationem.</p>
          </div>
        </div>
      </div>
    </div>
    <LoadingComponent v-bind:isShow="isLoadding" class="center-page"></LoadingComponent>
  </div>
</template>
<script>
import axios from "axios";
import PackageService from "@/api/PackageService";
import CityService from "@/api/CityService";
import Datetime from "@/components/Datetime2.vue";
import GuestSelectDropDown from "@/components/GuestSelectDropDown.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    Datetime,
    GuestSelectDropDown,
    LoadingComponent
  },
  props: ["id"],
  name: "HotelConfirmBooking",
  computed:{
    selectedHotel(){
      return this.$router.state.selectedHotel;
    }
  },
  mounted() {
    this.initial(this.$route.query.packagehotelrelid);
  },
  data: function() {
    return {
      packagedetail: {
        hotelId: {
          hotelName: ""
        },
        roomTypeId: {
          roomTypeName: "",
          bed: 0,
          bath: 0,
          maxGuest: 0
        },
        packageId: {
          note: ""
        },
        utilities: {
          isWifi: false,
          isTivi: false,
          isSwim: false,
          isGym: false,
          isKitchen: false,
          isDry: false
        }
      },
      city: {},
      guest: {
        adult: {
          name: "adult",
          qty: 0
        },
        children: {
          less4: {
            name: "less4",
            qty: 0
          },
          less12: {
            name: "less12",
            qty: 0
          }
        }
      },
      selectTime:{
        startDate:moment().format('DD-MM-YYYY'),
        endDate:moment(new Date()).add(1, 'days').format('DD-MM-YYYY')
      },
      isLoadding: false
    };
  },
  methods: {
    backStep() {
      this.$router.go(-1);
    },
    redirectToRequest: function() {
      this.$router.push({
        path:`/promotiondetail/request?packagehotelrelid=${this.packagedetail._id}`});
    },
    changeLoadingState(state) {
      this.isLoadding = state;
    },
    async initial(id) {
      this.changeLoadingState(true);
      var response = await PackageService.getPackageDetail(id);
      this.packagedetail = response.data;
      var cityresponse = await CityService.getCityDetailById(
        response.data.hotelId.cityId
      );
      this.city = cityresponse.data;
      this.changeLoadingState(false);
    }
  }
};
</script>
<style lang="scss">
.guest-setting {
  width: initial !important;
}
.guest-setting.form-control {
  width: 100px !important;
}
.dropdown-pa {
  position: relative;
}
.dropdown-component {
  position: absolute;
  top: 50px;
  right: 50px;
  height: 200px;
  width: 100%;
  z-index: 100;
  background-color: #ffffff;
}
.btn-sm-round {
  width: 30px !important;
  height: 30px !important;
  line-height: 30px !important;
  padding: 0 !important;
}
.btn-sm-round svg {
  margin: 0 !important;
}
.hotel-confirm-component {
  margin: 0 !important;
  position: absolute !important;
  z-index: 300000 !important;
  background-color: #fff !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw;
  padding: 0 !important;
  min-height: 100vh !important;
  height: auto !important;
  padding-bottom: 40px !important;
}
</style>
