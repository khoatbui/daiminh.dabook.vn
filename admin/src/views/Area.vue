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
                      :rules="[() => editedItem.areaCode.length > 0 || 'Required field']"
                      v-model="editedItem.areaCode"
                      label="AreaId"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.areaName" label="AreaName"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.areaNameEN" label="AreaNameEN"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.lang"
                      :items="language"
                      item-text="langName"
                      item-value="langCode"
                      label="Language"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md8>
                    <v-text-field v-model="editedItem.map" label="Map"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/area'"
                      :title="`Upload High Quality`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.areaImages"
                      @getDeleteFile="deleteImage($event)"
                    ></ImageListComponent>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImgWebp = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/area/webmp'"
                      :title="`Upload Webp Image`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.areaImagesWebp"
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
    <v-data-table :headers="headers" :items="area" class="elevation-1">
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.areaCode }}</td>
          <td>{{ props.item.areaName }}</td>
          <td>{{ props.item.areaNameEN }}</td>
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
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "AreaCode",
        sortable: false,
        value: "areaCode"
      },
      { text: "AreaName", value: "areaName" },
      { text: "AreaNameEN", value: "areaNameEN" },
      { text: "Language", value: "lang" }
    ],
    area: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editedItem: {
      areaCode: "",
      areaName: "",
      areaNameEN: "",
      lang: "EN",
      areaImages: [],
      removeImage: [],
      areaImagesWebp: [],
      removeImageWebp: [],
      map: ""
    },
    defaultItem: {
      areaCode: "",
      areaName: "",
      areaNameEN: "",
      lang: "EN",
      areaImages: [],
      removeImage: [],
      map: "",
      areaImagesWebp: [],
      removeImageWebp: [],
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
      AXIOS.get(apiIP + "/area/", { crossdomain: true })
        .then(response => {
          this.area = response.data;
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
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/area/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
    deleteImage(image) {
      this.editedItem.areaImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.areaImagesWebp.forEach(function(item, index, object) {
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
          this.editedItem.areaImages.push(element);
        });
      }
      if (this.uploadImgWebp.length > 0) {
        this.uploadImgWebp.forEach(element => {
          this.editedItem.areaImagesWebp.push(element);
        });
      }
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/area/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/area/insert", this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        }
        this.initialize();
        this.close();
      }
      this.uploadImg = [];
      this.editedItem.removeImage = [];
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
