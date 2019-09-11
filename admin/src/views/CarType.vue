<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>CAR TYPE CRUD</v-toolbar-title>
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
                  <v-flex xs12 sm6 md3>
                    <v-select
                      v-model="editedItem.supplierId"
                      :items="supplier"
                      item-text="supplierName"
                      item-value="_id"
                      label="Supplier"
                      v-bind:class="{ disabled: disableSelect }"
                      @input="changedSupplierCombobox"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-text-field
                      required
                      :rules="[() => editedItem.carTypeCode.length > 0 || 'Required field']"
                      v-model="editedItem.carTypeCode"
                      v-bind:class="{ disabled: disableSelect }"
                      label="carTypeCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-text-field v-model="editedItem.seatNumber" label="Seat Number"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md8 class="sub-add-component">
                    <v-text-field v-model="editedItem.carTypeName" label="CarType Name"></v-text-field>
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
                    <v-btn color="blue darken-1" dark @click="addCarTypeIntroByLang">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5><b>CarType Introduce</b></h5>
                    <CustomEditForm :idComponent="'cartype'" :dataParent="editedItem.carTypeIntro" v-on:childtoparent="editedItem.carTypeIntro=$event"></CustomEditForm>
                </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="carTypeIntrosHeader"
                      :items="editedItem.carTypeIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-2" small @click="editCarTypeIntroByLang(props.item)">edit</v-icon>
                          <v-icon small @click="deleteCarTypeIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.carTypeName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.carTypeIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                 <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/car/cartype'"
                      :title="`Upload High Quality`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.carImages"
                      @getDeleteFile="deleteImage($event)"
                    ></ImageListComponent>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImgWebp = $event"
                      v-bind:routerPath="apiIP+'/upload/car/cartype/webmp'"
                      :title="`Upload Webp Image`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.carImagesWebp"
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
    <v-data-table :headers="headers" :items="cartype" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.supplierId.supplierName }}</td>
          <td>{{ props.item.carTypeCode }}</td>
          <td>{{ props.item.carTypeName }}</td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.isUsed }}</td>
          <td>{{ props.item.seatNumber }}</td>
          <td>{{ props.item.createBy }}</td>
          <td>{{ props.item.createDate }}</td>
          <td>{{ props.item.carTypeIntro }}</td>
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
      <download-excel :data="cartype" name="cartype.xls">
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
    carTypeIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "CarTypeName", value: "carTypeName" },
      { text: "language", value: "lang" },
      { text: "CarTypeIntro", value: "carTypeIntro" }
    ],
    headers: [
      { text: "Actions", sortable: false },
      { text: "Supplier", value: "supplierId.supplierName" },
      {
        text: "Car Type Code",
        value: "carTypeCode"
      },
      { text: "Car Type Name", value: "carTypeName" },
      { text: "Language", value: "lang" },
      { text: "Used", value: "isUsed" },
      { text: "seatNumber", value: "seatNumber" },
      { text: "CreateBy", value: "createBy" },
      { text: "CreateDate", value: "createDate" },
            { text: "carTypeIntro", value: "carTypeIntro" }
    ],
    cartype: [],
    supplier: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editId: "",
    disableSelect: false,
    editedItem: {
      carTypeCode: "",
      carTypeName: "",
      seatNumber: 2,
      carTypeIntro: "",
      lang: "EN",
      isUsed: true,
      createBy: "",
      modifyBy: "",
      carImages: [],
      removeImage:[],
      carImagesWebp: [],
      removeImageWebp: [],
      carTypeIntros:[]
    },
    defaultItem: {
      carTypeCode: "",
      carTypeName: "",
      seatNumber: 2,
      carTypeIntro: "",
      lang: "EN",
      isUsed: true,
      createBy: "",
      modifyBy: "",
      carImages: [],
      removeImage:[],
      carTypeIntros:[],
      carImagesWebp: [],
      removeImageWebp: [],
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
      AXIOS.get(apiIP + "/cartype/", { crossdomain: true })
        .then(response => {
          this.cartype = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/carsupplier/getused", { crossdomain: true })
        .then(response => {
                console.log(response.data)
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
        AXIOS.delete(apiIP + "/cartype/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
    deleteImage(image) {
      this.editedItem.carImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.carImagesWebp.forEach(function(item, index, object) {
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
          this.editedItem.carImages.push(element);
        });
      }
      if (this.uploadImgWebp.length > 0) {
        this.uploadImgWebp.forEach(element => {
          this.editedItem.carImagesWebp.push(element);
        });
      }
     this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      console.log(this.editedItem);
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/cartype/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/cartype/insert", this.editedItem)
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
    addCarTypeIntroByLang() {
      var isFound=false;
      this.editedItem.carTypeIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
        element.carTypeName= this.editedItem.carTypeName;
        element.carTypeIntro= this.editedItem.carTypeIntro;
        isFound=true;
        return;
        }
      });
      if (isFound===false) {
      this.editedItem.carTypeIntros.push({
        carTypeName: this.editedItem.carTypeName,
        carTypeIntro: this.editedItem.carTypeIntro,
        lang: this.editedItem.lang
      });
      }
    },
    deleteCarTypeIntroByLang(item) {
      const index = this.editedItem.carTypeIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.carTypeIntros.splice(index, 1);
    },
    editCarTypeIntroByLang(item) {
      this.editedItem.carTypeName=item.carTypeName;
      this.editedItem.carTypeIntro=item.carTypeIntro;
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
