<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>ADS BANNER CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="900px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-form ref="form" v-model="valid">
          <v-card>
            <v-card-title class="pink white--text">
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-subheader>KEY</v-subheader>
              <v-container grid-list-xl>
                <v-layout wrap>
                     <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.adsType"
                      :items="adsType"
                      item-text="adsTypeName"
                      item-value="adsTypeCode"
                      label="Ads Type"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      :rules="[() => editedItem.adsCode.length > 0 || 'Required field']"
                      v-model="editedItem.adsCode"
                      label="AdsCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.adsName" label="AdsName"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.adsLink" label="AdsLink"></v-text-field>
                  </v-flex>
                   <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.adsLinkMobile" label="AdsLinkMobile"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3 >
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.startDate"
                          label="StartDate"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.startDate" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md3 >
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.endDate"
                          label="EndDate"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.endDate" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.adsTitle" label="Ads Title"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-textarea
                      name="input-7-1"
                      label="Ads Introduce"
                      v-model="editedItem.adsIntro"
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-select
                      v-model="editedItem.lang"
                      :items="language"
                      item-text="langName"
                      item-value="langCode"
                      label="Language"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addAdsIntroByLang">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="adsIntrosHeader"
                      :items="editedItem.adsIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="deleteAdsIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.adsTitle}}</td>
                        <td>{{props.item.adsIntro}}</td>
                        <td>{{props.item.lang}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                  <v-flex xs12 sm12 md12>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/ads'"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <h2>Old images.</h2>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="scroll-ngang">
                    <img
                      class="room-img"
                      v-for="(item,i) in editedItem.adsImages"
                      v-bind:src="`http://mdaiminh.dabook.vn/${item.filePath}`"
                      alt
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" :disabled="!valid" dark @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="ads" class="elevation-1">
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.adsCode }}</td>
          <td>{{ props.item.adsName }}</td>
          <td>{{ props.item.adsLink }}</td>
          <td>{{ props.item.adsLinkMobile }}</td>
          <td>{{ props.item.lang }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";
import FileUpload from "../components/FileUpload.vue";
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
  components: {
    FileUpload
  },
  data: () => ({
    apiIP: apiIP,
    uploadImg: [],
    search: "",
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
     menu1: false,
    menu2: false,
    adsIntrosHeader:[
        { text: "Actions", value: "name", sortable: false },
      {
        text: "AdsTitle",
        value: "adsTitle"
      },
      { text: "AdsIntro", value: "adsIntro" },
      { text: "AdsLang", value: "adsLang" },
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "AdsCode",
        value: "adsCode"
      },
      { text: "AdsName", value: "adsName" },
      { text: "AdsLink", value: "adsLink" },
      { text: "AdsLinkMobile", value: "adsLinkMobile" },
      { text: "Language", value: "lang" }
    ],
    ads: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    adsType: [
      { adsTypeCode: "TOUR", adsTypeName: "Tour ads" },
      { adsTypeCode: "HOTEL", adsTypeName: "Hotel ads" },
      { adsTypeCode: "CAR", adsTypeName: "Car ads" },
      { adsTypeCode: "FLIGHT", adsTypeName: "flight ads" },
      { adsTypeCode: "ANOTHER", adsTypeName: "Another ads" }
    ],
    editedIndex: -1,
    editedItem: {
        adsType:"",
      adsCode: "",
      adsName: "",
      adsLink: "",
      adsTitle:"",
      adsIntro:"",
      adsLinkMobile: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      isUsed: true,
      isHot: false,
      lang: "EN",
      adsImages: [],
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      removeImage: [],
      adsIntros: [
      ]
    },
    defaultItem: {
        adsType:"",
      adsCode: "",
      adsName: "",
      adsLink: "",
      adsLinkMobile: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      isUsed: true,
      isHot: false,
      lang: "EN",
       adsTitle:"",
      adsIntro:"",
      adsImages: [],
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      removeImage: [],
      adsIntros: [
      ]
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    deletePermision () {
    if (this.$store.state.user.login.permision === 'ADMIN') {
      return true
    }
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      AXIOS.get(apiIP + "/ads/", { crossdomain: true })
        .then(response => {
          this.ads = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
    },

    editItem(item) {
      this.editedIndex = 100;
      this.editedItem = Object.assign({}, item);
      delete this.editedItem._id;
      this.editId = item._id;
      this.dialog = true;
      this.disableSelect = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/ads/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },

    close() {
      this.dialog = false;
      this.disableSelect = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.uploadImg.length > 0) {
        console.log(this.editedItem.adsImages);
        this.editedItem.removeImage = this.editedItem.adsImages;
        this.editedItem.adsImages = this.uploadImg;
        console.log(this.editedItem.removeImage);
      }
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/ads/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/ads/insert", this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        }
        this.initialize();
        this.close();
      }
      this.uploadImg = [];
      this.editedItem.removeImage = [];
    },
    addAdsIntroByLang() {
      this.editedItem.adsIntros.push({
        adsTitle: this.editedItem.adsTitle,
        adsIntro: this.editedItem.adsIntro,
        lang: this.editedItem.lang
      });
    },
    deleteAdsIntroByLang(item) {
      const index = this.editedItem.adsIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.adsIntros.splice(index, 1);
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
