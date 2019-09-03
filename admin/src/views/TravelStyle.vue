<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>TRAVEL STYLE CRUD</v-toolbar-title>
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
                    <v-text-field
                      required
                      :rules="[() => editedItem.travelStyleCode.length > 0 || 'Required field']"
                      v-model="editedItem.travelStyleCode"
                      label="TravelStyleCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.order" label="Order"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.keyword" label="Keyword"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.travelStyleName" label="Style Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>Travel Style Intro</b>
                    </h5>
                    <CustomEditForm :dataParent="editedItem.travelStyleIntro" v-on:childtoparent="editedItem.travelStyleIntro=$event"></CustomEditForm>
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
                    <v-btn color="blue darken-1" dark @click="addTravelStyleIntroByLang">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="travelStyleIntrosHeader"
                      :items="editedItem.travelStyleIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-2" small @click="editTravelStyleIntroByLang(props.item)">edit</v-icon>
                          <v-icon small @click="deleteTravelStyleIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.travelStyleName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.travelStyleIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/travelstyle'"
                      :title="`Upload High Quality`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.travelStyleImages"
                      @getDeleteFile="deleteImage($event)"
                    ></ImageListComponent>
                  </v-flex>
                   <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImgWebp = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/travelstyle/webmp'"
                      :title="`Upload Webp Image`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.travelStyleImagesWebp"
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
    <v-data-table :headers="headers" :items="travelStyle" class="elevation-1">
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.travelStyleCode }}</td>
          <td>{{ props.item.travelStyleName }}</td>
          <td>{{ props.item.travelStyleIntro }}</td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.isUsed }}</td>
          <td>{{ props.item.order }}</td>
          <td>{{ props.item.keyword }}</td>
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
    travelStyleIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "TravelStyleName", value: "travelStyleName" },
      { text: "language", value: "lang" },
      { text: "TravelStyleIntro", value: "travelStyleIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "TravelStyleCode",
        sortable: false,
        value: "travelStyleCode"
      },
      { text: "TravelStyleName", value: "travelStyleName" },
      { text: "TravelStyleNameEN", value: "travelStyleNameEN" },
      { text: "Language", value: "lang" },
      { text: "isUsed", value: "isUsed" },
      { text: "order", value: "order" },
      { text: "keyword", value: "keyword" }
    ],
    travelStyle: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editedItem: {
      travelStyleCode: "",
      travelStyleName: "",
      travelStyleIntro: "",
      lang: "EN",
      travelStyleImages: [],
      removeImage: [],
      travelStyleImagesWebp: [],
      removeImageWebp: [],
      isUsed: true,
      keyword: "",
      order: 0,
      travelStyleIntros: []
    },
    defaultItem: {
      travelStyleCode: "",
      travelStyleName: "",
      travelStyleIntro: "",
      lang: "EN",
      travelStyleImages: [],
      removeImage: [],
      travelStyleImagesWebp: [],
      removeImageWebp: [],
      isUsed: true,
      keyword: "",
      order: 0,
      travelStyleIntros: []
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    deletePermision() {
      if (this.$store.state.user.login.permision === "ADMIN") {
        return true;
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
      AXIOS.get(apiIP + "/travelstyle/", { crossdomain: true })
        .then(response => {
          this.travelStyle = response.data;
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
      this.editedItem.removeImage=[];
      this.editedItem.removeImageWebp=[];
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/travelstyle/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
    deleteImage(image) {
      this.editedItem.travelStyleImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.travelStyleImagesWebp.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImageWebp.push(image);
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
          this.editedItem.travelStyleImages.push(element);
        });
      }
      if (this.uploadImgWebp.length > 0) {
        this.uploadImgWebp.forEach(element => {
          this.editedItem.travelStyleImagesWebp.push(element);
        });
      }
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(
            apiIP + "/travelstyle/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/travelstyle/insert", this.editedItem)
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
    addTravelStyleIntroByLang() {
      var isFound=false;
      this.editedItem.travelStyleIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
          element.travelStyleName= this.editedItem.travelStyleName;
        element.travelStyleIntro= this.editedItem.travelStyleIntro;
        isFound=true;
        return;
        }
      });
      if (isFound===false) {
      this.editedItem.travelStyleIntros.push({
        travelStyleName: this.editedItem.travelStyleName,
        travelStyleIntro: this.editedItem.travelStyleIntro,
        lang: this.editedItem.lang
      });
      }
    },
    deleteTravelStyleIntroByLang(item) {
      const index = this.editedItem.travelStyleIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.travelStyleIntros.splice(index, 1);
    },
    editTravelStyleIntroByLang(item) {
      this.editedItem.travelStyleName=item.travelStyleName;
      this.editedItem.travelStyleIntro=item.travelStyleIntro;
      this.editedItem.lang=item.lang;
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
