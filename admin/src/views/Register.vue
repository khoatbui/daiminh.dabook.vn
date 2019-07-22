<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
        <v-form ref="form"  v-model="valid">
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">REGISTER NEW ACCOUNT</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title align-center justify-center>
          <v-container>
            <v-layout row wrap fill-width align-center justify-center>
              <v-flex xs6>
                <v-text-field v-model="input.fullName" label="FullName" required
                :rules="[() => input.fullName.length > 0 || 'Required field']"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select
                  v-model="input.team"
                  :items="team"
                  item-text="teamName"
                  item-value="teamCode"
                  label="Team"
                ></v-select>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="input.userName" label="Username" required
                :rules="[() => input.userName.length > 0 || 'Required field']"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="input.userEmail" label="Email" required
                :rules="[() => input.userEmail.length > 0 || 'Required field']"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field type="password" v-model="input.password" label="Password" required
                :rules="[() => input.password.length > 0 || 'Required field']"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  type="password"
                  v-model="confirmPassword"
                  label="Confirm Password"
                  required
                  :rules="[() => confirmPassword == input.password || 'Password not matching']"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>
        <v-card-actions>
          <v-container>
            <v-btn color="primary" @click="register">Register</v-btn>
          </v-container>
        </v-card-actions>
      </v-card>
        </v-form>
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
import axios from "axios";
import moment from "moment";

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
            valid: true,
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      input: {
        fullName: "",
        userName: "",
        userEmail: "",
        team: "",
        password: "",
        createBy: "",
        createDate: moment(new Date()).format("YYYY-MM-DD")
      },
      confirmPassword:"",
      team: [
        {
          teamCode: "IMG",
          teamName: "IMG Team"
        },
        {
          teamCode: "TOU",
          teamName: "Tour Team"
        },
        {
          teamCode: "TIC",
          teamName: "Ticket Team"
        },
        {
          teamCode: "FIN",
          teamName: "Finance Team"
        }
      ]
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
    },

    register() {
          if (this.$refs.form.validate()) {
      this.input.createBy = 'system';
      AXIOS.post(apiIP + "/user/insert", this.input)
        .then(response => {
            this.snackbar = true;
            this.input.message = response.data.message;
            if (response.data.status==true) {
                this.$router.replace('/login');
            }
        })
        .catch(function(error) {})
        .finally(function() {});
          }
          else
          {
              this.snackbar = true;
            this.input.message = "Yeu cau nhap day du thong tin";
          }
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
