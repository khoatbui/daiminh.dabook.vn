<template>
  <div class="container-fluid main h-100 p-0 m-0 bg-main text-sm">
    <div class="row w-100 row w-100 m-0 p-0">
      <div class="col-12">
        <a href="/">
        <img src="img/main_logo_only.png" class="main-logo m-2">
        </a>
      </div>
    </div>
    <div class="row main-section p-0 d-flex align-items-start justify-content-center w-100 m-0">
      <div class="col-12 pb-4">
        <div class="row p-2 pb-4">
          <div class="col-12">
            <div class="form-group text-left">
              <label for="iwhere">
                <span class="text-sm">Where</span>
              </label>
              <input type="email" class="form-control" id="iwhere" placeholder="Any where">
            </div>
          </div>
          <div class="col-12">
            <div class="form-group text-left">
              <label for="icheckinout">
                <span class="text-sm">Check-in/out</span>
              </label>
              <Datetime id="icheckinout"></Datetime>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group text-left">
              <label for="iadult">
                <span class="text-sm">Adults - Children</span>
              </label>
              <div class="input-group">
                <input type="email" class="form-control" id="iadult" placeholder="adult">
                <input
                  type="email"
                  class="form-control"
                  id="ichildren"
                  aria-describedby="emailHelp"
                  placeholder="children"
                >
              </div>
            </div>
          </div>
          <div class="col-12 pt-2">
            <button class="btn btn-primary w-100 font-weight-bold">Search</button>
          </div>
        </div>

        <div class="row pb-4 top-city-destination">
          <div class="col-12 text-left">
            <h6 class="pl-2">
              <b>Top City Destination</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/phuquoc_1.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Ho Chi Minh</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/phuquoc_2.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Ha Noi</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/phuquoc_3.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Danang</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/quynhon_1.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Phu Quoc</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/quynhon_2.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Hoi An</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/quynhon_3.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Quang Binh</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/sapa.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Sapa.</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block border-0">
              <img
                class="card-img-top shadow border-radius-100"
                src="img/topdestination/sapa_2.jpg"
                alt="Card image cap"
              >
              <div class="card-body p-1 text-center">
                <p class="card-text font-weight-bolder">Ha Long.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row pb-4 top-destination">
          <div class="col-12 text-left">
            <h6 class="pl-2">
              <b>Explore DaiMinh Travel</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/phuquoc_1.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">Destination</p>
                <p class="card-text">Top destination in the world</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/phuquoc_2.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">Travel Style</p>
                <p class="card-text">Top destination in the world</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/phuquoc_3.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">Travel Service.</p>
                <p class="card-text">Top destination in the world</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/quynhon_1.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">MICE.</p>
                <p class="card-text">Top destination in the world</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/quynhon_2.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">FIT.</p>
                <p class="card-text">Top destination in the world</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/quynhon_3.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">About us.</p>
                <p class="card-text">Top destination in the world</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/sapa.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">Top Tours.</p>
                <p class="card-text">Top destination in the world</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/sapa_2.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">Top Destination.</p>
                <p class="card-text">Top destination in the world</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row pb-4">
          <div class="col-12 text-left">
            <h6 class="pl-2">
              <b>Introduce DaiMinh Adventure</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <div class="card m-2 text-white text-left border-radius-10">
              <img src="img/topdestination/phuquoc_1.jpg" class="card-img" alt="...">
              <div class="card-img-overlay">
                <h6 class="card-title text-uppercase">Let's build every thing you wish!</h6>
                <h5 class="card-title">Inform us</h5>
                <p class="card-text">We can build almost tour style you wish.</p>
                <a href="#">
                  <span>Learn more</span>
                  <font-awesome-icon class="ml-1" icon="chevron-right"/>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="row pb-4 hot-destination">
          <div class="col-12 text-left">
            <h6 class="pl-2">
              <b>Recommended for you</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <div class="card m-2 text-white d-inline-block shadow-box">
              <img src="img/topdestination/phuquoc_1.jpg" class="card-img" alt="...">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase">Paris!</h5>
                <h6 class="card-title">$80.95</h6>
              </div>
            </div>
            <div class="card m-2 text-white d-inline-block shadow-box">
              <img class="card-img" src="img/topdestination/phuquoc_2.jpg" alt="Card image cap">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase">Paris!</h5>
                <h6 class="card-title">$80.95</h6>
              </div>
            </div>
            <div class="card m-2 text-white d-inline-block shadow-box">
              <img class="card-img" src="img/topdestination/phuquoc_3.jpg" alt="Card image cap">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase">Paris!</h5>
                <h6 class="card-title">$80.95</h6>
              </div>
            </div>
            <div class="card m-2 text-white d-inline-block shadow-box">
              <img class="card-img" src="img/topdestination/quynhon_1.jpg" alt="Card image cap">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase">Paris!</h5>
                <h6 class="card-title">$80.95</h6>
              </div>
            </div>
            <div class="card m-2 text-white d-inline-block shadow-box">
              <img class="card-img" src="img/topdestination/quynhon_2.jpg" alt="Card image cap">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase">Paris!</h5>
                <h6 class="card-title">$80.95</h6>
              </div>
            </div>
            <div class="card m-2 text-white d-inline-block shadow-box">
              <img class="card-img" src="img/topdestination/quynhon_3.jpg" alt="Card image cap">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase">Paris!</h5>
                <h6 class="card-title">$80.95</h6>
              </div>
            </div>
            <div class="card m-2 text-white d-inline-block shadow-box">
              <img class="card-img" src="img/topdestination/sapa.jpg" alt="Card image cap">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase">Paris!</h5>
                <h6 class="card-title">$80.95</h6>
              </div>
            </div>
            <div class="card m-2 text-white d-inline-block shadow-box">
              <img class="card-img" src="img/topdestination/sapa_2.jpg" alt="Card image cap">
              <div class="card-img-overlay">
                <h5 class="card-title text-uppercase">Paris!</h5>
                <h6 class="card-title">$80.95</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Navbar v-bind:current="'main'"></Navbar>
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
export default class Main extends Vue {}
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
</style>
