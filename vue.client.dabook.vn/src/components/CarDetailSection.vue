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
                v-for="(subitem,index) in carType.carImages"
                v-bind:class="{'active':index==0}"
                v-bind:data-slide-to="index"
              ></li>
            </ol>
            <div class="carousel-inner default-bg h-200">
              <div
                class="carousel-item h-100"
                v-for="(subitem,index) in carType.carImages"
                v-bind:class="{'active':index==0}"
              >
                <img
                  v-bind:src="carType.carImages.length>0?subitem.filePath:'img/hotel/roomtype/default.jpg'"
                  class="d-block card-img-top h-100"
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
            <b>{{carType.carTypeName}} [{{selectedCar.carTransTypeId.carTransTypeName}}]</b>
          </h4>
        </div>
      </div>
      <div class="col-12 px-3 m-0">
        <div class="m-2 d-flex justify-content-between align-items-center">
          <span>{{selectedCar.fromLocation}}   <font-awesome-icon class="ml-1 text-default" icon="car-side" /> {{selectedCar.toLocation}}</span>
          <img class="hotel-owner-avatar shadow" :src="selectedCar.supplierId.supplierImages.length>0?selectedCar.supplierId.supplierImages[0].filePath:'img/hotel/supplier/default.jpg'" alt />
        </div>
      </div>
      <div class="col-12 px-3 m-0 text-left">
        <div class="m-2 pb-4 border-bottom">
          <h6 class="font-weight-bolder">{{selectedCar.carTransTypeId.carTransTypeName}}</h6>
          <div>
            <span
              class="text-sm"
            >{{selectedCar.kmTotal}} km - {{selectedCar.nightTotal}} night</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row w-100 p-0 mx-0">
      <div class="col-12 px-3 m-0">
        <div class="m-2 text-left">
          <p class="text-sm">{{selectedCar.carTransTypeId.carTransTypeIntro}}</p>
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
          <h6 class="font-weight-bolder">Car info</h6>
          <div class="w-100 text-left">
              <p class="text-sm">
                  {{carType.carTypeIntro}}
              </p>
          </div>
          <div class="w-100 d-flex justify-content-between align-items-center flex-wrap">
            
          </div>
        </div>
      </div>
    </div>
    <div class="row w-100 p-0 mx-0">
      <div class="col-12 px-3 m-0">
        <div class="m-2 text-left pb-4 border-bottom">
          <h6 class="font-weight-bolder">Lộ trình</h6>
           <div class="w-100 text-left">
              <p class="text-sm">
                  {{selectedCar.tripIntro}}
              </p>
          </div>
        </div>
      </div>
    </div>
    <div class="action-section">
      <div
        class="row w-100 p-0 mx-0 fixed-bottom border-top py-4 bg-white action-section-modal z-index-10001"
      >
        <div class="col-6 text-left">
          <div>
            <span class="font-weight-bolder">
              <span class="text-sm">from</span>
              {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedCar.totalPrice)}}
            </span>
            </div>
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
import CarTypeService from "@/api/CarTypeService";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  components: {
    LoadingComponent
  },
  name: "CarDetailSection",
  data() {
    return {
      componentLoaded: false,
      carType:{}
    };
  },
  created() {
      this.initial(this.$route.query.cartypeid);
  },
  methods: {
    redirectToConfirm: function() {
      this.$router.push(
        `/cardetail/confirm?cardetailpriceid=${this.$route.query.cardetailpriceid}`
      );
    },
    redirectToPromotionAll() {
      this.$router.push({ path: "carviewall" });
    },
async initial(id) {
      this.$store.commit('showHideLoading',true);
      var response = await CarTypeService.getCarTypeById(id);
      this.carType = response.data;
      console.log(this.carType);
      this.$store.commit('showHideLoading',false);
      this.componentLoaded = true;
    }
  },
  computed: {
    selectedCar() {
      return this.$store.state.selectedCar;
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
