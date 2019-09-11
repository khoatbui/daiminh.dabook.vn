<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Payment CRUD</v-toolbar-title>
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
                  <v-text-field required
                    :rules="[() => editedItem.bankAccount.length > 0 || 'Required field']"
                     v-model="editedItem.bankAccount" label="BankAccount"></v-text-field>
                </v-flex>
                 <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.order" label="Order"></v-text-field>
                  </v-flex>
                <v-flex xs12 sm6 md4>
                   <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                </v-flex>
                 <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.keyword" label="Keyword"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.bankName" label="BankName"></v-text-field>
                  </v-flex>
                    <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.bankOwner" label="BankOwner"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="sub-add-component">
                    <v-text-field v-model="editedItem.bankLocation" label="BankLocation"></v-text-field>
                  </v-flex>
                   <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5><b>Note</b></h5>
                    <CustomEditForm :idComponent="'not'" :dataParent="editedItem.note" v-on:childtoparent="editedItem.note=$event"></CustomEditForm>
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
                    <v-btn color="blue darken-1" dark @click="addPaymentIntroByLang">Add</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="bankIntrosHeader"
                      :items="editedItem.bankIntros"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="deletePaymentIntroByLang(props.item)">delete</v-icon>
                        </td>
                        <td>{{props.item.bankName}}</td>
                         <td>{{props.item.bankOwner}}</td>
                         <td>{{props.item.bankLocation}}</td>
                        <td>{{props.item.lang}}</td>
                        <td>{{props.item.note}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                 <v-flex xs12 sm12 md12>
                    <!-- <file-upload v-model="editedItem.roomImages" label="RoomType Image" v-bind:routerPath="apiIP+'/upload/room-type-image'"></file-upload> -->
                    <file-upload
                      @getUploadFilesURL="uploadImg = $event"
                      v-bind:routerPath="apiIP+'/upload/page/payment'"
                    ></file-upload>
                 </v-flex>
                 <v-flex xs12 sm12 md12>
                    <h2>Old images.</h2>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="scroll-ngang">
                    <img
                      class="room-img"
                      v-for="(item,i) in editedItem.bankImages"
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
    <v-data-table :headers="headers" :items="payment" class="elevation-1">
      <template v-slot:items="props">
        <tr>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td>{{ props.item.bankAccount }}</td>
          <td>{{ props.item.bankName }}</td>
           <td>{{ props.item.bankOwner }}</td>
           <td>{{ props.item.bankLocation }}</td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.isUsed }}</td>
          <td>{{ props.item.order }}</td>
          <td>{{ props.item.keyword }}</td>
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
    bankIntrosHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "BankName", value: "bankName" },
      { text: "BankOwner", value: "bankOwner" },
       { text: "BankLocation", value: "bankLocation" },
      { text: "language", value: "lang" },
      { text: "note", value: "note" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "BankAccount",
        sortable: false,
        value: "bankAccount"
      },
      { text: "BankName", value: "bankName" },
       { text: "BankOwner", value: "bankOwner" },
       { text: "BankLocation", value: "bankLocation" },
      { text: "Language", value: "lang" },
      { text: "isUsed", value: "isUsed" },
      { text: "order", value: "order" },
      { text: "keyword", value: "keyword" }
    ],
    payment: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editedItem: {
      bankName: "",
      bankOwner: "",
      bankAccount: "",
      bankLocation:"",
      note:"",
      lang: "EN",
       bankImages: [],
      removeImage: [],
      isUsed:true,
      keyword:"",
      order:0,
      bankIntros:[]
    },
    defaultItem: {
      bankName: "",
      bankOwner: "",
      bankAccount: "",
      bankLocation:"",
      note:"",
      lang: "EN",
       bankImages: [],
      removeImage: [],
      isUsed:true,
      keyword:"",
      order:0,
      bankIntros:[]
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
      AXIOS.get(apiIP + "/payment/", { crossdomain: true })
        .then(response => {
          this.payment = response.data;
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
        AXIOS.delete(apiIP + "/payment/" + item._id)
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
        console.log(this.editedItem.bankImages);
        this.editedItem.removeImage = this.editedItem.bankImages;
        this.editedItem.bankImages = this.uploadImg;
        console.log(this.editedItem.removeImage);
      }
     this.editedItem.modifyBy = this.$store.state.user.login.userName;
      this.editedItem.createBy = this.$store.state.user.login.userName;
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(apiIP + "/payment/update/" + this.editId, this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/payment/insert", this.editedItem)
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
    addPaymentIntroByLang() {
      this.editedItem.bankIntros.push({
        bankName: this.editedItem.bankName,
        bankOwner: this.editedItem.bankOwner,
        bankLocation:this.editedItem.bankLocation,
        note:this.editedItem.note,
        lang: this.editedItem.lang
      });
    },
    deletePaymentIntroByLang(item) {
      const index = this.editedItem.bankIntros.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.bankIntros.splice(index, 1);
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
