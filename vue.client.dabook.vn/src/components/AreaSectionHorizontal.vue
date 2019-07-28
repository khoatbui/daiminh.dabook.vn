To//src/components/Navbar.vue
<template>
  <div class="row px-0 mx-0 pb-4 hot-destination">
    <div class="col-12 px-0 mx-0 text-left">
      <h6 class="pl-2">
        <b>{{$t("pdes_h6_destination")}}</b>
      </h6>
    </div>
    <div class="col-12 scroll-ngang cicle-destination">
      <div class="card m-2 d-inline-block border-0" v-for="(area,areai) in arealist">
        <div v-bind:id="`area-carousel-img-${areai}`" class="carousel slide carousel-fade border-radius-100" data-ride="carousel">
          <div class="carousel-inner border-radius-100">
            <div
              v-for="(subitem,areaindex) in area.areaImages"
              v-bind:class="{'active':areaindex==0}"
              class="carousel-item border-radius-100"
              v-bind:data-interval="`${10000 * areai}`"
            >
              <img
                class="card-img-top shadow border-radius-100"
                v-bind:src="area.areaImages.length>0?subitem.filePath:'img/hotel/roomtype/default.jpg'"
                alt="Card image cap"
              />
            </div>
          </div>
        </div>
        <div class="card-body p-1 text-center">
          <p class="card-text font-weight-bolder">{{area.areaName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AreaService from "@/api/AreaService";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent
  },
  name: "AreaSectionHorizontal",
  props: ["current", "showTitle"],
  data() {
    return {
      arealist: [],
      isLoadding: false
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      this.$store.commit("showHideLoading", true);
      var response = await AreaService.getAllArea();
      this.arealist = randomArray(response.data);
      console.log(this.arealist);
      this.$store.commit("showHideLoading", false);
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
