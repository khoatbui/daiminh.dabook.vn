<template>
  <div class="search-component">
    <span class="back-icon" @click="naviBack">
    <font-awesome-icon class="text-danger" icon="arrow-left"/>
    </span>
    <vue-bootstrap-typeahead v-model="query" :data="data" :placeholder="$t('search_search')"/>
    <span class="search-icon" @click="search">
    <font-awesome-icon class="text-danger" icon="search"/>
    </span>
  </div>
</template>
<script>
import axios from "axios";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import SearchService from "@/api/SearchService";
export default {
  components: {
    VueBootstrapTypeahead
  },
  props: ["id", "radius", "placeholder","searchtype"],
  name: "LocationSearchComponent",
  created() {},
  methods: {
    naviBack() {
      this.$router.go(-1);
    },
    async search(){
      this.$store.commit('showHideLoading',true);
      var response=[];
      if (this.searchtype=='ALL') {
        response=await SearchService.getHotelBySearch(this.query)
      }
      else if (this.searchtype=='HOTEL') {
        response=await SearchService.getHotelBySearch(this.query)
      }
      else if(this.searchtype=='PROMOTION_HOTEL') {
        response=await SearchService.getPromotionHotelBySearch(this.query)
      }
      else if(this.searchtype=='CAR') {
        response=await SearchService.getHotelBySearch(this.query)
      }
      else if(this.searchtype=='TOUR') {
        response=await SearchService.getHotelBySearch(this.query)
      }
      else if(this.searchtype=='PROMOTION_TOUR') {
        response=await SearchService.getHotelBySearch(this.query)
      }
      else{
        response=await SearchService.getAllBySearch(this.query)
      }
              console.log(response);
      this.$store.commit('asignSearchResult',response.data);
      this.$root.$emit('userSearchActivity')
       this.$store.commit('showHideLoading',false);
    }
  },
  data: function() {
    return {
      query: "",
      data:[
"An Giang",
"Bà Rịa - Vũng Tàu",
"Bắc Giang",
"Bắc Kạn",
"Bạc Liêu",
"Bắc Ninh",
"Bến Tre",
"Bình Định",
"Bình Dương",
"Bình Phước",
"Bình Thuận",
"Cà Mau",
"Cao Bằng",
"Đắk Lắk",
"Đắk Nông",
"Điện Biên",
"Đồng Nai",
"Đồng Tháp",
"Gia Lai",
"Hà Giang",
"Hà Nam",
"Hà Tĩnh",
"Hải Dương",
"Hậu Giang",
"Hòa Bình",
"Hưng Yên",
"Khánh Hòa",
"Kiên Giang",
"Kon Tum",
"Lai Châu",
"Lâm Đồng",
"Lạng Sơn",
"Lào Cai",
"Long An",
"Nam Định",
"Nghệ An",
"Ninh Bình",
"Ninh Thuận",
"Phú Thọ",
"Quảng Bình",
"Quảng Nam",
"Quảng Ngãi",
"Quảng Ninh",
"Quảng Trị",
"Sóc Trăng",
"Sơn La",
"Tây Ninh",
"Thái Bình",
"Thái Nguyên",
"Thanh Hóa",
"Thừa Thiên Huế",
"Tiền Giang",
"Trà Vinh",
"Tuyên Quang",
"Vĩnh Long",
"Vĩnh Phúc",
"Yên Bái",
"Phú Yên",
"Cần Thơ",
"Đà Nẵng",
"Hải Phòng",
"Hà Nội",
"TP HCM"
      ]
    };
  }
};
</script>
<style lang="scss">
.search-component{
  position: relative;
}
.search-component .back-icon{
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 100px;
  background-color: #FFF !important;
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translate(0,-50%);
  z-index: 20;
}
.search-component .search-icon{
    width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 100px;
  background-color: #FFF !important;
  position: absolute;
  top: 50%;
  right: 2%;
  transform: translate(0,-50%);
  z-index: 20;
}
.search-component input {
  border-radius: 100px !important;
  padding: 0 40px;
}
.search-component input:focus,.search-component input:hover,.search-component input:active{
  box-shadow: none !important;
}
.search-component .list-group a{
  text-align: left !important;
}
.search input {
  border-left: none;
}
.search input:focus {
  border-left: none !important;
}
</style>
