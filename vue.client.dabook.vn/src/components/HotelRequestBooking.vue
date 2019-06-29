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
            <label for="ifullname">
              <span class="text-sm">Full name</span>
            </label>
            <input type="text" class="form-control" id="ifullname" placeholder="Option">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="iemail">
              <span class="text-sm">Email</span>
            </label>
            <input type="email" class="form-control" id="iemail" placeholder="Option">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="iphone">
              <span class="text-sm">Phone</span>
            </label>
            <input type="tel" class="form-control" id="iphone" placeholder="Option">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="imessage">
              <span class="text-sm">Message</span>
            </label>
            <textarea class="form-control" id="imessage" rows="3"></textarea>
          </div>
        </div>
        <div class="col-12 p-0 mt-4">
          <button
            type="button"
            class="btn btn-danger w-100"
            @click="nextToResultStep"
            data-toggle="modal"
            data-target="#resultModal"
          >{{$t('btn_request')}}</button>
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
                  <font-awesome-icon icon="times"/>
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
                    <img class="ticket-bg" src="/img/hotel/ticketbg.png" alt>
                    <div
                      class="absolute-group d-flex align-items-stretch flex-column justify-content-center"
                    >
                      <span class="ticket-owner">Bui Van Khoat</span>
                      <input class="ticket-code" type="text" value="FCD1505303">
                      <h4 class="p-1">
                        <span class="badge badge-primary ticket-status">Status : In process</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <p class="text-sm mb-0 text-left text-danger">Note</p>
                  <p
                    class="text-sm text-left"
                  >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat commodi dolore voluptates quisquam itaque quo error debitis sapiente natus nostrum, eos, quaerat quasi esse repellat, praesentium quod sequi illo facilis.</p>
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
    <LoadingComponent v-bind:isShow="isLoadding" class="center-page"></LoadingComponent>
  </div>
</template>
<script>
import axios from "axios";
import PackageService from "@/api/PackageService";
import Datetime from "@/components/Datetime2.vue";
import GuestSelectDropDown from "@/components/GuestSelectDropDown.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    Datetime,
    GuestSelectDropDown,
    LoadingComponent
  },
  props: ["id", "packagedata",'authorName','enddate'],
  name: "HotelRequestBooking",
  mounted() {
    this.initial(this.$route.query.packagehotelrelid);
    $(window).on("popstate", function(e) {
      var state = e.originalEvent.state;
      if (state !== null) {
        $(".modal-backdrop.fade").remove();
        $('body').removeClass('modal-open');
      }
    });
      },
  methods: {
    backStep() {
      this.$router.go(-1);
    },
    nextToResultStep() {},
    changeLoadingState(state) {
      this.isLoadding = state;
    },
    async initial(id) {
      this.changeLoadingState(true);
      var response = await PackageService.getPackageDetail(id);
      this.packagedetail = response.data;
      this.changeLoadingState(false);
    }
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
      isLoadding: false
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
