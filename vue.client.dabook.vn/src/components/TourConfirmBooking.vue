/* eslint-disable */
<template>
  <div class="tour-confirm-component p-2"  v-if="tourDetail.length>0">
    <div class="container m-0 p-0 w-100">
      <div class="row d-flex align-items-center border-bottom p-2 m-0">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div class="text-left">
            <h5>
              <span
                class="font-weight-bolder text-lg"
              >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tourDetailByLang.tourId.price)}}</span>
              <span class="text-sm font-weight-bold">/ {{tourDetailByLang.tourId.from}} / {{tourDetailByLang.tourId.to}}</span>
            </h5>
            <p class="text-sm">{{tourDetailByLang.tourId.tourName}}</p>
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
        <!-- Confirm Modal -->
    <div
      class="modal"
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
                  @click="isShowModal=false"
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
    },
    tourDetailByLang(){
      console.log(this.$store.state.currentLang);
      var result= this.tourDetail.filter(item =>{
        return item.lang.toUpperCase()==this.$store.state.currentLang.toUpperCase();
      })
      console.log('fileter result')
      console.log(result);
      result[0].tourId.tourIntros.forEach(intro => {
          if (intro.lang.toUpperCase()===this.$store.state.currentLang.toUpperCase()) {
            result[0].tourId.tourIntro=intro.tourIntro;
             result[0].tourId.tourName=intro.tourName;
              result[0].tourId.from=intro.from;
              result[0].tourId.to=intro.to;
          }
        });
      return result[0];
    }
  },
  mounted() {
    this.initial(this.$route.query.tourid);
  },
  data: function() {
    return {
       isShowModal:false,
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
      tourDetail: [],
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
      this.data.translate=value;
    },
    backStep() {
      this.$router.go(-1);
    },
    async nextToResultStep() {
      if(this.formChecking()){
      this.$store.commit("showHideLoading", true);
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
      var response = await TourService.postRequestTour(parrams);
      this.requestResult = response.data;
      this.$store.commit("showHideLoading", false);
      this.isShowModal=true;
      }
      else{
        console.log('fail');
        return
      }
    },
    formChecking() {
      if (this.customerInfo.fullName.length === 0) {
        this.formCheck = {
          fullName: "text-danger",
          email: "",
          phone: "",
          isFail: false
        };

        return false;
      } else if (this.customerInfo.email.length === 0) {
        this.formCheck = {
          fullName: "",
          email: "text-danger",
          phone: "",
          isFail: false
        };

        return false;
      } else if (this.customerInfo.phone.length === 0) {
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
        response.data[0].tourId.destinationId
      );
      this.destination = desresp.data;
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
