<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>TOUR DETAIL CRUD</v-toolbar-title>
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
            </v-card-title>

            <v-card-text>
              <v-subheader>KEY</v-subheader>
              <v-container grid-list-xl>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.tourId"
                      :items="tourListByLang"
                      item-text="tourName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Tour"
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
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Program</b>
                    </h5>
                    <CustomEditForm  :idComponent="'prodgram'" :dataParent="editedItem.program" v-on:childtoparent="editedItem.program=$event"></CustomEditForm>
                  </v-flex>
                </v-layout>
                   <v-layout wrap class="sub-add-component my-4">
                    <v-flex xs12 sm12 md2 class="sub-add-component">
                      <v-select
                      v-model="editedItem.timeLine.icon"
                      :items="icons"
                      item-text="iconName"
                      item-value="iconCode"
                      label="Icon"
                    >
                    <template slot='selection' slot-scope='{ item }'>
                      <font-awesome-icon far icon="spinner" />
                    </template>
                    <template slot='item' slot-scope='{ item }'>
                      <div v-html="item.iconCode"></div>
                    </template>
                    </v-select>
                    </v-flex>
                  <v-flex xs12 sm12 md2 class="sub-add-component">
                    <v-text-field v-model="editedItem.timeLine.time" label="Timeline Time"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md4 class="sub-add-component">
                    <v-text-field v-model="editedItem.timeLine.title" label="Timeline Title"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md2 class="sub-add-component">
                    <v-text-field v-model="editedItem.timeLine.order" label="Order"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addProgramTimeLine">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>Program TimeLine</b>
                    </h5>
                    <CustomEditForm  :idComponent="'programV2'" :dataParent="editedItem.timeLine.program" v-on:childtoparent="editedItem.timeLine.program=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="programTimelineHeader"
                      :items="editedItem.programV2"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon
                            class="px-2"
                            small
                            @click="editProgramTimeLine(props.item)"
                          >edit</v-icon>
                          <v-icon small @click="deleteProgramTimeLine(props.index)">delete</v-icon>
                        </td>
                        <td>{{props.item.order}}</td>
                        <td>{{props.item.time}}</td>
                        <td>{{props.item.title}}</td>
                        <td>{{props.item.program}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Transport</b>
                    </h5>
                    <CustomEditForm  :idComponent="'transport'" :dataParent="editedItem.transport" v-on:childtoparent="editedItem.transport=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Service Include</b>
                    </h5>
                    <CustomEditForm :idComponent="'serviceinclude'" :dataParent="editedItem.serviceInclude" v-on:childtoparent="editedItem.serviceInclude=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Service Not Include</b>
                    </h5>
                    <CustomEditForm :idComponent="'servicenot'" :dataParent="editedItem.shouldTake" v-on:childtoparent="editedItem.shouldTake=$event"></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Should Take</b>
                    </h5>
                    <CustomEditForm  :idComponent="'shouldtake'" :dataParent="editedItem.shouldTake" v-on:childtoparent="editedItem.shouldTake=$event"></CustomEditForm>
                  </v-flex>
                </v-layout>

                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <doc-upload
                      @getUploadFilesURL="uploadDocument = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/document'"
                    ></doc-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <h2>Old Document.</h2>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="scroll-ngang">
                    <a
                      v-for="(item,i) in editedItem.detailDocs"
                      v-bind:key="i"
                      v-bind:href="`http://daiminh.dabook.vn/${item.filePath}`"
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
              v-model="filterByCombo.tourId"
              :items="tourlistFilter"
              item-text="tourName"
              item-value="_id"
              label="Tour"
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
    <v-data-table :headers="headers" :items="itemsFilter" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td v-html="replace(props.item.tourId.tourName)"></td>
          <td>
            <p v-html="props.item.program"></p>
          </td>
          <td>
            <p v-html="props.item.transport"></p>
          </td>
          <td>
            <p v-html="props.item.serviceInclude"></p>
          </td>
          <td>
            <p v-html="props.item.serviceNotInclude"></p>
          </td>
          <td>
            <p v-html="props.item.shouldTake"></p>
          </td>
          <td>
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
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";
import FileUpload from "../components/FileUpload.vue";
import DocUpload from "../components/DocUpload.vue";

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
    apiIP: apiIP,
    valid: true,
    uploadDocument: [],
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    componentLoaded:false,
    endDateModal: false,
    dialog: false,
    programTimelineHeader: [
       { text: "Actions", value: "name", sortable: false },
       { text: "Order", align: "center", value: "order" },
       { text: "Time", align: "center", value: "time" },
       { text: "Title", align: "center", value: "title" },
       { text: "Program", align: "center", value: "program" },
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "Tour",
        align: "center",
        sortable: false,
        value: "tourId.tourName"
      },
      { text: "Program", align: "center", value: "program" },
      { text: "Transport", align: "center", value: "transport" },
      { text: "Service Include", align: "center", value: "serviceInclude" },
      {
        text: "Service NotInclude",
        value: "serviceNotInclude"
      },
      { text: "ShouldTake", align: "center", value: "shouldTake" },
      { text: "Language", align: "center", value: "lang" }
    ],
    filterByCombo: {
      tourId: {
        tourCode: "ALL"
      },
      language: {
        langCode: "ALL"
      }
    },
    search: "",
    tourlist: [],
    tourdetail: [],
    tourlistFilter: [],
    uploadImg: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    disableSelect: false,
    editedItem: {
      tourId: "",
      program: "",
      timeLine:{
        icon:"",
        time:"",
        title:"",
        program:"",
        order:0,
      },
      programV2:[],
      transport: "",
      serviceInclude: "",
      serviceNotInclude: "",
      shouldTake: "",
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      tourDetailImages: [],
      removeImage: [],
      removeDoc: [],
      detailDocs: []
    },
    defaultItem: {
      tourId: "",
      program: "",
      timeLine:{
        icon:"",
        time:"",
        title:"",
        program:"",
        order:0,
      },
      programV2:[],
      transport: "",
      serviceInclude: "",
      serviceNotInclude: "",
      shouldTake: "",
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      tourDetailImages: [],
      removeImage: [],
      removeDoc: [],
      detailDocs: []
    },
    icons:[
      {
        iconName:'Spinner',
        iconCode:'<font-awesome-icon far icon="spinner" />'
      },
      {
        iconName:'UserSecret',
        iconCode:'<font-awesome-icon icon="user-alt" />'
      },
    ]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    itemsFilter() {
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it

      return this.tourdetail.filter(i => {
        return (
          (this.filterByCombo.tourId.tourCode === "ALL" ||
            i.tourId._id === this.filterByCombo.tourId._id) &&
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
    tourListByLang(){
      if (this.componentLoaded === false) {
        return;
      }
      this.tourlist.forEach(element => {
        element.tourIntros.forEach(area => {
          if (area.lang.toUpperCase() === 'EN') {
            element.tourName = area.tourName;
          }
        });
      });
      return this.tourlist;
    },
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
      AXIOS.get(apiIP + "/tourlist/getused", { crossdomain: true })
        .then(response => {
          this.tourlist = response.data;
          this.tourlistFilter = response.data;
          this.tourlistFilter.unshift({
            tourCode: "ALL",
            tourName: "ALL",
            tourIntros:[{
              tourName:'ALL',
              lang:'EN'
            }],
            tourId: -1
          });
          this.componentLoaded = true;
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/tourdetail/", { crossdomain: true })
        .then(response => {
          this.tourdetail = response.data;
          console.log(this.tourdetail);
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
      console.log("edit show");
      console.log(this.editedItem);
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/tourdetail/" + item._id)
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
        this.editedItem.removeImage = this.editedItem.tourDetailImages;
        this.editedItem.tourDetailImages = this.uploadImg;
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
            apiIP + "/tourdetail/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/tourdetail/insert", this.editedItem)
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
    },
    
    addProgramTimeLine() {
      var isFound = false;
      this.editedItem.programV2.forEach(element => {
        if (element.time == this.editedItem.timeLine.time) {
          element.time = this.editedItem.timeLine.time;
          element.program = this.editedItem.timeLine.program;
          element.order= this.editedItem.timeLine.order
          isFound = true;
          return;
        }
      });
      if (isFound === false) {
      this.editedItem.programV2.push({
        time: this.editedItem.timeLine.time,
        program: this.editedItem.timeLine.program,
        order: this.editedItem.timeLine.order
      });
      }
    },
    deleteProgramTimeLine(item) {
      const index = this.editedItem.programV2.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.programV2.splice(index, 1);
    },
    editProgramTimeLine(item) {
      this.editedItem.timeLine.time = item.time;
      this.editedItem.timeLine.program = item.program;
      this.editedItem.timeLine.order = item.order;
    },
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
</style>
