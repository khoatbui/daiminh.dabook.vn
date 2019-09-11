<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>ROOMT CRUD</v-toolbar-title>
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
                      :rules="[() => typeof (editedItem.supplierId) !== 'undefined' || 'Required field']"
                      :items="supplier"
                      item-text="supplierName"
                      item-value="_id"
                      label="Supplier"
                      v-bind:class="{ disabled: disableSelect }"
                      @input="changedSupplierCombobox"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.hotelId"
                      :rules="[() => typeof (editedItem.hotelId) !== 'undefined' || 'Required field']"
                      :items="hotel"
                      item-text="hotelName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Hotel"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      :rules="[() => editedItem.roomTypeCode.length > 0 || 'Required field']"
                      v-model="editedItem.roomTypeCode"
                      v-bind:class="{ disabled: disableSelect }"
                      label="roomtypeCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.maxGuest"
                      :items="maxGuests"
                      item-text="name"
                      item-value="value"
                      label="Maximum Guest"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.maxLess4"
                      :items="maxLess4s"
                      item-text="name"
                      item-value="value"
                      label="Maximum Children (0 ~4)"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.maxLess12"
                      :items="maxLess12s"
                      item-text="name"
                      item-value="value"
                      label="Maximum Children (4~12)"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.bed"
                      :items="beds"
                      item-text="name"
                      item-value="value"
                      label="Bed Qty"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.acreage" label="Acreage"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md8 class="sub-add-component">
                    <v-text-field v-model="editedItem.roomTypeName" label="RoomType Name"></v-text-field>
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
                    <v-btn color="blue darken-1" dark @click="addRoomTypeIntroByLang">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5><b>RoomType Introduce</b></h5>
                    <CustomEditForm  :idComponent="'roomtyoe'" :dataParent="editedItem.roomTypeIntro" v-on:childtoparent="editedItem.roomTypeIntro=$event"></CustomEditForm>
                </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="roomTypeIntrosHeader"
                      :items="editedItem.roomTypeIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-2" small @click="editRoomTypeIntroByLang(props.item)">edit</v-icon>
                          <v-icon small @click="deleteRoomTypeIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.roomTypeName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.roomTypeIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/hotel/roomtype'"
                      :title="`Upload High Quality`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.roomImages"
                      @getDeleteFile="deleteImage($event)"
                    ></ImageListComponent>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImgWebp = $event"
                      v-bind:routerPath="apiIP+'/upload/hotel/roomtype/webmp'"
                      :title="`Upload Webp Image`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.roomImagesWebp"
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
    <v-data-table :headers="headers" :items="roomtype" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.supplierId.supplierName }}</td>
          <td>{{ props.item.hotelId.hotelName }}</td>
          <td>{{ props.item.roomTypeCode }}</td>
          <td>{{ props.item.roomTypeName }}</td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.isUsed }}</td>
          <td>{{ props.item.maxGuest }}</td>
          <td>{{ props.item.maxLess4 }}</td>
          <td>{{ props.item.maxLess12 }}</td>
          <td>{{ props.item.bed }}</td>
          <td>{{ props.item.acreage }}</td>
          <td>{{ props.item.createBy }}</td>
          <td>{{ props.item.createDate }}</td>
          <td>{{ props.item.roomTypeIntro }}</td>
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
      <download-excel :data="roomtype" name="roomtype.xls">
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
    uploadImg: [],
    uploadImgWebp: [],
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    roomTypeIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "RoomTypeName", value: "roomTypeName" },
      { text: "language", value: "lang" },
      { text: "RoomTypeIntro", value: "roomTypeIntro" }
    ],
    headers: [
      { text: "Actions", sortable: false },
      { text: "Supplier", value: "supplierId.supplierName" },
      { text: "Hotel", value: "hotelId.hotelName" },
      {
        text: "Room Type Code",
        value: "roomTypeCode"
      },
      { text: "Room Type Name", value: "roomTypeName" },
      { text: "Language", value: "lang" },
      { text: "Used", value: "isUsed" },
      { text: "maxGuests", value: "maxGuest" },
      { text: "maxLess4", value: "maxLess4" },
      { text: "maxLess12", value: "maxLess12" },
      { text: "beds", value: "bed" },
      { text: "acreage", value: "acreage" },
      { text: "CreateBy", value: "createBy" },
      { text: "CreateDate", value: "createDate" },
      { text: "roomTypeIntro", value: "roomTypeIntro" }
    ],
    roomtype: [],
    supplier: [],
    hotel: [],
    maxGuests: [
      { value: 1, name: 1 },
      { value: 2, name: 2 },
      { value: 3, name: 3 },
      { value: 4, name: 4 },
      { value: 5, name: 5 },
      { value: 6, name: 6 },
      { value: 7, name: 7 },
      { value: 8, name: 8 },
      { value: 9, name: 9 },
      { value: 10, name: 10 }
    ],
    maxLess4s: [
      { value: 0, name: 0 },
      { value: 1, name: 1 },
      { value: 2, name: 2 },
      { value: 3, name: 3 },
      { value: 4, name: 4 },
      { value: 5, name: 5 },
      { value: 6, name: 6 },
      { value: 7, name: 7 },
      { value: 8, name: 8 },
      { value: 9, name: 9 },
      { value: 10, name: 10 }
    ],
    maxLess12s: [
      { value: 0, name: 0 },
      { value: 1, name: 1 },
      { value: 2, name: 2 },
      { value: 3, name: 3 },
      { value: 4, name: 4 },
      { value: 5, name: 5 },
      { value: 6, name: 6 },
      { value: 7, name: 7 },
      { value: 8, name: 8 },
      { value: 9, name: 9 },
      { value: 10, name: 10 }
    ],
    beds: [
      { value: 1, name: 1 },
      { value: 2, name: 2 },
      { value: 3, name: 3 },
      { value: 4, name: 4 },
      { value: 5, name: 5 },
      { value: 6, name: 6 },
      { value: 7, name: 7 },
      { value: 8, name: 8 },
      { value: 9, name: 9 },
      { value: 10, name: 10 }
    ],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editId: "",
    disableSelect: false,
    editedItem: {
      roomTypeCode: "",
      roomTypeName: "",
      maxGuest: 2,
      maxLess4: 0,
      maxLess12: 0,
      roomTypeIntro: "",
      bed: 2,
      acreage: "",
      lang: "EN",
      isUsed: true,
      createBy: "",
      modifyBy: "",
      roomImages: [],
      removeImage:[],
      roomImagesWebp: [],
      removeImageWebp: [],
      roomTypeIntros:[]
    },
    defaultItem: {
      roomTypeCode: "",
      roomTypeName: "",
      maxGuest: 2,
      maxLess4: 2,
      maxLess12: 2,
      bed: 2,
      acreage: "",
      roomTypeIntro: "",
      lang: "EN",
      isUsed: true,
      createBy: "",
      modifyBy: "",
      roomImages: [],
      removeImage:[],
      roomImagesWebp: [],
      removeImageWebp: [],
      roomTypeIntros:[]
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
      AXIOS.get(apiIP + "/roomtype/", { crossdomain: true })
        .then(response => {
          this.roomtype = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/hotel/", { crossdomain: true })
        .then(response => {
          this.hotel = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/supplier/", { crossdomain: true })
        .then(response => {
          this.supplier = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
    },

    editItem(item) {
      this.editedIndex = 100;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      delete this.editedItem._id;
      this.editId = item._id;
      this.disableSelect = true;
      this.editedItem.removeImage = [];
      this.editedItem.removeImageWebp = [];
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/roomtype/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
    deleteImage(image) {
      this.editedItem.roomImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.roomImagesWebp.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImageWebp.push(image);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
      this.disableSelect = false;
    },

    save() {
      if (this.uploadImg.length > 0) {
        this.uploadImg.forEach(element => {
          this.editedItem.roomImages.push(element);
        });
      }
      if (this.uploadImgWebp.length > 0) {
        this.uploadImgWebp.forEach(element => {
          this.editedItem.roomImagesWebp.push(element);
        });
      }
     this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      console.log(this.editedItem);
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/roomtype/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/roomtype/insert", this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        }
        this.initialize();
        this.close();
      }
      this.uploadImg=[];
      this.editedItem.removeImage=[];
    },

    changedSupplierCombobox(event) {
      AXIOS.get(apiIP + "/hotel/combobox/hotel/" + event, { crossdomain: true })
        .then(response => {
          console.log(response.data);

          this.hotel = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
    },
    addRoomTypeIntroByLang() {
      var isFound=false;
      this.editedItem.roomTypeIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
        element.roomTypeName= this.editedItem.roomTypeName;
        element.roomTypeIntro= this.editedItem.roomTypeIntro;
        isFound=true;
        return;
        }
      });
      if (isFound===false) {
      this.editedItem.roomTypeIntros.push({
        roomTypeName: this.editedItem.roomTypeName,
        roomTypeIntro: this.editedItem.roomTypeIntro,
        lang: this.editedItem.lang
      });
      }
    },
    deleteRoomTypeIntroByLang(item) {
      const index = this.editedItem.roomTypeIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.roomTypeIntros.splice(index, 1);
    },
    editRoomTypeIntroByLang (item) {
    this.editedItem.roomTypeName=item.roomTypeName;
      this.editedItem.roomTypeIntro=item.roomTypeIntro;
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
.room-img {
  height: 200px;
  width: auto;
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
