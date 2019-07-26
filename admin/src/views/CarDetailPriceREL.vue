<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>CAR DETAIL PRICE CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-dialog v-model="dialog" max-width="1000px">
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
                      :items="carSupplier"
                      item-text="supplierName"
                      item-value="_id"
                      label="Supplier"
                      v-bind:class="{ disabled: disableSelect }"
                      @input="changedSupplierCombobox"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-select
                      v-model="editedItem.carTransTypeId"
                      :items="carTransType"
                      item-text="carTransTypeName"
                      item-value="_id"
                      label="Loại hình thuê"
                      v-bind:class="{ disabled: disableSelect }"
                      @input="changedCarTransCombobox"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-text-field
                      required
                      v-model="editedItem.tripCode"
                      label="Trip Code"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-select
                      v-model="editedItem.cityId"
                      :items="city"
                      item-text="cityName"
                      item-value="_id"
                      label="City"
                      return-object
                    ></v-select>
                  </v-flex>
                   <v-flex xs12 sm6 md3>
                    <v-text-field
                      v-model="editedItem.kmTotal"
                      label="Total Kilomet"
                    ></v-text-field>
                  </v-flex>
                   <v-flex xs12 sm6 md3>
                    <v-text-field
                      v-model="editedItem.nightTotal"
                      label="Total Night"
                    ></v-text-field>
                  </v-flex>
                    <v-flex xs6 sm3 md2>
                      <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                    </v-flex>
                    <v-flex xs6 sm3 md2>
                      <v-checkbox v-model="editedItem.isPromotion" :label="`IsPromotion?`"></v-checkbox>
                    </v-flex>
                     <v-flex xs12 sm12 md6 class="sub-add-component">
                    <v-text-field v-model="editedItem.tripName" label="Trip Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6 class="sub-add-component">
                    <v-text-field v-model="editedItem.fromLocation" label="From"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6 class="sub-add-component">
                    <v-text-field v-model="editedItem.toLocation" label="To"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-select
                      v-model="editedItem.lang"
                      :items="language"
                      item-text="langName"
                      item-value="langCode"
                      label="Language"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addTripIntroByLang">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5><b>Trip Introduce</b></h5>
                  <VueTrixEditor v-model="editedItem.tripIntro" placeholder="Trip Introduce" uniqueId="icartypeintro" v-bind:image-upload-path="`${apiIP}/upload/car/trip/tripintro`" localStorage></VueTrixEditor>
                  <div v-html="editedItem.tripIntro" class="old-content">
                    </div>
                </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="tripIntrosHeader"
                      :items="editedItem.tripIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="deleteTripIntroByLang(props.index)">delete</v-icon>
                        </td>
                        <td>{{props.item.carTransTypeName}}</td>
                         <td>{{props.item.from}}</td>
                          <td>{{props.item.to}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.carTransTypeIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                  </v-layout>
                  <v-layout>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                     <v-select
                      v-model="editedItem.carTypeId"
                      :items="carType"
                      item-text="carTypeName"
                      item-value="_id"
                      label="Loại xe"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field
                      required
                      v-model="editedItem.price"
                      label="Price /km"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field
                      required
                      v-model="editedItem.markUpPlus"
                      label="Mark up (+) | Example: 50000 | Min 50000"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field
                      required
                      v-model="editedItem.markUpPercent"
                      label="Mark up(%) | Example: 30 | Min : 3%"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4 sm2 md4 class="sub-add-component">
                    <v-checkbox v-model="editedItem.isPriceUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                    <v-flex xs4 sm2 md4 class="sub-add-component">
                    <v-checkbox v-model="editedItem.isPricePromotion" :label="`IsPromotion?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addNewPriceRange">Add</v-btn>
                    <v-btn color="red darken-4" dark @click="deleteAllOldPriceRange">Delete Price</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="priceHeaders"
                      :items="itemsWithTotalPriceEdit"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="deletepriceRangeItem(props.index)">delete</v-icon>
                        </td>
                        <td class="text-xs-right">{{props.item.carTypeName}}</td>
                        <td
                          class="text-xs-right"
                          style="color:green;font-weight:bold"
                        >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.price) }}</td>
                        <td
                          class="text-xs-right"
                        >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.markUpPlus) }}</td>
                        <td class="text-xs-right">{{ props.item.markUpPercent }}</td>
                        <td
                          class="text-xs-right"
                          style="color:red;font-weight:bold"
                        >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.totalPrice) }}</td>
                        
                        <td class="text-xs-right">{{props.item.isUsed}}</td>
                         <td class="text-xs-right">{{props.item.isPromotion}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field
                      required
                      v-model="editedItem.optionService.optionServiceCode"
                      label="Service Code"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field
                      required
                      v-model="editedItem.optionService.optionServiceName"
                      label="Option Service Name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field
                      v-model="editedItem.optionService.optionPrice"
                      label="Service Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field v-model="editedItem.optionService.groupCode" label="Group Code"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field v-model="editedItem.optionService.optionNote" label="Note"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-checkbox v-model="editedItem.optionService.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addNewOptionPriceRange">Add</v-btn>
                    <v-btn
                      color="red darken-4"
                      dark
                      @click="deleteAllOldOptionPriceRange"
                    >Delete Price</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="optionPriceHeaders"
                      :items="editedItem.optionServices"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="deleteOptionServiceItem(props.index)">delete</v-icon>
                        </td>
                        <td class="text-xs-right">{{props.item.optionServiceCode}}</td>
                        <td class="text-xs-right">{{props.item.optionServiceName}}</td>
                        <td
                          class="text-xs-right"
                          style="color:green;font-weight:bold"
                        >{{new Int.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.optionPrice) }}</td>
                        <td class="text-xs-right">{{ props.item.isUsed }}</td>
                        <td class="text-xs-right">{{ props.item.optionNote }}</td>
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
    <v-container fluid grid-list-xl pl-0 pr-0>
      <v-card>
        <v-layout pl-2 pr-2>
          <v-flex xs12 sm6 md4 p-2>
            <v-select
              v-model="filterByCombo.carSupplierId"
              :items="carSupplierFilter"
              item-text="supplierName"
              item-value="_id"
              label="Supplier"
              @input="changedSupplierCombobox"
              return-object
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md4 p-2>
            <v-select
              v-model="filterByCombo.carTransTypeId"
              :items="carTransTypeFilter"
              item-text="carTransTypeName"
              item-value="_id"
              label="Trans Type"
              return-object
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md4 p-2>
            <v-select
              v-model="filterByCombo.carTypeId"
              :items="carTypeFilter"
              item-text="carTypeName"
              item-value="_id"
              label="Car Type"
              return-object
            ></v-select>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>

    <v-data-table
      :headers="headers"
      :search="search"
      :items="itemsWithTotalPrice"
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
                <span v-on="on">{{ props.item.carTransTypeId.carTransTypeName }}</span>
              </template>
              <span>{{ props.item.carTransTypeId.carTransTypeName }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.tripCode}}</span>
              </template>
              <span>{{ props.item.tripCode}}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.tripName }}</span>
              </template>
              <span>{{ props.item.tripName }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.fromLocation }}</span>
              </template>
              <span>{{ props.item.fromLocation }}</span>
            </v-tooltip>
          </td>
           <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.toLocation }}</span>
              </template>
              <span>{{ props.item.toLocation }}</span>
            </v-tooltip>
          </td>
           <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.kmTotal }}</span>
              </template>
              <span>{{ props.item.kmTotal }}</span>
            </v-tooltip>
          </td>
           <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.nightTotal }}</span>
              </template>
              <span>{{ props.item.nightTotal }}</span>
            </v-tooltip>
          </td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.isUsed }}</td>
          <td>{{props.item.createBy}}</td>
          <td>{{props.item.createDate.substring(0, 10)}}</td>
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
      <download-excel :data="cardetailprice" name="markup.xls">
        <i class="far fa-file-excel"></i>
      </download-excel>
    </v-btn>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";
import moment from "moment";
import VueTrixEditor from "@dymantic/vue-trix-editor";

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
    VueTrixEditor
  },
  data: () => ({
    filterByCombo: {
      supplierId: {
        supplierCode: "ALL"
      },
      hotelId: {
        hotelCode: "ALL"
      },
      roomTypeId: {
        roomTypeCode: "ALL"
      },
      packageId: {
        packageCode: "ALL"
      }
    },
    startMenu: false,
    events: [],
    selectedItemLoadDetail: {
      hotelId: {
        hotelCode: "",
        hotelName: ""
      },
      roomTypeId: {
        roomTypeCode: "",
        roomTypeName: ""
      }
    },
    search: "",
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    dialogPrice: false,
    tripIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "CarTransTypeName", value: "carTransTypeName" },
      { text: "From", value: "fromLocation" },
      { text: "To", value: "toLocation" },
      { text: "language", value: "lang" },
      { text: "CarTransTypeIntro", value: "carTransTypeIntro" }
    ],
    headers: [
      { text: "Actions", sortable: false },
      { text: "Supplier", value: "supplierId.supplierName" },
      { text: "CarTransCode", value: "carTransTypeId.transTypeCode" },
      { text: "TripCode", value: "tripCode" },
      { text: "TripName", value: "tripName" },
      { text: "From", value: "fromLocation" },
      { text: "To", value: "toLocation" },
      { text: "Total Km", value: "kmTotal" },
      { text: "Total Night", value: "nightTotal" },
      { text: "Language", value: "lang" },
      { text: "Used", value: "isUsed" },
      { text: "CreateBy", value: "createBy" },
      { text: "CreateDate", value: "createDate" }
    ],
    priceHeaders: [
      { text: "Actions", sortable: false },
       { text: "CarType", value: "carTypeName" },
      { text: "Price", value: "price" },
      { text: "MarkUp(+)", value: "markUpPlus" },
      { text: "MarkUp(%)", value: "markUpPercent" },
      { text: "Total Price", value: "totalPrice" },
      { text: "IsUsed", value: "isUsed" },
      { text: "IsPromotion", value: "isPromotion" }
    ],
    optionPriceHeaders: [
      { text: "Actions", sortable: false },
      { text: "OptionServiceCode", value: "optionServiceCode" },
      { text: "OptionServiceName", value: "optionServiceName" },
      { text: "Price", value: "optionPrice" },
      { text: "IsUsed", value: "isUsed" },
      { text: "Note", value: "optionNote" }
    ],
    filterByCombo: {
      carSupplierId: {
        supplierCode: "ALL"
      },
      carTransTypeId: {
        carTransTypeCode: "ALL"
      }
    },
    priceByCarType: [],
    carType: [],
    city:[],
    carSupplier: [],
    carTransType: [],
    carTypeFilter: [],
    carSupplierFilter: [],
    carTransTypeFilter: [],
    cardetailprice: [],
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
      cityId:"",
      supplierId: "",
      carTransTypeId: "",
      tripCode: "",
      tripName: "",
      tripIntro:"",
      fromLocation:"",
      toLocation:"",
      kmTotal:0,
      nightTotal:0,
      price: 10000000,
      markUpPercent: 10,
      markUpPlus: 50000,
      priceByCarType: [],
      isPromotion:false,
      optionService: {
        optionPrice: 50000,
        optionServiceCode: "",
        optionServiceName: "",
        optionNote: "",
        isUsed: true,
        groupCode: ""
      },
      optionServices: [],
      lang: "EN",
      isUsed: true,
      createBy: "",
      modifyBy: "",
      carDetailsImages:[],
      removeImages:[],
      isPriceUsed:true,
      isPricePromotion:false,
      tripIntros:[]
    },
    defaultItem: {
            cityId:"",
     supplierId: "",
      carTransTypeId: "",
      tripCode: "",
      tripName: "",
      tripIntro:"",
      fromLocation:"",
      toLocation:"",
      kmTotal:0,
      nightTotal:0,
      price: 10000000,
      markUpPercent: 10,
      markUpPlus: 50000,
      priceByCarType: [],
      isPromotion:false,
      optionService: {
        optionPrice: 50000,
        optionServiceCode: "",
        optionServiceName: "",
        optionNote: "",
        isUsed: true,
        groupCode: ""
      },
      optionServices: [],
      lang: "EN",
      isUsed: true,
      createBy: "",
      modifyBy: "",
      carDetailsImages:[],
      removeImages:[],
      isPriceUsed:true,
      isPricePromotion:false,
      tripIntros:[]
    },
    snackbar: {
      snackbar: false,
      text: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }, itemsWithTotalPrice() {
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it

      return this.cardetailprice
        .filter(i => {
          return (
            (this.filterByCombo.carSupplierId.supplierCode === "ALL" ||
              i.supplierId._id === this.filterByCombo.carSupplierId._id) &&
            (this.filterByCombo.carTransTypeId.carTransTypeCode === "ALL" ||
              i.carTransTypeId._id === this.filterByCombo.carTransTypeId._id)
          );
        });
    },
    itemsWithTotalPriceEdit() {
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it
      return this.editedItem.priceByCarType.map(obj =>
        Object.assign({}, obj, {
          totalPrice:
            (obj.markUpPercent == 0 ||obj.markUpPercent == '')
              ? (obj.price *this.editedItem.kmTotal) + obj.markUpPlus
              : (obj.markUpPlus !== 0 && obj.markUpPlus == '')
              ? (obj.price *this.editedItem.kmTotal) * ((obj.markUpPercent + 100) / 100) + obj.markUpPlus
              : (obj.price *this.editedItem.kmTotal) * ((obj.markUpPercent + 100) / 100)
        })
      );
      console.log('computed')
      console.log(this.editedItem.priceByCarType);
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
    moment: function() {
      return moment();
    },
    initialize() {
      AXIOS.get(apiIP + "/cardetailprice/", { crossdomain: true })
        .then(response => {
          this.cardetailprice = response.data;
                  console.log(this.cardetailprice);
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/carsupplier/", { crossdomain: true })
        .then(response => {
          this.carSupplier = response.data;
          this.carSupplierFilter = response.data;
          this.carSupplierFilter.unshift({
            supplierCode: "ALL",
            supplierName: "ALL",
            supplierId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/cartranstype/", { crossdomain: true })
        .then(response => {
          this.carTransType = response.data;
          this.carTransTypeFilter = response.data;
          this.carTransTypeFilter.unshift({
            carTransTypeCode: "ALL",
            carTransTypeName: "ALL",
            carTransTypeId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/cartype/", { crossdomain: true })
        .then(response => {
          this.carType = JSON.parse(JSON.stringify(response.data));
          this.carTypeFilter = response.data;
          this.carTypeFilter.unshift({
            carTypeCode: "ALL",
            carTypeName: "ALL",
            carTypeId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});

        
      AXIOS.get(apiIP + "/city/", { crossdomain: true })
        .then(response => {
          this.city = JSON.parse(JSON.stringify(response.data));
        })
        .catch(function(error) {})
        .finally(function() {});
    },

    editItem(item) {
      this.editedIndex = 100;
      this.editedItem = Object.assign({}, item);
      this.editedItem.supplierId = item.supplierId._id;
      this.editedItem.carTransTypeId = item.carTransTypeId._id;
      this.editedItem.optionService = {
        optionPrice: 50000,
        optionServiceCode: "",
        optionServiceName: "",
        optionNote: "",
        isUsed: true
      };
      this.editedItem.price= 10000,
       this.editedItem.markUpPercent= item.supplierId.markUpPercent;
       this.editedItem.markUpPlus=item.supplierId.markUpPlus;
      this.disableSelect = true;
      this.dialog = true;
      delete this.editedItem._id;
      this.editId = item._id;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/cardetailprice/" + item._id)
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
      console.log(this.editedItem);
     this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (
        (this.editedItem.markUpPlus == "" ||
          this.editedItem.markUpPlus.toString().length <= 0) &&
        (this.editedItem.markUpPercent == "" ||
          this.editedItem.markUpPercent.toString().length <= 0)
      ) {
        this.editedItem.markUpPercent = process.env.VUE_APP_API_DEFAULT_MARKUP;
        // IMPORTANT
      }
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(
            apiIP + "/cardetailprice/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/cardetailprice/insert", this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        }
        this.initialize();
        this.close();
      }
    },
    addTripIntroByLang() {
      this.editedItem.tripIntros.push({
        tripName: this.editedItem.tripName,
        tripIntro: this.editedItem.tripIntro,
        lang: this.editedItem.lang
      });
    },
    deleteTripIntroByLang(item) {
      this.editedItem.tripIntros.splice(item, 1);
    },
    changedSupplierCombobox(event) {
      this.defaultItem.markUpPlus = event.markUpPlus;
      this.defaultItem.markUpPercent = event.markUpPercent;
      this.editedItem.markUpPlus = event.markUpPlus;
      this.editedItem.markUpPercent = event.markUpPercent;
      AXIOS.get(apiIP + "/cartype/combobox/cartype/" + event._id, {
        crossdomain: true
      })
        .then(response => {
          this.carType = JSON.parse(JSON.stringify(response.data));
          this.carTypeFilter = response.data;
          this.carTypeFilter.unshift({
            carTypeCode: "ALL",
           carTypeName: "ALL",
            carTypeId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});
    },
    changedCarTransCombobox(event){

    },
    addNewPriceRange() {
      if (this.editedItem.carTypeId==undefined) {
        return;
      }
      else{
      this.editedItem.priceByCarType.push({
        carTypeId:this.editedItem.carTypeId,
        price: this.editedItem.price,
        markUpPercent: this.editedItem.markUpPercent,
        markUpPlus: this.editedItem.markUpPlus,
        isUsed: this.editedItem.isPriceUsed,
        isPromotion:this.editedItem.isPricePromotion,
        carTypeName:this.editedItem.carTypeId.carTypeName,
        seatNumber: this.editedItem.carTypeId.seatNumber,
        carTypeIntro: this.editedItem.carTypeId.carTypeIntro,
        carImages:this.editedItem.carTypeId.carImages,
      });
      console.log('addNewPriceRange');
      console.log(this.editedItem);
      }
    },
    addNewOptionPriceRange() {
      if (
        this.editedItem.optionService.groupCode == "" || this.editedItem.optionService.groupCode ==undefined ||
        (this.editedItem.optionService.groupCode !=undefined && this.editedItem.optionService.groupCode.trim().length == 0)
      ) {
        this.editedItem.optionServices.push({
          groupCode: "checkbox",
          data: {
            optionPrice: this.editedItem.optionService.optionPrice,
            optionServiceCode: this.editedItem.optionService.optionServiceCode,
            optionServiceName: this.editedItem.optionService.optionServiceName,
            optionNote: this.editedItem.optionService.optionNote,
            isUsed: this.editedItem.optionService.isUsed,
            groupCode: "checkbox"
          }
        });
      } else {
        var existIndex = -1;
        this.editedItem.optionServices.forEach((element, index) => {
          if (
            element.groupCode != "checkbox" &&
            element.groupCode == this.editedItem.optionService.groupCode.trim()
          ) {
            existIndex = index;
          }
        });
        if (existIndex != -1) {
          this.editedItem.optionServices[existIndex].data.push({
            optionPrice: this.editedItem.optionService.optionPrice,
            optionServiceCode: this.editedItem.optionService.optionServiceCode,
            optionServiceName: this.editedItem.optionService.optionServiceName,
            optionNote: this.editedItem.optionService.optionNote,
            isUsed: this.editedItem.optionService.isUsed,
            groupCode: this.editedItem.optionService.groupCode.trim()
          });
        } else {
          this.editedItem.optionServices.push({
            groupCode: this.editedItem.optionService.groupCode.trim(),
            data: [{
              optionPrice: this.editedItem.optionService.optionPrice,
              optionServiceCode: this.editedItem.optionService
                .optionServiceCode,
              optionServiceName: this.editedItem.optionService
                .optionServiceName,
              optionNote: this.editedItem.optionService.optionNote,
              isUsed: this.editedItem.optionService.isUsed,
              groupCode: this.editedItem.optionService.groupCode.trim()
            }]
          });
        }
      }
    },

    deletepriceRangeItem(item) {
      this.editedItem.priceByCarType.splice(item, 1);
    },
    deleteOptionServiceItem(item) {
      this.editedItem.optionServices.splice(item, 1);
    },
    deleteAllOldOptionPriceRange() {
      var r = confirm("Are you sure you want to delete all option service?");
      if (r == true) {
        this.editedItem.optionServices = [];
      }
    },
    deleteAllOldPriceRange() {
      var r = confirm("Are you sure you want to delete all option service?");
      if (r == true) {
        this.editedItem.priceByCarType = [];
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
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;

  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
.my-event-odd {
  background-color: #0d47a1;
  color: #ffffff;
  border: 1px solid #0d47a1;
}
.my-event-even {
  background-color: #e53935;
  color: #ffffff;
  border: 1px solid #e53935;
}
.padding-price {
  border: 1px solid gray;
}
.sub-add-component {
  background-color: rgb(205, 224, 243) !important;
}
.service-add-component {
  background-color: rgba(229, 57, 53, 0.2) !important;
}
.flex-table {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid gray;
  padding: 10px;
}
</style>
