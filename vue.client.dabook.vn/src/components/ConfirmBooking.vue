/* eslint-disable */
<template>
  <div class="confirm-component">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-danger w-100"
      data-toggle="modal"
      data-target="#confirmModal"
      @click="changeZIndex"
    >{{ $t('bnextstep') }}</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="confirmModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header d-flex align-items-center border-bottom">
            <div class="text-left">
              <h5 class="modal-title" id="confirmModalLabel">
                <span class="font-weight-bolder text-lg">800.000 đ</span>
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
              data-dismiss="modal"
              aria-label="Close"
            >
              <font-awesome-icon icon="times"/>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row p-2 justify-content-start align-items-center">
                <div class="col-12">
                  <div class="form-group text-left">
                    <label for="icheckinout">
                      <span class="text-sm">Date</span>
                    </label>
                    <Datetime id="icheckinout"></Datetime>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group text-left">
                    <label for="iguest">
                      <span class="text-sm">Guest</span>
                    </label>
                    <GuestSelectDropDown id="iguest"></GuestSelectDropDown>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group text-left">
                    <label for="iwhere">
                      <span class="text-sm">Option Service</span>
                    </label>
                    <input type="email" class="form-control" id="iwhere" placeholder="Option">
                  </div>
                </div>
                <div class="col-12">
                  <div class="row text-smd">
                    <div class="col-12 border-bottom p-2">
                      <div class="d-flex justify-content-between align-items-center">
                        <span>
                          800.000 đ x
                          <span class="text-sm">3 night</span>
                        </span>
                        <span>2.400.000 đ</span>
                      </div>
                    </div>
                    <div class="col-12 border-bottom p-2">
                      <div class="d-flex justify-content-between align-items-center">
                        <span>
                          Phụ thu trẻ em x
                          <span class="text-sm">3 children</span>
                        </span>
                        <span>2.400.000 đ</span>
                      </div>
                    </div>
                    <div class="col-12 border-bottom p-2">
                      <div class="d-flex justify-content-between align-items-center">
                        <span>OptionService</span>
                        <span>2.400.000 đ</span>
                      </div>
                    </div>
                    <div class="col-12 border-bottom p-2">
                      <div class="d-flex justify-content-between align-items-center text-success">
                        <span>Discount</span>
                        <span>- 2.400.000 đ</span>
                      </div>
                    </div>
                    <div class="col-12 p-2">
                      <div
                        class="d-flex justify-content-between align-items-center font-weight-bolder"
                      >
                        <span>Total</span>
                        <span>2.400.000 đ</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 p-0 mt-4">
                  <button
                    type="button"
                    class="btn btn-danger w-100"
                  >Confirm</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="text-sm text-left"> 
                <span class="text-danger">Note :</span>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, consequatur. Labore alias natus iusto, illum deleniti ipsa fuga incidunt voluptatum voluptatibus ab vitae dolores eos tempore aut est libero exercitationem.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="dropdown-pa">
    <input class="form-control border-radius-100 guest-setting"  type="text"  name="guestfilter"  value  readonly="true"  placeholder="Guest">
    <div class="dropdown-component">
        <h6>Please select</h6>
    </div>
  </div>-->
</template>
<script>
import axios from "axios";
import Datetime from "@/components/Datetime2.vue";
import GuestSelectDropDown from "@/components/GuestSelectDropDown.vue";
export default {
  components: {
    Datetime,
    GuestSelectDropDown
  },
  props: ["id", "radius", "placeholder"],
  name: "ConfirmBooking",
  created() {},
  methods: {
    changeZIndex: function() {
      $(".search-section-modal")
        .addClass("z-index-10000")
        .removeClass("z-index-10001");
      $(".action-section-modal")
        .addClass("z-index-10001")
        .removeClass("z-index-10000");
    }
  },
  data: function() {
    return {};
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
.confirm-component .modal-dialog {
  margin: 0 !important;
}
.confirm-component .modal-content {
  width: 100vw;
  margin: 0 !important;
  padding: 0 !important;
  height: 100vh;
  padding-bottom: 40px !important;
}
.close-btn {
  width: 40px !important;
  height: 40px !important;
  padding: 0 !important;
}
.close-btn svg {
  font-size: 1rem;
}
</style>
