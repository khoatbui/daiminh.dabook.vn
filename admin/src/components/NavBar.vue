<template>
  <div>
    <v-toolbar app dark color="light-blue darken-4" absolute clipped-left>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-btn flat to="/">Home</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/order-manager">Order Management</v-btn>
      </v-toolbar-items>
      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <v-btn flat>
              <span>Other Setting</span>
              <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile>
            <v-btn flat to="/adsmanager">AdsManager</v-btn>
          </v-list-tile>
        </v-list>
      </v-menu>
       <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <v-btn flat>
              <span>Blog</span>
              <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile>
            <v-btn flat to="/blogtype">Blog Type</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/bloglist">Blog List</v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat to="/blogdetail">Blog Detail</v-btn>
          </v-list-tile>
        </v-list>
      </v-menu>
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
            <v-btn flat to="/country">Country</v-btn>
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
            <v-btn flat to="/tour-supplier">Tour Supplier</v-btn>
          </v-list-tile>
           <v-list-tile>
            <v-btn flat to="/tour-type">Tour Type</v-btn>
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
      <div class="user">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn flat icon v-on="on">
              <font-awesome-icon icon="user" class="text-2lg" />
            </v-btn>
          </template>
          <v-list>
            <v-layout row wrap p-2 class="text-xs-center">
              <v-flex xs4 class="m-2">
                <img src="img/user/user.png" alt class="img-avata" />
              </v-flex>
              <v-flex xs8 class="m-2 text-xs-left align-center justify-center align-self-center">
                <div class="subheading p-2 font-weight-bold">{{userLogin.login.fullName}}</div>
                <span class="p-2">{{userLogin.login.team}}</span>
              </v-flex>
              <v-flex xs12 class="text-xs-right m-2">
                <v-btn
                  depressed
                  small
                  color="default"
                  v-if="userLogin.status==true"
                  @click="logout"
                >Logout</v-btn>
                <v-btn
                  depressed
                  small
                  color="primary"
                  v-if="userLogin.status==true"
                  @click.stop="dialog = true"
                >Change Info</v-btn>
                <v-btn
                  depressed
                  small
                  color="primary"
                  v-if="userLogin.status==false"
                  @click="login"
                >Login</v-btn>
              </v-flex>
            </v-layout>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
    <template>
      <v-dialog v-model="dialog" max-width="490">
        <v-form ref="form" v-model="valid">
          <v-card>
            <v-card-title class="headline primary white--text" dark>Change user info</v-card-title>

            <v-card-text>
              <v-layout row wrap fill-width align-center justify-center>
                <v-flex xs12 class="align-center justify-center align-self-center">
                  <img src="img/user/user.png" alt class="img-avata" />
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="userInfo.fullName" label="FullName" disabled></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="userInfo.userName" label="UserName" disabled></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="userInfo.userEmail" label="Email" disabled></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    type="password"
                    v-model="userInfo.password"
                    label="New Password"
                    required
                    :rules="[() => userInfo.password.length > 0 || 'Required field']"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    type="password"
                    v-model="confirmPassword"
                    label="Confirm Password"
                    required
                    :rules="[() =>  confirmPassword == userInfo.password || 'Password not matching']"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="default" flat="flat" @click="dialog = false">Close</v-btn>

              <v-btn type="button" color="primary" @click="changePassword">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </template>
  </div>
</template>
  </div>
</template>

<!-- Javascript -->
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
  props: [],
  name: "NavBar",
  data() {
    return {
      valid: true,
      dialog: false,
      userInfo: {
          fullName:"",
          userName:"",
          userEmail:"",
          password:"",
          modifyDate: moment(new Date()).format("YYYY-MM-DD")
      },
      confirmPassword: "",
      input:{
          message:""
      }
    };
  },
  computed: {
    userLogin() {
      return this.$store.state.user;
    }
  },
  methods: {
    login() {
      this.$router.replace("/login");
    },
    logout() {
      localStorage.loginStatus = false;
      this.$store.dispatch("updateUserAction", {
        login: {
          userName: "Guest"
        },
        status: false
      });
      this.$store.dispatch("updateLoginStatusAction", false);
      this.$router.replace("/login");
    },
    changePassword() {
        console.log('caa')
      if (this.$refs.form.validate()) {
        this.userInfo.modifyBy = "system";
        this.userInfo.modifyDate= moment(new Date()).format("YYYY-MM-DD");
        AXIOS.post(apiIP + `/user/update/${this.userInfo._id}`, this.userInfo)
          .then(response => {
            this.snackbar = true;
            this.input.message = response.status;
            if (response.status == 200) {
            //   this.$store.dispatch("updateUserAction", response.data);
            }
          })
          .catch(function(error) {})
          .finally(function() {});
      } else {
        this.snackbar = true;
        this.input.message = "Yeu cau nhap day du thong tin";
      }
      this.dialog = false;
      this.$router.replace('/')
    }
  },
  mounted() {
    this.userInfo = this.$store.state.user.login;
    console.log(this.userInfo);
  }
};
</script>

<!-- SASS styling -->
<style lang="scss">
.img-avata {
  width: 70px;
  height: 70px;
}
.text-2lg {
  font-size: 1.5rem;
}
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
.img-list li {
  height: 150px;
  min-height: 150px;
  widows: auto;
  padding: 10px;
}
.img-list li img {
  height: 100%;
  width: auto;
}
.img-list img {
  width: 100%;
  height: auto;
}
.scroll-ngang {
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  white-space: nowrap;
}
.scroll-ngang li {
  display: inline-block;
}
</style>