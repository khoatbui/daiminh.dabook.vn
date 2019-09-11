<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>PRODUCT CRUD</v-toolbar-title>
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
                    <v-text-field
                      required
                      :rules="[() => editedItem.pricePackageCode.length > 0 || 'Required field']"
                      v-model="editedItem.pricePackageCode"
                      label="PricePackageCode"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md3>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-checkbox v-model="editedItem.isPromotion" :label="`isPromotion?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md8 class="sub-add-component">
                    <v-text-field v-model="editedItem.pricePackageName" label="PricePackage Name"></v-text-field>
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
                    <v-btn color="blue darken-1" dark @click="addPricePackageIntroByLang">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>PricePackage Introduce</b>
                    </h5>
                    <CustomEditForm
                      :dataParent="editedItem.pricePackageIntro"
                       :idComponent="'pricepackage'"
                      v-on:childtoparent="editedItem.pricePackageIntro=$event"
                    ></CustomEditForm>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="pricePackageIntrosHeader"
                      :items="editedItem.pricePackageIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon
                            class="px-2"
                            small
                            @click="editPricePackageIntroByLang(props.item)"
                          >edit</v-icon>
                          <v-icon small @click="deletePricePackageIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.pricePackageName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.pricePackageIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap class="sub-add-component">
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-checkbox v-model="editedItem.price.isRequired" :label="`isRequired?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-select
                      v-model="editedItem.price.selectType"
                      :items="selectType"
                      item-text="selectTypeName"
                      item-value="selectTypeCode"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md3 class="sub-add-component">
                    <v-text-field v-model="editedItem.price.groupCode" label="Group Code"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-select
                      v-model="editedItem.price.priceTypeId"
                      :items="priceType"
                      item-text="priceTypeName"
                      item-value="_id"
                      label="Price Type"
                      class="sub-add-component"
                      v-bind:class="{ disabled: disableSelect }"
                      @input="changedPriceCombobox"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
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
                          v-model="editedItem.price.startDate"
                          label="StartDate"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.price.startDate" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
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
                          v-model="editedItem.price.endDate"
                          label="EndDate"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.price.endDate" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md3 class="sub-add-component">
                    <v-text-field v-model="editedItem.price.netPrice" label="Net Price"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-select
                      v-model="editedItem.price.unitTypeId"
                      :items="unitType"
                      item-text="unitTypeName"
                      item-value="_id"
                      label="Unit Type"
                      class="sub-add-component"
                      v-bind:class="{ disabled: disableSelect }"
                      @input="changedUnitTypeCombobox"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md3 class="sub-add-component">
                    <v-text-field
                      v-model="editedItem.price.commission.commission"
                      label="Commission"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-select
                      v-model="editedItem.price.commission.commissionType"
                      :items="commissionType"
                      item-text="commissionTypeName"
                      item-value="commissionTypeCode"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md3 class="sub-add-component">
                    <v-text-field
                      v-model="editedItem.price.order"
                      label="Order"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addPrice">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="pricesHeader"
                      :items="editedItem.prices"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-2" small @click="editPrices(props.item)">edit</v-icon>
                          <v-icon small @click="deletePrices(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.isRequired}}</td>
                        <td>{{props.item.groupCode}}</td>
                        <td>{{props.item.priceTypeId}}</td>
                        <td>{{props.item.startDate}}</td>
                        <td>{{props.item.endDate}}</td>
                        <td>{{props.item.netPrice}}</td>
                        <td>{{props.item.unitTypeId}}</td>
                        <td>{{props.item.commission.commission}}</td>
                        <td>{{props.item.commission.commissionType}}</td>
                        <td>{{props.item.order}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="PricePackage Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/pricePackage'"
                      :title="`Upload High Quality`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.pricePackageImages"
                      @getDeleteFile="deleteImage($event)"
                    ></ImageListComponent>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="PricePackage Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImgWebp = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/pricePackage/webmp'"
                      :title="`Upload Webp Image`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.pricePackageImagesWebp"
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
    <v-data-table :headers="headers" :items="pricePackage" class="elevation-1">
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.pricePackageCode }}</td>
          <td>{{ props.item.pricePackageName }}</td>
          <td>{{ props.item.pricePackageNameEN }}</td>
          <td>{{ props.item.lang }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
// process.env.VUE_APP_API_IPADDRESS
var apiIP =process.env.VUE_APP_API_IPADDRESS;
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
    uploadImg: [],
    uploadImgWebp: [],
    search: "",
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    disableSelect: false,
    menu1: false,
    menu2: false,
    pricesHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "isRequired", value: "isRequired" },
      { text: "groupCode", value: "groupCode" },
      { text: "priceTypeId", value: "priceTypeId" },
      { text: "startDate", value: "startDate" },
      { text: "endDate", value: "endDate" },
      { text: "netPrice", value: "netPrice" },
      { text: "unitTypeId", value: "unitTypeId" },
      { text: "commission", value: "commission.commission" },
      { text: "commissionType", value: "commission.commissionType" },
      { text: "order", value: "order" }
    ],
    pricePackageIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "PricePackageName", value: "pricePackageName" },
      { text: "language", value: "lang" },
      { text: "PricePackageIntro", value: "pricePackageIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "PricePackageCode",
        sortable: false,
        value: "pricePackageCode"
      },
      { text: "PricePackageName", value: "pricePackageName" },
      { text: "PricePackageNameEN", value: "pricePackageNameEN" },
      { text: "Language", value: "lang" }
    ],
    pricePackage: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    commissionType: [
      { commissionTypeCode: "%", commissionTypeName: "%" },
      { commissionTypeCode: "+", commissionTypeName: "Plus" }
    ],
    selectType: [
      { selectTypeCode: "ALL", selectTypeName: "ALL" },
      { selectTypeCode: "CHECKBOX", selectTypeName: "CHECKBOX" },
      { selectTypeCode: "RADIOBUTTON", selectTypeName: "RADIOBUTTON" }
    ],
    priceType: [],
    unitType: [],
    editedIndex: -1,
    editedItem: {
      pricePackageCode: "",
      pricePackageName: "",
      pricePackageIntro: "",
      pricePackageIntros: [],
      lang: "",
      pricePackageImages: [],
      pricePackageImagesWebp: [],
      price: {
        isRequired: true,
        selectType:'ALL',
        groupCode: "",
        priceTypeId: "",
        startDate: "",
        endDate: "",
        netPrice: 0,
        unitTypeId: "",
        commission: {
          commission: 0,
          commissionType: "%"
        },
        order: 0
      },
      prices: [],
      isUsed: true,
      isPromotion: false,
      createBy: "",
      createDate: "",
      modifyBy: "",
      modifyDate: "",
      removeImage: [],
      removeImageWebp: []
    },
    defaultItem: {
      pricePackageCode: "",
      pricePackageName: "",
      pricePackageIntro: "",
      pricePackageIntros: [],
      lang: "",
      pricePackageImages: [],
      pricePackageImagesWebp: [],
      price: {
        isRequired: true,
        selectType:'ALL',
        groupCode: "",
        priceTypeId: "",
        startDate: "",
        endDate: "",
        netPrice: 0,
        unitTypeId: "",
        commission: {
          commission: 0,
          commissionType: "%"
        },
        order: 0
      },
      prices: [],
      isUsed: true,
      isPromotion: false,
      createBy: "",
      createDate: "",
      modifyBy: "",
      modifyDate: "",
      removeImage: [],
      removeImageWebp: []
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
      AXIOS.get(apiIP + "/pricePackage/", { crossdomain: true })
        .then(response => {
          this.pricePackage = response.data;
          console.log(this.pricePackage);
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/pricetype/getUsed", { crossdomain: true })
        .then(response => {
          this.priceType = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/unittype/getUsed", { crossdomain: true })
        .then(response => {
          this.unitType = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
    },
    changedPriceCombobox() {},
    changedUnitTypeCombobox() {},
    editItem(item) {
      this.editedIndex = 100;
      this.editedItem = Object.assign({}, item);
      delete this.editedItem._id;
      this.editId = item._id;
      this.dialog = true;
      this.disableSelect = true;
      this.editedItem.removeImage = [];
      this.editedItem.removeImageWebp = [];
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/pricePackage/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
    deleteImage(image) {
      this.editedItem.pricePackageImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.pricePackageImagesWebp.forEach(function(item, index, object) {
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
      if (this.uploadImg.length > 0) {
        this.uploadImg.forEach(element => {
          this.editedItem.pricePackageImages.push(element);
        });
      }
      if (this.uploadImgWebp.length > 0) {
        this.uploadImgWebp.forEach(element => {
          this.editedItem.pricePackageImagesWebp.push(element);
        });
      }
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/pricePackage/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/pricePackage/insert", this.editedItem)
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
    addPricePackageIntroByLang() {
        this.editedItem.pricePackageIntros.push({
          pricePackageName: this.editedItem.pricePackageName,
          pricePackageIntro: this.editedItem.pricePackageIntro,
          lang: this.editedItem.lang
        });
    },
    deletePricePackageIntroByLang(item) {
      const index = this.editedItem.pricePackageIntros.indexOf(item);
      console.log(index);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.pricePackageIntros.splice(index, 1);
    },
    editPricePackageIntroByLang(item) {
      this.editedItem.pricePackageName = item.pricePackageName;
      this.editedItem.pricePackageIntro = item.pricePackageIntro;
      this.editedItem.lang = item.lang;
    },
    addPrice() {
        this.editedItem.prices.push(this.editedItem.price);
    },
    deletePrices(item) {
      const index = this.editedItem.prices.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.prices.splice(index, 1);
    },
    editPrices(item) {
      this.editedItem.price = item;
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
