<template>
  <div class="container-fluid p-0 h-100 welcome-component overlay-img-parrent-primary">
    <div class="row h-100 m-0 p-0 align-items-center">
      <div class="col-12 p-0 m-0 w-100 h-100">
        <div id="carouselExampleSlidesOnly" class="carousel slide w-100 h-100" data-ride="carousel">
          <div class="carousel-inner w-100 h-100">
            <div class="carousel-item active w-100 h-100">
              <img
                src="/img/background.jpg"
                alt="/img/background.jpg"
                class="d-blockoverlay-img overlay-img-orage w-100 h-100 p-0 m-0"
              />
            </div>
            <div class="carousel-item w-100 h-100">
              <img
                src="/img/background_02.jpg"
                alt="/img/background.jpg"
                class="d-blockoverlay-img overlay-img-orage w-100 h-100 p-0 m-0"
              />
            </div>
            <div class="carousel-item w-100 h-100">
              <img
                src="/img/background_03.jpg"
                alt="/img/background.jpg"
                class="d-blockoverlay-img overlay-img-orage w-100 h-100 p-0 m-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="main-action-btngroup w-100 p-2">
        <img src="img/main_logo_full.png" class="main-logo">
        <a
          class="btn btn-primary border-radius-100 w-100 my-2 text-white shadow"
          v-bind:href="`/promotion`"
        >Travel with us</a>
        <a
          class="btn bg-white text-primary border-radius-100 w-100 my-2"
          v-bind:href="'http://www.dabook.vn'"
          target="_blank"
        >Flight ticket</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import i18n from "@/i18n";
import SupplierService from "@/api/SupplierService";
export default {
  data() {
    return {
      promoteSupplierList: [{ _id: "" }, { _id: "" }]
    };
  },
  mounted() {
    this.initial();
  },
  methods: {
    redirectMain: function() {
      this.$router.push({ path: "main" });
    },
    redirectPromotion: function() {
      this.$router.push({ path: "promotion" });
    },
    changeLocale(locale) {
      i18n.locale = locale;
      this.$router.push({ path: "main" });
    },
    async initial() {
      var response = await SupplierService.getAllPromoteSupplier();
      this.promoteSupplierList = response.data;
      console.log(this.promoteSupplierList[0]._id);
    }
  }
};
</script>
<style lang="scss">
.main-action-btngroup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.welcome-component .ads-banner-img {
  height: 70px;
  color: #fff !important;
}
.ads-banner-component {
  position: relative;
  bottom: 0;
}
.ads-banner-component .card {
  border: none !important;
  overflow: hidden !important;
}
.ads-banner-component .carousel-control-next,
.ads-banner-component .carousel-control-prev {
  position: absolute;
  bottom: 0;
  left: 50%;
  visibility: hidden;
}
.top-brand {
  border-bottom-left-radius: 25%;
  border-bottom-right-radius: 25%;
  height: 30%;
  background: #56ccf2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #2f80ed,
    #56ccf2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #2f80ed,
    #56ccf2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.promotion img {
  height: 100px;
  width: 140px;
}
.promotion .card-text {
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.promotion a {
  color: #fff !important;
}
.promotion .card-img-overlay {
  background: rgb(5, 25, 55); /* Fallback color */
  background: rgba(5, 25, 55, 0.5); /* Black background with 0.5 opacity */
}
.cover-img {
  position: relative;
}
.cover-img::before,
.cover-img::after {
  z-index: 10;
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  background: #111;
  opacity: 1;
}
.welcome-langauge-button img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
