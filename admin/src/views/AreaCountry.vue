<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>AREA CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="900px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-form  ref="form" v-model="valid">
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
                      v-model="editedItem.countryId"
                      :items="country"
                      item-text="countryName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Country"
                    ></v-select>
                  </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field required
                    :rules="[() => editedItem.areaCountryCode.length > 0 || 'Required field']"
                     v-model="editedItem.areaCountryCode" label="AreaCountryCode"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.areaCountryName" label="AreaCountry Name"></v-text-field>
                  </v-flex>
                   <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5><b>Travel Style Intro</b></h5>
                  <VueTrixEditor v-model="editedItem.areaCountryIntro" placeholder="AreaCountry Intro" uniqueId="itravelstyle" v-bind:image-upload-path="`${apiIP}/upload/tour/areacountry/areacountryintro`" localStorage></VueTrixEditor>
                  <div v-html="editedItem.areaCountryIntro" class="old-content">

                    </div>
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
                    <v-btn color="blue darken-1" dark @click="addAreaCountryIntroByLang">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="areaCountryIntrosHeader"
                      :items="editedItem.areaCountryIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="deleteAreaCountryIntroByLang(props.index)">delete</v-icon>
                        </td>
                        <td>{{props.item.areaCountryName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.areaCountryIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                 <v-flex xs12 sm12 md12>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/areacountry'"
                    ></file-upload>
                 </v-flex>
                 <v-flex xs12 sm12 md12>
                    <h2>Old images.</h2>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="scroll-ngang">
                    <img
                      class="room-img"
                      v-for="(item,i) in editedItem.areaCountryImages"
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
    <v-data-table :headers="headers" :items="areaCountry" class="elevation-1">
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
          <td>{{ props.item.areaCountryCode }}</td>
          <td>{{ props.item.areaCountryName }}</td>
           <td>{{ props.item.areaCountryIntro }}</td>
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
import VueTrixEditor from "@dymantic/vue-trix-editor";

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
    VueTrixEditor
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
    areaCountryIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "AreaCountryName", value: "areaCountryName" },
      { text: "language", value: "lang" },
      { text: "AreaCountryIntro", value: "areaCountryIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "AreaCountryCode",
        sortable: false,
        value: "areaCountryCode"
      },
      { text: "AreaCountryName", value: "areaCountryName" },
       { text: "AreaCountryIntro", value: "areaCountryIntro" },
      { text: "Language", value: "lang" }
    ],
    areaCountry: [],
    country:[],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editedItem: {
      areaCountryCode: "",
      areaCountryName: "",
      areaCountryIntro: "",
      lang: "EN",
       areaCountryImages: [],
      removeImage: [],
      areaCountryIntros:[]
    },
    defaultItem: {
     areaCountryCode: "",
      areaCountryName: "",
      areaCountryIntro: "",
      lang: "EN",
       areaCountryImages: [],
      removeImage: [],
      areaCountryIntros:[]
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
      AXIOS.get(apiIP + "/areaCountry/", { crossdomain: true })
        .then(response => {
          this.areaCountry = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

         AXIOS.get(apiIP + "/country/", { crossdomain: true })
        .then(response => {
          this.country = response.data;
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
        AXIOS.delete(apiIP + "/areacountry/" + item._id)
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
        console.log(this.editedItem.areaCountryImages);
        this.editedItem.removeImage = this.editedItem.areaCountryImages;
        this.editedItem.areaCountryImages = this.uploadImg;
        console.log(this.editedItem.removeImage);
      }
     this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/areacountry/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/areacountry/insert", this.editedItem)
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
    addAreaCountryIntroByLang() {
      this.editedItem.areaCountryIntros.push({
        areaCountryName: this.editedItem.areaCountryName,
        areaCountryIntro: this.editedItem.areaCountryIntro,
        lang: this.editedItem.lang
      });
    },
    deleteAreaCountryIntroByLang(item) {
      this.editedItem.areaCountryIntros.splice(item, 1);
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
