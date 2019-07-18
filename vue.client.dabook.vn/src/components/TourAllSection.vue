//src/components/Navbar.vue
<template>
  <div class="row w-100 p-0 mx-0 hotel-all-section">
    <div class="col-12 p-1 m-0">
      <div class="m-2 text-left">
        <h4>
          <b>{{tourlist.length}}+ Tours</b>
        </h4>
      </div>
    </div>
    <div class="col-12 p-1 m-0" v-for="(item,i) in paginatedData">
      <div class="card w-100 p-2 d-inline-block border-0 hot-promotion-parent">
        <div class="hot-promotion" v-if="item.isPromotion">
          <font-awesome-icon icon="fire-alt" />
        </div>
        <a v-bind:href="`/tourdetail?tourid=${item._id}`">
          <div v-bind:id="`carousel-img-${i}`" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li
                v-bind:data-target="`#carousel-img-${i}`"
                v-for="(subitem,index) in item.tourImages"
                v-bind:class="{'active':index==0}"
                v-bind:data-slide-to="index"
              ></li>
            </ol>
            <div class="carousel-inner border-radius-5 default-bg h-200">
              <div
                class="carousel-item border-radius-5"
                v-for="(subitem,index) in item.tourImages"
                v-bind:class="{'active':index==0}"
              >
                <img
                  v-bind:src="item.tourImages.length>0?subitem.filePath:'img/hotel/roomtype/default.jpg'"
                  class="d-block border-radius-5"
                  alt="..."
                />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              v-bind:href="`#carousel-img-${i}`"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              v-bind:href="`#carousel-img-${i}`"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div class="card-body w-100 text-left p-1">
            <p class="card-text text-uppercase p-0 m-0 text-sm hidden-outof-text">
              <span class="w-50 hidden-outof-text">{{item.tourName}}</span>
            </p>
            <p class="card-text font-weight-bolder p-0 m-0 hidden-outof-text">{{item.tourIntro}}</p>
            <p class="p-0 m-0 d-flex justify-content-between">
              <span class="card-text text-sm hidden-outof-text">
                <span class="badge badge-success text-sm font-weight-lighter" v-if="item.voteScore !=''">
                  <span class="badge badge-light text-sm font-weight-lighter mr-1">{{item.voteScore}}</span>
                  <span>{{item.voteStatus}}</span>
                </span>
                from {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price) }}
              </span>
              <span class="card-text text-sm">
                <font-awesome-icon
                  class="ml-1 text-primary text-xs"
                  icon="star"
                  v-for="sta in item.star"
                  :key="sta"
                />
              </span>
            </p>
          </div>
        </a>
      </div>
    </div>
    <div class="col-12 p-1 pt-4 m-0">
      <div class="m-2">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a
                class="page-link prev"
                aria-label="Previous"
                @click="prevPage"
                :disabled="pageNumber == 0"
              >
                <font-awesome-icon class="text-primary" icon="angle-double-left" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" @click="prevPage" :disabled="pageNumber == 0">{{pageNumber -1 }}</a>
            </li>
            <li class="page-item active">
              <a class="page-link">{{pageNumber}}</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                @click="nextPage"
                :disabled="pageNumber >= pageCount -1"
              >{{pageNumber +1}}</a>
            </li>
            <li class="page-item">
              <a
                class="page-link next"
                aria-label="Next"
                @click="nextPage"
                :disabled="pageNumber >= pageCount -1"
              >
                <font-awesome-icon class="text-primary" icon="angle-double-right" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <LoadingComponent class="center-page"></LoadingComponent>
  </div>
</template>
<script>
import HotelService from "@/api/HotelService";
import TourService from "@/api/TourService";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent
  },
  name: "HotelAllSection",
  props: ["current"],
  data() {
    return {
      tourlist: [],
      pageNumber: 0,
      size: 10
    };
  },
  created() {
    if (this.$route.query.supplier != undefined) {
      this.initialWithSupplier(this.$route.query.supplier);
    } else {
      this.initial();
    }
  },
  methods: {
    redirectToPromotionAll() {
      this.$router.push({ path: "promotionall" });
    },
    async initial() {
      this.$store.commit("showHideLoading", true);
      var response = await TourService.getAllTour();
      this.tourlist = response.data;
      this.$store.commit("showHideLoading", false);
    },
    async initialWithSupplier(supplierId) {
      this.$store.commit("showHideLoading", true);
      var response = await TourService.getAllPackageBySupplier(supplierId);
      this.tourlist = response.data;
      this.$store.commit("showHideLoading", false);
    },
    nextPage() {
      if (this.pageNumber + 1 == this.pageCount) {
        return;
      }
      this.pageNumber++;
    },
    prevPage() {
      if (this.pageNumber - 1 == 0 || this.pageNumber == 0) {
        return;
      }
      this.pageNumber--;
    }
  },
  computed: {
    pageCount() {
      let l = this.tourlist.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return randomArray(this.tourlist.slice(start, end));
    }
  },
  mounted() {
    this.$root.$on("userSearchActivity", () => {
      this.tourlist = this.$store.state.search.searchResult;
    });
  }
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
<style lang="scss">
.page-item.active .page-link {
  color: #fff !important;
}
.hotel-all-section .h-200 {
  height: 200px !important;
  overflow: hidden;
  min-height: 200px !important;
  max-height: 200px;
}
.hotel-all-section .carousel-item {
  height: 100%;
  width: 100%;
}
.hotel-all-section .carousel-item img {
  height: 100% !important;
  min-height: 100% !important;
  min-width: 100% !important;
}
</style>
