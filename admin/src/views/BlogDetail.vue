<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>BLOG DETAIL CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-form ref="form" v-model="valid">
          <v-card>
            <v-toolbar dark color="primary">
          <v-btn color="blue darken-1" :disabled="!valid" fab small dark  @click="dialog = false">X</v-btn>
              <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white darken-1" dark flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" :disabled="!valid" dark @click="save">Save</v-btn>
            </v-toolbar>
            <v-card-text>
              <v-subheader>KEY</v-subheader>
              <v-container grid-list-xl>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.blogId"
                      :items="blogListByLang"
                      item-text="blogName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Blog"
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
                    <CustomEditForm  :idComponent="'block01'" :dataParent="editedItem.block01" v-on:childtoparent="editedItem.block01=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Block02</b>
                    </h5>
                    <CustomEditForm :idComponent="'block02'" :dataParent="editedItem.block02" v-on:childtoparent="editedItem.block02=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Block03</b>
                    </h5>
                    <CustomEditForm :idComponent="'block03'" :dataParent="editedItem.block03" v-on:childtoparent="editedItem.block03=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Block04</b>
                    </h5>
                    <CustomEditForm :idComponent="'block04'" :dataParent="editedItem.block04" v-on:childtoparent="editedItem.block04=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Block05</b>
                    </h5>
                    <CustomEditForm :idComponent="'block05'" :dataParent="editedItem.block05" v-on:childtoparent="editedItem.block05=$event"></CustomEditForm>
                  </v-flex>
                </v-layout>

                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <doc-upload
                      @getUploadFilesURL="uploadDocument = $event"
                      v-bind:routerPath="apiIP+'/upload/blog/document'"
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
              v-model="filterByCombo.blogId"
              :items="bloglistFilter"
              item-text="blogName"
              item-value="_id"
              label="Blog"
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
      v-if="componentLoaded.blogDetail==true || itemsFilter.length>0"
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
           <td class="w-25">
            <p class="one-row" v-html="props.item.blogId.blogCode"></p>
          </td>
           <td class="w-25">
            <p class="one-row" v-html="props.item.blogId.blogName"></p>
          </td>
          <td class="w-25">
            <p v-html="props.item.lang"></p>
          </td>
          <td class="w-25">
            <p v-html="props.item.modifyDate"></p>
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
    <v-dialog v-model="dialog_detail" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
       <v-toolbar dark color="primary">
        <v-card-title>
          <span class="headline">Blog detail</span>
        </v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialog_detail = false">Close</v-btn>
         </v-toolbar>
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
//process.env.VUE_APP_API_IPADDRESS
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";
import FileUpload from "../components/FileUpload.vue";
import DocUpload from "../components/DocUpload.vue";
import CustomEditForm from "../components/CustomEditForm.vue";

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
      { text: "BlockCode", align: "left", value: "blogId.blogCode" },
      { text: "BlockName", align: "left", value: "blogId.blogName" },
      { text: "Language", align: "left", value: "lang" },
      { text: "ModifyDate", align: "left", value: "modifyDate" }
    ],
    filterByCombo: {
      blogId: {
        blogCode: "ALL"
      },
      language: {
        langCode: "ALL"
      }
    },
    search: "",
    bloglist: [],
    blogdetail: [],
    bloglistFilter: [],
    uploadImg: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    disableSelect: false,
    editedItem: {
      blogId: "",
      block01: "",
      block02: "",
      block03: "",
      block04: "",
      block05: "",
      block06:"",
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      blogDetailImages: [],
      removeImage: [],
      removeDoc: [],
      detailDocs: [],
      isUsed:true
    },
    defaultItem: {
      blogId: "",
      block01: "",
      block02: "",
      block03: "",
      block04: "",
      block05: "",
      block06:"",
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      blogDetailImages: [],
      removeImage: [],
      removeDoc: [],
      detailDocs: [],
      isUsed:true
    },
    componentLoaded:{
      blogList:false,
      blogDetail:false
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    itemsFilter() {
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it
      console.log(this.filterByCombo);
      return this.blogdetail.filter(i => {
        console.log(`----${ i.createDate}`)
        console.log(i.blogId.blogCode)
        return (
          (this.filterByCombo.blogId.blogCode === "ALL" ||
            i.blogId.blogCode === this.filterByCombo.blogId.blogCode) &&
          (this.filterByCombo.language.langCode === "ALL" ||
            i.lang === this.filterByCombo.language.langCode)
        );
      });
      // if (this.componentLoaded.blogDetail != true) {
      //   return this.blogdetail;
      // }
      // var temp=this.blogdetail.filter(i => {
      //   return (
      //     (this.filterByCombo.blogId.blogCode === "ALL" ||
      //       i.blogId._id === this.filterByCombo.blogId._id) &&
      //     (this.filterByCombo.language.langCode === "ALL" ||
      //       i.lang === this.filterByCombo.language.langCode)
      //   );
      // });
      // return temp;
    },
    deletePermision() {
      if (this.$store.state.user.login.permision === "ADMIN") {
        return true;
      }
    },
    blogListByLang() {
      if (this.componentLoaded.blogList === false) {
        return this.bloglist;
      }
      this.bloglist.forEach(element => {
        element.blogIntros.forEach(area => {
          if (area.lang.toUpperCase() === "EN" && area!=null) {
            element.blogName = area.blogName;
            element.blogIntro = area.blogIntro;
          }
        });
      });
      return this.bloglist;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },
  mounted() {
  },
  methods: {
    initialize() {
      AXIOS.get(apiIP + "/blogdetail/", { crossdomain: true })
        .then(response => {
          this.blogdetail = response.data;
          this.componentLoaded.blogDetail = true;
        })
        .catch(function(error) {})
        .finally(function() {});
        
      AXIOS.get(apiIP + "/bloglist/getused", { crossdomain: true })
        .then(response => {
          this.bloglist = response.data;
          this.bloglistFilter = response.data;
          this.bloglistFilter.unshift({
            blogCode: "ALL",
            blogName: "ALL",
            blogId: -1,
            blogIntros: []
          });
          this.componentLoaded.blogList = true;
        })
        .catch(function(error) {})
        .finally(function() {});
    },
    getInlineImage(event) {
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
        AXIOS.delete(apiIP + "/blogdetail/" + item._id)
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
        this.editedItem.removeImage = this.editedItem.blogDetailImages;
        this.editedItem.blogDetailImages = this.uploadImg;
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
            apiIP + "/blogdetail/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/blogdetail/insert", this.editedItem)
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
  /* background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px #c1c1c1; */
  margin-bottom: 40px;
  /* border: 1px solid #01b3fa; */
}
.w-25 {
  width: 25% !important;
}
.one-row{
  height: 40px;
    overflow: hidden;
    width: 300px;
}
</style>
