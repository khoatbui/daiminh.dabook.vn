<template>
  <div class="input-group border-radius-100 w-100 search">
      <span class="p-2"><a @click="naviBack">
          <font-awesome-icon class="mx-2 text-danger" icon="arrow-left"/>
        </a>Manager/Cancel Booking</span>    
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["id", "radius", "placeholder"],
  name: "HistorySearchComponent",
  created() {},
  methods: {
    naviBack() {
      this.$router.go(-1);
    }
  },
  data: function() {
    return {};
  },
  computed:{
    historySearch(){
      return this.$store.state.search.historySearch;
    }
  }
};
</script>
<style lang="scss">
.search input {
  border-left: none;
}
.search input:focus {
  border-left: none !important;
}
</style>
