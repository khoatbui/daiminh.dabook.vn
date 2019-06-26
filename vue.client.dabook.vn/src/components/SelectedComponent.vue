<template>
  <div class="guestselect-component btn-group w-100">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="form-control btn btn-outline-secondary btn-dropdown-guest w-100 text-left"
      aria-haspopup="true"
      aria-expanded="false"
    >
    <font-awesome-icon class="ml-1 float-right" icon="chevron-down"/>
    </button>

    <div class="dropdown-menu dropdown-menu-center guest-dropdown-menu">
      <div class="container">
        <div class="row m-1">
          <div class="col-12">
            <div class="row p-2 justify-content-start align-items-center" v-for="(item,index) in listitem">
              <dv class="col-12">
                  {{item.text}}
              </dv>
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
  props: ["id", "radius", "placeholder","listitem"],
  name: "GuestSelectDropdown",
  created() {
     this.initiation();
  },
  methods: {
    initiation() {
        $(function() {
      $(".btn-dropdown-guest").on("click", function(event) {
        console.log("a");
        $(".guest-dropdown-menu").toggleClass("show");
      });
      $(".guest-dropdown-menu.dropdown-menu.mega-dropdown-menu").on(
        "click",
        function(event) {
          event.stopPropagation();
        }
      );
     });
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
