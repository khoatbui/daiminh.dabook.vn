<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>AREA CRUD</v-toolbar-title>
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
                    :rules="[() => editedItem.areaId.length > 0 || 'Required field']"
                     v-model="editedItem.areaId" label="AreaId"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.areaName" label="AreaName"></v-text-field>
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
    <v-data-table :headers="headers" :items="area" class="elevation-1">
      <template v-slot:items="props">
        <tr class="ellip-text">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
          <td>{{ props.item.areaId }}</td>
          <td class="text-xs-right">{{ props.item.areaName }}</td>
          <td class="text-xs-right">{{ props.item.lang }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from "axios";
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
  data: () => ({
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "AreaId",
        align: "center",
        sortable: false,
        value: "areaId"
      },
      { text: "AreaName", align: "center", value: "areaName" },
      { text: "Language", align: "center", value: "lang" }
    ],
    area: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editedItem: {
      areaId: "",
      areaName: "",
      lang: "EN"
    },
    defaultItem: {
      areaId: "",
      areaName: "",
      lang: "EN"
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
      AXIOS.get("http://localhost:3000/area/", { crossdomain: true })
        .then(response => {
          console.log(response.data);
          console.log(this.area);
          this.area = response.data;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {});
    },

    editItem(item) {
      this.editedIndex = this.area.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.area.indexOf(item);
      console.log(index);
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete("http://localhost:3000/area/" + index)
          .then(response => {
            this.area.splice(index, 1);
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(function() {});
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
       if (this.$refs.form.validate()) {
      if (this.editedIndex > -1) {
        AXIOS.post("http://localhost:3000/area/update", this.editedItem)
          .then(response => {
            console.log(this.editedItem);
            Object.assign(this.area[this.editedIndex], this.editedItem);
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(function() {});
      } else {
        AXIOS.post("http://localhost:3000/area/insert", this.editedItem)
          .then(response => {
            console.log(this.editedItem);
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(function() {});
        this.area.push(this.editedItem);
      }
      this.close();
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
</style>
