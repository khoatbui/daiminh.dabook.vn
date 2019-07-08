//src/components/Navbar.vue
<template>
  <div class="hotel-detail-section">
    <div class="row w-100 p-0 mx-0">
      <div class="col-12 p-0 m-0">
        <div class="card d-inline-block border-0 w-100">
            <div id="carousel-img" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li
                data-target="#carousel-img"
                v-for="(subitem,index) in packagedetail.roomTypeId.roomImages"
                v-bind:class="{'active':index==0}"
                v-bind:data-slide-to="index"
              ></li>
            </ol>
            <div class="carousel-inner default-bg h-200">
              <div
                class="carousel-item"
                v-for="(subitem,index) in packagedetail.roomTypeId.roomImages"
                v-bind:class="{'active':index==0}"
              >
                <img
                  v-bind:src="packagedetail.roomTypeId.roomImages.length>0?subitem.filePath:'img/hotel/roomtype/default.jpg'"
                  class="d-block card-img-top"
                  alt="..."
                />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carousel-img"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carousel-img"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      <div class="col-12 px-3 m-0">
        <div class="m-2 text-left">
          <h4>
            <b>{{packagedetail.hotelId.hotelName}}</b>
          </h4>
        </div>
      </div>
      <div class="col-12 px-3 m-0">
        <div class="m-2 d-flex justify-content-between align-items-center">
          <span>{{city.cityName}}</span>
          <img class="hotel-owner-avatar shadow" :src="packagedetail.supplierId.supplierImages.length>0?packagedetail.supplierId.supplierImages[0].filePath:'img/hotel/supplier/default.jpg'" alt />
        </div>
      </div>
      <div class="col-12 px-3 m-0 text-left">
        <div class="m-2 pb-4 border-bottom">
          <h6 class="font-weight-bolder">{{packagedetail.roomTypeId.roomTypeName}}</h6>
          <div>
            <span
              class="text-sm"
            >{{packagedetail.roomTypeId.maxGuest}} guest - {{packagedetail.roomTypeId.bed}} bed - 1 bath</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row w-100 p-0 mx-0">
      <div class="col-12 px-3 m-0">
        <div class="m-2 text-left">
          <p class="text-sm">{{packagedetail.packageId.note}}</p>
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
              <font-awesome-icon class="m-1" icon="bed" />
              {{packagedetail.roomTypeId.bed}}kingbed
            </span>
            <span class="text-sm" v-if="packagedetail.utilities.isKitchen">
              <font-awesome-icon class="m-1" icon="utensils" />Kitchen
            </span>
            <span class="text-sm" v-if="packagedetail.utilities.isWifi">
              <font-awesome-icon class="m-1" icon="wifi" />Wifi
            </span>
            <span class="text-sm" v-if="packagedetail.utilities.isTivi">
              <font-awesome-icon class="m-1" icon="tv" />Tivi
            </span>
            <span class="text-sm" v-if="packagedetail.utilities.isDry">
              <font-awesome-icon class="m-1" icon="cloud-sun" />Dry
            </span>
            <span class="text-sm" v-if="packagedetail.utilities.isSwim">
              <font-awesome-icon class="m-1" icon="swimming-pool" />Swimming pool
            </span>
            <span class="text-sm" v-if="packagedetail.utilities.isGym">
              <font-awesome-icon class="m-1" icon="dumbbell" />Gym room
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
    <div class="action-section">
      <div
        class="row w-100 p-0 mx-0 fixed-bottom border-top py-4 bg-white action-section-modal z-index-10001"
      >
        <div class="col-6 text-left">
          <div>
            <span class="font-weight-bolder">
              <span class="text-sm">from</span>
              {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedHotel.priceByTime.smallPrice)}}
            </span>
            <span class="text-sm">/ per night</span>
          </div>
          <p class="card-text text-sm">
            <font-awesome-icon
              class="ml-1 text-primary"
              icon="star"
              v-for="star in packagedetail.hotelId.star"
            />
          </p>
        </div>
        <div class="col-6">
          <button
            type="button"
            class="btn btn-danger w-100"
            @click="redirectToConfirm"
          >{{ $t('btn_nextstep') }}</button>
        </div>
      </div>
    </div>
    <LoadingComponent class="center-page"></LoadingComponent>
  </div>
</template>
<script>
import HotelService from "@/api/HotelService";
import PackageService from "@/api/PackageService";
import CityService from "@/api/CityService";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  components: {
    LoadingComponent
  },
  name: "HotelDetailSection",
  data() {
    return {
      componentLoaded: false,
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
    };
  },
  created() {
    this.initial(this.$route.query.packagehotelrelid);
  },
  methods: {
    redirectToConfirm: function() {
      this.$router.push(
        `/promotiondetail/confirm?packagehotelrelid=${this.$route.query.packagehotelrelid}`
      );
    },
    redirectToPromotionAll() {
      this.$router.push({ path: "promotionall" });
    },
    async initial(id) {
      this.$store.commit('showHideLoading',true);
      var response = await PackageService.getPackageDetail(id);
      this.$store.dispatch("updateselectedHotelDetailAction", response.data);
      console.log(response.data);
      this.packagedetail = response.data;
      var cityresponse = await CityService.getCityDetailById(
        response.data.hotelId.cityId
      );
      this.city = cityresponse.data;
      this.$store.commit('showHideLoading',false);
      this.componentLoaded = true;
    }
  },
  computed: {
    selectedHotel() {
      if (!this.componentLoaded) {
        return {
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
          package: {
            priceRanges: [
              {
                startDate: "",
                endDate: ""
              }
            ]
          },
          priceByTime: {
            price: 0,
            diffTime: 0,
            smallPrice: 0
          }
        };
      }
      return this.$store.state.selectedHotel;
    }
  }
};
</script>
<style lang="scss" scoped>
.hotel-owner-avatar {
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: #ffffff;
  border: 1px solid #007bff;
}
.hotel-detail-section .h-200 {
  height: 200px !important;
  overflow: hidden;
  min-height: 200px !important;
  max-height: 200px;
}
</style>
