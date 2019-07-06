<template>
  <v-app>
    <v-toolbar app dark color="light-blue darken-4" absolute clipped-left>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-btn flat to="/">Home</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/other-setting">Other Setting</v-btn>
        <v-btn flat to="/order-manager">Order Management</v-btn>
      </v-toolbar-items>
      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <v-btn flat>
              <span>Tours</span>
              <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile>
            <v-btn flat to="/area">Area</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/destination">Destination</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/city">City</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/travel-style">Travel Style</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/tour-list">Tour List</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/tour-detail">Tour Detail</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/mice">MICE</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/fit">FIT</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/tour-order">Tour Order</v-btn>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <v-btn flat>
              <span>Car</span>
              <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile>
            <v-btn flat to="/carsupplier">Car Supplier (Nhà xe)</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/carcartype">CarType (Loại xe, số chỗ)</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/cartranstype">TransType(Loại hình thuê)</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/cardetailprice">CarPriceMarkUp ( Đặt giá xe)</v-btn>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <v-btn flat>
              <span>Hotel</span>
              <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile>
            <v-btn flat to="/supplier">Supplier</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/hotel">Hotel</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/room-type">Room Type</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/package">Package</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/package-hotel-rel">Package Hotel REL</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/option-service">Option Service</v-btn>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

      <v-footer dark height="auto">
        <v-container fluid class="no-space">
        <v-card flat tile class="light-blue darken-4 white--text text-xs-center ">
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            &copy;2019 —
            <strong>daiminh travel</strong>
          </v-card-text>
        </v-card>
        </v-container>
      </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-linkedin",
        "fab fa-instagram"
      ]
    };
  },
  mounted() {
  console.log(process.env.VUE_APP_API_IPADDRESS)
}
};
</script>
<style>
.no-space{
  padding: 0 !important;
  margin:0 !important;
}
</style>
