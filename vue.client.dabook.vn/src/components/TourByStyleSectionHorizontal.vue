To//src/components/Navbar.vue
<template>
  <div class="row px-0 mx-0 pb-4 hot-destination" v-if="tourlist.length>=1">
    <div class="col-12 px-0 mx-0 text-left">
      <h6 class="pl-2">
        <b>{{tourlist[0].travelStyleId.travelStyleName}}</b>
      </h6>
    </div>
    <div class="col-12 pl-2 pr-1 mx-0" v-if="tourlist.length==1">
      <div class="card w-100 h-100 text-white d-inline-block shadow-box">
        <img
                 v-bind:src="tourlist[0].tourImages.length>0?tourlist[0].tourImages[0].filePath:'img/tour/roomtype/default.jpg'"
          class="card-img overlay-img w-100 h-100"
          alt="..."
        />
        <div class="card-img-overlay d-flex justify-content-center align-items-center">
          <h4
            class="card-title text-white text-uppercase text-ssm hidden-outof-text"
          >{{tourlist[0].tourName}}</h4>
        </div>
      </div>
    </div>
    <div class="col-7 pl-2 pr-1 mx-0" v-if="tourlist.length>1">
      <div class="card w-100 h-100 text-white d-inline-block shadow-box">
        <img
                 v-bind:src="tourlist[1].tourImages.length>0?tourlist[1].tourImages[0].filePath:'img/tour/roomtype/default.jpg'"
          class="card-img overlay-img w-100 h-100"
          alt="..."
        />
        <div class="card-img-overlay d-flex justify-content-center align-items-center">
          <h4
            class="card-title text-white text-uppercase text-ssm hidden-outof-text"
          >{{tourlist[1].tourName}}</h4>
        </div>
      </div>
    </div>
    <div class="col-5 pl-1 pr-2 mx-0" v-if="tourlist.length>2">
      <div class="row w-100 p-0 m-0">
        <div class="col-12 px-0 mx-0">
          <div class="card w-100 text-white d-inline-block shadow-box">
            <img
              v-bind:src="tourlist[0].tourImages.length>0?tourlist[0].tourImages[0].filePath:'img/tour/roomtype/default.jpg'"
              class="card-img overlay-img w-100"
              alt="..."
            />
            <div class="card-img-overlay d-flex justify-content-center align-items-center">
              <h4
                class="card-title text-white text-uppercase text-ssm hidden-outof-text"
              >{{tourlist[0].tourName}}</h4>
            </div>
          </div>
        </div>
        <div class="col-12 px-0 mx-0">
          <div class="card w-100 text-white d-inline-block shadow-box">
            <img
              v-bind:src="tourlist[3].tourImages.length>0?tourlist[3].tourImages[0].filePath:'img/tour/roomtype/default.jpg'"
              class="card-img overlay-img w-100"
              alt="..."
            />
            <div class="card-img-overlay d-flex justify-content-center align-items-center">
              <h4
                class="card-title text-white text-uppercase text-ssm hidden-outof-text"
              >{{tourlist[3].tourName}}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 scroll-ngang px-0 mx-0 " v-if="tourlist.length>=4">
      <div class="card m-2 text-white d-inline-block shadow-box" v-for="pac in tourlist">
        <a v-bind:href="`/promotiondetail?packagetourrelid=${pac._id}`">
          <img
            v-bind:src="pac.tourImages.length>0?pac.tourImages[0].filePath:'img/tour/roomtype/default.jpg'"
            class="card-img overlay-img"
            alt="..."
          />
          <div class="card-img-overlay d-flex justify-content-center align-items-center">
            <h5
              class="card-title text-white text-uppercase text-ssm hidden-outof-text"
            >{{pac.tourName}}</h5>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import TourService from "@/api/TourService";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent
  },
  name: "TourByStyleSectionHorizontal",
  props: ["current", "showTitle", "travelStyleId"],
  data() {
    return {
      tourlist: [],
      isLoadding: false
    };
  },
  created() {
    this.initial();
  },
  methods: {
    async initial() {
      this.$store.commit("showHideLoading", true);
      var response = await TourService.getTourByStyle(this.travelStyleId);
      this.tourlist = randomArray(response.data);
      console.log(this.tourlist);
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
.hot-destination .card-img {
  height: 100px;
  width: 140px;
}
</style>
