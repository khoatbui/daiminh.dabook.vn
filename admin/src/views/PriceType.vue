<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>PRICE TYPE CRUD</v-toolbar-title>
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
                    <v-text-field
                      required
                      :rules="[() => editedItem.priceTypeCode.length > 0 || 'Required field']"
                      v-model="editedItem.priceTypeCode"
                      label="priceTypeCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm3 md2>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.priceTypeName" label="PriceType Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>PriceType Intro</b>
                    </h5>
                    <CustomEditForm :dataParent="editedItem.priceTypeIntro" v-on:childtoparent="editedItem.priceTypeIntro=$event"></CustomEditForm>
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
                    <v-btn color="blue darken-1" dark @click="addPriceTypeIntroByLang">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="priceTypeIntrosHeader"
                      :items="editedItem.priceTypeIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-3"
                            small
                            @click="editPriceTypeIntroByLang(props.index,props.item)"
                          >edit</v-icon>
                          <v-icon small @click="deletePriceTypeIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.priceTypeName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.priceTypeIntro}}</td>
                      </template>
                    </v-data-table>
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
    <v-data-table :headers="headers" :items="priceType" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.priceTypeCode }}</td>
          <td>{{ props.item.priceTypeName }}</td>
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
      <download-excel :data="priceType" name="priceType.xls">
        <i class="far fa-file-excel"></i>
      </download-excel>
    </v-btn>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";

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
  data: () => ({
    apiIP: apiIP,
    uploadImg: [],
    uploadImgWebp: [],
    search: "",
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    dialog: false,
    priceTypeIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "PriceTypeName", value: "priceTypeName" },
      { text: "language", value: "lang" },
      { text: "PriceTypeIntro", value: "priceTypeIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      { text: "CityCode", value: "cityId.cityName" },
      { text: "priceTypeCode", value: "priceTypeCode" },
      { text: "priceTypeName", value: "priceTypeName" },
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
    priceType: [],
    city: [],
    editedIndex: -1,
    disableSelect: false,
    editId: "",
    editedItem: {
      priceTypeCode: "",
      priceTypeName: "",
      priceTypeIntro: "",
      createBy: "",
      modifyBy: "",
      lang: "EN",
      isUsed: true,
      priceTypeIntros: [],
    },
    defaultItem: {
      priceTypeCode: "",
      priceTypeName: "",
      priceTypeIntro: "",
      createBy: "",
      modifyBy: "",
      lang: "EN",
      isUsed: true,
      priceTypeIntros: [],
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
      AXIOS.get(apiIP + "/priceType/", { crossdomain: true })
        .then(response => {
          this.priceType = response.data;
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
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/pricetype/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
    deleteImage(image) {
      this.editedItem.priceTypeImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.priceTypeImagesWebp.forEach(function(
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
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(
            apiIP + "/pricetype/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/pricetype/insert", this.editedItem)
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
    addPriceTypeIntroByLang() {
      var isFound=false;
      this.editedItem.priceTypeIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
          element.priceTypeName= this.editedItem.priceTypeName;
        element.priceTypeIntro= this.editedItem.priceTypeIntro;
        isFound=true;
        return;
        }
      });
      if (isFound===false) {
      this.editedItem.priceTypeIntros.push({
        priceTypeName: this.editedItem.priceTypeName,
        priceTypeIntro: this.editedItem.priceTypeIntro,
        lang: this.editedItem.lang
      });
      }
    },
    modifyPriceTypeIntroByLang() {
      this.editedItem.priceTypeIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
          element.priceTypeName= this.editedItem.priceTypeName;
        element.priceTypeIntro= this.editedItem.priceTypeIntro;
        }
      });
    },
    deletePriceTypeIntroByLang(item) {
      const index = this.editedItem.priceTypeIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.priceTypeIntros.splice(index, 1);
    },
    editPriceTypeIntroByLang(index,item) {
      this.editedItem.priceTypeName=item.priceTypeName;
      this.editedItem.priceTypeIntro=item.priceTypeIntro;
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
</style>
