<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>hotel CRUD</v-toolbar-title>
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
                      v-model="editedItem.supplierId"
                      :items="supplier"
                      item-text="supplierName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Supplier"
                    ></v-select>
                  </v-flex>
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
                      :rules="[() => editedItem.hotelCode.length > 0 || 'Required field']"
                      v-model="editedItem.hotelCode"
                      label="hotelCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.star" label="Star"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.isHot" :label="`IsHot?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.isPromote" :label="`isPromote?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.isPackage" :label="`isPackage?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.keyword" label="Keyword"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field v-model="editedItem.map" label="Map"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md8 class="sub-add-component">
                    <v-text-field v-model="editedItem.hotelName" label="Hotel Name"></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-select
                      v-model="editedItem.lang"
                      :items="language"
                      item-text="langName"
                      item-value="langCode"
                      label="Language"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addHotelIntroByLang">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>Hotel Introduce</b>
                    </h5>
                    <CustomEditForm :idComponent="'hotelintro'" :dataParent="editedItem.hotelIntro" v-on:childtoparent="editedItem.hotelIntro=$event"></CustomEditForm>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="hotelIntrosHeader"
                      :items="editedItem.hotelIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-2" small @click="editHotelIntroByLang(props.item)">edit</v-icon>
                          <v-icon small @click="deleteHotelIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.hotelName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.hotelIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                   <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/hotel/hotel'"
                      :title="`Upload High Quality`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.hotelImages"
                      @getDeleteFile="deleteImage($event)"
                    ></ImageListComponent>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImgWebp = $event"
                      v-bind:routerPath="apiIP+'/upload/hotel/hotel/webmp'"
                      :title="`Upload Webp Image`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.hotelImagesWebp"
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
    <v-data-table :headers="headers" :items="hotel" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.supplierId.supplierName }}</td>
          <td>{{ props.item.cityId.cityName }}</td>
          <td>{{ props.item.hotelCode }}</td>
          <td>{{ props.item.hotelName }}</td>
          <td>{{ props.item.star }}</td>
          <td>{{ props.item.createBy }}</td>
          <td>{{ props.item.createDate }}</td>
          <td>{{ props.item.hotelIntro }}</td>
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
      <download-excel :data="hotel" name="hotel.xls">
        <i class="far fa-file-excel"></i>
      </download-excel>
    </v-btn>
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
    search: "",
    valid: true,
    uploadImg: [],
    uploadImgWebp: [],
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    hotelIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "HotelName", value: "hotelName" },
      { text: "language", value: "lang" },
      { text: "HotelIntro", value: "hotelIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      { text: "Supplier", value: "supplierId.supplierName" },
      { text: "City", value: "city.cityName" },
      { text: "hotelCode", value: "hotelCode" },
      { text: "HotelName", value: "hotelName" },
      { text: "Star", value: "star" },
      { text: "Create By", value: "createBy" },
      { text: "Create Date", value: "createDate" },
      { text: "Hotel Intro", value: "hotelIntro" }
    ],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    supplier: [],
    city: [],
    hotel: [],
    editedIndex: -1,
    disableSelect: false,
    editId: "",
    editedItem: {
      supplierId: "",
      cityId: "",
      hotelName: "",
      star: "5",
      createBy: "",
      modifyBy: "",
      hotelCode: "",
      keyword: "",
      isUsed: true,
      isHot: true,
      isPromote: true,
      hotelImages: [],
      removeImage: [],
      hotelImagesWebp: [],
      removeImageWebp: [],
      hotelIntro: "",
      hotelIntros: [],
      map: "",
      isPackage:true,
    },
    defaultItem: {
      supplierId: "",
      cityId: "",
      hotelName: "",
      star: "5",
      createBy: "",
      modifyBy: "",
      hotelCode: "",
      keyword: "",
      isUsed: true,
      isHot: true,
      isPromote: true,
      hotelImages: [],
      removeImage: [],
      hotelImagesWebp: [],
      removeImageWebp: [],
      hotelIntro: "",
      hotelIntros: [],
      map: "",
      isPackage:true,
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
      AXIOS.get(apiIP + "/hotel/", { crossdomain: true })
        .then(response => {
          console.log(this.city);
          this.hotel = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/supplier/getused", { crossdomain: true })
        .then(response => {
          this.supplier = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/city/getused", { crossdomain: true })
        .then(response => {
          this.city = response.data;
          console.log(this.city);
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
        AXIOS.delete(apiIP + "/hotel/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
    deleteImage(image) {
      this.editedItem.hotelImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.hotelImagesWebp.forEach(function(item, index, object) {
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
          this.editedItem.hotelImages.push(element);
        });
      }
      if (this.uploadImgWebp.length > 0) {
        this.uploadImgWebp.forEach(element => {
          this.editedItem.hotelImagesWebp.push(element);
        });
      }
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/hotel/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/hotel/insert", this.editedItem)
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
    addHotelIntroByLang() {
      var isFound=false;
      this.editedItem.hotelIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
        element.hotelName= this.editedItem.hotelName;
        element.hotelIntro= this.editedItem.hotelIntro;
        isFound=true;
        return;
        }
      });
      if (isFound===false) {
      this.editedItem.hotelIntros.push({
        hotelName: this.editedItem.hotelName,
        hotelIntro: this.editedItem.hotelIntro,
        lang: this.editedItem.lang
      });
      }
    },
    deleteHotelIntroByLang(item) {
      const index = this.editedItem.hotelIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.hotelIntros.splice(index, 1);
    },
    editHotelIntroByLang(item) {
      this.editedItem.hotelName=item.hotelName;
      this.editedItem.hotelIntro=item.hotelIntro;
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
