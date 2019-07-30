<template>
  <div>
    <TravelStyleSectionHorizontal class="pt-4" v-on:forwardresult="travelStyle=$event"></TravelStyleSectionHorizontal>
     <TourByStyleSectionHorizontal class="pt-4" v-for="item in travelStyle" v-bind:travelStyleId="item._id"></TourByStyleSectionHorizontal>
     <HotRequestAdvice  class="pt-4"></HotRequestAdvice>
  </div>
</template>
<script>
import axios from "axios";
import i18n from "@/i18n";
import TravelStyleSectionHorizontal from "@/components/TravelStyleSectionHorizontal.vue";
import TourByStyleSectionHorizontal from "@/components/TourByStyleSectionHorizontal.vue";
import HotRequestAdvice from "@/components/HotRequestAdvice.vue"
export default {
    components:{
    TravelStyleSectionHorizontal,
    TourByStyleSectionHorizontal,
    HotRequestAdvice
    },
  data() {
    return {
        travelStyle:[],
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
