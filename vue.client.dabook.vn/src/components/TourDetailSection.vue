//src/components/Navbar.vue
<template>
  <div>
    <div class="hotel-detail-section" v-if="tourDetail.length>0">
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 p-0 m-0">
          <div class="card d-inline-block border-0 w-100">
            <div id="carousel-img" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li
                  data-target="#carousel-img"
                  v-for="(subitem,index) in tourDetailByLang.tourId.tourImages"
                  v-bind:class="{'active':index==0}"
                  v-bind:data-slide-to="index"
                ></li>
              </ol>
              <div class="carousel-inner default-bg h-200">
                <div
                  class="carousel-item h-100"
                  v-for="(subitem,index) in tourDetailByLang.tourId.tourImages"
                  v-bind:class="{'active':index==0}"
                >
                  <img
                    v-bind:src="tourDetailByLang.tourId.tourImages.length>0?subitem.filePath:'img/hotel/roomtype/default.jpg'"
                    class="d-block card-img-top h-100"
                    alt="..."
                  />
                </div>
              </div>
              <a class="carousel-control-prev" href="#carousel-img" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carousel-img" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left">
            <h4>
              <b>{{tourDetailByLang.tourId.tourName}}</b>
            </h4>
          </div>
        </div>
        <div class="col-12 px-3 m-0">
          <div class="m-2 d-flex justify-content-between align-items-center">
            <span>{{destination.destinationName}}</span>
            <img
              class="hotel-owner-avatar shadow"
              :src="destination.destinationImages.length>0?destination.destinationImages[0].filePath:'img/hotel/supplier/default.jpg'"
              alt
            />
          </div>
        </div>
        <!-- <div class="col-12 px-3 m-0 text-left">
        <div class="m-2 pb-4 border-bottom">
          <h6 class="font-weight-bolder">{{selectedCar.carTransTypeId.carTransTypeName}}</h6>
          <div>
            <span
              class="text-sm"
            >{{selectedCar.kmTotal}} km - {{selectedCar.nightTotal}} night</span>
          </div>
        </div>
        </div>-->
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left">
            <p class="text-sm">{{tourDetailByLang.tourId.tourIntro}}</p>
          </div>
        </div>
        <div class="col-12 px-3 m-0 text-left ">
          <p class="p-0 m-2 d-flex justify-content-between align-items-center">
            <span>
              <span
                class="badge badge-success text-sm font-weight-lighter"
                v-if="tourDetailByLang.tourId.voteScore !=''"
              >
                <span
                  class="badge badge-light text-success text-sm font-weight-bold mr-1"
                >{{tourDetailByLang.tourId.voteScore}}</span>
                <span>{{tourDetailByLang.tourId.voteStatus}}</span>
              </span>
            </span>
            <span
              class="card-text text-ssm hidden-outof-text text-success"
            >Có thể đặt từ ngày {{bookingDate}}</span>
          </p>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
          <div class="col-12 px-3 m-0">
          <div class="m-2 text-left py-4 border-bottom  border-top">
            <h6 class="font-weight-bolder">Contact host</h6>
            <div class="w-100 text-left">
              <ContactHost></ContactHost>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left pb-4 border-bottom">
            <h6 class="font-weight-bolder">Program</h6>
            <div class="w-100 text-left">
              <div class="text-sm" v-html="tourDetailByLang.program"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left pb-4 border-bottom">
            <h6 class="font-weight-bolder">Transport</h6>
            <div class="w-100 text-left">
              <div class="text-sm" v-html="tourDetailByLang.transport"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left pb-4 border-bottom">
            <h6 class="font-weight-bolder">Service Include</h6>
            <div class="w-100 text-left">
              <div class="text-sm" v-html="tourDetailByLang.serviceInclude"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left pb-4 border-bottom">
            <h6 class="font-weight-bolder">Service Not Include</h6>
            <div class="w-100 text-left">
              <div class="text-sm" v-html="tourDetailByLang.serviceNotInclude"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left pb-4 border-bottom">
            <h6 class="font-weight-bolder">Should Take</h6>
            <div class="w-100 text-left">
              <div class="text-sm" v-html="tourDetailByLang.shouldTake"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="action-section">
        <div
          class="row w-100 p-0 mx-0 fixed-bottom border-top py-2 align-items-start bg-white action-section-modal z-index-10001"
        >
          <div class="col-6 text-left pr-1 align-self-end">
            <a v-show="typeof tourDetailByLang.detailDocs!=='undefined' && tourDetailByLang.detailDocs.length!==0"
              class="btn btn-light text-primary border-0 w-100"
              :href="(typeof tourDetailByLang.detailDocs!=='undefined' && tourDetailByLang.detailDocs.length>0) ? tourDetailByLang.detailDocs[0].filePath :'#'" target="_blank" role="button"
            ><font-awesome-icon class="ml-1" icon="file-contract"/> {{ $t('btn_downloadtour') }}
            </a>
            <p class="text-xs" v-show="typeof tourDetailByLang.detailDocs!=='undefined' && tourDetailByLang.detailDocs.length!==0"> Vui lòng tải file để xem thông tin chi tiết</p>
          </div>
          <div class="col-6 pl-1">
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
    <div class="relate-section text-sm">
      <div class="row w-100 p-0 mx-0 border-bottom">
        <div class="col-12 p-1 m-0">
          <div class="m-2 text-left">
            <h4>
              <b>Best hotel for you</b>
            </h4>
          </div>
        </div>
        <HotelPromotionSection v-bind:showTitle="false"></HotelPromotionSection>
      </div>
    </div>
  </div>
</template>
<script>
import TourService from "@/api/TourService";
import DestinationService from "@/api/DestinationService";
import LoadingComponent from "@/components/LoadingComponent.vue";
import HotelPromotionSection from "@/components/HotelPromotionSection.vue";
import ContactHost from "@/components/ContactHost.vue"
import moment from "moment";
import i18n from "@/i18n";

export default {
  components: {
    LoadingComponent,
    HotelPromotionSection,
    ContactHost
  },
  name: "CarDetailSection",
  data() {
    return {
      componentLoaded: false,
      tourDetail: [],
      destination: {},
      bookingDate:moment().format('MM-DD-YYYY')
    };
  },
  created() {
    this.initial(this.$route.query.tourid);
  },
  methods: {
    redirectToConfirm: function() {
      this.$router.push(
        `/tourdetail/confirm?tourid=${this.$route.query.tourid}`
      );
    },
    redirectToPromotionAll() {
      this.$router.push({ path: "carviewall" });
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
  },
  computed: {
    selectedCar() {
      return this.$store.state.selectedCar;
    },
    tourDetailByLang(){
      var result= this.tourDetail.filter(item =>{
        return item.lang.toUpperCase()==this.$store.state.currentLang.toUpperCase();
      })
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
