<template>
   <HotelDatePicker DatePickerID="01" 
    :minNights="minNights" 
    :maxNights="maxNights" 
    />
</template>
<script>
import axios from "axios";
import HotelDatePicker from 'vue-hotel-datepicker'
export default {
  components: {
    HotelDatePicker
  },
  methods: {
  },
  data: function() {
    return {
      minNights: 2,
      maxNights: 30
    };
  }
};
</script>
<style lang="scss">
.datepicker__wrapper{
  height: 40px;
}
.datepicker__dummy-wrapper{
  border-radius: 4px;
  height: 40px !important;
}
.datepicker__input{
  height: 40px !important;
}
.-hide-on-desktop .datepicker__dummy-wrapper{
  border-radius: 4px;
  overflow: hidden;
}
.datepicker__month-day--first-day-selected{
  border-top-left-radius:1000px !important;
  border-bottom-left-radius:1000px !important;

}
.datepicker__month-day--last-day-selected{
  border-top-right-radius:1000px !important;
  border-bottom-right-radius:1000px !important;
}
.datepicker__month-day--selected{

}
.datepicker__month-day--selected:hover{
  border-top-right-radius:1000px !important;
  border-bottom-right-radius:1000px !important;
  background-color: #00ca9d !important;
      opacity: .25;
      color:#FFFFFF !important;
}
</style>