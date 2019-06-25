<template>
  <div>
    <input
      :id="id"
      class="form-control dates-setting"
      type="text"
      name="datefilter"
      value
      readonly="true"
      :placeholder="placeholder"
      v-bind:class="radius"
    >
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["id","radius","placeholder"],
  name: "DateTime",
  created() {
    this.initialize();
  },
  methods: {
    initialize: function() {
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
            picker.startDate.format("MM/DD/YYYY") +
              " - " +
              picker.endDate.format("MM/DD/YYYY")
          );
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
  width: fit-content !important;
}
.dates-setting.form-control {
  min-width: 100px !important;
  width: fit-content !important;
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
.prev.available,.next.available{
  background-color: #007bff !important;
  color:#FFFFFF!important;
}
.prev.available>span,.next.available>span{
  color:#FFFFFF !important;
  border-color:#FFFFFF !important;
}
.start-date,.start-date.in-range,.in-range.end-date{
  background-color: #049DD9 !important;
}
.in-range{
  background-color: rgba(4, 157, 217,0.6) !important;
}
</style>
