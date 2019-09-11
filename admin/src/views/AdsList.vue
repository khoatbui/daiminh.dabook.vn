<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>ADS LIST CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-dialog v-model="dialog" max-width="900px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-form ref="form" v-model="valid">
          <v-card>
            <v-card-title class="pink white--text">
              <span class="headline">{{ formTitle }}</span>
              <v-spacer></v-spacer>
              <v-btn color="white darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" :disabled="!valid" dark @click="save">Save</v-btn>
            </v-card-title>

            <v-card-text>
              <v-subheader>KEY</v-subheader>
              <v-container grid-list-xl>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.adsTypeId"
                      :items="adsType"
                      item-text="adsTypeName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="AdsType"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      :rules="[() => editedItem.adsCode.length > 0 || 'Required field']"
                      v-model="editedItem.adsCode"
                      label="Ads Code"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.order" label="Order"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
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
                  <v-flex xs12 sm6 md4>
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
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.keyword" label="Keyword"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md8>
                    <v-text-field v-model="editedItem.link" label="Link"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.ctaId"
                      :items="callToAction"
                      item-text="ctaName"
                      item-value="ctaCode"
                      label="Call To Action Button "
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.adsName" label="Ads Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>Ads Introduce</b>
                    </h5>
                    <CustomEditForm :idComponent="'adsintro'" :dataParent="editedItem.adsIntro" v-on:childtoparent="editedItem.adsIntro=$event"></CustomEditForm>
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
                          <v-icon small @click="editAdsIntroByLang(props.item)">edit</v-icon>
                          <v-icon small @click="deleteAdsIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.adsName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.adsIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/ads/adslist'"
                      :title="`Upload High Quality`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.adsImages"
                      @getDeleteFile="deleteImage($event)"
                    ></ImageListComponent>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImgWebp = $event"
                      v-bind:routerPath="apiIP+'/upload/ads/adslist/webmp'"
                      :title="`Upload Webp Image`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.adsImagesWebp"
                      @getDeleteFile="deleteImageWebp($event)"
                    ></ImageListComponent>
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
    <v-container fluid grid-list-xl pl-0 pr-0>
      <v-card>
        <v-layout pl-2 pr-2>
          <v-flex xs12 sm6 md3 p-2>
            <v-select
              v-model="filterByCombo.adsTypeId"
              :items="adsTypeFilter"
              item-text="adsTypeName"
              item-value="_id"
              label="Ads Type"
              return-object
            ></v-select>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <v-data-table
      dense
      :headers="headers"
      :items="itemsFilter"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.adsTypeId.adsTypeName }}</td>
          <td>{{ props.item.adsCode }}</td>
          <td>{{ props.item.adsName }}</td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.isUsed }}</td>
          <td>{{ props.item.order }}</td>
          <td>{{ props.item.keyword }}</td>
          <td>{{ props.item.adsIntro }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
    </v-data-table>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
// var apiIP='http://localhost:3001'
import axios from "axios";
import FileUpload from "../components/FileUpload.vue";
import moment from "moment";
import ImageListComponent from "../components/ImageListComponent.vue";

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
    FileUpload,
    ImageListComponent
  },
  data: () => ({
    apiIP: apiIP,
    uploadImg: [],
    uploadImgWebp: [],
    search: "",
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    disableSelect: false,
    adsIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "AdsName", value: "adsName" },
      { text: "language", value: "lang" },
      { text: "AdsIntro", value: "adsIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      { text: "Ads Type", value: "adsTypeId.adsTypeName" },
      {
        text: "AdsCode",
        value: "adsCode"
      },
      { text: "AdsName", value: "adsName" },
      { text: "Language", value: "lang" },
      { text: "isUsed", value: "isUsed" },
      { text: "order", value: "order" },
      { text: "keyword", value: "keyword" },
      { text: "Intro", value: "adsIntro" }
    ],
    filterByCombo: {
      adsTypeId: {
        adsTypeCode: "ALL"
      }
    },
    search: "",
    adsList: [],
    adsType: [],
    adsTypeFilter: [],
    menu1: false,
    menu2: false,
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    callToAction: [],
    stars: [{ star: 1 }, { star: 2 }, { star: 3 }, { star: 4 }, { star: 5 }],
    disableSelect: false,
    editedIndex: -1,
    editedItem: {
      adsTypeId: "",
      adsCode: "",
      adsName: "",
      adsIntro: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      adsImages: [],
      order: 0,
      keyword: "",
      isUsed: true,
      removeImage: [],
      adsImagesWebp: [],
      removeImageWebp: [],
      adsIntros: [],
      link: "",
      cta:"",
      isAds:true,
    },
    defaultItem: {
      adsTypeId: "",
      adsCode: "",
      adsName: "",
      adsIntro: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      adsImages: [],
      order: 0,
      keyword: "",
      isUsed: true,
      removeImage: [],
      adsImagesWebp: [],
      removeImageWebp: [],
      adsIntros: [],
      link: "",
      cta:"",
      isAds:true,
    },
    componentLoaded: false
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    itemsFilter() {
      if (this.componentLoaded == false) {
        return;
      }
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it

      return this.adsListByLang.filter(i => {
        return (
          this.filterByCombo.adsTypeId.adsTypeCode === "ALL" ||
          typeof this.filterByCombo.adsTypeId.adsTypeCode === "undefined" ||
          i.adsTypeId._id === this.filterByCombo.adsTypeId._id
        );
      });
    },
    deletePermision() {
      if (this.$store.state.user.login.permision === "ADMIN") {
        return true;
      }
    },
    adsListByLang() {
      if (this.componentLoaded === false) {
        return;
      }
      this.adsList.forEach(element => {
        element.adsIntros.forEach(area => {
          if (area.lang.toUpperCase() === "EN") {
            element.adsName = area.adsName;
            element.adsIntro = area.adsIntro;
          }
        });
      });
      return this.adsList;
    },
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
    moment: function() {
      return moment();
    },
    initialize() {
      AXIOS.get(apiIP + "/adslist", { crossdomain: true })
        .then(response => {
          this.adsList = response.data;
          console.log(this.adsList);
          this.componentLoaded=true;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/cta/getused", { crossdomain: true })
        .then(response => {
          this.callToAction = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/adstype/getused", { crossdomain: true })
        .then(response => {
          this.adsType = response.data;
          this.adsTypeFilter = response.data;
          this.adsTypeFilter.unshift({
            adsTypeCode: "ALL",
            adsTypeName: "ALL",
            adsTypeId: -1
          });
          this.componentLoaded = true;
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
      this.editedItem.removeImage = [];
      this.editedItem.removeImageWebp = [];
      this.editedItem.startDate = moment(item.startDate)
        .utc()
        .format("YYYY-MM-DD");
      this.editedItem.endDate = moment(item.endDate)
        .utc()
        .format("YYYY-MM-DD");
    },
    deleteImage(image) {
      this.editedItem.adsImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.adsImagesWebp.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImageWebp.push(image);
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/adslist/" + item._id)
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
        this.uploadImg.forEach(element => {
          this.editedItem.adsImages.push(element);
        });
      }
      if (this.uploadImgWebp.length > 0) {
        this.uploadImgWebp.forEach(element => {
          this.editedItem.adsImagesWebp.push(element);
        });
      }
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/adslist/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/adslist/insert", this.editedItem)
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
      var isFound = false;
      this.editedItem.adsIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
          element.adsName = this.editedItem.adsName;
          element.adsIntro = this.editedItem.adsIntro;
          isFound = true;
          return;
        }
      });
      if (isFound === false) {
        this.editedItem.adsIntros.push({
          adsName: this.editedItem.adsName,
          adsIntro: this.editedItem.adsIntro,
          lang: this.editedItem.lang
        });
      }
    },
    deleteAdsIntroByLang(item) {
      const index = this.editedItem.adsIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.adsIntros.splice(index, 1);
    },
    editAdsIntroByLang(item) {
      this.editedItem.adsName = item.adsName;
      this.editedItem.adsIntro = item.adsIntro;
      this.editedItem.lang = item.lang;
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
.sub-add-component {
  background-color: rgb(205, 224, 243) !important;
}
</style>
