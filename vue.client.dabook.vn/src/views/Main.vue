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
                <span class="text-sm">{{$t("pmain_lbl_where")}}</span>
              </label>
              <input type="email" class="form-control" id="iwhere" :placeholder="$t('pmain_txt_where')">
            </div>
          </div>
          <div class="col-12">
            <div class="form-group text-left">
              <label for="icheckinout">
                <span class="text-sm">{{$t("pmain_lbl_checkinout")}}</span>
              </label>
              <Datetime id="icheckinout"></Datetime>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group text-left">
              <label for="iadult">
                <span class="text-sm">{{$t("pmain_lbl_adultschildren")}}</span>
              </label>
              <div class="input-group">
                <input type="email" class="form-control" id="iadult" :placeholder="$t('pmain_txt_adult')">
                <input
                  type="email"
                  class="form-control"
                  id="ichildren"
                  aria-describedby="emailHelp"
                  :placeholder="$t('pmain_txt_children')"
                >
              </div>
            </div>
          </div>
          <div class="col-12 pt-2">
            <button class="btn btn-primary w-100 font-weight-bold" @click="redirectToMainSearch">{{$t("pmain_btn_search")}}</button>
          </div>
        </div>

        <TopCityDestination></TopCityDestination>

        <div class="row pb-4 top-destination">
          <div class="col-12 text-left">
            <h6 class="pl-2">
              <b>{{$t("pmain_h6_exploreDaiMinh")}}</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/phuquoc_1.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_destination")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_destination")}}</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/phuquoc_2.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_travelstyle")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_travelstyle")}}</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/phuquoc_3.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_travelservice")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_travelservice")}}</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/quynhon_1.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_MICE")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_MICE")}}</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/quynhon_2.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_FIT")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_FIT")}}</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/quynhon_3.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_aboutus")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_aboutus")}}</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/sapa.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_toptour")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_toptour")}}</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/topdestination/sapa_2.jpg" alt="Card image cap">
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_topdestination")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_topdestination")}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row pb-4">
          <div class="col-12 text-left">
            <h6 class="pl-2">
              <b>{{$t("pmain_h6_introduceDaiMinh")}}</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <div class="card m-2 text-white text-left border-radius-10">
              <img src="img/topdestination/phuquoc_1.jpg" class="card-img overlay-img" alt="...">
              <div class="card-img-overlay">
                <h6 class="card-title text-uppercase">{{$t("pmain_cardtitle_intro_letbuild")}}</h6>
                <h5 class="card-title">{{$t("pmain_cardtitle_intro_inform")}}</h5>
                <p class="card-text">{{$t("pmain_cardtitle_intro_text")}}</p>
              </div>
            </div>
          </div>
        </div>

       <HotelTop10PromotionSectionHorizontal></HotelTop10PromotionSectionHorizontal>
      </div>
    </div>
    <Navbar v-bind:current="'main'"></Navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Datetime from "@/components/Datetime2.vue"; // @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import TopCityDestination from "@/components/TopCityDestination.vue"
import HotelTop10PromotionSectionHorizontal from "@/components/HotelTop10PromotionSectionHorizontal.vue"

@Component({
  components: {
    Datetime,
    Navbar,
    TopCityDestination,
    HotelTop10PromotionSectionHorizontal
  }
})
export default class Main extends Vue {
  redirectToMainSearch() {
      this.$router.push({ path: `mainsearch?where=${this.$route.query.supplier}&from=&to=&adult=&children=` });
  }
}
</script>
<style scoped>
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
.link,.link:hover,.link:active,.link:focus{
  color: #FFF !important;
  text-decoration: none !important;
}
</style>
