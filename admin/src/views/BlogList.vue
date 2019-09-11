<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>BLOG LIST CRUD</v-toolbar-title>
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
                      v-model="editedItem.blogTypeId"
                      :items="blogType"
                      item-text="blogTypeName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="BlogType"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4 v-if="editedItem.blogTypeId.blogTypeCode=='DES'">
                    <v-select
                      v-model="editedItem.destinationId"
                      :items="destinationByLang"
                      item-text="destinationName"
                      item-value="_id"
                      label="DESTINATION"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4 v-if="editedItem.blogTypeId.blogTypeCode=='MICE'">
                    <v-select
                      v-model="editedItem.miceId"
                      :items="mice"
                      item-text="miceName"
                      item-value="_id"
                      label="MICE"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4 v-if="editedItem.blogTypeId.blogTypeCode=='TRS'">
                    <v-select
                      v-if="editedItem.blogTypeId.blogTypeCode=='TRS'"
                      v-model="editedItem.travelStyleId"
                      :items="travelStyle"
                      item-text="travelStyleName"
                      item-value="_id"
                      label="Travel Style"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4 v-if="editedItem.blogTypeId.blogTypeCode=='TRV'">
                    <v-select
                      v-model="editedItem.travelServiceId"
                      :items="travelService"
                      item-text="travelServiceName"
                      item-value="_id"
                      label="Travel Service"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4 v-if="editedItem.blogTypeId.blogTypeCode=='ABU'">
                    <v-select
                      v-model="editedItem.aboutUsId"
                      :items="aboutUs"
                      item-text="aboutUsName"
                      item-value="_id"
                      label="AboutUs"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      :rules="[() => editedItem.blogCode.length > 0 || 'Required field']"
                      v-model="editedItem.blogCode"
                      label="Blog Code"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-text-field v-model="editedItem.order" label="Order"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-checkbox v-model="editedItem.isHot" :label="`IsHot?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-checkbox v-model="editedItem.isBlog" :label="`Is Show on Blog?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-select
                      v-model="editedItem.star"
                      :items="stars"
                      item-text="star"
                      item-value="start"
                      label="Star"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.keyword" label="Keyword"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md8>
                    <v-text-field v-model="editedItem.link" label="Link"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.ctaId"
                      :items="callToAction"
                      item-text="ctaName"
                      item-value="ctaCode"
                      label="Call To Action Button "
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.blogName" label="Blog Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>Blog Introduce</b>
                    </h5>
                    <CustomEditForm  :idComponent="'blogintro'" :dataParent="editedItem.blogIntro" v-on:childtoparent="editedItem.blogIntro=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-select
                      v-model="editedItem.lang"
                      :items="language"
                      item-text="langName"
                      item-value="langCode"
                      label="Language"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addBlogIntroByLang">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="blogIntrosHeader"
                      :items="editedItem.blogIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="editBlogIntroByLang(props.item)">edit</v-icon>
                          <v-icon small @click="deleteBlogIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.blogName}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.blogIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/blog/bloglist'"
                      :title="`Upload High Quality`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.blogImages"
                      @getDeleteFile="deleteImage($event)"
                    ></ImageListComponent>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImgWebp = $event"
                      v-bind:routerPath="apiIP+'/upload/blog/bloglist/webmp'"
                      :title="`Upload Webp Image`"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md8>
                    <ImageListComponent
                      :data="editedItem.blogImagesWebp"
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
    <v-container fluid grid-list-xl pl-0 pr-0>
      <v-card>
        <v-layout pl-2 pr-2>
          <v-flex xs12 sm6 md3 p-2>
            <v-select
              v-model="filterByCombo.blogTypeId"
              :items="blogTypeFilter"
              item-text="blogTypeName"
              item-value="_id"
              label="Blog Type"
              return-object
            ></v-select>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <v-data-table
      dense
      :headers="headers"
      :items="itemsFilter"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.blogTypeId.blogTypeName }}</td>
          <td>{{ props.item.blogCode }}</td>
          <td>{{ props.item.blogName }}</td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.isUsed }}</td>
          <td>{{ props.item.order }}</td>
          <td>{{ props.item.keyword }}</td>
          <td>{{ props.item.createDate }}</td>
          <td>{{ props.item.modifyDate }}</td>
          <td>{{ props.item.blogIntro }}</td>
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
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";
import FileUpload from "../components/FileUpload.vue";
import moment from "moment";
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
    blogIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "BlogName", value: "blogName" },
      { text: "language", value: "lang" },
      { text: "BlogIntro", value: "blogIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      { text: "Blog Type", value: "blogTypeId.blogTypeName" },
      {
        text: "BlogCode",
        value: "blogCode"
      },
      { text: "BlogName", value: "blogName" },
      { text: "Language", value: "lang" },
      { text: "isUsed", value: "isUsed" },
      { text: "order", value: "order" },
      { text: "keyword", value: "keyword" },
      { text: "Create Date", value: "createDate" },
      { text: "Modify Date", value: "modifyDate" },
      { text: "Intro", value: "blogIntro" }
    ],
    filterByCombo: {
      blogTypeId: {
        blogTypeCode: "ALL"
      }
    },
    search: "",
    blogList: [],
    blogType: [],
    mice: [],
    destination: [],
    travelStyle: [],
    travelService: [],
    blogTypeFilter: [],
    aboutUs: [],
    menu1: false,
    menu2: false,
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    callToAction: [],
    stars: [{ star: 1 }, { star: 2 }, { star: 3 }, { star: 4 }, { star: 5 }],
    disableSelect: false,
    editedIndex: -1,
    editedItem: {
      blogTypeId: "",
      blogCode: "",
      blogName: "",
      blogIntro: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      blogImages: [],
      order: 0,
      keyword: "",
      isUsed: true,
      isHot: false,
      removeImage: [],
      blogImagesWebp: [],
      removeImageWebp: [],
      blogIntros: [],
      star: 3,
      link: "",
      travelStyleId: null,
      travelServiceId: null,
      miceId: null,
      aboutUsId: null,
      destinationId: null,
      cta:"",
      isBlog:true,
    },
    defaultItem: {
      blogTypeId: "",
      blogCode: "",
      blogName: "",
      blogIntro: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      blogImages: [],
      order: 0,
      keyword: "",
      isUsed: true,
      isHot: false,
      removeImage: [],
      blogImagesWebp: [],
      removeImageWebp: [],
      blogIntros: [],
      star: 3,
      link: "",
      travelStyleId: null,
      travelServiceId: null,
      miceId: null,
      aboutUsId: null,
      destinationId: null,
      cta:"",
      isBlog:true,
    },
    componentLoaded: false
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    itemsFilter() {
      if (this.componentLoaded == false) {
        return;
      }
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it

      return this.blogListByLang.filter(i => {
        return (
          this.filterByCombo.blogTypeId.blogTypeCode === "ALL" ||
          typeof this.filterByCombo.blogTypeId.blogTypeCode === "undefined" ||
          i.blogTypeId._id === this.filterByCombo.blogTypeId._id
        );
      });
    },
    deletePermision() {
      if (this.$store.state.user.login.permision === "ADMIN") {
        return true;
      }
    },
    blogListByLang() {
      if (this.componentLoaded === false) {
        return;
      }
      this.blogList.forEach(element => {
        element.blogIntros.forEach(area => {
          if (area.lang.toUpperCase() === "EN") {
            element.blogName = area.blogName;
            element.blogIntro = area.blogIntro;
          }
        });
      });
      return this.blogList;
    },
    destinationByLang() {
      if (this.componentLoaded === false) {
        return;
      }
      this.destination.forEach(element => {
        element.destinationIntros.forEach(area => {
          if (area.lang.toUpperCase() === "EN") {
            element.destinationName = area.destinationName;
            element.destinationIntro = area.destinationIntro;
          }
        });
      });
      return this.destination;
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
      AXIOS.get(apiIP + "/bloglist/", { crossdomain: true })
        .then(response => {
          this.blogList = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/cta/getused", { crossdomain: true })
        .then(response => {
          this.callToAction = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/blogtype/getused", { crossdomain: true })
        .then(response => {
          this.blogType = response.data;
          this.blogTypeFilter = response.data;
          this.blogTypeFilter.unshift({
            blogTypeCode: "ALL",
            blogTypeName: "ALL",
            blogTypeId: -1
          });
          this.componentLoaded = true;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/mice/getused", { crossdomain: true })
        .then(response => {
          this.mice = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/travelstyle/getused", { crossdomain: true })
        .then(response => {
          this.travelStyle = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/travelservice/getused", { crossdomain: true })
        .then(response => {
          this.travelService = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/aboutus/getused", { crossdomain: true })
        .then(response => {
          this.aboutUs = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/destination/", { crossdomain: true })
        .then(response => {
          this.destination = response.data;
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
    deleteImage(image) {
      this.editedItem.blogImages.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImage.push(image);
    },
    deleteImageWebp() {
      this.editedItem.blogImagesWebp.forEach(function(item, index, object) {
        if (image.fileName == item.fileName) {
          object.splice(index, 1);
        }
      });
      this.editedItem.removeImageWebp.push(image);
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/bloglist/" + item._id)
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
        this.uploadImg.forEach(element => {
          this.editedItem.blogImages.push(element);
        });
      }
      if (this.uploadImgWebp.length > 0) {
        this.uploadImgWebp.forEach(element => {
          this.editedItem.blogImagesWebp.push(element);
        });
      }
      this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/bloglist/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/bloglist/insert", this.editedItem)
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
    addBlogIntroByLang() {
      var isFound = false;
      this.editedItem.blogIntros.forEach(element => {
        if (element.lang === this.editedItem.lang) {
          element.blogName = this.editedItem.blogName;
          element.blogIntro = this.editedItem.blogIntro;
          isFound = true;
          return;
        }
      });
      if (isFound === false) {
        this.editedItem.blogIntros.push({
          blogName: this.editedItem.blogName,
          blogIntro: this.editedItem.blogIntro,
          lang: this.editedItem.lang
        });
      }
    },
    deleteBlogIntroByLang(item) {
      const index = this.editedItem.blogIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.blogIntros.splice(index, 1);
    },
    editBlogIntroByLang(item) {
      this.editedItem.blogName = item.blogName;
      this.editedItem.blogIntro = item.blogIntro;
      this.editedItem.lang = item.lang;
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
.sub-add-component {
  background-color: rgb(205, 224, 243) !important;
}
</style>
