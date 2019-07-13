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
                    <v-text-field v-model="editedItem.hotelName" label="HotelName"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.star" label="Star"></v-text-field>
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
                   <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.keyword" label="Keyword"></v-text-field>
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
                   <v-flex xs12 sm12 md12>
                    <v-textarea
                      name="input-7-1"
                      label="Hotel Introduce"
                      v-model="editedItem.hotelIntro"
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/hotel/hotel'"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <h2>Old images.</h2>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="scroll-ngang">
                    <img
                      class="room-img"
                      v-for="(item,i) in editedItem.hotelImages"
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
    <v-data-table :headers="headers" :items="hotel" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="true">delete</v-icon>
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
    search: "",
    valid: true,
    uploadImg: [],
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
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
      keyword:"",
      isUsed: true,
      isHot: true,
      isPromote: true,
      hotelImages: [],
      removeImage: [],
      hotelIntro:""
    },
    defaultItem: {
      supplierId: "",
      cityId: "",
      hotelName: "",
      star: "5",
      createBy: "",
      modifyBy: "",
      hotelCode: "",
      keyword:"",
      isUsed: true,
      isHot: true,
      isPromote: true,
      hotelImages: [],
      removeImage: [],
      hotelIntro:""
    },
    snackbar: {
      snackbar: false,
      text: ""
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
      AXIOS.get(apiIP + "/hotel/", { crossdomain: true })
        .then(response => {
          console.log(this.city);
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
      AXIOS.get(apiIP + "/city/", { crossdomain: true })
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
        console.log(this.editedItem.hotelImages);
        this.editedItem.removeImage = this.editedItem.hotelImages;
        this.editedItem.hotelImages = this.uploadImg;
        console.log(this.editedItem.removeImage);
      }
      this.editedItem.modifyBy = this.user.userName;
      this.editedItem.createBy = this.user.userName;
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
