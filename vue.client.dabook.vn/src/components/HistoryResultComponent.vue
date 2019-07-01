/* eslint-disable */
<template>
  <div class="result-request-component w-100 p-2 vh-100">
    <div class="row w-100 m-0 p-2">
      <div class="col-12">
        <div class="input-group mb-1 input-group-lg">
          <div class="input-group-prepend">
            <span class="input-group-text bg-white text-danger text-md" id="basic-addon1">BOOKING ID</span>
          </div>
          <input
            type="text"
            class="form-control text-md"
            placeholder="..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="historySearch"
          />
        </div>
      </div>
      <div class="col-12">
        <div class="input-group mb-1 input-group-lg">
          <div class="input-group-prepend">
            <span class="input-group-text bg-white text-danger text-md" id="basic-addon1">Phone (+84)</span>
          </div>
          <input
            type="text"
            class="form-control text-md"
           placeholder="..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="historySearch"
          />
        </div>
      </div>
      <div class="col-12 pt-3">
          <button class="btn btn-danger w-100" @click="searchHistory">
              SUBMIT
          </button>
      </div>
    </div>
    <div
      class="row w-100 m-0 p-2 justify-content-start align-items-center"
      v-if="requestResult.isFound"
    >
      <div class="col-12">
        <div class="ticket-result">
          <img class="ticket-bg" src="/img/hotel/ticketbg.png" alt />
          <div class="absolute-group d-flex align-items-stretch flex-column justify-content-center">
            <span class="ticket-owner">{{requestResult.fullName}}</span>
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
      <div class="col-12">
        <button type="button" class="btn btn-danger w-100">{{$t('btn_copyticket')}}</button>
      </div>
    </div>
    <div
      class="row w-100 m-0 p-0 justify-content-start align-items-start vh-100"
      v-if="requestResult.isFound==false"
    >
      <div class="col-12">
        <font-awesome-icon class="nav-icon-fa text-danger text-ssl" icon="clock" />
        <h6 class="text-center text-danger pt-2">Data not found</h6>
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
  props: ["id", "packagedata", "authorName", "enddate"],
  name: "HistoryResultComponent",
  computed: {
    selectedHotel() {
      return this.$store.state.selectedHotel;
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
  },
  methods: {
    backStep() {
      this.$router.go(-1);
    },
    changeLoadingState(state) {
      this.isLoadding = state;
    },
    changeLoadingState(state) {
      this.isLoadding = state;
    },
    searchHistory(){
        
    }
  },
  data: function() {
    return {
        isSearch:false,
      isLoadding: false,
      requestResult: {
        isFound:undefined,
        fullName: "",
        orderCode: "",
        feedbackTime: "",
        requestStatus: ""
      }
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
.vh-100 {
  height: 100vh !important;
}
</style>
