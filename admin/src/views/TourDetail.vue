<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>TOUR DETAIL CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="900px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
         <v-form  ref="form" v-model="valid">
        <v-card>
          <v-card-title class="pink white--text">
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-subheader>KEY</v-subheader>
            <v-container grid-list-xl>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-select
                    v-model="editedItem.tourId"
                    :items="tourlist"
                    item-text="tourName"
                    item-value="tourId"
                    label="Tour"
                  required
                    :rules="[() => editedItem.tourId.length > 0 || 'Required field']"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <file-upload v-model="editedItem.carolImg" label="Carol Image" routerPath="http://localhost:3000/upload"></file-upload>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.subImg" label="Sub Image"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.program" label="Program"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.priceDetail" label="Price Detail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.serviceInclude" label="Service Include"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.serviceNotInclude" label="Service Not Include"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.shouldTake" label="Should Take"></v-text-field>
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
    <v-data-table :headers="headers" :items="tourdetail" class="elevation-1">
      <template v-slot:items="props">
        <tr class="ellip-text">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
          <td>{{ props.item.tourId }}</td>
          <td class="text-xs-right">{{ props.item.carolImg }}</td>
          <td class="text-xs-right">{{ props.item.subImg }}</td>
          <td class="text-xs-right">{{ props.item.program }}</td>
          <td class="text-xs-right">{{ props.item.priceDetail }}</td>
          <td class="text-xs-right">{{ props.item.serviceInclude }}</td>
          <td class="text-xs-right">{{ props.item.serviceNotInclude }}</td>
          <td class="text-xs-right">{{ props.item.shouldTake }}</td>
          <td class="text-xs-right">{{ props.item.lang }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS
import FileUpload from '../components/FileUpload.vue'
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
  components:{
    FileUpload
  },
  data: () => ({
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "Tour",
        align: "center",
        sortable: false,
        value: "tourId"
      },
      { text: "Carol Image", align: "center", value: "carolImg" },
      { text: "Sub Image", align: "center", value: "subImg" },
      { text: "Program", align: "center", value: "program" },
      { text: "Price Detail", align: "center", value: "priceDetail" },
      { text: "Service Include", align: "center", value: "serviceInclude" },
      {
        text: "Service NotInclude",
        value: "serviceNotInclude"
      },
      { text: "ShouldTake", align: "center", value: "shouldTake" },
      { text: "Language", align: "center", value: "lang" }
    ],
    tourlist: [],
    tourdetail: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editedItem: {
      tourId: "",
      carolImg: "",
      subImg: "",
      program: "",
      priceDetail: "",
      serviceInclude: "",
      serviceNotInclude: "",
      shouldTake: "",
      lang: "EN"
    },
    defaultItem: {
      tourId: "",
      carolImg: "",
      subImg: "",
      program: "",
      priceDetail: "",
      serviceInclude: "",
      serviceNotInclude: "",
      shouldTake: "",
      lang: "EN"
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
      AXIOS.get("http://localhost:3000/tourdetail/", { crossdomain: true })
        .then(response => {
          this.tourdetail = response.data;
        })
        .catch(function(error) {
        })
        .finally(function() {});

      AXIOS.get("http://localhost:3000/tourlist/", { crossdomain: true })
        .then(response => {
          this.tourlist = response.data;
        })
        .catch(function(error) {
        })
        .finally(function() {});
    },

    editItem(item) {
      this.editedIndex = this.tourdetail.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.tourdetail.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete("http://localhost:3000/tourdetail/" + index)
          .then(response => {
            this.tourdetail.splice(index, 1);
          })
          .catch(function(error) {
          })
          .finally(function() {});
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        AXIOS.post("http://localhost:3000/tourdetail/update", this.editedItem)
          .then(response => {
            Object.assign(this.tourdetail[this.editedIndex], this.editedItem);
          })
          .catch(function(error) {
          })
          .finally(function() {});
      } else {
        AXIOS.post("http://localhost:3000/tourdetail/insert", this.editedItem)
          .then(response => {
          })
          .catch(function(error) {
          })
          .finally(function() {});
        this.tourdetail.push(this.editedItem);
      }
      this.close();
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
