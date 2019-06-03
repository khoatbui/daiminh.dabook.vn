<template>
  <v-app>
    <v-toolbar dark color="pink">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title ><v-btn flat to="/">Admin</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        
        <v-btn flat to="/destination">Destination</v-btn>
        <v-btn flat  to="/travel-style">TravelStyle</v-btn>
        <v-btn flat  to="/tour-list">TourList</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
     <router-view></router-view>
    </v-content>
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