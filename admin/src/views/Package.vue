<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>PACKAGE CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
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
                    <v-text-field
                      required
                      :rules="[() => editedItem.packageCode.length > 0 || 'Required field']"
                      v-model="editedItem.packageCode"
                      label="packageCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md8 class="sub-add-component">
                    <v-text-field v-model="editedItem.packageName" label="Package Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md8 class="sub-add-component">
                    <v-text-field v-model="editedItem.note" label="Note"></v-text-field>
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
                    <v-btn color="blue darken-1" dark @click="addPackageIntroByLang">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5><b>Package Introduce</b></h5>
                    <CustomEditForm :dataParent="editedItem.packageIntro" v-on:childtoparent="editedItem.packageIntro=$event"></CustomEditForm>
                </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="packageIntrosHeader"
                      :items="editedItem.packageIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-2" small @click="editPackageIntroByLang(props.index)">edit</v-icon>
                          <v-icon small @click="deletePackageIntroByLang(props.index)">delete</v-icon>
                        </td>
                        <td>{{props.item.packageName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.note}}</td>
                        <td>{{props.item.packageIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
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
    <v-data-table :headers="headers" :items="packages"  :search="search" class="elevation-1">
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.supplierId.supplierName }}</td>
          <td>{{ props.item.packageCode}}</td>
          <td>{{ props.item.packageName }}</td>
          <td>{{ props.item.price }}</td>
          <td>{{ props.item.note }}</td>
          <td>{{ props.item.isUsed }}</td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.createBy }}</td>
          <td>{{ props.item.createDate }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar.snackbar">
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.snackbar = false">Close</v-btn>
    </v-snackbar>
      <v-btn absolute dark fab bottom right small color="pink">
        <download-excel :data="packages" name= "packages.xls">
<i class="far fa-file-excel"></i>
        </download-excel>
      </v-btn>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS
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
        search: '',
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    packageIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "PackageName", value: "packageName" },
      { text: "language", value: "lang" },
      { text: "Note", value: "note" },
      { text: "PackageIntro", value: "packageIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      { text: "PackageId", align: "center", value: "_id" },
      { text: "Supplier", align: "center", value: "supplierId.supplierName" },
      { text: "PackageCode", align: "center", value: "packageCode" },
      { text: "PackageName", align: "center", value: "packageName" },
      { text: "Price", align: "center", value: "price" },
      { text: "Note", align: "center", value: "note" },
      { text: "IsUsed", value: "isUsed" },
      { text: "Language", align: "center", value: "lang" },
      { text: "Create By", value: "createBy" },
      { text: "Create Date", value: "createDate" }
    ],
    packages: [],
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
      supplierId: "",
      packageCode: "",
      packageName: "",
      lang: "EN",
      isUsed: true,
      note: "",
      createBy: "",
      modifyBy: "",
      packageIntro:"",
      packageIntros:[]
    },
    defaultItem: {
      supplierId: "",
      packageCode: "",
      packageName: "",
      lang: "EN",
      isUsed: true,
      note: "",
      createBy: "",
      modifyBy: "",
      packageIntro:"",
      packageIntros:[]
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
      AXIOS.get(apiIP + "/package/", { crossdomain: true })
        .then(response => {
          this.packages = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/supplier/getused", { crossdomain: true })
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

    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/package/" + item._id)
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
     this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/package/update/" + this.editId, this.editedItem)
            .then(response => {
            })
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/package/insert", this.editedItem)
            .then(response => {
            })
            .catch(function(error) {})
            .finally(function() {});
        }
                      this.initialize();
        this.close();
      }
    },
    addPackageIntroByLang() {
      var isFound=false;
      this.editedItem.packageIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
        element.packageName= this.editedItem.packageName;
        element.packageIntro= this.editedItem.packageIntro;
        isFound=true;
        return;
        }
      });
      if (isFound===false) {
      this.editedItem.packageIntros.push({
        packageName: this.editedItem.packageName,
        packageIntro: this.editedItem.packageIntro,
        note: this.editedItem.note,
        lang: this.editedItem.lang
      });
      }
    },
    deletePackageIntroByLang(item) {
      this.editedItem.packageIntros.splice(item, 1);
    },
    editPackageIntroByLang (item) {
    this.editedItem.packageName=item.packageName;
      this.editedItem.packageIntro=item.packageIntro;
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
.whitespace-nowrap td{
  white-space: nowrap;
}
</style>
