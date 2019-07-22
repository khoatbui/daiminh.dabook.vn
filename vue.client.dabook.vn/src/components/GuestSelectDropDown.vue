<template>
  <div class="guestselect-component btn-group w-100">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="form-control btn btn-outline-secondary btn-dropdown-guest w-100 text-left text-sm"
      aria-haspopup="true"
      aria-expanded="false"
    >
     {{`Adult:${adult} | Children:${less12} | Infant:${less4}`}} <font-awesome-icon class="ml-1 float-right" icon="chevron-down"/>
    </button>

    <div
      class="dropdown-menu dropdown-menu-center guest-dropdown-menu"
      :class="`${id}-dropdown-menu`"
    >
      <div class="container">
        <div class="row m-1">
          <div class="col-12">
            <div class="row p-2 justify-content-start align-items-center">
              <div class="col-6 pl-0 text-left">
                <p class="m-0">Adults</p>
              </div>
              <div class="col-1 p-0 m-0">
                <button
                  type="button"
                  class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  @click="updatePersonByVuex('minusAdult')"
                  :disabled="adult==0"
                >
                  <font-awesome-icon class="ml-1" icon="minus"/>
                </button>
              </div>
              <div class="col-4 m-0 pr-1">
                <input
                  type="text"
                  class="form-control"
                  v-bind:value="adult"
                  readonly
                  placeholder="10"
                >
              </div>
              <div class="col-1 p-0 m-0">
                <button
                  type="button"
                  class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  @click="updatePersonByVuex('plusAdult')"
                  :disabled="adult==maxguest"
                >
                  <font-awesome-icon class="ml-1" icon="plus"/>
                </button>
              </div>
            </div>
            <div class="row p-2 justify-content-start align-items-center">
              <div class="col-6 pl-0 text-left">
                <p class="m-0">Children</p>
                <p class="m-0 text-sm">Ages 4-12</p>
              </div>
              <div class="col-1 p-0 m-0">
                <button
                  type="button"
                  class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  @click="updatePersonByVuex('minusChildLess12')"
                  :disabled="less12==0"
                >
                  <font-awesome-icon class="ml-1" icon="minus"/>
                </button>
              </div>
              <div class="col-4 m-0 pr-1">
                <input
                  type="text"
                  class="form-control"
                  readonly
                  v-bind:value="less12"
                  placeholder="10"
                >
              </div>
              <div class="col-1 p-0 m-0">
                <button
                  type="button"
                  class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  @click="updatePersonByVuex('plusChildLess12')"
                >
                  <font-awesome-icon class="ml-1" icon="plus"/>
                </button>
              </div>
            </div>
            <div class="row p-2 justify-content-start align-items-center">
              <div class="col-6 pl-0 text-left">
                <p class="m-0">Children</p>
                <p class="m-0 text-sm">Ages 0~4</p>
              </div>
              <div class="col-1 p-0 m-0">
                <button
                  type="button"
                  class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  @click="updatePersonByVuex('minusChildLess4')"
                  :disabled="less4==0"
                >
                  <font-awesome-icon class="ml-1" icon="minus"/>
                </button>
              </div>
              <div class="col-4 m-0 pr-1">
                <input
                  type="text"
                  class="form-control"
                  v-bind:value="less4"
                  readonly
                  placeholder="10"
                >
              </div>
              <div class="col-1 p-0 m-0">
                <button
                  type="button"
                  class="btn btn-sm btn-primary border-radius-100 btn-sm-round"
                  @click="updatePersonByVuex('plusChildLess4')"
                >
                  <font-awesome-icon class="ml-1" icon="plus"/>
                </button>
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
export default {
  props: ["id", "radius", "placeholder", "data", "maxguest", "maxchildren"],
  name: "GuestSelectDropdown",
  created() {
    this.initiation();
  },
  computed: {
    adult () {
	    return this.$store.state.selectedHotel.guest.adult.qty
    },
    less4(){
      return this.$store.state.selectedHotel.guest.children.less4.qty
    },
    less12(){
      return this.$store.state.selectedHotel.guest.children.less12.qty
    }
  },
  methods: {
    initiation() {
      var id = this.id;
      $(function() {
        $(".btn-dropdown-guest").on("click", function(event) {
          $(`.${id}-dropdown-menu`).toggleClass("show");
        });
        $(".guest-dropdown-menu.dropdown-menu.mega-dropdown-menu").on(
          "click",
          function(event) {
            event.stopPropagation();
          }
        );

        $(document).mouseup(function(e) {
          if (
            !$(".guestselect-component").is(e.target) && // if the target of the click isn't the container...
            $(".guestselect-component").has(e.target).length === 0 && $(`.${id}-dropdown-menu`).hasClass('show')
          ) {
            $(`.${id}-dropdown-menu`).toggleClass("show");
          }
        });
      });
    },
    plusPersonByVuex(plusTarget) {
      this.$store.commit(plusTarget)
    },
    minusPersonByVuex(minusTarget) {
      this.$store.commit(minusTarget)
    },
    updatePersonByVuex(action){
      this.$store.dispatch('updateGuest',action)
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
.btn-dropdown-guest {
  border: 1px solid #ced4da !important;
}
.btn-dropdown-guest:active,
.btn-dropdown-guest:focus,
.btn-dropdown-guest:hover {
  border: 1px solid #007bff !important;
  background-color: #ffffff !important;
}
.dropdown-menu {
  border-top-left-radius: none !important;
  border-top-right-radius: none !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  width: 100%;
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
.guestselect-component .modal-dialog {
  margin: 0 !important;
}
.guestselect-component .modal-content {
  width: 100vw;
  margin: 0 !important;
  padding: 0 !important;
  height: 100vh;
  padding-bottom: 40px !important;
}
</style>
