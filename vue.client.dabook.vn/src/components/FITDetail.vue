<template>
  <div>
    <div class="row m-0 p">
      <div class="col m-0 p-0" v-html="travelStyleByLang.travelStyleIntro"></div>
    </div>
    <TourByStyleSectionHorizontal class="pt-4" v-bind:travelStyleId="TravelStyleId"></TourByStyleSectionHorizontal>
    <RequestAdvice class="pt-4"></RequestAdvice>
  </div>
</template>
<script>
import axios from "axios";
import i18n from "@/i18n";
import TravelStyleService from "@/api/TravelStyleService";
import TravelStyleSectionHorizontal from "@/components/TravelStyleSectionHorizontal.vue";
import TourByStyleSectionHorizontal from "@/components/TourByStyleSectionHorizontal.vue";
import RequestAdvice from "@/components/RequestAdvice.vue";
export default {
  components: {
    TravelStyleSectionHorizontal,
    TourByStyleSectionHorizontal,
    RequestAdvice
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
