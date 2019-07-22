<template>
  <v-app>
   <NavBar></NavBar>
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
import NavBar from "@/components/NavBar.vue"
export default {
  name: "App",
  components:{
    NavBar
  },
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
