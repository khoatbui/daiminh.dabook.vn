<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">LOGIN</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title align-center justify-center>
          <v-container>
            <v-layout row wrap fill-width align-center justify-center>
              <v-flex xs12>
                <v-text-field v-model="input.userEmail" label="Email" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field v-model="input.password" label="Password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>
        <v-card-actions>
          <v-container>
            <v-btn flat color="primary">Cancel</v-btn>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :bottom="true"
      :multi-line="mode === 'multi-line'"
      :right="true"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ input.message }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
console.log(apiIP);
import axios from "axios";
const AXIOS = axios.create({
  baseURL: `http://localhost:8082/Fleet-App/api/`,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.token,
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json, text/plain, */*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Credentials": true
  }
});
export default {
  data() {
    return {
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      input: {
        userEmail: "",
        password: "",
        status: false,
        message: ""
      }
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      console.log(this.userName);
    },

    login() {
      AXIOS.post(apiIP + "/user/login", this.input)
        .then(response => {
          if (response.data.status == true) {
            this.snackbar = true;
            this.input.message = response.data.message;
            this.input.status = response.data.status;
            localStorage.loginStatus = true;
            console.log("----------------");
            console.log(document.cookies);
            this.$router.go('/');
          } else {
            this.snackbar = true;
            this.input.message = response.data.message;
            this.input.status = response.data.status;
            localStorage.loginStatus = false;
          }
        })
        .catch(function(error) {})
        .finally(function() {});
    }
  }
};
</script>
<style>
.ellip-text td {
  white-space: nowrap;
  width: 50px;
  max-width: 50px !important;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
