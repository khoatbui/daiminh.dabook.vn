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
                      :rules="[() => editedItem.unitTypeCode.length > 0 || 'Required field']"
                      v-model="editedItem.unitTypeCode"
                      label="unitTypeCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm3 md2>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.unitTypeName" label="UnitType Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>UnitType Intro</b>
                    </h5>
                    <CustomEditForm  :idComponent="'iniutype'" :dataParent="editedItem.unitTypeIntro" v-on:childtoparent="editedItem.unitTypeIntro=$event"></CustomEditForm>
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
                    <v-btn color="blue darken-1" dark @click="addUnitTypeIntroByLang">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="unitTypeIntrosHeader"
                      :items="editedItem.unitTypeIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-3"
                            small
                            @click="editUnitTypeIntroByLang(props.index,props.item)"
                          >edit</v-icon>
                          <v-icon small @click="deleteUnitTypeIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.unitTypeName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.unitTypeIntro}}</td>
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
    <v-data-table :headers="headers" :items="unitType" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.unitTypeCode }}</td>
          <td>{{ props.item.unitTypeName }}</td>
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
      <download-excel :data="unitType" name="unitType.xls">
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
    unitTypeIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "UnitTypeName", value: "unitTypeName" },
      { text: "language", value: "lang" },
      { text: "UnitTypeIntro", value: "unitTypeIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      { text: "CityCode", value: "cityId.cityName" },
      { text: "unitTypeCode", value: "unitTypeCode" },
      { text: "unitTypeName", value: "unitTypeName" },
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
    unitType: [],
    city: [],
    editedIndex: -1,
    disableSelect: false,
    editId: "",
    editedItem: {
      unitTypeCode: "",
      unitTypeName: "",
      unitTypeIntro: "",
      createBy: "",
      modifyBy: "",
      lang: "EN",
      isUsed: true,
      unitTypeIntros: [],
    },
    defaultItem: {
      unitTypeCode: "",
      unitTypeName: "",
      unitTypeIntro: "",
      createBy: "",
      modifyBy: "",
      lang: "EN",
      isUsed: true,
      unitTypeIntros: [],
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
      AXIOS.get(apiIP + "/unitType/", { crossdomain: true })
        .then(response => {
          this.unitType = response.data;
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
        AXIOS.delete(apiIP + "/unittype/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
    deleteImage(image) {
      this.editedItem.unitTypeImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.unitTypeImagesWebp.forEach(function(
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
            apiIP + "/unittype/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/unittype/insert", this.editedItem)
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
    addUnitTypeIntroByLang() {
      var isFound=false;
      this.editedItem.unitTypeIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
          element.unitTypeName= this.editedItem.unitTypeName;
        element.unitTypeIntro= this.editedItem.unitTypeIntro;
        isFound=true;
        return;
        }
      });
      if (isFound===false) {
      this.editedItem.unitTypeIntros.push({
        unitTypeName: this.editedItem.unitTypeName,
        unitTypeIntro: this.editedItem.unitTypeIntro,
        lang: this.editedItem.lang
      });
      }
    },
    modifyUnitTypeIntroByLang() {
      this.editedItem.unitTypeIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
          element.unitTypeName= this.editedItem.unitTypeName;
        element.unitTypeIntro= this.editedItem.unitTypeIntro;
        }
      });
    },
    deleteUnitTypeIntroByLang(item) {
      const index = this.editedItem.unitTypeIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.unitTypeIntros.splice(index, 1);
    },
    editUnitTypeIntroByLang(index,item) {
      this.editedItem.unitTypeName=item.unitTypeName;
      this.editedItem.unitTypeIntro=item.unitTypeIntro;
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
