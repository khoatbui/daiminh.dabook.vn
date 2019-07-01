<template>
  <div class="optionserviceselect-component btn-group w-100">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="form-control btn btn-outline-secondary btn-dropdown-optionservice w-100 text-left"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <font-awesome-icon class="ml-1 float-right" icon="chevron-down" />
    </button>

    <div
      class="dropdown-menu dropdown-menu-center optionservice-dropdown-menu"
      :class="`${id}-dropdown-menu`"
    >
      <div class="container">
        <div class="row m-1">
          <div class="col-12">
            <div class="row p-2">
              <div class="col-12 px-0 py-2 d-flex justify-content-start align-items-center" v-for="(item,index) in data">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" :id="`customSwitch-${index}`" :value="item" v-model="checkedNames" @change="updateSelectdOption"/>
                  <label class="custom-control-label" :for="`customSwitch-${index}`">{{item.optionServiceName}} <span class="text-sm">/{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.optionPrice)}}</span></label>
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
export default {
  props: ["id", "radius", "placeholder", "data"],
  name: "OptionSelectDropdown",
  created() {
    this.initiation();
  },
  computed: {
    selectOptionService(){
        console.log(this.$store.state.selectedHotel.selectOptionService);
        return this.$store.state.selectedHotel.selectOptionService;
    }
  },
  methods: {
    initiation() {
      var id = this.id;
      $(function() {
        $(".btn-dropdown-optionservice").on("click", function(event) {
          $(`.${id}-dropdown-menu`).toggleClass("show");
        });
        $(".optionservice-dropdown-menu.dropdown-menu.mega-dropdown-menu").on(
          "click",
          function(event) {
            event.stopPropagation();
          }
        );

        $(document).mouseup(function(e) {
          if (
            !$(".optionserviceselect-component").is(e.target) && // if the target of the click isn't the container...
            $(".optionserviceselect-component").has(e.target).length === 0 &&
            $(`.${id}-dropdown-menu`).hasClass("show")
          ) {
            $(`.${id}-dropdown-menu`).toggleClass("show");
          }
        });
      });
    },
    updateSelectdOption(){
        var totalPrice=0;
        this.checkedNames.forEach(element => {
            totalPrice+=element.optionPrice;
        });
         this.$store.dispatch('updateSelectOptionService',{
            'selectedOption':this.checkedNames,
            'totalPrice':totalPrice
        })
        console.log(this.$store.state.selectedHotel.selectOptionService);

    }
  },
  data: function() {
    return {
        checkedNames:[]
    };
  }
};
</script>
<style lang="scss">
.optionservice-setting {
  width: initial !important;
}
.optionservice-setting.form-control {
  width: 100px !important;
}
.btn-dropdown-optionservice {
  border: 1px solid #ced4da !important;
}
.btn-dropdown-optionservice:active,
.btn-dropdown-optionservice:focus,
.btn-dropdown-optionservice:hover {
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
.optionserviceselect-component .modal-dialog {
  margin: 0 !important;
}
.optionserviceselect-component .modal-content {
  width: 100vw;
  margin: 0 !important;
  padding: 0 !important;
  height: 100vh;
  padding-bottom: 40px !important;
}
</style>
