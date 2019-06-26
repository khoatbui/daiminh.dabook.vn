<template>
  <div class="search-component">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="form-control btn btn-primary border-radius-100 guest-setting"
      data-toggle="modal"
      data-target="#hotelFilterModal" @click="changeZIndex"
    >Filter</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="hotelFilterModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="hotelFilterModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header  d-flex align-items-center">
            <h5 class="modal-title" id="hotelFilterModalLabel">Select filter</h5>
             <button
              type="button"
              class="close border-radius-100 shadow close-btn mx-1 text-sm"
              data-dismiss="modal"
              aria-label="Close"
            >
              <font-awesome-icon icon="times"/>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row p-2 pb-4 justify-content-start align-items-center border-bottom">
                <div class="col-12">
                  <h6 class="text-left mb-0 font-weight-bolder">Price range</h6>
                  <p class="text-sm text-left">Khoảng giá trung bình là 800.000 đ / per night</p>
                </div>
                <div class="col-12 pt-4">
                  <vue-slider v-model="filter.price" :tooltip="'always'" :max="30000000"  :tooltip-formatter="filter.priceformat"></vue-slider>
                </div>
              </div>
             <div class="row p-2 pb-4 justify-content-start align-items-center border-bottom">
                <div class="col-12">
                  <h6 class="text-left mb-0 font-weight-bolder">Number of guest</h6>
                  <p class="text-sm text-left mb-1">Số người trong phòng</p>
                </div>
                <div class="col-12">
                  <GuestSelectDropDown></GuestSelectDropDown>
                </div>
              </div>
              <div class="row p-2 pb-4 justify-content-start align-items-center border-bottom">
                <div class="col-12">
                  <h6 class="text-left mb-0 font-weight-bolder">Number of beds</h6>
                  <p class="text-sm text-left mb-1">Số giường trong phòng</p>
                </div>
                <div class="col-12">
                  <div class="row px-3">
                    <div class="col-6 pl-0 text-left">
                  <p class="m-0">Beds</p>
                </div>
                <div class="col-1 p-0 m-0">
                  <button
                    type="button"
                    class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  >
                    <font-awesome-icon class="ml-1" icon="minus"/>
                  </button>
                </div>
                <div class="col-4 m-0">
                  <input type="text" class="form-control" readonly placeholder="10">
                </div>
                <div class="col-1 p-0 m-0">
                  <button
                    type="button"
                    class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  >
                    <font-awesome-icon class="ml-1" icon="plus"/>
                  </button>
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-light text-primary"
              data-dismiss="modal"
            >Close</button>
            <button type="button" class="btn btn-sm btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import GuestSelectDropDown from "@/components/GuestSelectDropDown.vue";

export default {
  components:{
GuestSelectDropDown
  },
  props: ["id", "radius", "placeholder"],
  name: "FilterHotel",
  created() {},
  methods: {
     changeZIndex:function(){
         $('.search-section-modal').addClass('z-index-10001').removeClass('z-index-10000');
          $('.action-section-modal').addClass('z-index-10000').removeClass('z-index-10001');
      }
  },
  data: function() {
    return {
      filter:{
        'price':[5000000,20000000],
        priceformat: v => {return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)}
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
.search-component .modal-dialog{
  margin: 0 !important;
}
.search-component .modal-content{
  width: 100vw;
    margin: 0 !important;
    padding: 0 !important;
    height: 100vh;
    padding-bottom: 40px !important;
}
</style>
