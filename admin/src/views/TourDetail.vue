<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>TOUR DETAIL CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="900px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
         <v-form  ref="form" v-model="valid">
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
                    :items="tourlist"
                    item-text="tourName"
                    item-value="_id"
                     v-bind:class="{ disabled: disableSelect }"
                    label="Tour"
                    return-object></v-select>
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
                  <h5><b>Program</b></h5>
                    <VueTrixEditor v-model="editedItem.program" v-bind:initial-content="editedItem.program" placeholder="Program" uniqueId="iprogram" v-bind:image-upload-path="`${apiIP}/upload/tour/tourdetail`" localStorage></VueTrixEditor>
                    <div v-html="editedItem.program" class="old-content">

                    </div>
                </v-flex>
                 <v-flex xs12 sm12 md12 class="group-card">
                  <h5><b>Transport</b></h5>
                    <VueTrixEditor v-model="editedItem.transport" placeholder="Transport" uniqueId="itransport" v-bind:image-upload-path="`${apiIP}/upload/tour/tourdetail`" localStorage></VueTrixEditor>
                    <div v-html="editedItem.transport" class="old-content">

                    </div>
                </v-flex>
                <v-flex xs12 sm12 md12 class="group-card">
                    <h5><b>Service Include</b></h5>
                  <VueTrixEditor v-model="editedItem.serviceInclude" placeholder="Service Include" uniqueId="iserviceinclude" v-bind:image-upload-path="`${apiIP}/upload/tour/tourdetail`" localStorage></VueTrixEditor>
                  <div v-html="editedItem.serviceInclude" class="old-content">

                    </div>
                </v-flex>
                <v-flex xs12 sm12 md12 class="group-card">
                    <h5><b>Service Not Include</b></h5>
                  <VueTrixEditor v-model="editedItem.serviceNotInclude" placeholder="Service Not Include" uniqueId="iservicenotinclude" v-bind:image-upload-path="`${apiIP}/upload/tour/tourdetail`" localStorage></VueTrixEditor>
                  <div v-html="editedItem.serviceNotInclude" class="old-content">

                    </div>
                </v-flex>
                <v-flex xs12 sm12 md12 class="group-card">
                    <h5><b>Should Take</b></h5>
                  <VueTrixEditor v-model="editedItem.shouldTake" placeholder="Should Take" uniqueId="ishouldtake" v-bind:image-upload-path="`${apiIP}/upload/tour/tourdetail`" localStorage></VueTrixEditor>
                  <div v-html="editedItem.shouldTake" class="old-content">

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
    <v-data-table :headers="headers" :items="tourdetail" class="elevation-1">
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
          <td v-html="replace(props.item.tourId.tourName)"></td>
          <td ><p v-html="props.item.program"></p></td>
          <td ><p v-html="props.item.transport"></p></td>
          <td ><p v-html="props.item.serviceInclude"></p></td>
          <td ><p v-html="props.item.serviceNotInclude"></p></td>
          <td ><p v-html="props.item.shouldTake"></p></td>
          <td ><p v-html="props.item.lang"></p></td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";
import FileUpload from "../components/FileUpload.vue";
import moment from "moment";
// import VueTrix from "vue-trix";
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
  components:{
    FileUpload,
    // VueTrix
    VueTrixEditor
  },
  data: () => ({
    apiIP:apiIP,
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
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
    tourlist: [],
    tourdetail: [],
    uploadImg:[],
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
            removeImage: []
    },
    defaultItem: {
       tourId: "",
      program: "",
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
            removeImage: []
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
      AXIOS.get(apiIP + "/tourlist/", { crossdomain: true })
        .then(response => {
          this.tourlist = response.data;
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
      console.log('edit show')
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
      console.log(this.editedItem);
      if (this.uploadImg.length > 0) {
        console.log(this.editedItem.tourDetailImages);
        this.editedItem.removeImage = this.editedItem.tourDetailImages;
        this.editedItem.tourDetailImages = this.uploadImg;
        console.log(this.editedItem.removeImage);
      }
     this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/tourdetail/update/" + this.editId, this.editedItem)
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
    replace(item){
      return item.replace('block','');
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
.old-content{
  margin-top:10px;
  background-color: #e2e9f1;
}
.group-card{
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 2px 4px #c1c1c1;
  margin-bottom: 40px;
  border:1px solid #01b3fa;
}
</style>
