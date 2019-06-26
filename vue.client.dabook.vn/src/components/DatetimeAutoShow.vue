<template>
  <div>
    <div class="daterange-auto-show">
      <input
        :id="id"
        class="form-control dates-setting"
        type="text"
        name="daterangeautoshow"
        value
        readonly="true"
        :placeholder="placeholder"
        v-bind:class="radius"
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["id", "radius", "placeholder"],
  name: "DateTimeAutoShow",
  created() {
    this.initialize();
  },
  methods: {
    initialize: function() {
      $(function() {
        $('input[name="daterangeautoshow"]').daterangepicker({
          autoUpdateInput: false,
          locale: {
            cancelLabel: "Clear"
          },
          "cancelClass": "btn-light btn-parent-block"
        });

        $('input[name="daterangeautoshow"]').on(
          "apply.daterangepicker",
          function(ev, picker) {
            $(this).val(
              picker.startDate.format("MM/DD/YYYY") +
                " - " +
                picker.endDate.format("MM/DD/YYYY")
            );
          }
        );

        $('input[name="daterangeautoshow"]').on(
          "cancel.daterangepicker",
          function(ev, picker) {
            $(this).val("");
          }
        );
        $('.btn-parent-block').parent().parent().addClass('inline-picker');
      });
    }
  },
  data: function() {
    return {};
  }
};
</script>
<style lang="scss">
.daterangepicker {
  width: 100%;
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
.daterange-auto-show.daterangepicker,
.daterange-auto-show.daterangepicker.ltr.show-calendar.opensright {
  display: block !important;
  position: static !important;
}
.inline-picker{
display: block !important;
    position: relative !important;
    z-index: 1 !important;
    top: 10px !important;
    padding-bottom: 100px !important;
    height: auto !important;
}
</style>
