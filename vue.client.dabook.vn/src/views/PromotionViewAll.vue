<template>
  <div class="container-fluid main h-100 p-0 m-0 promotion-container">
    <div class="row w-100 p-0 m-0 pb-3 border-bottom fixed-top bg-white search-section">
      <div class="col-12 p-2">
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
      <div class="col-12 px-2 d-flex flex-row justify-content-between align-items-center scroll-ngang">
           <Datetime id="icheckinout" radius="border-radius-100" placeholder="Dates"></Datetime>
           <GuestSelect></GuestSelect>
           <FilterHotel></FilterHotel>
      </div>
    </div>
    <div class="data-section">
    <div class="row w-100 p-0 mx-0 bottom-page">
      <div class="col-12 p-1 m-0">
        <div class="m-2 text-left">
          <h4><b>200+ Rooms</b></h4>
        </div>
      </div>
      <div class="col-12 p-1 m-0">
        <div class="card m-2 d-inline-block border-0">
              <img class="card-img-top border-radius-5" src="img/topdestination/sapa_2.jpg" alt="Card image cap">
              <div class="card-body text-left p-1">
                <p class="card-text text-uppercase p-0 m-0 text-sm">DELUXURE 1BED</p>
                <p class="card-text font-weight-bolder p-0 m-0 ">FLC HaLong Golf Resort.</p>
                <p class="card-text text-sm p-0 m-0">$156 per night</p>
                <p class="card-text text-sm">
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                </p>
              </div>
            </div>
      </div>
      <div class="col-12 p-1 m-0">
        <div class="card m-2 d-inline-block border-0">
              <img class="card-img-top border-radius-5" src="img/topdestination/sapa_2.jpg" alt="Card image cap">
              <div class="card-body text-left p-1">
                <p class="card-text text-uppercase p-0 m-0 text-sm">DELUXURE 1BED</p>
                <p class="card-text font-weight-bolder p-0 m-0 ">FLC HaLong Golf Resort.</p>
                <p class="card-text text-sm p-0 m-0">$156 per night</p>
                <p class="card-text text-sm">
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                </p>
              </div>
            </div>
      </div>
      <div class="col-12 p-1 m-0">
        <div class="card m-2 d-inline-block border-0">
              <img class="card-img-top border-radius-5" src="img/topdestination/sapa_2.jpg" alt="Card image cap">
              <div class="card-body text-left p-1">
                <p class="card-text text-uppercase p-0 m-0 text-sm">DELUXURE 1BED</p>
                <p class="card-text font-weight-bolder p-0 m-0 ">FLC HaLong Golf Resort.</p>
                <p class="card-text text-sm p-0 m-0">$156 per night</p>
                <p class="card-text text-sm">
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                </p>
              </div>
            </div>
      </div>
      <div class="col-12 p-1 m-0">
        <div class="card m-2 d-inline-block border-0">
              <img class="card-img-top border-radius-5" src="img/topdestination/sapa_2.jpg" alt="Card image cap">
              <div class="card-body text-left p-1">
                <p class="card-text text-uppercase p-0 m-0 text-sm">DELUXURE 1BED</p>
                <p class="card-text font-weight-bolder p-0 m-0 ">FLC HaLong Golf Resort.</p>
                <p class="card-text text-sm p-0 m-0">$156 per night</p>
                <p class="card-text text-sm">
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                </p>
              </div>
            </div>
      </div>
      <div class="col-12 p-1 m-0">
        <div class="card m-2 d-inline-block border-0">
              <img class="card-img-top border-radius-5" src="img/topdestination/sapa_2.jpg" alt="Card image cap">
              <div class="card-body text-left p-1">
                <p class="card-text text-uppercase p-0 m-0 text-sm">DELUXURE 1BED</p>
                <p class="card-text font-weight-bolder p-0 m-0 ">FLC HaLong Golf Resort.</p>
                <p class="card-text text-sm p-0 m-0">$156 per night</p>
                <p class="card-text text-sm">
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                  <font-awesome-icon class="ml-1 text-primary" icon="star"/>
                </p>
              </div>
            </div>
      </div>
      <div class="col-12 p-1 pt-4 m-0">
        <div class="m-2">
        <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link prev" href="#" aria-label="Previous">
         <font-awesome-icon class="text-primary" icon="angle-double-left"/>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item active"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link next" href="#" aria-label="Next">
         <font-awesome-icon class="text-primary" icon="angle-double-right"/>
      </a>
    </li>
  </ul>
</nav>
        </div>
      </div>
    </div>
    </div>
    <Navbar></Navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Datetime from "@/components/Datetime2.vue"; // @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import GuestSelect from "@/components/GuestSelect.vue";
import FilterHotel from "@/components/FilterHotel.vue";
import CustomerBookedAlert from "@/components/CustomerBookedAlert.vue";

@Component({
  components: {
    Datetime,
    Navbar,
    GuestSelect,
    FilterHotel,
    CustomerBookedAlert
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
/* ========SEARCH SECTION======== */
.search-section{
  z-index: 1000000000000 !important;
}
.search input{
    border-left: none;
}
.search input:focus{
    border-left: none !important;
}
/* ========DATA SECTION=========== */
.data-section{
  margin-top: 130px !important;
}

.page-item:last-child .page-link ,.page-item:first-child .page-link{
   border-radius: none !important;
   border:1px solid #007bff !important;
}
.page-link.prev,.page-link.next{
     width: 30px;
    height: 30px;
    border-radius: 100px !important;
    line-height: 30px !important;
    padding: 0;
    margin: 0 5px;
}
.page-item .page-link {
    z-index: 1;
    color: #007bff;
    width: 30px;
    height: 30px;
    border-radius: 100px;
    line-height: 30px !important;
    padding: 0;
    margin: 0 5px;
}
.page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    width: 30px;
    height: 30px;
    border-radius: 100px;
    line-height: 30px !important;
    padding: 0;
}
</style>
