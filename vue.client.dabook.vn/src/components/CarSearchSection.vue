//src/components/Navbar.vue
<template>
  <div class="row w-100 p-0 mx-0">
    <div class="row w-100 mx-0 border-bottom">
      <div class="col-12 text-left"  v-if="showTitle">
        <h6>
          <b>Today great deal</b>
        </h6>
      </div>
      <div class="col-12 m-0 p-0" v-for="(caritem,i) in paginatedData"  @click="selectCar(caritem)">
        <div
          class="card mx-2 my-4 p-0 border-0 border-radius-5 shadow-sm"
          v-for="(item,j) in caritem.priceByCarType"
        >
         <a @click="redirectToCarDetail(`/cardetail?cardetailpriceid=${item._id}&cartypeid=${item.carTypeId}`)" >
          <div class="row no-gutters">
            <div class="col-5 m-0 p-0">
              <div
                v-bind:id="`carousel-img-${i}${j}`"
                class="carousel slide h-100"
                data-ride="carousel"
              >
                <ol class="carousel-indicators">
                  <li
                    v-bind:data-target="`#carousel-img-${i}${j}`"
                    v-for="(subitem,index) in item.carImages"
                    v-bind:class="{'active':index==0}"
                    v-bind:data-slide-to="index"
                  ></li>
                </ol>
                <div class="carousel-inner border-radius-5 default-bg h-100">
                  <div
                    class="carousel-item border-radius-5 h-100"
                    v-for="(subitem,index) in item.carImages"
                    v-bind:class="{'active':index==0}"
                  >
                    <img
                      class="border-left-radius-5 car-img h-110"
                      v-bind:src="caritem.priceByCarType.length>0?`/${subitem.filePath}`:'/img/hotel/roomtype/default.jpg'"
                      alt
                    />
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  v-bind:href="`#carousel-img-${i}${j}`"
                  role="button"
                  data-slide="prev"
                >
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  v-bind:href="`#carousel-img-${i}${j}`"
                  role="button"
                  data-slide="next"
                >
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
            <div class="col-7 p-2 d-flex flex-column justify-content-between">
              <div
                class="row w-100 m-0 justify-content-between aling-items-center font-weight-bolder text-smd border-bottom-dash"
              >
                <div class="col-5 p-0 text-left">
                  <span>{{caritem.fromLocation}}</span>
                </div>
                <div class="col-2 p-0 text-center">
                  <font-awesome-icon class="ml-1 text-default" icon="car-side" />
                </div>
                <div class="col-5 p-0 text-right">
                  <span>{{caritem.toLocation}}</span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-12 p-0 text-left text-ssm">
                  <span>
                    <b>Seats:</b>
                    {{item.seatNumber}}
                  </span>
                   <span>
                    <b>Model:</b>
                    {{item.carTypeName}}
                  </span>
                </div>
                <div class="col-12 p-0 text-left text-ssm">
                  <span>
                    <b>Loại hình:</b>
                    {{caritem.carTransTypeId.carTransTypeName}}
                  </span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-12 p-0 text-right">
                  <div class="d-inline-block font-weight-bolder">
                    <span
                      class="text-success border-radius-5 success-opac-50 px-1"
                      v-if="i==1"
                    >GREAT VALUE:</span>
                    <span
                      class="text-default"
                      v-bind:class="{'text-success':i==1}"
                    >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(caritem.totalPrice) }}</span>
                  </div>
                </div>
              </div>
            </div>
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
                <a
                  class="page-link"
                  @click="prevPage"
                  :disabled="pageNumber == 0"
                >{{pageNumber -1 }}</a>
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
      <div class="col-12 m-0 p-0">
        <div class="m-2">
          <button
            class="btn btn-outline-primary w-100"
            @click="redirectToCarViewAll"
          >{{$t('btn_showall')}}(20+)</button>
        </div>
      </div>
    </div>
    <LoadingComponent class="center-page"></LoadingComponent>
  </div>
</template>
<script>
import CarPriceService from "@/api/CarPriceService";
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent
  },
  name: "CarSearchSection",
  props: ["current", "showTitle"],
  data() {
    return {
      carpricelist: [],
      pageNumber: 0,
      size: 5,
      isLoadding: false
    };
  },
  created() {
    if (this.$route.query.where != undefined) {
      this.initialWithSearch(this.$route.query.where,this.$route.query.from,this.$route.query.to);
    }
     if (this.$route.query.cityid != undefined) {
      this.initialWithCity(this.$route.query.cityid);
    }
    else {
      this.initial();
    }
  },
  methods: {
    redirectToCarDetail(url){
      this.$router.push({ path: url });
    },
    redirectToCarViewAll() {
      this.$router.push({ path: "carviewall" });
    },
    async initial() {
      this.$store.commit("showHideLoading", true);
      var response = await CarPriceService.getAllCarPricePromotion();
      this.carpricelist = response.data;
      this.$store.commit("showHideLoading", false);
    },
    async initialWithSearch(search,from,to) {
      this.$store.commit("showHideLoading", true);
      var response = await CarPriceService.getAllCarPriceBySearch(search);
      console.log(response.data)
      this.carpricelist = response.data;
      this.$store.commit("showHideLoading", false);
    },
    async initialWithCity(city) {
      this.$store.commit("showHideLoading", true);
      var response = await CarPriceService.getAllCarPriceByCity(city);
      console.log(response.data)
      this.carpricelist = response.data;
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
    },
    selectCar(item){
      this.$store.commit("updateSelectedCar", item);
      console.log('item commit to selectedCar');
      console.log(item);
    }
  },
  computed: {
    pageCount() {
      let l = this.carpricelist.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return randomArray(this.carpricelist.map(obj =>
        Object.assign({}, obj, {
          totalPrice:
            obj.priceByCarType[0].markUpPercent == 0 || obj.priceByCarType[0].markUpPercent == ""
              ? obj.priceByCarType[0].price * obj.kmTotal + obj.priceByCarType[0].markUpPlus
              : obj.priceByCarType[0].markUpPlus !== 0 && obj.priceByCarType[0].markUpPlus == ""
              ? obj.priceByCarType[0].price * obj.kmTotal * ((obj.priceByCarType[0].markUpPercent + 100) / 100) +
                obj.priceByCarType[0].markUpPlus
              : obj.priceByCarType[0].price * obj.kmTotal * ((obj.priceByCarType[0].markUpPercent + 100) / 100)
        })
      ).slice(start, end));
      
    },
    searchStore() {
      return this.$store.state.search;
    }
  },
  mounted() {
    this.$root.$on("userSearchActivity", () => {
      this.carpricelist = this.$store.state.search.searchResult;
    });
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
.car-img {
  min-height: 100% !important;
  width: 100% !important;
}
.border-bottom-dash {
  border-bottom: 1px dashed #ced4da;
}
</style>
