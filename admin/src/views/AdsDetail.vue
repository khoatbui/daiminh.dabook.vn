<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>ADS DETAIL CRUD</v-toolbar-title>
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
              <v-btn color="white darken-1" dark flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" :disabled="!valid" dark @click="save">Save</v-btn>
            </v-card-title>

            <v-card-text>
              <v-subheader>KEY</v-subheader>
              <v-container grid-list-xl>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.adsId"
                      :items="adsListByLang"
                      item-text="adsName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Ads"
                      return-object
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
                  <v-flex xs12 sm6 md3>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Block01</b>
                    </h5>
                    <CustomEditForm :dataParent="editedItem.block01" v-on:childtoparent="editedItem.block01=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Block02</b>
                    </h5>
                    <CustomEditForm :dataParent="editedItem.block02" v-on:childtoparent="editedItem.block02=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Block03</b>
                    </h5>
                    <CustomEditForm :dataParent="editedItem.block03" v-on:childtoparent="editedItem.block03=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Block04</b>
                    </h5>
                    <CustomEditForm :dataParent="editedItem.block04" v-on:childtoparent="editedItem.block04=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Block05</b>
                    </h5>
                    <CustomEditForm :dataParent="editedItem.block05" v-on:childtoparent="editedItem.block05=$event"></CustomEditForm>
                  </v-flex>
                </v-layout>

                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <doc-upload
                      @getUploadFilesURL="uploadDocument = $event"
                      v-bind:routerPath="apiIP+'/upload/ads/document'"
                    ></doc-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <h2>Old Document.</h2>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="scroll-ngang">
                    <a
                      v-for="(item,i) in editedItem.detailDocs"
                      v-bind:href="`http://mdaiminh.dabook.vn/${item.filePath}`"
                    >
                      <font-awesome-icon icon="file-pdf" class="text-supplerlarge" />
                      <span style="display:block">{{item.fileName}}</span>
                    </a>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <div>
                      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                        <button
                          :class="{ 'is-active': isActive.bold() }"
                          @click="commands.bold"
                        >Bold</button>
                      </editor-menu-bar>
                      <editor-content :editor="editor" />
                    </div>
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
          <v-flex xs12 sm6 md3 p-2>
            <v-select
              v-model="filterByCombo.adsId"
              :items="adslistFilter"
              item-text="adsName"
              item-value="_id"
              label="Ads"
              return-object
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md3 p-2>
            <v-select
              v-model="filterByCombo.language"
              :items="language"
              item-text="langName"
              item-value="langCode"
              label="Language"
              return-object
            ></v-select>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <v-data-table
      :headers="headers"
      show-expand
      :items="itemsFilter"
      :search="search"
      class="elevation-1"
      dense
    >
      <template v-slot:items="props">
        <tr style="height:2rem;line-height:1rem;oveflow:hidden">
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click.stop="dialog_detail = true;selectedItem=props.item"
            >settings_overscan</v-icon>
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>
            <p v-html="props.item.adsId.adsName"></p>
          </td>
          <td>
            <p v-html="props.item.adsId.adsCode"></p>
          </td>
          <td class="w-25">
            <p class="one-row" v-html="props.item.block01"></p>
          </td>
          <td class="w-25">
            <p class="one-row" v-html="props.item.block02"></p>
          </td>
          <td class="w-25">
            <p class="one-row" v-html="props.item.block03"></p>
          </td>
          <td class="w-25">
            <p class="one-row" v-html="props.item.block04"></p>
          </td>
          <td class="w-25">
            <p class="one-row" v-html="props.item.block05"></p>
          </td>
          <td class="w-25">
            <p v-html="props.item.lang"></p>
          </td>
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
    <v-dialog v-model="dialog_detail" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Ads detail</span>
        </v-card-title>
        <v-card-text>
          <div v-html="selectedItem.block01"></div>
          <div v-html="selectedItem.block02"></div>
          <div v-html="selectedItem.block03"></div>
          <div v-html="selectedItem.block04"></div>
          <div v-html="selectedItem.block05"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialog_detail = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";
import FileUpload from "../components/FileUpload.vue";
import DocUpload from "../components/DocUpload.vue";
import CustomEditForm from "../components/CustomEditForm.vue"
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
  components: {
    FileUpload,
    DocUpload,
  },
  data: () => ({
    dialog_detail: false,
    selectedItem: {},
    apiIP: apiIP,
    valid: true,
    uploadDocument: [],
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "Ads",
        align: "left",
        value: "adsId.adsName"
      },
      {
        text: "Ads",
        align: "left",
        value: "adsId.adsCode"
      },
      { text: "Block01", align: "left", value: "block01" },
      { text: "Block02", align: "left", value: "block02" },
      { text: "Block03", align: "left", value: "block03" },
      {
        text: "Block04",
        align: "left",
        value: "block04"
      },
      { text: "Block05", align: "left", value: "block05" },
      { text: "Language", align: "left", value: "lang" }
    ],
    filterByCombo: {
      adsId: {
        adsCode: "ALL"
      },
      language: {
        langCode: "ALL"
      }
    },
    search: "",
    adslist: [],
    adsdetail: [],
    adslistFilter: [],
    uploadImg: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    disableSelect: false,
    editedItem: {
      adsId: "",
      block01: "",
      block02: "",
      block03: "",
      block04: "",
      block05: "",
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      adsDetailImages: [],
      removeImage: [],
      removeDoc: [],
      detailDocs: [],
      isUsed:true
    },
    defaultItem: {
      adsId: "",
      block01: "",
      block02: "",
      block03: "",
      block04: "",
      block05: "",
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      adsDetailImages: [],
      removeImage: [],
      removeDoc: [],
      detailDocs: [],
      isUsed:true
    },
    componentLoaded: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    itemsFilter() {
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it

      return this.adsdetail.filter(i => {
        return (
          (this.filterByCombo.adsId.adsCode === "ALL" ||
            i.adsId._id === this.filterByCombo.adsId._id) &&
          (this.filterByCombo.language.langCode === "ALL" ||
            i.lang === this.filterByCombo.language.langCode)
        );
      });
    },
    deletePermision() {
      if (this.$store.state.user.login.permision === "ADMIN") {
        return true;
      }
    },
    adsListByLang() {
      if (this.componentLoaded === false) {
        return;
      }
      this.adslist.forEach(element => {
        element.adsIntros.forEach(area => {
          if (area.lang.toUpperCase() === "EN") {
            element.adsName = area.adsName;
            element.adsIntro = area.adsIntro;
          }
        });
      });
      return this.adslist;
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
  mounted() {
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    initialize() {
      AXIOS.get(apiIP + "/adslist/getused", { crossdomain: true })
        .then(response => {
          this.adslist = response.data;
          this.adslistFilter = response.data;
          this.adslistFilter.unshift({
            adsCode: "ALL",
            adsName: "ALL",
            adsId: -1,
            adsIntros: []
          });
          this.componentLoaded = true;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/adsdetail/", { crossdomain: true })
        .then(response => {
          this.adsdetail = response.data;
          console.log(this.adsdetail);
        })
        .catch(function(error) {})
        .finally(function() {});
    },
    getInlineImage(event) {
      console.log(event);
    },
    editItem(item) {
      this.editedIndex = 100;
      this.editedItem = Object.assign({}, item);
      delete this.editedItem._id;
      this.editId = item._id;
      this.dialog = true;
      this.disableSelect = true;
      console.log("edit show");
      console.log(this.editedItem);
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/adsdetail/" + item._id)
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
      if (this.uploadImg.length > 0) {
        this.editedItem.removeImage = this.editedItem.adsDetailImages;
        this.editedItem.adsDetailImages = this.uploadImg;
      }
      if (this.uploadDocument.length > 0) {
        this.editedItem.removeDoc = this.editedItem.detailDocs;
        this.editedItem.detailDocs = this.uploadDocument;
      }
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(
            apiIP + "/adsdetail/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/adsdetail/insert", this.editedItem)
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
    replace(item) {
      return item.replace("block", "");
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
.old-content {
  margin-top: 10px;
  background-color: #e2e9f1;
}
.group-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px #c1c1c1;
  margin-bottom: 40px;
  border: 1px solid #01b3fa;
}
.w-25 {
  width: 25% !important;
}
.one-row{
  height: 40px;
    overflow: hidden;
    width: 100px;
}
</style>
