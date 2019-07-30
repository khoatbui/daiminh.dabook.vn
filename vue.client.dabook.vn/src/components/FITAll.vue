<template>
  <div>
    <FITSectionHorizontal class="pt-4" v-on:forwardresult="fit=$event"></FITSectionHorizontal>
     <HotRequestAdvice  class="pt-4"></HotRequestAdvice>
  </div>
</template>
<script>
import axios from "axios";
import i18n from "@/i18n";
import FITSectionHorizontal from "@/components/FITSectionHorizontal.vue";
import TourByStyleSectionHorizontal from "@/components/TourByStyleSectionHorizontal.vue";
import HotRequestAdvice from "@/components/HotRequestAdvice.vue"
export default {
    components:{
    FITSectionHorizontal,
    TourByStyleSectionHorizontal,
    HotRequestAdvice
    },
  data() {
    return {
        fit:[],
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
