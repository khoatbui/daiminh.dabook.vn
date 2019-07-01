<template>
  <div>
    <input
      :id="id"
      class="form-control dates-setting w-100"
      type="text"
      name="datefilter"
      :value="selectDate"
      readonly="true"
      :placeholder="placeholder"
      v-bind:class="radius"
    >
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["id", "radius", "placeholder", "startdate", "enddate","cachotelprice"],
  name: "DateTime",
  created() {
    this.initialize();
  },computed: {
    selectDate () {
      if (this.cachotelprice==true) {
        this.$store.commit('updateSelectedPriceByTime');
      }
	    return this.$store.state.selectDate.startDate + " => " + this.$store.state.selectDate.endDate;
    }
  },
  methods: {
    initialize: function() {
      var me = this;
      $(function() {
        $('input[name="datefilter"]').daterangepicker({
          autoUpdateInput: false,
          locale: {
            cancelLabel: "Clear"
          }
        });

        $('input[name="datefilter"]').on("apply.daterangepicker", function(
          ev,
          picker
        ) {
          $(this).val(
            picker.startDate.format("YYYY-MM-DD") +
              " => " +
              picker.endDate.format("YYYY-MM-DD")
          );
          me.$store.dispatch('updateSelectDate',{
            startDate: picker.startDate.format("YYYY-MM-DD"),
            endDate: picker.endDate.format("YYYY-MM-DD")
          });
        });

        $('input[name="datefilter"]').on("cancel.daterangepicker", function(
          ev,
          picker
        ) {
          $(this).val("");
        });
      });
    }
  },
  data: function() {
    return {};
  }
};
</script>
<style lang="scss">
.dates-setting {
  width: 100% !important;
}
.dates-setting.form-control {
  min-width: 100px !important;
  width: 100% !important;
}
.daterangepicker {
  position: fixed !important;
  top: 0px !important;
  left: 0px !important;
  width: 100%;
  z-index: 100000000000000 !important;
  height: 100vh;
}
.drp-calendar.left,
.drp-calendar.right {
  width: 100% !important;
  padding: 10px !important;
  margin: 0 !important;
  box-sizing: border-box;
}
.daterangepicker .drp-calendar {
  max-width: none;
}
input:read-only {
  background-color: white !important;
  color: #2c3e50;
}
.prev.available,
.next.available {
  background-color: #007bff !important;
  color: #ffffff !important;
}
.prev.available > span,
.next.available > span {
  color: #ffffff !important;
  border-color: #ffffff !important;
}
.start-date,
.start-date.in-range,
.in-range.end-date {
  background-color: #049dd9 !important;
}
.in-range {
  background-color: rgba(4, 157, 217, 0.6) !important;
}
</style>
