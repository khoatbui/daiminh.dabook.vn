//src/components/Navbar.vue
<template>
  <div class="hotel-detail-section">
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 p-0 m-0">
          <div class="card d-inline-block border-0">
            <img
              class="card-img-top border-radius-none"
              src="img/topdestination/sapa_2.jpg"
              alt="Card image cap"
            >
          </div>
        </div>
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left">
            <h4>
              <b>{{packagedetail.hotelId.hotelName}}</b>
            </h4>
          </div>
        </div>
        <div class="col-12 px-3 m-0">
          <div class="m-2 d-flex justify-content-between align-items-center">
            <span>{{city.cityName}}</span>
            <img class="hotel-owner-avatar shadow" src="img/hotel/hotel-owner/vinpearl.jpg" alt>
          </div>
        </div>
        <div class="col-12 px-3 m-0 text-left">
          <div class="m-2 pb-4 border-bottom">
            <h6 class="font-weight-bolder">{{packagedetail.roomTypeId.roomTypeName}}</h6>
            <div>
              <span class="text-sm">{{packagedetail.roomTypeId.maxGuest}} guest - {{packagedetail.roomTypeId.bed}} bed - 1 bath</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left">
            <p
              class="text-sm"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perferendis tempore a cupiditate mollitia nostrum doloremque deserunt ut numquam sapiente tenetur optio in nihil ducimus ab illum modi, aliquam dolorum?</p>
          </div>
        </div>
        <div class="col-12 px-3 m-0 text-left">
          <div class="m-2 pb-4 border-bottom">
            <p class="text-sm">Contact host</p>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left pb-4 border-bottom">
            <h6 class="font-weight-bolder">Room Info</h6>
            <div class="w-100 d-flex justify-content-between align-items-center flex-wrap">
              <span class="text-sm">
                <font-awesome-icon class="m-1" icon="bed"/>1kingbed
              </span>
              <span class="text-sm">
                <font-awesome-icon class="m-1" icon="wifi"/>Wifi
              </span>
              <span class="text-sm">
                <font-awesome-icon class="m-1" icon="swimming-pool"/>Swimming pool
              </span>
              <span class="text-sm">
                <font-awesome-icon class="m-1" icon="swimming-pool"/>Swimming pool
              </span>
              <span class="text-sm">
                <font-awesome-icon class="m-1" icon="swimming-pool"/>Swimming pool
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row w-100 p-0 mx-0">
        <div class="col-12 px-3 m-0">
          <div class="m-2 text-left pb-4 border-bottom">
            <h6 class="font-weight-bolder">Avaibility</h6>
          </div>
        </div>
        <div class="col-12 px-3 m-0"></div>
      </div>
  </div>
</template>
<script>
import HotelService from "@/api/HotelService";
import PackageService from "@/api/PackageService";
import CityService from "@/api/CityService";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  components: {
    LoadingComponent
  },
  name: "HotelDetailSection",
  data() {
    return {
        packagedetail:{
            hotelId:{
                hotelName:""
            },
            roomTypeId:{
                roomTypeName:"",
                bed:0,
                bath:0,
                maxGuest:0
            }
        },
        city:{},
      isLoadding: false
    };
  },
  created() {
      this.initial(this.$route.query.packagehotelRELId);
  },
  methods: {
    changeLoadingState(state) {
      this.isLoadding = state;
    },
    redirectToPromotionAll() {
      this.$router.push({ path: "promotionall" });
    },
    async initial(id) {
      this.changeLoadingState(true);
      var response = await PackageService.getPackageDetail(id);
      this.packagedetail = response.data;
      var cityresponse=await CityService.getCityDetailById(response.data.hotelId.cityId);
      this.city=cityresponse.data;
      this.$emit('commitdata', {
          package:this.packagedetail,
          city:this.city
      })
      console.log(this.packagedetail);
      this.changeLoadingState(false);
    }
  },
  computed: {
  }
};
</script>
<style lang="scss">
</style>
