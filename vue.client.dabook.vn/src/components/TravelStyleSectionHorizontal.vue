To//src/components/Navbar.vue
<template>
  <div class="row px-0 mx-0 pb-4 hot-destination">
    <div class="col-12 px-0 mx-0 text-left">
      <h6 class="pl-2">
        <b>{{$t("ptravelstyle_h6_destination")}}</b>
      </h6>
    </div>
    <div class="col-12 scroll-ngang cicle-destination">
      <div class="card m-2 d-inline-block border-0" v-for="(travelStyle,travelStylei) in travelStylelist">
        <div v-bind:id="`travelStyle-carousel-img-${travelStylei}`" class="carousel slide carousel-fade border-radius-100" data-ride="carousel">
          <div class="carousel-inner border-radius-100">
            <div
              v-for="(subitem,travelStyleindex) in travelStyle.travelStyleImages"
              v-bind:class="{'active':travelStyleindex==0}"
              class="carousel-item border-radius-100"
              v-bind:data-interval="`${10000 * travelStylei}`"
            >
              <img
                class="card-img-top shadow border-radius-100"
                v-bind:src="travelStyle.travelStyleImages.length>0?subitem.filePath:'img/hotel/roomtype/default.jpg'"
                alt="Card image cap"
              />
            </div>
          </div>
        </div>
        <div class="card-body p-1 text-center">
          <p class="card-text font-weight-bolder">{{travelStyle.travelStyleName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TravelStyleService from "@/api/TravelStyleService";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent
  },
  name: "TravelStyleSectionHorizontal",
  props: ["current", "showTitle"],
  data() {
    return {
      travelStylelist: [],
      isLoadding: false
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      this.$store.commit("showHideLoading", true);
      var response = await TravelStyleService.getAllTravelStyle();
      this.travelStylelist = randomArray(response.data);
      console.log(this.travelStylelist);
      this.$store.commit("showHideLoading", false);
      this.$emit('forwardresult',this.travelStylelist)
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
