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
    >{{ $t('bt_nextstep') }}</button>

    <!--Confirm Modal -->
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
                    @click="nextToRequestStep"
                    data-toggle="modal"
                    data-target="#requestModal"
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

    <!--Request Modal -->
    <div
      class="modal fade"
      id="requestModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="requestModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header border-bottom">
            <div class="row w-100">
              <div class="col-12 w-100 d-flex justify-content-between align-items-center">
                <div class="text-left">
                  <h5 class="modal-title" id="requestModalLabel">
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
              <div class="col-12">
                <!-- <StepComponent></StepComponent> -->
              </div>
            </div>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row p-2 justify-content-start align-items-center">
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
                  <button type="button" class="btn btn-danger w-100"  @click="nextToResultStep"
                    data-toggle="modal"
                    data-target="#resultModal">Request</button>
                </div>
              </div>
            </div>
          </div>
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
                    <img class="ticket-bg" src="img/hotel/ticketbg.png" alt="">
                    <input class="ticket-code" type="text" value="FCD1505303">
                    <h4><span class="badge badge-primary ticket-status">Status : In process</span></h4>
                    <span class="ticket-owner">Bui Van Khoat</span>
                  </div>
                </div>
                <div class="col-12">
                  <p class="text-sm mb-0 text-left text-danger">Note</p>
                  <p class="text-sm text-left">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat commodi dolore voluptates quisquam itaque quo error debitis sapiente natus nostrum, eos, quaerat quasi esse repellat, praesentium quod sequi illo facilis.
                  </p>
                </div>
                <div class="col-12 text-left">
                  <a href="#" class="text-sm">Show more</a>
                </div>
                <div class="col-12 p-0 mt-4">
                  <button type="button" class="btn btn-danger w-100">Copy Ticket Code & Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Datetime from "@/components/Datetime2.vue";
import GuestSelectDropDown from "@/components/GuestSelectDropDown.vue";
import StepComponent from "@/components/StepComponent.vue";
export default {
  components: {
    Datetime,
    GuestSelectDropDown,
    StepComponent
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
    },
    nextToRequestStep() {}
  },
  data: function() {
    return {};
  }
};
</script>
<style lang="scss">
#confirmModal,#requestModal {
  background-color: #ffffff !important;
}
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
.ticket-bg{
  width: 100%;
  height: auto;
}
.ticket-result{
  position: relative;
  width: auto;
  margin:2px;
}
.ticket-code{
  position: absolute;
    top: 50px;
    left: -15px;
    -webkit-transform: rotate(180deg);
    transform: rotate(270deg);
    min-width: 100px;
    width: 100px;
    background-color: #374B66;
    border: none;
    color: #FFF;
    font-weight: bold;
}
.ticket-status{
      position: absolute;
    bottom: 50px;
    right: 0;
    transform: translate(-20%, 50%);
}
.ticket-owner{
   position: absolute;
    top: 50px;
    right: 0;
    transform: translate(-50%, -50%);
    color:#FFF;
    font-size: 1.3rem;
}
</style>
