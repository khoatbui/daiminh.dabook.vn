<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>TOUR LIST CRUD</v-toolbar-title>
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
                      v-model="editedItem.destinationId"
                      :items="destination"
                      item-text="destinationName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Destination"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.travelStyleId"
                      :items="travelStyle"
                      item-text="travelStyleName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="TravelStyle"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.tourTypeId"
                      :items="tourType"
                      item-text="tourTypeName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="TourType"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      required
                      :rules="[() => editedItem.tourCode.length > 0 || 'Required field']"
                      v-model="editedItem.tourCode"
                      label="Tour Code"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-text-field v-model="editedItem.order" label="Order"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-checkbox v-model="editedItem.isPromotion" :label="`IsPromotion?`"></v-checkbox>
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
                  <v-flex xs12 sm6 md3>
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
                          v-model="editedItem.startDate"
                          label="StartDate"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.startDate" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
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
                  <v-flex xs12 sm6 md3>
                    <v-text-field v-model="editedItem.voteStatus" label="VoteStatus"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-text-field v-model="editedItem.voteScore" label="VoteScore"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-text-field v-model="editedItem.discount" label="Discount"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="editedItem.keyword" label="Keyword"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.tourName" label="Tour Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-textarea
                      name="input-7-1"
                      label="Tour Introduce"
                      v-model="editedItem.tourIntro"
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field v-model="editedItem.from" label="From(Destination)"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field v-model="editedItem.to" label="To(Arrived)"></v-text-field>
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
                    <v-btn color="blue darken-1" dark @click="addTourIntroByLang">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="tourIntrosHeader"
                      :items="editedItem.tourIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="deleteTourIntroByLang(props.index)">delete</v-icon>
                        </td>
                        <td>{{props.item.tourName}}</td>
                        <td>{{props.item.from}}</td>
                        <td>{{props.item.to}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.tourIntro}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/tour/tourlist'"
                    ></file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <h2>Old images.</h2>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="scroll-ngang">
                    <img
                      class="room-img"
                      v-for="(item,i) in editedItem.tourImages"
                      v-bind:src="`http://mdaiminh.dabook.vn/${item.filePath}`"
                      alt
                    />
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
              v-model="filterByCombo.destinationId"
              :items="destinationFilter"
              item-text="destinationName"
              item-value="_id"
              label="Destination"
              return-object
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md3 p-2>
            <v-select
              v-model="filterByCombo.travelStyleId"
              :items="travelStyleFilter"
              item-text="travelStyleName"
              item-value="_id"
              label="Travel Style"
              return-object
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md3 p-2>
            <v-select
              v-model="filterByCombo.tourTypeId"
              :items="tourTypeFilter"
              item-text="tourTypeName"
              item-value="_id"
              label="Tour Type"
              return-object
            ></v-select>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <v-data-table :headers="headers" :items="itemsFilter"  :search="search"  class="elevation-1">
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
           <td>{{ props.item.destinationId.destinationName }}</td>
          <td>{{ props.item.travelStyleId.travelStyleName }}</td>
          <td>{{ props.item.tourTypeId.tourTypeName }}</td>
          <td>{{ props.item.tourCode }}</td>
          <td>{{ props.item.tourName }}</td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.isUsed }}</td>
          <td>{{ props.item.order }}</td>
          <td>{{ props.item.keyword }}</td>
          <td>{{ props.item.tourIntro }}</td>
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
    FileUpload
  },
  data: () => ({
    apiIP: apiIP,
    uploadImg: [],
    search: "",
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    tourIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "TourName", value: "tourName" },
      { text: "from", value: "from" },
      { text: "to", value: "to" },
      { text: "language", value: "lang" },
      { text: "TourIntro", value: "tourIntro" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
       { text: "Destination", value: "destinationId.destinationName" },
        { text: "Travel Style", value: "travelStyleId.travelStyleName" },
        { text: "Tour Type", value: "tourTypeId.tourTypeName" },
      {
        text: "TourCode",
        value: "tourCode"
      },
      { text: "TourName", value: "tourName" },
      { text: "Language", value: "lang" },
      { text: "isUsed", value: "isUsed" },
      { text: "order", value: "order" },
      { text: "keyword", value: "keyword" },
      { text: "Intro", value: "tourIntro" }
    ],
    filterByCombo: {
      destinationId: {
        tourCode: "ALL"
      },
      travelStyleId: {
        langCode: "ALL"
      },
      tourTypeId:{
        tourTypeCode:"ALL"
      }
    },
     search: "",
    tourList: [],
    destination: [],
    travelStyle: [],
    tourType:[],
    destinationFilter: [],
    travelStyleFilter: [],
    tourTypeFilter:[],
    menu1: false,
    menu2: false,
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    stars:[
      {star:1},
      {star:2},
      {star:3},
      {star:4},
      {star:5}
    ],
    disableSelect: false,
    editedIndex: -1,
    editedItem: {
      destinationId: "",
      travelStyleId: "",
      tourTypeId:"",
      tourCode: "",
      tourName: "",
      tourIntro: "",
      from: "",
      to: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      tourImages: [],
      order: 0,
      keyword: "",
      voteStatus: "",
      voteScore: "",
      discount: 0,
      price: 50000,
      isUsed: true,
      isPromotion: false,
      removeImage: [],
      tourIntros: [],
      star:3
    },
    defaultItem: {
      destinationId: "",
      travelStyleId: "",
      tourTypeId:"",
      tourCode: "",
      tourName: "",
      tourIntro: "",
      from: "",
      to: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      lang: "EN",
      createBy: "",
      createDate: moment(new Date()).format("YYYY-MM-DD"),
      modifyBy: "",
      modifyDate: moment(new Date()).format("YYYY-MM-DD"),
      tourImages: [],
      order: 0,
      keyword: "",
      voteStatus: "",
      voteScore: "",
      discount: 0,
      price: 50000,
      isUsed: true,
      isPromotion: false,
      removeImage: [],
      tourIntros: [],
      star:3
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    itemsFilter() {
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it

      return this.tourList.filter(i => {
          return (
            (this.filterByCombo.destinationId.destinationCode === "ALL" || typeof( this.filterByCombo.destinationId.destinationCode) === "undefined" ||
              i.destinationId._id === this.filterByCombo.destinationId._id) &&
            (this.filterByCombo.travelStyleId.travelStyleCode === "ALL" || typeof( this.filterByCombo.travelStyleId.travelStyleCode) === "undefined" ||
              i.travelStyleId._id === this.filterByCombo.travelStyleId._id) &&
              (this.filterByCombo.tourTypeId.tourTypeCode === "ALL" || typeof( this.filterByCombo.tourTypeId.tourTypeCode) === "undefined" ||
              i.tourTypeId._id === this.filterByCombo.tourTypeId._id)
          );
        });
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
      AXIOS.get(apiIP + "/tourlist/", { crossdomain: true })
        .then(response => {
          this.tourList = response.data;
          console.log(this.tourList);
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/destination/", { crossdomain: true })
        .then(response => {
          this.destination = response.data;
          this.destinationFilter = response.data;
          this.destinationFilter.unshift({
            destinationCode: "ALL",
            destinationName: "ALL",
            destinationId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});
      AXIOS.get(apiIP + "/travelstyle/", { crossdomain: true })
        .then(response => {
          this.travelStyle = response.data;
          this.travelStyleFilter = response.data;
          this.travelStyleFilter.unshift({
            travelStyleCode: "ALL",
            travelStyleName: "ALL",
            travelStyleId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});
         AXIOS.get(apiIP + "/tourtype/", { crossdomain: true })
        .then(response => {
          console.log( response.data);
          this.tourType = response.data;
          this.tourTypeFilter = response.data;
          this.tourTypeFilter.unshift({
            tourTypeCode: "ALL",
            tourTypeName: "ALL",
            tourTypeId: -1
          });
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
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/tourlist/" + item._id)
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
        this.editedItem.removeImage = this.editedItem.tourImages;
        this.editedItem.tourImages = this.uploadImg;
      }
     this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/tourlist/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/tourlist/insert", this.editedItem)
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
    addTourIntroByLang() {
      this.editedItem.tourIntros.push({
        tourName: this.editedItem.tourName,
        tourIntro: this.editedItem.tourIntro,
        from: this.editedItem.from,
        to: this.editedItem.to,
        lang: this.editedItem.lang
      });
    },
    deleteTourIntroByLang(item) {
      this.editedItem.tourIntros.splice(item, 1);
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
