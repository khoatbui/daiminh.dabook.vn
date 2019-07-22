/* eslint-disable */
<template>
  <div class="tour-confirm-component p-2">
    <div class="container m-0 p-0 w-100">
      <div class="row d-flex align-items-center border-bottom p-2 m-0">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div class="text-left">
            <h5>
              <span
                class="font-weight-bolder text-lg"
              >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tourDetail.tourId.price)}}</span>
              <span class="text-sm font-weight-bold">/ {{tourDetail.tourId.from}} / {{tourDetail.tourId.to}}</span>
            </h5>
            <p class="text-sm">{{tourDetail.tourId.tourName}}</p>
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
      <div class="row p-2 justify-content-start border-bottom align-items-center m-0">
        <div class="col-12">
          <div class="form-group text-left">
            <label class="mb-0" for="icheckinout">
              <span class="text-sm font-weight-bold">Date</span>
            </label>
            <Datetime
              id="icheckinout"
              v-bind:startdate="selectTime.starDate"
              v-bind:enddate="selectTime.endDate"
              v-bind:cachotelprice="false"
            ></Datetime>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label class="mb-0" for="icheckinout">
              <span class="text-sm font-weight-bold">Guest</span>
            </label>
            <GuestSelectDropDown></GuestSelectDropDown>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left m-0">
            <label class="mb-0" for="icheckinout">
              <span class="text-sm font-weight-bold">Hạng khách sạn</span>
            </label>
            <CheckBoxGroup v-bind:name="'hotelStar'" v-bind:data="hotelStar" v-bind:icon="'star'" @select="requestData.hotelStar=$event"></CheckBoxGroup>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left m-0">
            <label class="mb-0" for="i">
              <span class="text-sm font-weight-bold">Số bữa chính</span>
            </label>
            <CheckBoxGroup v-bind:name="'meals'" v-bind:data="meals" v-bind:icon="'pizza-slice'"  @select="requestData.meal=$event"></CheckBoxGroup>
          </div>
        </div>
        <div class="col-12 mb-3 border-bottom">
          <div class="form-group text-left m-0">
            <label class="mb-0" for="i">
              <span class="text-sm font-weight-bold">Hướng dẫn viên</span>
            </label>
            <CheckBoxGroup v-bind:name="'translate'" v-bind:data="translate" @select="requestData.translate=$event"></CheckBoxGroup>
          </div>
        </div>

        <div class="col-12">
          <div class="form-group text-left">
            <label class="mb-0" for="ifullname">
              <span class="text-sm font-weight-bold" v-bind:class="formCheck.fullName">
                Full name
                <font-awesome-icon
                  class="text-danger"
                  icon="exclamation-circle"
                  v-if="(!formCheck.isFail && formCheck.fullName.length>0)"
                />
              </span>
            </label>
            <input
              type="text"
              class="form-control"
              id="ifullname"
              placeholder="Your name"
              v-model="customerInfo.fullName"
            />
          </div>
          <div class="form-group text-left">
            <label class="mb-0" for="iemail">
              <span class="text-sm font-weight-bold" v-bind:class="formCheck.email">
                Email
                <font-awesome-icon
                  class="text-danger"
                  icon="exclamation-circle"
                  v-if="(!formCheck.isFail && formCheck.email.length>0)"
                />
              </span>
            </label>
            <input
              type="email"
              class="form-control"
              id="iemail"
              placeholder="your@email.com"
              v-model="customerInfo.email"
            />
          </div>
          <div class="form-group text-left">
            <label class="mb-0" for="iphone">
              <span class="text-sm font-weight-bold" v-bind:class="formCheck.phone">
                Phone
                <font-awesome-icon
                  class="text-danger"
                  icon="exclamation-circle"
                  v-if="(!formCheck.isFail && formCheck.phone.length>0)"
                />
              </span>
            </label>
            <input
              type="tel"
              class="form-control"
              id="iphone"
              placeholder="+8498868686"
              v-model="customerInfo.phone"
            />
          </div>
          <div class="form-group text-left">
            <label class="mb-0" for="imessage">
              <span class="text-sm font-weight-bold">Message</span>
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
      </div>
      <div class="row px-2 m-0">
        <div class="col-12 px-2 mt-4">
          <button
            type="button"
            class="btn btn-danger w-100"
            @click="nextToResultStep" data-toggle="modal" data-target="#resultModal"
          >{{$t('btn_request')}}</button>
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
import TourService from "@/api/TourService";
import Datetime from "@/components/Datetime2.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import GuestSelectDropDown from "@/components/GuestSelectDropDown.vue";
import DestinationService from "@/api/DestinationService";
import CheckBoxGroup from "@/components/CheckBoxGroup.vue";

export default {
  components: {
    Datetime,
    LoadingComponent,
    GuestSelectDropDown,
    CheckBoxGroup
  },
  props: ["id"],
  name: "TourConfirmBooking",
  computed: {
    selectedTour() {
      return this.$store.state.selectedTour;
    }
  },
  mounted() {
    this.initial(this.$route.query.tourid);
  },
  data: function() {
    return {
      customerInfo: {
        fullName: "",
        email: "",
        phone: "",
        question: ""
      },
      formCheck: {
        fullName: "",
        email: "",
        phone: "",
        isFail: true
      },
      hotelStar: [
        {
          value: "Theo tour",
          text: "Theo tour",
          isIcon: false
        },
        {
          value: 1,
          text: 1,
          isIcon: true
        },
        {
          value: 2,
          text: 2,
          isIcon: true
        },
        {
          value: 3,
          text: 3,
          isIcon: true
        },
        {
          value: 4,
          text: 4,
          isIcon: true
        },
        {
          value: 5,
          text: 5,
          isIcon: true
        }
      ],
      meals: [
        {
          value: "Theo tour",
          text: "Theo tour",
          isIcon: false
        },
        {
          value: 1,
          text: 1,
          isIcon: true
        },
        {
          value: 2,
          text: 2,
          isIcon: true
        },
        {
          value: 3,
          text: 3,
          isIcon: true
        }
      ],
      translate: [
        {
          value: "Theo tour",
          text: "Theo tour",
          isIcon: false
        },
        {
          value: "Tiếng Anh",
          text: "Tiếng Anh",
          isIcon: false
        },
        {
          value: "Tiếng Hàn",
          text: "Tiếng Hàn",
          isIcon: false
        }
      ],
      selectTime: {
        startDate: moment().format("DD-MM-YYYY"),
        endDate: moment(new Date())
          .add(1, "days")
          .format("DD-MM-YYYY")
      },
      isLoadding: false,
      tourDetail: {},
      destination: {},
      requestData:{
        translate:{},
        hotelStar:{},
        meal:{}
      }
    };
  },
  methods: {
    showdata(value){
      this.data.translate=value;console.log(this.data.translate);
    },
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
        guest:this.$store.state.selectedHotel.guest,
        requestData:{
          translate:this.requestData.translate.value,
        hotelStar:this.requestData.hotelStar.value,
        meal:this.requestData.meal.value
          },
        destination: {
          _id: this.destination._id,
          destinationCode: this.destination.destinationCode,
          destinationName: this.destination.destinationName
        },
        tour: {
          _id: this.tourDetail.tourId._id,
          tourCode:this.tourDetail.tourId.tourCode,
          tourName: this.tourDetail.tourId.tourName
        }
      };
            console.log(parrams);
      var response = await TourService.postRequestTour(parrams);
      this.requestResult = response.data;
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
          isFail: false
        };

        return false;
      } else if (this.customerInfo.email.length === 0) {
         console.log('email fail')
        this.formCheck = {
          fullName: "",
          email: "text-danger",
          phone: "",
          isFail: false
        };

        return false;
      } else if (this.customerInfo.phone.length === 0) {
         console.log('phone fail')
        this.formCheck = {
          fullName: "",
          email: "",
          phone: "text-danger",
          isFail: false
        };

        return false;
      }
       else {
        this.formCheck = {
          fullName: "",
          email: "",
          phone: "",          
          isFail: true
        };
        return true;
      }
    },
    async initial(id) {
      this.$store.commit("showHideLoading", true);
      var response = await TourService.getTourDetailById(id);
      this.tourDetail = response.data;
      console.log(this.tourDetail);

      var desresp = await DestinationService.getDestinationById(
        response.data.tourId.destinationId
      );
      this.destination = desresp.data;
      console.log(this.destination);
      this.$store.commit("showHideLoading", false);
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
.tour-confirm-component {
  margin: 0 !important;
  position: absolute !important;
  z-index: 300000 !important;
  background-color: #fff !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw;
  padding: 0 !important;
  padding-bottom: 40px !important;
}
</style>
