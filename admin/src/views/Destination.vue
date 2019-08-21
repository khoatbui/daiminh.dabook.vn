<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>DESTINATION CRUD</v-toolbar-title>
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
                      v-model="editedItem.cityId"
                      :items="city"
                      item-text="cityName"
                      item-value="_id"
                      label="City"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      :rules="[() => editedItem.destinationCode.length > 0 || 'Required field']"
                      v-model="editedItem.destinationCode"
                      label="destinationCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm3 md2>
                    <v-text-field v-model="editedItem.order" label="Order"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm3 md2>
                    <v-text-field v-model="editedItem.order" label="Order"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm3 md2>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-checkbox v-model="editedItem.isPromotion" :label="`IsPromotion?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field v-model="editedItem.map" label="Map"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.destinationName" label="Destination Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>Destination Intro</b>
                    </h5>
                    <VueTrixEditor
                      v-model="editedItem.destinationIntro"
                      placeholder="Destination Intro"
                      uniqueId="itravelstyle"
                      v-bind:image-upload-path="`${apiIP}/upload/tour/destination/destinationintro`"
                      localStorage
                    >
                    </VueTrixEditor>
                    <div v-html="editedItem.destinationIntro" class="old-content"></div>
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
                    <v-btn color="blue darken-1" dark @click="addDestinationIntroByLang">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="destinationIntrosHeader"
                      :items="editedItem.destinationIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-3"
                            small
                            @click="editDestinationIntroByLang(props.index,props.item)"
                          >edit</v-icon>
                          <v-icon small @click="deleteDestinationIntroByLang(props.index)">delete</v-icon>
                        </td>
                        <td>{{props.item.destinationName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.destinationIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/destination'"
                      :title="`Upload High Quality`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.destinationImages"
                      @getDeleteFile="deleteImage($event)"
                    ></ImageListComponent>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImgWebp = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/destination/webmp'"
                      :title="`Upload Webp Image`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.destinationImagesWebp"
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
    <v-data-table :headers="headers" :items="destination" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.cityId.cityName }}</td>
          <td>{{ props.item.destinationCode }}</td>
          <td>{{ props.item.destinationName }}</td>
          <td>{{ props.item.order }}</td>
          <td>{{ props.item.createBy }}</td>
          <td>{{ props.item.createDate }}</td>
          <td>{{ props.item.modifyBy }}</td>
          <td>{{ props.item.modifyDate }}</td>
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
    <v-snackbar v-model="snackbar.snackbar">
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-btn absolute dark fab bottom right small color="pink">
      <download-excel :data="destination" name="destination.xls">
        <i class="far fa-file-excel"></i>
      </download-excel>
    </v-btn>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";
import FileUpload from "../components/FileUpload.vue";
import VueTrixEditor from "@dymantic/vue-trix-editor";
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
    VueTrixEditor,
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
    destinationIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "DestinationName", value: "destinationName" },
      { text: "language", value: "lang" },
      { text: "DestinationIntro", value: "destinationIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      { text: "CityCode", value: "cityId.cityName" },
      { text: "destinationCode", value: "destinationCode" },
      { text: "destinationName", value: "destinationName" },
      { text: "Order", value: "order" },
      { text: "Create By", value: "createBy" },
      { text: "Create Date", value: "createDate" },
      { text: "Modify By", value: "modifyBy" },
      { text: "Modify Date", value: "modifyDate" }
    ],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    destination: [],
    city: [],
    editedIndex: -1,
    disableSelect: false,
    editId: "",
    editedItem: {
      destinationCode: "",
      destinationName: "",
      destinationIntro: "",
      createBy: "",
      modifyBy: "",
      lang: "EN",
      destinationImages: [],
      removeImage: [],
      destinationImagesWebp: [],
      removeImageWebp: [],
      order: 0,
      keyword: "",
      isUsed: true,
      isPromotion: false,
      destinationIntros: [],
      map: ""
    },
    defaultItem: {
      destinationCode: "",
      destinationName: "",
      destinationIntro: "",
      createBy: "",
      modifyBy: "",
      lang: "EN",
      destinationImages: [],
      removeImage: [],
      destinationImagesWebp: [],
      removeImageWebp: [],
      order: 0,
      keyword: "",
      isUsed: true,
      isPromotion: false,
      destinationIntros: [],
      map: ""
    },
    snackbar: {
      snackbar: false,
      text: ""
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
      AXIOS.get(apiIP + "/destination/", { crossdomain: true })
        .then(response => {
          this.destination = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/city/getused", { crossdomain: true })
        .then(response => {
          this.city = response.data;
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
        AXIOS.delete(apiIP + "/destination/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
    deleteImage(image) {
      this.editedItem.destinationImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.destinationImagesWebp.forEach(function(
        item,
        index,
        object
      ) {
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
          this.editedItem.destinationImages.push(element);
        });
      }
      if (this.uploadImgWebp.length > 0) {
        this.uploadImgWebp.forEach(element => {
          this.editedItem.destinationImagesWebp.push(element);
        });
      }
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(
            apiIP + "/destination/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/destination/insert", this.editedItem)
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
    addDestinationIntroByLang() {
      var isFound=false;
      this.editedItem.destinationIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
          element.destinationName= this.editedItem.destinationName;
        element.destinationIntro= this.editedItem.destinationIntro;
        isFound=true;
        return;
        }
      });
      if (isFound===false) {
      this.editedItem.destinationIntros.push({
        destinationName: this.editedItem.destinationName,
        destinationIntro: this.editedItem.destinationIntro,
        lang: this.editedItem.lang
      });
      }
    },
    modifyDestinationIntroByLang() {
      this.editedItem.destinationIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
          element.destinationName= this.editedItem.destinationName;
        element.destinationIntro= this.editedItem.destinationIntro;
        }
      });
    },
    deleteDestinationIntroByLang(item) {
      this.editedItem.destinationIntros.splice(item, 1);
    },
    editDestinationIntroByLang(index,item) {
      this.editedItem.destinationName=item.destinationName;
      this.editedItem.destinationIntro=item.destinationIntro;
      this.editedItem.lang=item.lang;
      document.getElementById('itravelstyle').value=item.destinationIntro;
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
.disabled {
  pointer-events: none;
  color: #bfcbd9;
  cursor: not-allowed;
  background-image: none;
  background-color: #eef1f6;
  border-color: #d1dbe5;
}
.whitespace-nowrap td {
  white-space: nowrap;
}
</style>
