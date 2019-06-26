<template>
  <div class="main-navbar-component">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn mainnavbar-setting"
      data-toggle="modal"
      data-target="#mainNavBarModal"
    >
      <font-awesome-icon class="ml-1 text-lg text-danger" icon="align-left"/>
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="mainNavBarModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mainNavBarModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header px-4">
            <a href="/">
              <h5 class="modal-title" id="exampleModalLabel">{{ $t('home') }}</h5>
            </a>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body px-4">
            <div class="container-fluid">
              <div class="row py-2 justify-content-start align-items-center">
                <div class="col-12 px-0 py-2 border-bottom text-left">
                  <a href="/">Home</a>
                </div>
              </div>
              <div class="row py-2 justify-content-start align-items-center">
                <div class="col-12 px-0 py-2 text-left">
                  <a href="/">Destination</a>
                </div>
                <div class="col-12 px-0 py-2 text-left">
                  <a href="/">Travel Style</a>
                </div>
                <div class="col-12 px-0 py-2 text-left">
                  <a href="/">Travel Service</a>
                </div>
                <div class="col-12 px-0 py-2 text-left">
                  <a href="/">MICE</a>
                </div>
                <div class="col-12 px-0 py-2 border-bottom text-left">
                  <a href="/">FIT</a>
                </div>
              </div>
              <div class="row py-2 justify-content-start align-items-center">
                <div class="col-12 px-0 py-2 text-left">
                  <a href="/">Private Policy</a>
                </div>
                <div class="col-12 px-0 py-2 text-left">
                  <a href="/">Term of us</a>
                </div>
                <div class="col-12 px-0 py-2 border-bottom text-left">
                  <a href="/">About us</a>
                </div>
              </div>
              <div class="row py-2 justify-content-start align-items-center">
                <div class="col-12 px-0 py-2 text-left">
                  <a href="/">Help</a>
                </div>
                <div class="col-12 px-0 py-2 text-left">
                  <a href="/">Signup</a>
                </div>
                <div class="col-12 px-0 py-2 border-bottom text-left">
                  <a href="/">Login</a>
                </div>
                <div class="col-12 px-0 py-2 d-flex justify-content-start align-items-center">
                  <span class="btn-lang shadow-sm mr-1" @click="changeLocale('vi')">
                      <img src="img/language/vietnam.png" alt="Language">
                  </span>
                  <span class="btn-lang shadow-sm mr-1" @click="changeLocale('ko')">
                      <img src="img/language/south-korea.png" alt="Language">
                  </span>
                  <span class="btn-lang shadow-sm" @click="changeLocale('en')">
                      <img src="img/language/united-kingdom.png" alt="Language">
                  </span>
                </div>
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
import i18n from '@/i18n';
export default {
  props: ["id", "radius", "placeholder"],
  name: "MainNavBar",
  created() {},
  methods: {
      changeLocale(locale) {
      i18n.locale = locale;
  }
  },
  data: function() {
    return {};
  }
};
</script>
<style lang="scss">
.mainnavbar-setting:hover,
.mainnavbar-setting:focus,
.mainnavbar-setting:active {
  border: none !important;
  outline: 0;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.dropdown-pa {
  position: relative;
}
.dropdown-component {
  position: absolute;
  top: 50px;
  right: 50px;
  height: 200px;
  width: 100%;
  z-index: 100;
  background-color: #ffffff;
}
.btn-sm-round {
  width: 30px !important;
  height: 30px !important;
  line-height: 30px !important;
  padding: 0 !important;
}
.btn-sm-round svg {
  margin: 0 !important;
}
.main-navbar-component .modal-dialog {
  margin: 0 !important;
}
.main-navbar-component .modal-content {
  width: 100vw;
  margin: 0 !important;
  padding: 0 !important;
  height: 100vh;
  padding-bottom: 40px !important;
}
.main-navbar-component {
  font-size: 1rem;
}
.main-navbar-component a,
.main-navbar-component a:hover,
.main-navbar-component a:active,
.main-navbar-component a:focus,
.main-navbar-component a:visited {
  text-decoration: none;
  color: inherit;
  text-align: left;
}
.btn-lang {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding:0 !important;
  line-height: 40px;
  overflow: hidden;
  cursor: pointer;
}
.btn-lang img{
     height: 30px;
  width: 30px;
  border-radius: 50%;
}
</style>
