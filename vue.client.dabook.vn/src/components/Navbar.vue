//src/components/Navbar.vue
<template>
  <div class="d-flex justify-content-center align-items-center border-top w-100 fixed-bottom p-0 m-0 bg-white">
    <nav class="navbar w-100 mx-4 my-2 navbar-light bg-white mx-auto">
      <a class="nav-item d-flex flex-column justify-content-around align-items-center" href="/main" v-bind:class="{'active':current=='main'}">
        <img class="nav-icon" src="img/main_logo_only_color.png" alt>
        <span>{{$t("nav_home")}}</span>
      </a>
      <a
        class="nav-item d-flex flex-column justify-content-center align-items-center" v-bind:class="{'active':current=='hotel'}"
        href="/promotion"
      >
        <font-awesome-icon class="nav-icon-fa" icon="hotel"/>
        <span>{{$t("nav_hotel")}}</span>
      </a>
      <a class="nav-item d-flex flex-column justify-content-center align-items-center" href="/car" v-bind:class="{'active':current=='car'}">
        <font-awesome-icon class="nav-icon-fa" :icon="['fa', 'car']"/>
        <span>{{$t("nav_car")}}</span>
      </a>
      <a class="nav-item d-flex flex-column justify-content-center align-items-center" href="/tour" v-bind:class="{'active':current=='tour'}">
        <font-awesome-icon class="nav-icon-fa" :icon="['fa', 'umbrella-beach']"/>
        <span>{{$t("nav_tour")}}</span>
      </a>
      <a class="nav-item d-flex flex-column justify-content-center align-items-center" href="/historychecking" v-bind:class="{'active':current=='history'}">
        <font-awesome-icon class="nav-icon-fa" :icon="['fa', 'barcode']"/>
        <span>{{$t("nav_deals")}}</span>
      </a>
    </nav>
  </div>
</template>
<script>
export default {
  props:['current'],
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss">
.nav-icon {
  height: 20px;
}
.nav-item:hover {
  text-decoration: none;
}
.nav-item:hover > .nav-icon-fa,
.nav-item:hover > span,
.nav-icon-fa:hover,
.nav-item span:hover {
  color: #dc3545;
  text-decoration: none;
}
.nav-item.active > .nav-icon-fa,
.nav-item.active > span {
  color: #dc3545;
}
.nav-icon-fa,
.nav-item span {
  font-size: 1.2rem;
  font-weight: bolder;
  color: #374B66;
}
.nav-item span {
  font-size: 0.8rem;
}
</style>
