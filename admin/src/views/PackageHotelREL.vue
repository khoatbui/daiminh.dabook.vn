<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>HOTEL PACKAGE PRICE CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-dialog v-model="dialog" max-width="960px">
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
                      return-object
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
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.roomTypeId"
                      :items="roomtype"
                      item-text="roomTypeName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Room Type"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.packageId"
                      :items="packages"
                      item-text="packageName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Package"
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
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.startDate"
                          label="StartDate"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.startDate" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.endDate"
                          label="EndDate"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.endDate" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      :rules="rule.priceRule"
                      v-model="editedItem.price"
                      label="Base Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      v-model="editedItem.markUpPlus"
                      label="Mark up (+) | Example: 50000 | Min 50000"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      v-model="editedItem.markUpPercent"
                      label="Mark up(%) | Example: 30 | Min : 3%"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      :rules="rule.less4PriceRule"
                      v-model="editedItem.less4Price"
                      label="Children less 4 year old Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      :rules="rule.less12PriceRule"
                      v-model="editedItem.less12Price"
                      label="Children less 12 year old Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      :rules="rule.more12PriceRule"
                      v-model="editedItem.more12Price"
                      label="More 12 year old Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-btn color="blue darken-1" dark @click="addNewPriceRange">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-flex xs12 sm12 md12 class="border-top">
                  <v-data-table
                    :headers="priceHeaders"
                    :items="editedItem.priceRanges"
                    class="elevation-1"
                    width="100%"
                  >
                    <template v-slot:items="props">
                      <td class="justify-center px-0">
                        <v-icon small @click="deletepriceRangeItem(props.index)">delete</v-icon>
                      </td>
                      <td class="text-xs-right">{{ props.item.price }}</td>
                      <td class="text-xs-right">{{ props.item.markUpPlus }}</td>
                      <td class="text-xs-right">{{ props.item.markUpPercent }}</td>
                      <td class="text-xs-right">{{ props.item.less4Price }}</td>
                      <td class="text-xs-right">{{ props.item.less12Price }}</td>
                      <td class="text-xs-right">{{ props.item.more12Price }}</td>
                        <td class="text-xs-right">{{ props.item.startDate }}</td>
                      <td class="text-xs-right">{{ props.item.endDate }}</td>
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
    <v-data-table
      :headers="headers"
      :items="itemsWithTotalPrice"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
          <td style="width:100px">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.supplierId.supplierName }}</span>
              </template>
              <span>{{ props.item.supplierId.supplierName }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.hotelId.hotelCode }}</span>
              </template>
              <span>{{ props.item.hotelId.hotelCode }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.hotelId.hotelName }}</span>
              </template>
              <span>{{ props.item.hotelId.hotelName }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.roomTypeId.roomTypeName }}</span>
              </template>
              <span>{{ props.item.roomTypeId.roomTypeName }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.packageId.packageName }}</span>
              </template>
              <span>{{ props.item.packageId.packageName }}</span>
            </v-tooltip>
          </td>
          <td
            style="color:green;font-weight:bold"
          >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.price)}}</td>
          <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.markUpPlus)}}</td>
          <td>{{ props.item.markUpPercent }}</td>
          <td
            style="color:red;font-weight:bold"
          >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.totalPrice) }}</td>
          <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.less4Price)}}</td>
          <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.less12Price)}}</td>
          <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.more12Price)}}</td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.startDate }}</span>
              </template>
              <span>{{ props.item.startDate }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.endDate }}</span>
              </template>
              <span>{{ props.item.endDate }}</span>
            </v-tooltip>
          </td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.isUsed }}</td>
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
    <v-snackbar v-model="snackbar.snackbar">
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-btn absolute dark fab bottom right small color="pink">
      <download-excel :data="packagesHotelREL" name="markup.xls">
        <i class="far fa-file-excel"></i>
      </download-excel>
    </v-btn>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";
import moment from "moment";
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
    headers: [
      { text: "Actions", sortable: false },
      { text: "Supplier", value: "supplierId.supplierName" },
      { text: "HotelCode", value: "hotelId.hotelCode" },
      { text: "Hotel", value: "hotelId.hotelName" },
      { text: "Room Type", value: "roomTypeId.roomTypeName" },
      { text: "Package", value: "packageId.packageName" },
      { text: "Price", value: "price" },
      { text: "MarkUp(+)", value: "markUpPlus" },
      { text: "MarkUp(%)", value: "markUpPercent" },
      { text: "TotalPrice", value: "totalPrice" },
      { text: "Less 4", value: "less4Price" },
      { text: "Less 12", value: "less12Price" },
      { text: "More 12", value: "more12Price" },
      { text: "StartDate", value: "startDate" },
      { text: "EndDate", value: "endDate" },
      { text: "Language", value: "lang" },
      { text: "Used", value: "isUsed" },
      { text: "CreateBy", value: "createBy" },
      { text: "CreateDate", value: "createDate" }
    ],
    priceHeaders: [
      { text: "Actions", sortable: false },
      { text: "Price", value: "price" },
      { text: "MarkUp(+)", value: "markUpPlus" },
      { text: "MarkUp(%)", value: "markUpPercent" },
      { text: "Less 4", value: "less4Price" },
      { text: "Less 12", value: "less12Price" },
      { text: "More 12", value: "more12Price" },
      { text: "StartDate", value: "startDate" },
      { text: "EndDate", value: "endDate" }
    ],
    priceRange: [],
    roomtype: [],
    supplier: [],
    hotel: [],
    packages: [],
    packagesHotelREL: [],
    rule: {
      markUpPlusRule: [
        // v => (v.toString().length > 0) || "Required field",
        // v => /^\d+$/.test(v) || "Only accept number",
        // v => parseInt(v) >= 50000 ||( "Minimum = 50.000 VND")
      ],
      markUpPercentRule: [
        // v => v.toString().length > 0 || "Required field",
        // v => /^$|^\d+$/.test(v) || "Only accept number",
        // v => parseInt(v) >= 3 || "Minimum = 3%"
      ],
      priceRule: [
        v => v.toString().length > 0 || "Required field",
        v => /^\d+$/.test(v) || "Only accept number",
        v => parseInt(v) >= 1 || "Minimum = 1"
      ]
    },
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editId: "",
    disableSelect: false,
    menu1: false,
    menu2: false,
    editedItem: {
      supplierId: "",
      hotelId: "",
      roomTypeId: "",
      packageId: "",
      price: 10000000,
      markUpPercent: 10,
      markUpPlus: 50000,
      less4Price: 10000000,
      less12Price: 10000000,
      more12Price: 10000000,
      priceRanges: [],
      lang: "EN",
      isUsed: true,
      createBy: "",
      modifyBy: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD")
    },
    defaultItem: {
      supplierId: "",
      hotelId: "",
      roomTypeId: "",
      packageId: "",
      price: 10000000,
      markUpPercent: 10,
      markUpPlus: 50000,
      less4Price: 10000000,
      less12Price: 10000000,
      more12Price: 10000000,
      priceRanges: [],
      lang: "EN",
      isUsed: true,
      createBy: "",
      modifyBy: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD")
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
    itemsWithTotalPrice() {
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it
      return this.packagesHotelREL.map(obj =>
        Object.assign({}, obj, {
          totalPrice:
            obj.markUpPercent == 0
              ? obj.price + obj.markUpPlus
              : obj.markUpPlus !== 0
              ? obj.price * obj.markUpPercent + obj.markUpPlus
              : obj.price * obj.markUpPercent
        })
      );
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
      AXIOS.get(apiIP + "/packagehotelrel/", { crossdomain: true })
        .then(response => {
          this.packagesHotelREL = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/supplier/", { crossdomain: true })
        .then(response => {
          this.supplier = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/hotel/", { crossdomain: true })
        .then(response => {
          this.hotel = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/roomtype/", { crossdomain: true })
        .then(response => {
          this.roomtype = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/package/", { crossdomain: true })
        .then(response => {
          this.packages = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
    },

    editItem(item) {
      this.editedIndex = 100;
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.editedItem.supplierId = item.supplierId._id;
      this.editedItem.hotelId = item.hotelId._id;
      this.editedItem.roomTypeId = item.roomTypeId._id;
      this.editedItem.packageId = item.packageId._id;
      this.editedItem.startDate = moment(item.startDate)
        .utc()
        .format("YYYY-MM-DD");
      this.editedItem.endDate = moment(item.endDate)
        .utc()
        .format("YYYY-MM-DD");
      this.disableSelect = true;
      this.dialog = true;
      delete this.editedItem._id;
      this.editId = item._id;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/packagehotelrel/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
deletepriceRangeItem(item) {
     this.editedItem.priceRanges.splice(item,1);
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
      this.editedItem.modifyBy = this.user.userName;
      this.editedItem.createBy = this.user.userName;
      if (
        this.editedItem.markUpPlus.toString().length <= 0 &&
        this.editedItem.markUpPercent.toString().length <= 0
      ) {
        this.editedItem.markUpPercent = process.env.VUE_APP_API_DEFAULT_MARKUP;
        // IMPORTANT
      }
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(
            apiIP + "/packagehotelrel/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/packagehotelrel/insert", this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        }
        this.initialize();
        this.close();
      }
    },

    changedSupplierCombobox(event) {
      console.log(event);
      this.defaultItem.markUpPlus = event.markUpPlus;
      this.defaultItem.markUpPercent = event.markUpPercent;
      this.defaultItem.less4Price = event.less4Price;
      this.defaultItem.less12Price = event.less12Price;
      this.defaultItem.more12Price = event.more12Price;
      this.editedItem.markUpPlus = event.markUpPlus;
      this.editedItem.markUpPercent = event.markUpPercent;
      this.editedItem.less4Price = event.less4Price;
      this.editedItem.less12Price = event.less12Price;
      this.editedItem.more12Price = event.more12Price;
      console.log(this.defaultItem);
      AXIOS.get(apiIP + "/hotel/combobox/hotel/" + event._id, {
        crossdomain: true
      })
        .then(response => {
          this.hotel = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/package/combobox/package/" + event._id, {
        crossdomain: true
      })
        .then(response => {
          this.packages = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
    },

    changedHotelCombobox(event) {
      AXIOS.get(apiIP + "/roomtype/combobox/roomtype/" + event._id, {
        crossdomain: true
      })
        .then(response => {
          this.roomtype = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
    },
    addNewPriceRange() {
      this.editedItem.priceRanges.push({
        price: this.editedItem.price,
        markUpPercent: this.editedItem.markUpPercent,
        markUpPlus: this.editedItem.markUpPlus,
        less4Price: this.editedItem.less4Price,
        less12Price: this.editedItem.less12Price,
        more12Price: this.editedItem.more12Price,
        isUsed: this.editedItem.isUsed,
        startDate: this.editedItem.startDate,
        endDate: this.editedItem.endDate
      });
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
.border-top {
  border-top: 1ps solid #1976d2 !important;
}
</style>
