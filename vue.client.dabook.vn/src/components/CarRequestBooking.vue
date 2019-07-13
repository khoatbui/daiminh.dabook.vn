/* eslint-disable */
<template>
  <div class="hotel-request-component w-100 p-2">
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
            <label for="ifullname">
              <span class="text-sm"
               v-bind:class="formCheck.fullName">Full name <font-awesome-icon class="text-danger" icon="exclamation-circle" v-if="(!formCheck.isFail && formCheck.fullName.length>0)"/></span>
            </label>
            <input
              type="text"
              class="form-control"
              id="ifullname"
              placeholder="Your name"
              v-model="customerInfo.fullName"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="iemail">
              <span class="text-sm"
               v-bind:class="formCheck.email">Email <font-awesome-icon class="text-danger" icon="exclamation-circle" v-if="(!formCheck.isFail && formCheck.email.length>0)"/></span>
            </label>
            <input
              type="email"
              class="form-control"
              id="iemail"
              placeholder="your@email.com"
              v-model="customerInfo.email"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="iphone">
              <span class="text-sm" 
               v-bind:class="formCheck.phone">Phone <font-awesome-icon class="text-danger" icon="exclamation-circle" v-if="(!formCheck.isFail && formCheck.phone.length>0)"/></span>
            </label>
            <input
              type="tel"
              class="form-control"
              id="iphone"
              placeholder="+8498868686"
              v-model="customerInfo.phone"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="ipickup">
              <span class="text-sm" 
               v-bind:class="formCheck.pickup">Pickup <font-awesome-icon class="text-danger" icon="exclamation-circle" v-if="(!formCheck.isFail && formCheck.pickup.length>0)"/></span>
            </label>
            <input
              type="text"
              class="form-control"
              id="ipickup"
              placeholder="Grand Plaza..."
              v-model="customerInfo.pickup"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="imessage">
              <span class="text-sm">Message</span>
            </label>
            <textarea
              class="form-control"
              id="imessage"
              rows="3"
              placeholder="Other request"
              v-model="customerInfo.question"
            ></textarea>
          </div>
        </div>
        <div class="col-12 p-0 mt-4">
          <button
            type="button"
            class="btn btn-danger w-100"
            @click="nextToResultStep"
            data-toggle="modal" data-target="#resultModal"
          >{{$t('btn_request')}}</button>
        </div>
        <div class="col-12 px-2">
          <p class="text-sm">Ban khong can thanh toan ngay. Chung toi se lien he lai</p>
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <div
      class="modal fade"
      id="resultModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="resultModalLabel"
      aria-hidden="true"
      v-if="isShowModal"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header border-bottom">
            <div class="row w-100">
              <div class="col-12 w-100 pr-0 d-flex justify-content-between align-items-center">
                <div class="text-left">
                  <h5 class="modal-title" id="resultModalLabel">
                    <span class="font-weight-bolder text-lg">Request completed</span>
                  </h5>
                  <p class="text-sm">Bellow is booking code, please keep it to reference!</p>
                </div>
                <button
                  type="button"
                  class="close border-radius-100 shadow close-btn mx-1 text-sm"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <font-awesome-icon icon="times" />
                </button>
              </div>
              <div class="col-12">
                <!-- <StepComponent></StepComponent> -->
              </div>
            </div>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row p-2 justify-content-start align-items-center">
                <div class="col-12">
                  <div class="ticket-result">
                    <img class="ticket-bg" src="/img/hotel/ticketbg.png" alt />
                    <div
                      class="absolute-group d-flex align-items-stretch flex-column justify-content-center"
                    >
                      <span class="ticket-owner">{{customerInfo.fullName}}</span>
                      <input class="ticket-code" type="text" :value="requestResult.orderCode" />
                      <h4 class="p-1">
                        <span
                          class="badge badge-primary ticket-status"
                        >Status : {{requestResult.requestStatus}}</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <p class="text-sm mb-0 text-left text-danger">Note</p>
                  <p class="text-sm text-left">
                    Cam on quy khach da su dung dich vu cua chung toi. Nhan vien cua chung toi da tiep nhan yeu cau, va se phan hoi lai
                    trong vong {{requestResult.feedbackTime}} tieng.
                  </p>
                  <p
                    class="text-sm text-left"
                  >Trong truong hop quy khach can ho tro gap, vui long lien he tong dai 19001562 hoac 0936376420 de duoc ho tro. Xin cam on</p>
                </div>
                <div class="col-12 text-left">
                  <a href="#" class="text-sm">Show more</a>
                </div>
                <div class="col-12 p-0 mt-4">
                  <button type="button" class="btn btn-danger w-100">{{$t('btn_copyticket')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadingComponent class="center-page"></LoadingComponent>
  </div>
</template>
<script>
import axios from "axios";
import CarPriceService from "@/api/CarPriceService";
import CarTypeService from "@/api/CarTypeService";
import Datetime from "@/components/Datetime2.vue";
import GuestSelectDropDown from "@/components/GuestSelectDropDown.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    Datetime,
    GuestSelectDropDown,
    LoadingComponent
  },
  props: ["id", "packagedata", "authorName", "enddate"],
  name: "HotelRequestBooking",
  computed: {
    selectedCar() {
      return this.$store.state.selectedCar;
    },
    customer() {
      return this.$store.state.customer;
    }
  },
  mounted() {
    $(window).on("popstate", function(e) {
      var state = e.originalEvent.state;
      if (state !== null) {
        $(".modal-backdrop.fade").remove();
        $("body").removeClass("modal-open");
      }
    });
    this.initial(this.$route.query.cartypeid);
  },
  methods: {
    backStep() {
      this.$router.go(-1);
    },
    async nextToResultStep() {
      if(this.formChecking()){
                    this.isShowModal=true;
      this.$store.commit("showHideLoading", true);
      console.log(this.customerInfo);
      this.$store.commit("updateCustomerInfo", this.customerInfo);
      var parrams = {
        selectedDate: this.$store.state.selectDate,
        customer: this.$store.state.customer,
        supplier: {
          _id: this.$store.state.selectedCar.supplierId._id,
          supplierCode: this.$store.state.selectedCar.supplierId
            .supplierCode,
          supplierName: this.$store.state.selectedCar.supplierId
            .supplierName
        },
        carType: {
          _id: this.carType._id,
          carTypeCode: this.carType.carTypeCode,
          carTypeName: this.carType.carTypeName
        },
        trip: {
          _id: this.$store.state.selectedCar._id,
          tripCode: this.$store.state.selectedCar.tripCode,
          tripName: this.$store.state.selectedCar.tripName
        },
        totalPrice: this.$store.state.selectedCar.totalPrice
      };
      var response = await CarPriceService.postRequestCar(parrams);
      this.requestResult = response.data;
      console.log(parrams);
      this.$store.commit("showHideLoading", true);
      }
      else{
        console.log('fail');
        return
      }
    },
    formChecking() {
      if (this.customerInfo.fullName.length === 0) {
        console.log('fullnam fail')
        this.formCheck = {
          fullName: "text-danger",
          email: "",
          phone: "",
          pickup:"",
          isFail: false
        };

        return false;
      } else if (this.customerInfo.email.length === 0) {
         console.log('email fail')
        this.formCheck = {
          fullName: "",
          email: "text-danger",
          phone: "",
          pickup:"",
          isFail: false
        };

        return false;
      } else if (this.customerInfo.phone.length === 0) {
         console.log('phone fail')
        this.formCheck = {
          fullName: "",
          email: "",
          phone: "text-danger",
          pickup:"",
          isFail: false
        };

        return false;
      }else if (this.customerInfo.pickup.length === 0) {
         console.log('pickup fail')
        this.formCheck = {
          fullName: "",
          email: "",
          phone:"",
          pickup: "text-danger",
          isFail: false
        };

        return false;
      } else {
        this.formCheck = {
          fullName: "",
          email: "",
          phone: "",          
          pickup:"",
          isFail: true
        };
        return true;
      }
    },
    async initial(id) {
     this.$store.commit('showHideLoading',true);
      var response = await CarTypeService.getCarTypeById(id);
      this.carType = response.data;
      this.$store.commit('showHideLoading',false);
      this.componentLoaded = true;
    }
  },
  data: function() {
    return {
      customerInfo: {
        fullName: "",
        email: "",
        phone: "",
        pickup:"",
        question: ""
      },
      isLoadding: false,
      requestResult: {
        orderCode: "",
        feedbackTime: "",
        requestStatus: ""
      },
      formCheck: {
        fullName: "",
        email: "",
        phone: "",
        isFail: true
      },
      isShowModal:false,
      carType:{}
    };
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
.hotel-request-component {
  margin: 0 !important;
  position: absolute !important;
  z-index: 300000 !important;
  background-color: #fff !important;
  top: 0 !important;
  left: 0 !important;
  padding: 0 !important;
  width: 100vw;
  height: 100vh;
  padding-bottom: 40px !important;
}
#resultModal .modal-dialog,
#resultModal .modal-content {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
}
.ticket-bg {
  width: 100%;
  height: auto;
}
.ticket-result {
  position: relative;
  width: auto;
  margin: 2px;
}
.absolute-group {
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100%;
}
.ticket-code {
  min-width: 100px;
  width: 100px;
  background-color: #2b5364;
  border: none;
  color: #fff;
  font-weight: bold;
  -webkit-transform: translate(10px, 10px) rotate(270deg);
  transform: translate(-10%) rotate(270deg);
}
.ticket-owner {
  color: #fff;
  font-size: 1.3rem;
}
</style>
