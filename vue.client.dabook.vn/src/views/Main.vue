<template>
  <div class="container-fluid main h-100 p-0 m-0 bg-main text-sm">
    <div class="row w-100 row w-100 m-0 p-0">
      <div class="col-8 offset-2">
        <a href="/">
          <img src="img/main_logo_only.png" class="main-logo m-2" />
        </a>
      </div>
      <div class="col-2 d-flex align-items-center">
                    <LanguageComponent></LanguageComponent>
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
              <input
                type="email"
                class="form-control"
                id="iwhere"
                :placeholder="$t('pmain_txt_where')"
                v-model="search.location"
              />
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
                <input
                  type="email"
                  class="form-control"
                  id="iadult"
                  :placeholder="$t('pmain_txt_adult')"
                  v-model="search.adult"
                />
                <input
                  type="email"
                  class="form-control"
                  id="ichildren"
                  aria-describedby="emailHelp"
                  :placeholder="$t('pmain_txt_children')"
                  v-model="search.children"
                />
              </div>
            </div>
          </div>
          <div class="col-12 pt-2">
            <button
              class="btn btn-primary w-100 font-weight-bold"
              @click="redirectToMainSearch"
            >{{$t("pmain_btn_search")}}</button>
          </div>
        </div>
        <TopCityDestination v-bind:rootUrl="'/mainsearch'"></TopCityDestination>
        <div class="row pb-4 ads-section">
          <div class="col-12 p-0 scroll-ngang">
            <div class="card text-white text-left border-0">
              <img src="img/promotion/promotion_gif.gif" class="card-img" alt="..." />
            </div>
          </div>
        </div>
        <div class="row pb-4 top-destination">
          <div class="col-12 text-left">
            <h6 class="pl-2">
              <b>{{$t("pmain_h6_exploreDaiMinh")}}</b>
            </h6>
          </div>
          <div class="col-12 scroll-ngang">
            <a href="/destination">
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/general/destination.jpg" alt="Card image cap" />
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_destination")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_destination")}}</p>
              </div>
            </div>
            </a>
            <a href="/travelstyle">
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/general/travelstyle.jpg" alt="Card image cap" />
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_travelstyle")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_travelstyle")}}</p>
              </div>
            </div>
            </a>
              <a href="/travelservice">
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/general/travelservice.jpg" alt="Card image cap" />
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_travelservice")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_travelservice")}}</p>
              </div>
            </div>
            </a>
              <a href="/mice">
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/general/MICE.jpg" alt="Card image cap" />
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_MICE")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_MICE")}}</p>
              </div>
            </div>
              </a>
                <a href="/fit">
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/general/fit.jpg" alt="Card image cap" />
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_FIT")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_FIT")}}</p>
              </div>
            </div>
                </a>
                  <a href="/aboutus">
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/general/aboutus.jpg" alt="Card image cap" />
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_aboutus")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_aboutus")}}</p>
              </div>
            </div>
                  </a>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/general/toptour.jpg" alt="Card image cap" />
              <div class="card-body text-left">
                <p class="card-text mb-0 font-weight-bolder">{{$t("pmain_cardtitle_toptour")}}</p>
                <p class="card-text">{{$t("pmain_cardtext_toptour")}}</p>
              </div>
            </div>
            <div class="card m-2 d-inline-block shadow-box">
              <img class="card-img-top" src="img/general/topdestination.jpg" alt="Card image cap" />
              <div class="card-body text-left">
                <p
                  class="card-text mb-0 font-weight-bolder"
                >{{$t("pmain_cardtitle_topdestination")}}</p>
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
            <a href="/aboutus">
            <div class="card m-2 text-white text-left border-radius-10">
              <img src="img/topdestination/phuquoc_1.jpg" class="card-img overlay-img" alt="..." />
              <div class="card-img-overlay">
                <h6 class="card-title text-uppercase">{{$t("pmain_cardtitle_intro_letbuild")}}</h6>
                <h5 class="card-title">{{$t("pmain_cardtitle_intro_inform")}}</h5>
                <p class="card-text">{{$t("pmain_cardtitle_intro_text")}}</p>
              </div>
            </div>
            </a>
          </div>
        </div>

        <HotelTop10PromotionSectionHorizontal></HotelTop10PromotionSectionHorizontal>
        <div class="row pb-4 ads-section">
          <div class="col-12 p-0 scroll-ngang">
            <div class="card text-white text-left border-0">
              <img src="img/promotion/ads/korea02.jpg" class="card-img" alt="..." />
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
import TopCityDestination from "@/components/TopCityDestination.vue";
import HotelTop10PromotionSectionHorizontal from "@/components/HotelTop10PromotionSectionHorizontal.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";

@Component({
  components: {
    Datetime,
    Navbar,
    TopCityDestination,
    HotelTop10PromotionSectionHorizontal,
    LanguageComponent
  }
})
export default class Main extends Vue {
  search={
      location:"",
      adult:0,
      children:0,
      from:"",
      to:""
  }
  redirectToMainSearch() {
    this.$store.commit('asignSearchField',this.search.location)
    this.$router.push({
      path: `mainsearch?where=${this.search.location}&from=${this.search.from}&to=${this.search.to}&adult=${this.search.adult}&children=${this.search.children}`
    });
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
.link,
.link:hover,
.link:active,
.link:focus {
  color: #fff !important;
  text-decoration: none !important;
}
</style>
