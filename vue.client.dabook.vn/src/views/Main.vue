<template>
  <div class="container-fluid main h-100 p-0 m-0 bg-main">
    <div class="row w-100">
      <div class="col-12">
        <img src="img/main_logo_only.png" class="main-logo m-4" />
      </div>
    </div>
    <div class="row main-section p-0 d-flex align-items-start justify-content-center  w-100 m-0">
      <div class="col-12">
        <div class="row p-2 pb-4 ">
          <div class="col-12">
            <div class="form-group text-left">
              <label for="iwhere">
                <b>WHERE</b>
              </label>
              <input type="email" class="form-control" id="iwhere" placeholder="Any where">
            </div>
          </div>
          <div class="col-12">
            <div class="form-group text-left">
              <label for="exampleInputPassword1">
                <b>CHECK-IN CHECK-OUT</b>
              </label>
              <Datetime id="exampleInputPassword1"></Datetime>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group text-left">
              <label for="iadult">
                <b>ADULTS - CHILDREN</b>
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
            <button class="btn btn-primary w-100">Search</button>
          </div>
        </div>
        <div class="row pb-4 top-destination">
          <div class="col-12 text-left">
            <h6 class="pl-2">
              <b>Explore DaiMinh Travel</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <div class="card m-2 d-inline-block">
              <img class="card-img-top" src="img/topdestination/phuquoc_1.jpg" alt="Card image cap">
              <div class="card-body">
                <p
                  class="card-text"
                >Destination</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block">
              <img class="card-img-top" src="img/topdestination/phuquoc_2.jpg" alt="Card image cap">
              <div class="card-body">
                <p
                  class="card-text"
                >Travel Style</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block">
              <img class="card-img-top" src="img/topdestination/phuquoc_3.jpg" alt="Card image cap">
              <div class="card-body">
                <p
                  class="card-text"
                >Travel Service.</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block">
              <img class="card-img-top" src="img/topdestination/quynhon_1.jpg" alt="Card image cap">
              <div class="card-body">
                <p
                  class="card-text"
                >MICE.</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block">
              <img class="card-img-top" src="img/topdestination/quynhon_2.jpg" alt="Card image cap">
              <div class="card-body">
                <p
                  class="card-text"
                >FIT.</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block">
              <img class="card-img-top" src="img/topdestination/quynhon_3.jpg" alt="Card image cap">
              <div class="card-body">
                <p
                  class="card-text"
                >About us.</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block">
              <img class="card-img-top" src="img/topdestination/sapa.jpg" alt="Card image cap">
              <div class="card-body">
                <p
                  class="card-text"
                >Top Tours.</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block">
              <img class="card-img-top" src="img/topdestination/sapa_2.jpg" alt="Card image cap">
              <div class="card-body">
                <p
                  class="card-text"
                >Top Destination.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<Navbar></Navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Datetime from "@/components/Datetime.vue"; // @ is an alias to /src
import Navbar from "@/components/Navbar.vue"

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
.scroll-ngang{
  width: 100%;
  overflow: hidden;
  overflow-x: scroll ;
  white-space: nowrap;
}
.scroll-ngang::-webkit-scrollbar {
width: 0px;
background: transparent;
}
.top-destination .card{
}
.top-destination img{
  height: 100px;
  width: auto;
}
.top-destination .card-text{
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

