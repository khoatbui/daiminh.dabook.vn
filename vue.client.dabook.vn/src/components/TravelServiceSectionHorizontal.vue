To//src/components/Navbar.vue
<template>
  <div class="row px-0 mx-0 pb-4 hot-destination">
    <div class="col-12 px-0 mx-0 text-left">
      <h6 class="pl-2">
        <b>{{$t("ptravelstyle_h6_destination")}}</b>
      </h6>
    </div>
    <div class="col-12 scroll-ngang cicle-destination">
      <a v-bind:href="`/travelservice/detail?travelserviceid=${travelService._id}`"  v-for="(travelService,travelServicei) in travelServicelist">
      <div class="card m-2 d-inline-block border-0">
        <div v-bind:id="`travelService-carousel-img-${travelServicei}`" class="carousel slide carousel-fade border-radius-100" data-ride="carousel">
          <div class="carousel-inner border-radius-100">
            <div
              v-for="(subitem,travelServiceindex) in travelService.travelServiceImages"
              v-bind:class="{'active':travelServiceindex==0}"
              class="carousel-item border-radius-100"
              v-bind:data-interval="`${10000 * travelServicei}`"
            >
              <img
                class="card-img-top shadow border-radius-100"
                v-bind:src="travelService.travelServiceImages.length>0?subitem.filePath:'img/hotel/roomtype/default.jpg'"
                alt="Card image cap"
              />
            </div>
          </div>
        </div>
        <div class="card-body p-1 text-center">
          <p class="card-text font-weight-bolder">{{travelService.travelServiceName}}</p>
        </div>
      </div>
      </a>
    </div>
  </div>
</template>
<script>
import TravelServiceService from "@/api/TravelServiceService";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent
  },
  name: "TravelServiceSectionHorizontal",
  props: ["current", "showTitle"],
  data() {
    return {
      travelServicelist: [],
      isLoadding: false
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      this.$store.commit("showHideLoading", true);
      var response = await TravelServiceService.getAllTravelService();
      this.travelServicelist = randomArray(response.data);
      console.log(this.travelServicelist);
      this.$store.commit("showHideLoading", false);
      this.$emit('forwardresult',this.travelServicelist)
    }
  },
  computed: {}
};

function randomArray(array) {
  let array2 = [];
  while (array.length !== 0) {
    let randomIndex = Math.floor(Math.random() * array.length);
    array2.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return array2;
}
</script>
<style lang="scss" scoped>
</style>
