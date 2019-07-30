<template>
  <div>
    <TravelServiceSectionHorizontal class="pt-4" v-on:forwardresult="travelService=$event"></TravelServiceSectionHorizontal>
     <TourByStyleSectionHorizontal class="pt-4" v-for="item in travelService" v-bind:travelServiceId="item._id"></TourByStyleSectionHorizontal>
     <HotRequestAdvice  class="pt-4"></HotRequestAdvice>
  </div>
</template>
<script>
import axios from "axios";
import i18n from "@/i18n";
import TravelServiceSectionHorizontal from "@/components/TravelServiceSectionHorizontal.vue";
import TourByStyleSectionHorizontal from "@/components/TourByStyleSectionHorizontal.vue";
import HotRequestAdvice from "@/components/HotRequestAdvice.vue"
export default {
    components:{
    TravelServiceSectionHorizontal,
    TourByStyleSectionHorizontal,
    HotRequestAdvice
    },
  data() {
    return {
        travelService:[],
      promoteSupplierList: [{ _id: "" }, { _id: "" }]
    };
  },
  mounted() {
    this.initial();
  },
  methods: {
    redirectMain: function() {
      this.$router.push({ path: "main" });
    },
    redirectPromotion: function() {
      this.$router.push({ path: "promotion" });
    },
    changeLocale(locale) {
      i18n.locale = locale;
      this.$router.push({ path: "main" });
    },
    async initial() {
    }
  }
};
</script>
<style lang="scss">
</style>
