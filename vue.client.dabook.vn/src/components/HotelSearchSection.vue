//src/components/Navbar.vue
<template>
  <div class="row w-100 p-0 mx-0">
    <div class="col-12 p-1 m-0" v-if="showTitle">
      <div class="m-2 text-left">
        <h4>
          <b>{{searchStore.locationSearch.length==0?"All hotel promotion":searchStore.locationSearch}}</b>
        </h4>
      </div>
    </div>
    <div class="col-6 p-1 m-0" v-for="item in paginatedData">
      <div class="card w-100 p-2 d-inline-block border-0">
        <a v-bind:href="`/promotiondetail?packagehotelrelid=${item._id}`">
          <img
            class="card-img-top border-radius-5"
            v-bind:src="item.roomTypeId.roomImages.length>0?`/${item.roomTypeId.roomImages[0].filePath}`:'/img/hotel/roomtype/default.jpg'"
            alt="Card image cap"
          >
          <div class="card-body w-100 text-left p-1">
            <p class="card-text text-uppercase p-0 m-0 text-sm hidden-outof-text">
              <span class="w-50 hidden-outof-text">{{item.roomTypeId.roomTypeName}}</span>
              <span class="w-50 hidden-outof-text"> | {{item.roomTypeId.bed}}BED</span>
            </p>
            <p
              class="card-text font-weight-bolder p-0 m-0 hidden-outof-text"
            >{{item.hotelId.hotelName}}</p>
            <p
              class="card-text text-sm p-0 m-0 hidden-outof-text"
            >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price) }} per night</p>
            <p class="card-text text-sm hidden-outof-text">
               <font-awesome-icon
                  class="ml-1 text-primary text-xs"
                  icon="star"
                  v-for="star in item.hotelId.star"
                  :key="star"
                />
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
    <div class="col-12 p-1 m-0">
      <div class="m-2">
        <button class="btn btn-outline-primary w-100" @click="redirectToPromotionAll">{{$t('btn_showall')}}(326+)</button>
      </div>
    </div>
        <LoadingComponent class="center-page"></LoadingComponent>
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
  name: "HotelPromotionSection",
  props: ["current","showTitle"],
  data() {
    return {
      packagelist: [],
      pageNumber: 0,
      size: 10,
      isLoadding: false
    };
  },
  created() {
    console.log(this.$route.query.where);
    if (this.$route.query.where != undefined) {
      this.initialWithSearch(this.$route.query.where,this.$route.query.from,this.$route.query.to);
    }
    else{
    this.initial();
    }
  },
  methods: {
    redirectToPromotionAll() {
      if (this.$route.query.supplier != undefined) {
      this.$router.push({ path: `promotionall?supplier=${this.$route.query.supplier}` });
      }
      else{
    this.$router.push({ path: "promotionall" });
    }
    },
    async initial() {
      this.$store.commit('showHideLoading',true);
      var response = await PackageService.getAllPackagePromotion();
      this.packagelist = response.data;
      this.$store.commit('showHideLoading',false);
    },
    async initialWithSearch(search,from,to) {
      this.$store.commit('showHideLoading',true);
      var response = await PackageService.getAllPackageByLocationTime(search,from,to);
      this.packagelist = response.data;
      console.log('where')
      console.log(response.data)
      this.$store.commit('showHideLoading',false);
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
      return randomArray(this.packagelist.slice(start, end));
    },
    searchStore() {
      return this.$store.state.search;
    }
  },
  mounted() {
    this.$root.$on('userSearchActivity', () => {
       this.packagelist=this.$store.state.search.searchResult;
    })
  }
};
function randomArray(array){
        let array2=[];
        while(array.length!==0){
        let randomIndex=Math.floor(Math.random()*array.length);
        array2.push(array[randomIndex]);
        array.splice(randomIndex,1);
        }
        return array2;
    }
</script>
<style lang="scss">
</style>
