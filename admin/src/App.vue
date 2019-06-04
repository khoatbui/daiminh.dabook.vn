<template>
  <v-app>
    <v-toolbar app dark color="cyan darken-3" absolute clipped-left>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-btn flat to="/">Home</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/area">Area</v-btn>
        <v-btn flat to="/destination">Destination</v-btn>
        <v-btn flat to="/city">City</v-btn>
        <v-btn flat to="/travel-style">Travel Style</v-btn>
        <v-btn flat to="/tour-list">Tour List</v-btn>
        <v-btn flat to="/tour-detail">Tour Detail</v-btn>
        <v-btn flat to="/other-setting">Other Setting</v-btn>
        <v-btn flat to="/order-manager">Order Management</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>