<template>
    <div>
       <input class="form-control" type="text" name="datefilter" value="" readonly="true" placeholder="mm/dd/yyyy - mm/dd/yyyy"/>
    </div>
</template>
<script>
$(function() {

  $('input[name="datefilter"]').daterangepicker({
      autoUpdateInput: false,
      locale: {
          cancelLabel: 'Clear'
      }
  });

  $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  });

  $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });

});
import axios from 'axios'
export default {
  methods: {},
  data: function () {
    return {
    }
  }
}

</script>
<style lang="scss">
.daterangepicker{
    top:0px !important;
    left: 0px !important;
    width: 100%;
    z-index: 100000000000000 !important;
    height: 100vh;
}
.drp-calendar.left,.drp-calendar.right{
    width: 100% !important;
    padding:10px !important;
    margin:0 !important;
    box-sizing: border-box;
}
.daterangepicker .drp-calendar{
    max-width: none;
}
input:read-only {
            background-color: white !important;
            color: #2c3e50;
         }
</style>
