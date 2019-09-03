<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>optionService CRUD</v-toolbar-title>
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
                      label="Supplier"
                      v-bind:class="{ disabled: disableSelect }"
                      @input="changedSupplierCombobox"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.hotelId"
                      :items="hotel"
                      item-text="hotelName"
                      item-value="_id"
                      label="Hotel"
                      v-bind:class="{ disabled: disableSelect }"
                      @input="changedHotelCombobox"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.roomTypeId"
                      :items="roomType"
                      item-text="roomTypeName"
                      item-value="_id"
                      label="RoomType"
                      v-bind:class="{ disabled: disableSelect }"
                    ></v-select>
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
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field
                      required
                      :rules="[() => editedItem.optionServiceCode.length > 0 || 'Required field']"
                      v-model="editedItem.optionServiceCode"
                      label="OptionServiceCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field v-model="editedItem.optionServiceName" label="optionServiceName"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field v-model="editedItem.note" label="Note"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm3 md2 class="sub-add-component">
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                   <v-flex xs12 sm3 md2 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addNewServiceList">Add</v-btn>
                  </v-flex>
                </v-layout>
                 <v-flex xs12 sm12 md12 class="border-top">
                  <v-data-table
                    :headers="optionServiceHeaders"
                    :items="editedItem.serviceList"
                    class="elevation-1"
                    width="100%"
                  >
                    <template v-slot:items="props">
                      <td class="justify-center px-0">
                        <v-icon small @click="deleteServiceItem(props.item)">delete</v-icon>
                      </td>
                      <td
                        class="text-xs-right"
                      >{{props.item.optionServiceCode }}</td>
                      <td
                        class="text-xs-right"
                      >{{props.item.optionServiceName }}</td>
                      <td
                        class="text-xs-right"
                        style="color:green;font-weight:bold"
                      >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.price) }}</td>
                      <td class="text-xs-right">{{ props.item.note }}</td>
                      <td class="text-xs-right">{{props.item.isUsed}}</td>
                    </template>
                  </v-data-table>
                </v-flex>
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
    <v-data-table :headers="headers" :items="optionService" :search="search" :loading="isLoadding" class="elevation-1">
          <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.supplierId.supplierName }}</td>
          <td>{{ props.item.hotelId.hotelName }}</td>
          <td>{{ props.item.roomTypeId.roomTypeName }}</td>
          <td>{{ props.item.optionServiceCode }}</td>
          <td>{{ props.item.optionServiceName }}</td>
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
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
    </v-data-table>
      <v-btn absolute dark fab bottom right small color="pink">
        <download-excel :data="optionService" name= "optionSerivce.xls">
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
    search: "",
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    isLoadding:false,
    headers: [
      { text: "Actions", value: "name", sortable: false },
      { text: "Supplier", value: "supplierId.supplierName" },
      { text: "Hotel", value: "hotelId.hotelName" },
      { text: "Room Type", value: "roomTypeId.roomTypeName" },
      { text: "optionServiceCode", value: "optionServiceCode" },
      { text: "optionServiceName", value: "optionServiceName" },
      { text: "Price", value: "price" },
      { text: "Note", value: "note" },
      { text: "Used", value: "isUsed" },
      { text: "CreateBy", value: "createBy" },
      { text: "CreateDate", value: "createDate" }
    ],
    optionServiceHeaders: [
      { text: "Actions", sortable: false },
      { text: "optionServiceCode", value: "optionServiceCode" },
      { text: "optionServiceName", value: "optionServiceName" },
      { text: "Price", value: "price" },
      { text: "Note", value: "note" },
      { text: "Used", value: "isUsed" }
    ],
    priceRange: [],
    optionService: [],
    supplier: [],
    hotel: [],
    roomType: [],
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
      hotelId: "",
      roomTypeId: "",
      optionServiceCode: "",
      optionServiceName: "",
      price: 1000000,
      serviceList:[],
      lang: "EN",
      note: "",
      isUsed: true,
      createBy: "",
      modifyBy: ""
    },
    defaultItem: {
      supplierId: "",
      hotelId: "",
      roomTypeId: "",
      optionServiceCode: "",
      optionServiceName: "",
      price: 1000000,
      serviceList:[],
      lang: "EN",
      note: "",
      isUsed: true,
      createBy: "",
      modifyBy: ""
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
      this.isLoadding=true;
      AXIOS.get(apiIP + "/optionService/", { crossdomain: true })
        .then(response => {
          this.optionService = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/hotel/getused", { crossdomain: true })
        .then(response => {
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

      AXIOS.get(apiIP + "/roomtype/getused", { crossdomain: true })
        .then(response => {
          this.roomType = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
        this.isLoadding=false;
    },
addNewServiceList() {
      this.editedItem.serviceList.push({
        optionServiceCode:this.editedItem.optionServiceCode,
        optionServiceName: this.editedItem.optionServiceName,
        price: this.editedItem.price,
        note: this.editedItem.note,
        isUsed: this.editedItem.isUsed
      });
    },
    deleteServiceItem(item) {
      const index = this.editedItem.serviceList.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.serviceList.splice(index, 1);
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
        AXIOS.delete(apiIP + "/optionService/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
          })
          .catch(function(error) {})
          .finally(function() {});
      this.initialize();
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
            apiIP + "/optionService/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/optionService/insert", this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        }
        this.initialize();
        this.close();
      }
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

    changedHotelCombobox(event) {
      AXIOS.get(apiIP + "/roomtype/combobox/roomtype/" + event, {
        crossdomain: true
      })
        .then(response => {
          console.log(response.data);

          this.roomType = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
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
.sub-add-component {
  background-color: rgb(205, 224, 243) !important;
}
</style>
