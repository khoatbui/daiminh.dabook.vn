//src/components/Navbar.vue
<template>
  <div class="row w-100 p-0 mx-0 bottom-page">
    <div class="col-12 p-1 m-0">
      <div class="m-2 text-left">
        <h4>
          <b>{{packagelist.length}}+ Rooms</b>
        </h4>
      </div>
    </div>
    <div class="col-12 p-1 m-0" v-for="item in paginatedData">
      <div class="card w-100 p-2 d-inline-block border-0">
        <a v-bind:href="`/promotiondetail?packagehotelRELId=${item._id}`">
          <img
            class="card-img-top border-radius-5"
            src="img/topdestination/sapa_2.jpg"
            alt="Card image cap"
          >
          <div class="card-body w-100 text-left p-1">
            <p class="card-text text-uppercase p-0 m-0 text-sm hidden-outof-text">
              <span class="w-50 hidden-outof-text">{{item.packageId.packageName}}</span>
              <span class="w-50 hidden-outof-text">{{item.roomTypeId.bed}}BED</span>
            </p>
            <p
              class="card-text font-weight-bolder p-0 m-0 hidden-outof-text"
            >{{item.hotelId.hotelName}}</p>
            <p class="p-0 m-0 d-flex justify-content-between">
              <span
                class="card-text text-sm hidden-outof-text"
              >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price) }} per night</span>
              <span class="card-text text-sm">
                <font-awesome-icon
                  class="ml-1 text-primary"
                  icon="star"
                  v-for="star in item.hotelId.star"
                  :key="star"
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
                <font-awesome-icon class="text-primary" icon="angle-double-left"/>
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
                <font-awesome-icon class="text-primary" icon="angle-double-right"/>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <LoadingComponent v-bind:isShow="isLoadding" class="center-page"></LoadingComponent>
  </div>
</template>
<script>
import HotelService from "@/api/HotelService";
import PackageService from "@/api/PackageService";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  components: {
    LoadingComponent
  },
  name: "HotelAllSection",
  props: ["current"],
  data() {
    return {
      packagelist: [],
      pageNumber: 0,
      size: 10,
      isLoadding: false
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
    changeLoadingState(state) {
      this.isLoadding = state;
    },
    redirectToPromotionAll() {
      this.$router.push({ path: "promotionall" });
    },
    async initial() {
      this.changeLoadingState(true);
      var response = await PackageService.getAllPackage();
      this.packagelist = response.data;
      this.changeLoadingState(false);
    },
    async initialWithSupplier(supplierId) {
      this.changeLoadingState(true);
      var response = await PackageService.getAllPackageBySupplier(supplierId);
      this.packagelist = response.data;
      this.changeLoadingState(false);
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
      let l = this.packagelist.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.packagelist.slice(start, end);
    }
  }
};
</script>
<style lang="scss">
.page-item.active .page-link {
  color: #fff !important;
}
</style>
