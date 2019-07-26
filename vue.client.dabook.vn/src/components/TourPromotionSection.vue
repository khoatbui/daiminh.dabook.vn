//src/components/Navbar.vue
<template>
  <div class="row w-100 p-0 mx-0">
    <div class="col-12 p-1 m-0" v-if="showTitle">
      <div class="m-2 text-left">
        <h4>
          <b>{{searchStore.locationSearch.length==0?"All tour promotion":searchStore.locationSearch}}</b>
        </h4>
      </div>
    </div>
    <div class="col-6 p-1 m-0" v-for="item in paginatedData">
      <div class="card w-100 p-2 d-inline-block border-0">
        <a v-bind:href="`/tourdetail?tourid=${item._id}`">
          <img
            class="card-img-top border-radius-5"
            v-bind:src="item.tourImages.length>0?`/${item.tourImages[0].filePath}`:'/img/hotel/roomtype/default.jpg'"
            alt="Card image cap"
          >
          <div class="card-body w-100 text-left p-1">
            <p class="card-text text-uppercase p-0 m-0 text-sm hidden-outof-text">
              <span class="w-50 hidden-outof-text">{{item.tourName}}</span>
              <span class="w-50 hidden-outof-text"> | {{item.voteStatus}}</span>
            </p>
            <p
              class="card-text font-weight-bolder p-0 m-0 hidden-outof-text"
            >{{item.to}}</p>
            <p
              class="card-text text-sm p-0 m-0 hidden-outof-text"
            >from {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price) }}</p>
            <p class="card-text text-sm hidden-outof-text">
               <font-awesome-icon
                  class="ml-1 text-primary text-xs"
                  icon="star"
                  v-for="star in item.voteScore"
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
        <button class="btn btn-outline-primary w-100" @click="redirectToPromotionAll">{{$t('btn_showall')}}(86+)</button>
      </div>
    </div>
        <LoadingComponent class="center-page"></LoadingComponent>
  </div>
</template>
<script>
import HotelService from "@/api/HotelService";
import TourService from "@/api/TourService";
import LoadingComponent from "@/components/LoadingComponent.vue";
import i18n from "@/i18n";

export default {
  components: {
    LoadingComponent
  },
  name: "TourPromotionSection",
  props: ["current","showTitle"],
  data() {
    return {
      tourlist: [],
      pageNumber: 0,
      size: 10,
      isLoadding: false
    };
  },
  created() {
    if (this.$route.query.supplier != undefined) {
      this.initialWithSupplier(this.$route.query.supplier);
    }
    else{
    this.initial();
    }
    console.log(i18n.locale);
  },
  methods: {
    redirectToPromotionAll() {
      if (this.$route.query.supplier != undefined) {
      this.$router.push({ path: `tourall?supplier=${this.$route.query.supplier}` });
      }
      else{
    this.$router.push({ path: "tourall" });
    }
    },
    async initial() {
      this.$store.commit('showHideLoading',true);
      var response = await TourService.getAllTourPromotion();
      this.tourlist = response.data;
      console.log(this.tourlist);
      this.$store.commit('showHideLoading',false);
    },
    async initialWithSupplier(supplierId) {
      this.$store.commit('showHideLoading',true);
      var response = await TourService.getPromotePackageBySupplier(supplierId);
      this.tourlist = response.data;
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
      let l = this.tourlist.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      let tourlist=this.tourlist.slice(start,end);
      tourlist.forEach(element => {
        element.tourIntros.forEach(intro => {
          if (intro.lang.toUpperCase()===i18n.locale.toUpperCase()) {
            element.tourIntro=intro.tourIntro;
             element.tourName=intro.tourName;
              element.from=intro.from;
              element.to=intro.to;
          }
        });
      });
      return randomArray(tourlist);
    },
    searchStore() {
      return this.$store.state.search;
    },

  },
  mounted() {
    this.$root.$on('userSearchActivity', () => {
       this.tourlist=this.$store.state.search.searchResult;
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
