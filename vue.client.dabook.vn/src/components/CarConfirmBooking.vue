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
              >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedCar.totalPrice)}}</span>
              <span class="text-sm">/ {{selectedCar.kmTotal}} km</span>
            </h5>
            <p class="text-sm">
              {{selectedCar.tripName}}
            </p>
          </div>
          <button
            type="button"
            class="close border-radius-100 shadow close-btn mx-1 text-sm"
            @click="backStep"
          >
            <font-awesome-icon icon="times" />
          </button>
        </div>
      </div>
      <div class="row p-4 justify-content-start align-items-center m-0">
        <div class="col-12">
          <div class="form-group text-left">
            <label for="icheckinout">
              <span class="text-sm">Date</span>
            </label>
            <Datetime
              id="icheckinout"
              v-bind:startdate="selectTime.starDate"
              v-bind:enddate="selectTime.endDate"
              v-bind:cachotelprice="true"
            ></Datetime>
          </div>
        </div>
        <div class="col-12">
          <div class="row text-smd">
            <div class="col-12 border-bottom p-2">
              <div class="d-flex justify-content-between align-items-center">
                <span>
                  {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedCar.priceByCarType[0].price)}} x
                  <span
                    class="text-sm"
                  >{{selectedCar.kmTotal}} km</span>
                </span>
                <span>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedCar.totalPrice)}}</span>
              </div>
            </div>
            <div class="col-12 border-bottom p-2">
              <div class="d-flex justify-content-between align-items-center text-success">
                <span>Discount</span>
                <span>- 0 đ</span>
              </div>
            </div>
            <div class="col-12 p-2">
              <div class="d-flex justify-content-between align-items-center font-weight-bolder">
                <span>Total</span>
                <span>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedCar.totalPrice)}}</span>
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
        <div class="col-12 px-2">
          <p class="text-sm">Ban khong can thanh toan ngay. Chung toi se lien he lai</p>
        </div>
      </div>
      <div class="row px-2 m-0">
        <div class="col-12">
          <div class="text-sm text-left">
            <span class="text-danger">Note :</span>
            <p>Gia theo tung thoi diem se khac nhau. Chung toi se gui cho quy khach thong tin chi tiet sau khi nhan duoc yeu cau</p>
            <p>Gia trên được tính theo thời gian tiêu chuẩn trong 1 tour. Giá có thể thay đổi với trường hợp lưu trú nhiều đêm</p>
          </div>
        </div>
      </div>
    </div>
    <LoadingComponent class="center-page"></LoadingComponent>
  </div>
</template>
<script>
import axios from "axios";
import CarTypeService from "@/api/CarTypeService";
import Datetime from "@/components/Datetime2.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    Datetime,
    LoadingComponent
      },
  props: ["id"],
  name: "HotelConfirmBooking",
  computed: {
    selectedCar() {
      return this.$store.state.selectedCar;
    }
  },
  mounted() {
    this.initial(this.$route.query.cartypeid);
  },
  data: function() {
    return {
      carType:{},
      selectTime: {
        startDate: moment().format("DD-MM-YYYY"),
        endDate: moment(new Date())
          .add(1, "days")
          .format("DD-MM-YYYY")
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
        path: `/cardetail/request?cardetailpriceid=${this.$route.query.cardetailpriceid}&cartypeid=${this.$route.query.cartypeid}`
      });
    },
    async initial(id) {
     this.$store.commit('showHideLoading',true);
      var response = await CarTypeService.getCarTypeById(id);
      this.carType = response.data;
      console.log(this.carType);
      this.$store.commit('showHideLoading',false);
      this.componentLoaded = true;
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
