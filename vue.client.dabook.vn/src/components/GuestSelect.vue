<template>
  <div class="search-component">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="form-control btn btn-primary border-radius-100 guest-setting"
      data-toggle="modal"
      data-target="#exampleModal" @click="changeZIndex"
    >Guests</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Select guest</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row p-2 justify-content-start align-items-center">
                <div class="col-7 pl-0 text-left">
                  <p class="m-0">Adults</p>
                </div>
                <div class="col-1 p-0 m-0">
                  <button
                    type="button"
                    class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  >
                    <font-awesome-icon class="ml-1" icon="minus"/>
                  </button>
                </div>
                <div class="col-3 m-0">
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
              <div class="row p-2 justify-content-start align-items-center">
                <div class="col-7 pl-0 text-left">
                  <p class="m-0">Children</p>
                  <p class="m-0 text-sm">Ages 4-12</p>
                </div>
                <div class="col-1 p-0 m-0">
                  <button
                    type="button"
                    class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  >
                    <font-awesome-icon class="ml-1" icon="minus"/>
                  </button>
                </div>
                <div class="col-3 m-0">
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
              <div class="row p-2 justify-content-start align-items-center">
                <div class="col-7 pl-0 text-left">
                  <p class="m-0">Children</p>
                  <p class="m-0 text-sm">Ages 4-12</p>
                </div>
                <div class="col-1 p-0 m-0">
                  <button
                    type="button"
                    class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  >
                    <font-awesome-icon class="ml-1" icon="minus"/>
                  </button>
                </div>
                <div class="col-3 m-0">
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
  <!-- <div class="dropdown-pa">
    <input class="form-control border-radius-100 guest-setting"  type="text"  name="guestfilter"  value  readonly="true"  placeholder="Guest">
    <div class="dropdown-component">
        <h6>Please select</h6>
    </div>
  </div>-->
</template>
<script>
import axios from "axios";
export default {
  props: ["id", "radius", "placeholder"],
  name: "GuestSelect",
  created() {},
  methods: {
     changeZIndex:function(){
         $('.search-section-modal').addClass('z-index-10001').removeClass('z-index-10000');
          $('.action-section-modal').addClass('z-index-10000').removeClass('z-index-10001');
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
