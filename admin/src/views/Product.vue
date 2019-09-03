<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>product CRUD</v-toolbar-title>
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
                    <v-text-field
                      required
                      :rules="[() => editedItem.productCode.length > 0 || 'Required field']"
                      v-model="editedItem.productCode"
                      label="productCode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.star" label="Star"></v-text-field>
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
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.isPackage" :label="`isPackage?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.keyword" label="Keyword"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap class="sub-add-component my-4">
                  <v-flex xs12 sm12 md8 class="sub-add-component">
                    <v-text-field v-model="editedItem.productName" label="Product Name"></v-text-field>
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
                    <v-btn color="blue darken-1" dark @click="addProductIntroByLang">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>Product Introduce</b>
                    </h5>
                    <CustomEditForm
                      :dataParent="editedItem.productIntro"
                      v-on:childtoparent="editedItem.productIntro=$event"
                    ></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="productIntrosHeader"
                      :items="editedItem.productIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon
                            class="px-2"
                            small
                            @click="editProductIntroByLang(props.item)"
                          >edit</v-icon>
                          <v-icon small @click="deleteProductIntroByLang(props.index)">delete</v-icon>
                        </td>
                        <td>{{props.item.productName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.productIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap class="sub-add-component my-4">
                  <v-flex xs12 sm12 md8 class="sub-add-component">
                    <v-text-field v-model="editedItem.blockIntro.blockName" label="BlockName"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md8 class="sub-add-component">
                    <v-text-field v-model="editedItem.blockIntro.order" label="Order"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-select
                      v-model="editedItem.blockIntro.lang"
                      :items="language"
                      item-text="langName"
                      item-value="langCode"
                      label="Language"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addBlockIntroByLang">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>Block Introduce</b>
                    </h5>
                    <CustomEditForm
                      :dataParent="editedItem.blockIntro.blockIntro"
                      v-on:childtoparent="editedItem.blockIntro.blockIntro=$event"
                    ></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="blockIntrosHeader"
                      :items="editedItem.blockIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-2" small @click="editBlockIntroByLang(props.item)">edit</v-icon>
                          <v-icon small @click="deleteBlockIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.blockName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.blockIntro}}</td>
                        <td>{{props.item.order}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap class="sub-add-component">
                  <v-flex xs12 sm6 md10>
                    <v-select
                      v-model="editedItem.pricePackage"
                      :items="pricePackage"
                      item-text="pricePackageCode"
                      item-value="_id"
                      label="Price Package"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addPricePackage">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="pricePackageIntrosHeader"
                      :items="editedItem.pricePackages"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="deletePricePackage(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.pricePackageCode}}</td>
                        <td>{{props.item.pricePackageName}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/product/product'"
                      :title="`Upload High Quality`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.productImages"
                      @getDeleteFile="deleteImage($event)"
                    ></ImageListComponent>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImgWebp = $event"
                      v-bind:routerPath="apiIP+'/upload/product/product/webmp'"
                      :title="`Upload Webp Image`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.productImagesWebp"
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
    <v-data-table :headers="headers" :items="product" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.supplierId.supplierName }}</td>
          <td>{{ props.item.productCode }}</td>
          <td>{{ props.item.productName }}</td>
          <td>{{ props.item.star }}</td>
          <td>{{ props.item.createBy }}</td>
          <td>{{ props.item.createDate }}</td>
          <td>{{ props.item.productIntro }}</td>
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
      <download-excel :data="product" name="product.xls">
        <i class="far fa-file-excel"></i>
      </download-excel>
    </v-btn>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
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
    search: "",
    valid: true,
    uploadImg: [],
    uploadImgWebp: [],
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    pricePackageIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "PricePackageCode", value: "pricePackageCode" },
      { text: "PricePackageName", value: "pricePackageName" },
    ],
    productIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "ProductName", value: "productName" },
      { text: "language", value: "lang" },
      { text: "ProductIntro", value: "productIntro" }
    ],
    blockIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "BlockName", value: "blockName" },
      { text: "Order", value: "order" },
      { text: "language", value: "lang" },
      { text: "BlockIntro", value: "blockIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      { text: "Supplier", value: "supplierId.supplierName" },
      { text: "City", value: "city.cityName" },
      { text: "productCode", value: "productCode" },
      { text: "ProductName", value: "productName" },
      { text: "Star", value: "star" },
      { text: "Create By", value: "createBy" },
      { text: "Create Date", value: "createDate" },
      { text: "Product Intro", value: "productIntro" }
    ],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    supplier: [],
    pricePackage: [],
    product: [],
    editedIndex: -1,
    disableSelect: false,
    editId: "",
    editedItem: {
      supplierId: "",
      productCode: "",
      productName: "",
      lang: "EN",
      productIntro: "",
      productIntros: [],
      blockIntro: {
        blockName: "",
        order: 0,
        blockIntro: "",
        lang: "EN"
      },
      blockIntros: [],
      pricePackage:'',
      pricePackages:[],
      star: "5",
      keyword: "",
      isUsed: true,
      isHot: true,
      isPromote: true,
      productImages: [],
      removeImage: [],
      productImagesWebp: [],
      removeImageWebp: [],
      isPackage: true,
      createBy: "",
      modifyBy: ""
    },
    defaultItem: {
      supplierId: "",
      productCode: "",
      productName: "",
      productIntro: "",
      lang: "EN",
      productIntros: [],
      blockIntro: {
        blockName: "",
        order: 0,
        blockIntro: "",
        lang: "EN"
      },
      blockIntros: [],
      pricePackage:'',
      pricePackages:[],
      star: "5",
      keyword: "",
      isUsed: true,
      isHot: true,
      isPromote: true,
      productImages: [],
      removeImage: [],
      productImagesWebp: [],
      removeImageWebp: [],
      isPackage: true,
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
      AXIOS.get(apiIP + "/product/", { crossdomain: true })
        .then(response => {
          this.product = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/supplier/getused", { crossdomain: true })
        .then(response => {
          this.supplier = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/pricepackage/getused", { crossdomain: true })
        .then(response => {
          this.pricePackage = response.data;
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
      this.editedItem.removeImage = [];
      this.editedItem.removeImageWebp = [];
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/product/" + item._id)
          .then(response => {
            this.snackbar.snackbar = true;
            this.snackbar.text = response.data;
            this.initialize();
          })
          .catch(function(error) {})
          .finally(function() {});
    },
    deleteImage(image) {
      this.editedItem.productImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.productImagesWebp.forEach(function(item, index, object) {
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
          this.editedItem.productImages.push(element);
        });
      }
      if (this.uploadImgWebp.length > 0) {
        this.uploadImgWebp.forEach(element => {
          this.editedItem.productImagesWebp.push(element);
        });
      }
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/product/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/product/insert", this.editedItem)
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
    addProductIntroByLang() {
      var isFound = false;
      this.editedItem.productIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
          element.productName = this.editedItem.productName;
          element.productIntro = this.editedItem.productIntro;
          isFound = true;
          return;
        }
      });
      if (isFound === false) {
        this.editedItem.productIntros.push({
          productName: this.editedItem.productName,
          productIntro: this.editedItem.productIntro,
          lang: this.editedItem.lang
        });
      }
    },
    deleteProductIntroByLang(item) {
      const index = this.editedItem.productIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.productIntros.splice(index, 1);
    },
    editProductIntroByLang(item) {
      this.editedItem.productName = item.productName;
      this.editedItem.productIntro = item.productIntro;
      this.editedItem.lang = item.lang;
    },
    addBlockIntroByLang() {
      this.editedItem.blockIntros.push({
        blockName: this.editedItem.blockIntro.blockName,
        blockIntro: this.editedItem.blockIntro.blockIntro,
        lang: this.editedItem.blockIntro.lang,
        order: this.editedItem.blockIntro.order
      });
    },
    deleteBlockIntroByLang(item) {
      const index = this.editedItem.blockIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.blockIntros.splice(index, 1);
    },
    editBlockIntroByLang(item) {
      this.editedItem.blockIntro.blockName = item.blockName;
      this.editedItem.blockIntro.blockIntro = item.blockIntro;
      this.editedItem.blockIntro.lang = item.lang;
      this.editedItem.blockIntro.order = item.order;
    },
    deletePricePackage(item) {
      const index = this.editedItem.pricePackages.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.pricePackages.splice(index, 1);
    },
    addPricePackage() {
      this.editedItem.pricePackages.push(this.editedItem.pricePackage);
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
