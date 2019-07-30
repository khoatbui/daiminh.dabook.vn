<template>
  <div>
    <div class="row m-0 p-2 text-left">
      <div class="col-12 p-0 m-0">
        <h6 class="border-bottom py-2 pt-4"><b>{{travelStyleByLang.travelStyleName}}</b></h6>
        <img class="w-100" v-bind:src="travelStyleByLang.travelStyleImages.length>0?`/${travelStyleByLang.travelStyleImages[0].filePath}`:'/img/tour/roomtype/default.jpg'" alt="">
      </div>
      <div class="col-12 m-0 p-2" v-html="travelStyleByLang.travelStyleIntro"></div>
    </div>
    <TourByStyleSectionHorizontal class="pt-4" v-bind:travelStyleId="TravelStyleId"></TourByStyleSectionHorizontal>
    <HotRequestAdvice class="pt-4"></HotRequestAdvice>
  </div>
</template>
<script>
import axios from "axios";
import i18n from "@/i18n";
import TravelStyleService from "@/api/TravelStyleService";
import TravelStyleSectionHorizontal from "@/components/TravelStyleSectionHorizontal.vue";
import TourByStyleSectionHorizontal from "@/components/TourByStyleSectionHorizontal.vue";
import HotRequestAdvice from "@/components/HotRequestAdvice.vue";
export default {
  components: {
    TravelStyleSectionHorizontal,
    TourByStyleSectionHorizontal,
    HotRequestAdvice
  },
  data() {
    return {
      travelStyle: {}
    };
  },
  mounted() {
    this.initial();
  },
  methods: {
    async initial() {
      var response = await TravelStyleService.getTravelStyleById(
        this.$route.query.travelstyleid
      );
      this.travelStyle = response.data;
    }
  },
  computed: {
    TravelStyleId() {
      return this.$route.query.travelstyleid;
    },
    travelStyleByLang() {
      var result = this.travelStyle;
      console.log(result)
      if (typeof this.travelStyle !='undefined' && typeof this.travelStyle.travelStyleIntros !='undefined') {
      result.travelStyleIntros.forEach(intro => {
        if (
          intro.lang.toUpperCase() ===
          this.$store.state.currentLang.toUpperCase()
        ) {
          result.travelStyleIntro = intro.travelStyleIntro;
          result.travelStyleName = intro.travelStyleName;
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
