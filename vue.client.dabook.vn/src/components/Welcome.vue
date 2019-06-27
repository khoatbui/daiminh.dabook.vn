<template>
  <div class="container-fluid h-100">
    <div class="row h-100 align-items-center">
      <div
        class="col-12 align-self-stretch bg-primary top-brand d-flex justify-content-center align-items-center"
      >
        <img src="img/main_logo_full.png" class="main-logo">
      </div>
      <div class="col-6 text-right p-1">
        <button
          class="btn btn-primary btn-round-50 pl-4 pr-4 w-75"
          @click="redirectMain"
        >Let's go</button>
      </div>
      <div class="col-6 text-left p-1">
        <button
          class="btn btn-primary btn-round-50 pl-4 pr-4 w-75"
          @click="redirectPromotion"
        >Promotion</button>
      </div>
      <div class="col-12">
        <div class="row promotion">
          <div class="col-12 scroll-ngang">
            <div class="card m-2 text-white d-inline-block shadow-box border-radius-10">
              <img src="img/promotion/flc.jpg" class="card-img cover-img" alt="...">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase m-0">FLC</h5>
                <h6 class="card-title">$80.95</h6>
              </div>
            </div>
            <div class="card m-2 text-white d-inline-block shadow-box border-radius-10">
              <img src="img/promotion/vinpearl.jpg" class="card-img" alt="...">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase  m-0">VIN</h5>
                <h6 class="card-title">$80.95</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    redirectMain: function() {
      this.$router.push({ path: "main" });
    },
    redirectPromotion: function() {
      this.$router.push({ path: "promotion" });
    }
  }
};
</script>
<style lang="scss">
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
.scroll-ngang {
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  white-space: nowrap;
}
.scroll-ngang::-webkit-scrollbar {
  width: 0px;
  background: transparent;
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
.promotion .card-img-overlay{
   background: rgb(5, 25, 55); /* Fallback color */
  background: rgba(5, 25, 55, 0.5); /* Black background with 0.5 opacity */
}
.cover-img{
  position: relative;
}
.cover-img::before,.cover-img::after{
  z-index: 10;
  content: " ";
  position:absolute;
  top:0;
  left: 0;
  background: #111;
    opacity: 1;
}
</style>