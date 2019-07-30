To//src/components/Navbar.vue
<template>
  <div class="row px-0 mx-0 pb-4 hot-destination">
    <div class="col-12 px-0 mx-0 text-left">
      <h6 class="pl-2">
        <b>{{$t("pfit_h6_destination")}}</b>
      </h6>
    </div>
    <div class="col-12 scroll-ngang cicle-destination">
      <div class="card mx-1 my-2 p-0 d-inline-block border-0"  v-for="(fit,fiti) in fitlist">
                <a class="m-0" v-bind:href="`/fit/detail?fitid=${fit._id}`">
        <div v-bind:id="`fit-carousel-img-${fiti}`" class="carousel slide carousel-fade border-radius-100" data-ride="carousel">
          <div class="carousel-inner border-radius-100">
            <div
              v-for="(subitem,fitindex) in fit.fitImages"
              v-bind:class="{'active':fitindex==0}"
              class="carousel-item border-radius-100"
              v-bind:data-interval="`${10000 * fiti}`"
            >
              <img
                class="card-img-top shadow border-radius-100"
                v-bind:src="fit.fitImages.length>0?subitem.filePath:'img/hotel/roomtype/default.jpg'"
                alt="Card image cap"
              />
            </div>
          </div>
        </div>
        <div class="card-body p-0 text-center">
          <p class="badge badge-pill badge-primary px-4 py-2 card-text font-weight-bolder">{{fit.fitName}}</p>
        </div>
              </a>
      </div>
    </div>
  </div>
</template>
<script>
import FITService from "@/api/FITService";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent
  },
  name: "FITSectionHorizontal",
  props: ["current", "showTitle"],
  data() {
    return {
      fitlist: [],
      isLoadding: false
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      this.$store.commit("showHideLoading", true);
      var response = await FITService.getAllFIT();
      this.fitlist = randomArray(response.data);
      console.log(this.fitlist);
      this.$store.commit("showHideLoading", false);
      this.$emit('forwardresult',this.fitlist)
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
