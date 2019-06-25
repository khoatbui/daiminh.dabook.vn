<template>
  <div class="container-fluid main h-100 p-0 m-0 promotion-container">
    <div class="row w-100 p-0 m-0 pb-3 border-bottom">
      <div class="col-12 p-3">
        <div class="input-group border-radius-100 w-100 search">
          <div class="input-group-prepend">
            <span class="input-group-text border-left-radius-100" id="basic-addon1">
                <a href="#"><font-awesome-icon class="ml-1" icon="chevron-left"/></a>
            </span>
          </div>
          <input
            type="text"
            class="form-control border-right-radius-100"
            placeholder="Search"
            aria-label="Username"
            aria-describedby="basic-addon1"
          >
        </div>
      </div>
      <div class="col-12 d-flex flex-row justify-content-center align-items-center">
           <Datetime id="icheckinout" radius="border-radius-100" placeholder="Check-in/out"></Datetime>
           <input class="form-control border-radius-100"  type="text"  name="guestfilter"  value  readonly="true"  placeholder="Guest">
      </div>
    </div>
    <Navbar></Navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Datetime from "@/components/Datetime2.vue"; // @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    Datetime,
    Navbar
  }
})
export default class Promotion extends Vue {}
</script>
<style >
.main-section {
  background-color: #ffffff;
  height: 100%;
  box-sizing: border-box;
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
.top-destination img {
  height: 100px;
  width: 140px;
}
.top-destination .card-text {
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-img-overlay > h6 {
  font-size: 0.8rem;
}
.card-img-overlay > h5 {
  font-size: 1.1rem;
}
.card-img-overlay > a,
.card-img-overlay > a:active,
.card-img-overlay > a:hover,
.card-img-overlay > a:visited {
  color: #fff;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}

.hot-destination .card-img {
  height: 100px;
  width: 140px;
}
.promotion-container .input-group-text{
    background-color: #FFF;
    border-right: none;
}
.search input{
    border-left: none;
}
.search input:focus{
    border-left: none !important;
}
</style>
