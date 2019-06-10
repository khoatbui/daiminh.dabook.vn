<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>hotel CRUD</v-toolbar-title>
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
                    <v-select
                      v-model="editedItem.supplierId"
                      :items="supplier"
                      item-text="supplierName"
                      item-value="_id"
                      label="Supplier"
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
    <v-data-table :headers="headers" :items="hotel" class="elevation-1">
      <template v-slot:items="props">
        <tr class="ellip-text">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
          <td>{{ props.item._id }}</td>
          <td>{{ props.item.supplierId }}</td>
          <td>{{ props.item.hotelCode }}</td>
          <td>{{ props.item.hotelName }}</td>
          <td>{{ props.item.star }}</td>
          <td>{{ props.item.createBy }}</td>
          <td>{{ props.item.createDate }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <v-snackbar
      v-model="snackbar.snackbar">
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.snackbar = false">Close</v-btn>
    </v-snackbar>
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
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    headers: [
      { text: "Actions", value: "name", sortable: false },
      { text: "_id", value: "_id" },
      { text: "Supplier", value: "supplierId" },
      { text: "hotelCode", value: "hotelCode" },
      { text: "HotelName", value: "hotelName" },
      { text: "Star", value: "star" },
      { text: "Create By", value: "createBy" },
      { text: "Create Date", value: "createDate" }
    ],language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    supplier: [],
    hotel: [],
    editedIndex: -1,
    editId: "",
    editedItem: {
      supplierId: "",
      hotelName: "",
      star: "5",
      createBy: "",
      modifyBy:"",
      hotelCode: ""
    },
    defaultItem: {
      supplierId: "",
      hotelName: "",
      star: "5",
      createBy: "",
      modifyBy:"",
      hotelCode: ""
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
      this.editedIndex = this.hotel.indexOf(item);
      this.editedItem = Object.assign({}, item);
      delete this.editedItem._id;
      this.editId = item._id;
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/hotel/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.$router.go();
          })
          .catch(function(error) {})
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
      this.editedItem.modifyBy = this.user.userName;
      this.editedItem.createBy = this.user.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/hotel/update/" + this.editId, this.editedItem)
            .then(response => {
              this.$router.go();
            })
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/hotel/insert", this.editedItem)
            .then(response => {
              this.$router.go();
            })
            .catch(function(error) {})
            .finally(function() {});
        }
        this.close();
      }
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
