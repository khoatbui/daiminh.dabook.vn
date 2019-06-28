<template>
  <div class="container-fluid h-100 welcome-component">
    <div class="row h-100 align-items-center">
      <div
        class="col-12 align-self-stretch bg-primary top-brand d-flex justify-content-center align-items-center"
      >
        <img src="img/main_logo_full.png" class="main-logo">
      </div>
      <div class="col-6 text-right p-1">
        <div class="btn-group welcome-langauge-button">
          <button class="btn w-50 border-left-radius-100" @click="changeLocale('vi')">
            <img src="img/language/vietnam.png" alt="Language">
          </button>
          <button class="btn w-50">
            <img src="img/language/south-korea.png" alt="Language" @click="changeLocale('ko')">
          </button>
          <button class="btn w-50 border-right-radius-100">
            <img src="img/language/united-kingdom.png" alt="Language" @click="changeLocale('en')">
          </button>
        </div>
      </div>
      <div class="col-6 text-left p-1">
        <button
          class="btn btn-primary btn-round-50 pl-4 pr-4 w-75"
          @click="redirectPromotion"
        >Promotion</button>
      </div>
      <div class="col-12">
        <div class="row px-2 promotion">
          <div
            id="iads-banner"
            class="carousel slide w-100 ads-banner-component border-radius-10 shadow"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <a v-bind:href="`/promotion?supplier=${promoteSupplierList[0]._id}`">
                  <div class="card border-radius-10 card-plain bg-danger">
                    <div class="row p-0 m-0">
                      <div class="col-4 p-0 m-0 text-left">
                        <img
                          src="img/promotion/flc.jpg"
                          class="card-img border-left-radius-10 cover-img ads-banner-img"
                          alt="..."
                        >
                      </div>
                      <div class="col-8 p-0 m-0 d-flex align-items-center justify-content-center">
                        <div class="card-body p-0 m-0 text-white">
                          <h5 class="card-title text-uppercase m-0 text-smd">FLC Golf Resort</h5>
                          <h6 class="card-title m-0 ">
                            <span class="text-sm">from</span> $80.95
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div class="carousel-item">
                <a v-bind:href="`/promotion?supplier=${promoteSupplierList[1]._id}`">
                  <div class="card border-radius-10 card-plain bg-danger">
                    <div class="row p-0 m-0">
                      <div class="col-4 p-0 m-0 text-left">
                        <img
                          src="img/promotion/vinpearl.jpg"
                          class="card-img border-left-radius-10 ads-banner-img"
                          alt="..."
                        >
                      </div>
                      <div class="col-8 p-0 m-0 d-flex align-items-center justify-content-center">
                        <div class="card-body p-0 m-0 text-white">
                          <h5 class="card-title text-uppercase m-0 text-smd">VinPearl Hotel & Resort</h5>
                          <h6 class="card-title m-0 ">
                            <span class="text-sm">from</span> $80.95
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
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
