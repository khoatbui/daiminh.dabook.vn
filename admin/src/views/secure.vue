<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div id="secure">
        <h1>Secure Area</h1>
        <p>
            This is a secure area
        </p>
    </div>
    </v-flex>
  </v-layout>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS
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
  name: 'Secure',
        data() {
            return {};
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
