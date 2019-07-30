<template>
  <div>
    <div class="row m-0 p-2 text-left">
      <div class="col-12 p-0 m-0">
        <h6 class="border-bottom py-2 pt-4"><b>{{travelServiceByLang.travelServiceName}}</b></h6>
        <img class="w-100" v-bind:src="travelServiceByLang.travelServiceImages.length>0?`/${travelServiceByLang.travelServiceImages[0].filePath}`:'/img/tour/roomtype/default.jpg'" alt="">
      </div>
      <div class="col-12 m-0 p-2" v-html="travelServiceByLang.travelServiceIntro"></div>
    </div>
    <TourByStyleSectionHorizontal class="pt-4" v-bind:travelServiceId="TravelServiceId"></TourByStyleSectionHorizontal>
    <HotRequestAdvice class="pt-4"></HotRequestAdvice>
  </div>
</template>
<script>
import axios from "axios";
import i18n from "@/i18n";
import TravelServiceService from "@/api/TravelServiceService";
import TourByStyleSectionHorizontal from "@/components/TourByStyleSectionHorizontal.vue";
import HotRequestAdvice from "@/components/HotRequestAdvice.vue";
export default {
  components: {
    TourByStyleSectionHorizontal,
    HotRequestAdvice
  },
  data() {
    return {
      travelService: {}
    };
  },
  mounted() {
    this.initial();
  },
  methods: {
    async initial() {
      var response = await TravelServiceService.getTravelServiceById(
        this.$route.query.travelserviceid
      );
      this.travelService = response.data;
    }
  },
  computed: {
    TravelServiceId() {
      return this.$route.query.travelserviceid;
    },
    travelServiceByLang() {
      var result = this.travelService;
      console.log(result)
      if (typeof this.travelService !='undefined' && typeof this.travelService.travelServiceIntros !='undefined') {
      result.travelServiceIntros.forEach(intro => {
        if (
          intro.lang.toUpperCase() ===
          this.$store.state.currentLang.toUpperCase()
        ) {
          result.travelServiceIntro = intro.travelServiceIntro;
          result.travelServiceName = intro.travelServiceName;
        }
      });
      }
      console.log(result);
      return result;
    }
  }
};
</script>
<style lang="scss">
</style>
