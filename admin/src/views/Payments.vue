<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="900px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
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
                    item-value="destinationId"
                    label="Destination"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    v-model="editedItem.travelStyleId"
                    :items="travelStyle"
                    item-text="travelStyleName"
                    item-value="travelStyleId"
                    label="TravelStyle"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    v-model="editedItem.cityId"
                    :items="city"
                    item-text="cityName"
                    item-value="cityId"
                    label="City"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <v-subheader>DATA</v-subheader>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tourId" label="TourId"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tourName" label="TourName"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tourOverview" label="Tour Overview"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.from" label="From"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.to" label="To"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.startDate" label="StartDate"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.endDate" label="EndDate"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.img" label="Image URL"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.unitType" label="Unit"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.link" label="LinkPage"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tags" label="Tags"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.voteStatus" label="Vote Status"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.voteScore" label="Vote Score"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.day" label="Day"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.discount" label="Discount"></v-text-field>
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
            <v-btn color="blue darken-1" dark @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="tourlist" class="elevation-1">
      <template v-slot:items="props">
        <tr class="ellip-text">
          <td>{{ props.item.destinationId }}</td>
          <td class="text-xs-right">{{ props.item.travelStyleId }}</td>
          <td class="text-xs-right">{{ props.item.cityId }}</td>
          <td class="text-xs-right">{{ props.item.tourId }}</td>
          <td class="text-xs-right">{{ props.item.tourName }}</td>
          <td class="text-xs-right">{{ props.item.tourOveview }}</td>
          <td class="text-xs-right">{{ props.item.from }}</td>
          <td class="text-xs-right">{{ props.item.to }}</td>
          <td class="text-xs-right">{{ props.item.startDay }}</td>
          <td class="text-xs-right">{{ props.item.endDay }}</td>
          <td class="text-xs-right">{{ props.item.img }}</td>
          <td class="text-xs-right">{{ props.item.price }}</td>
          <td class="text-xs-right">{{ props.item.unitType }}</td>
          <td class="text-xs-right">{{ props.item.link }}</td>
          <td class="text-xs-right">{{ props.item.tags }}</td>
          <td class="text-xs-right">{{ props.item.voteStatus }}</td>
          <td class="text-xs-right">{{ props.item.voteScore }}</td>
          <td class="text-xs-right">{{ props.item.day }}</td>
          <td class="text-xs-right">{{ props.item.discount }}</td>
          <td class="text-xs-right">{{ props.item.lang }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS
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
    dialog: false,
    headers: [
      {
        text: "Destination",
        align: "left",
        sortable: false,
        value: "destinationId"
      },
      { text: "TravelStyle", value: "travelStyleId" },
      { text: "City", value: "cityId" },
      { text: "Tour", value: "tourId" },
      { text: "Tour Name", value: "tourName" },
      { text: "Tour Oveview", value: "tourOveview" },
      { text: "From", value: "from" },
      { text: "To", value: "to" },
      { text: "StartDay", value: "startDay" },
      { text: "EndDay", value: "endDay" },
      { text: "Image URL", value: "img" },
      { text: "Price", value: "price" },
      { text: "Unit", value: "unitType" },
      { text: "Link", value: "link" },
      { text: "Tags", value: "tags" },
      { text: "Vote Status", value: "voteStatus" },
      { text: "Vote Score", value: "voteScore" },
      { text: "Day", value: "day" },
      { text: "Discount", value: "discount" },
      { text: "Language", value: "lang" },
      { text: "Actions", value: "name", sortable: false }
    ],
    tourlist: [],
    destination: [],
    travelStyle: [],
    city: [],
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editedItem: {
      destinationId:"",
      travelStyleId:"",
      cityId:"",
      tourId: "",
      tourName: "",
      tourOveview: "",
      from: "",
      to: "",
      startDay: "",
      endDay: "",
      img: "",
      price: "",
      unitType: "",
      link: "",
      tags: "",
      voteStatus: "",
      voteScore: "",
      day: "",
      discount: "",
      lang:""
    },
    defaultItem: {
      destinationId:"",
      travelStyleId:"",
      cityId:"",
      tourId: "",
      tourName: "",
      tourOveview: "",
      from: "",
      to: "",
      startDay: "",
      endDay: "",
      img: "",
      price: "",
      unitType: "",
      link: "",
      tags: "",
      voteStatus: "",
      voteScore: "",
      day: "",
      discount: "",
      lang:""
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
      AXIOS.get("http://localhost:3000/tourlist/", { crossdomain: true })
        .then(response => {
          this.tourlist = response.data;
        })
        .catch(function(error) {
        })
        .finally(function() {});

      AXIOS.get("http://localhost:3000/destination/", { crossdomain: true })
        .then(response => {
          this.destination = response.data;
        })
        .catch(function(error) {
        })
        .finally(function() {});

      AXIOS.get("http://localhost:3000/travelstyle/", { crossdomain: true })
        .then(response => {
          this.travelStyle = response.data;
        })
        .catch(function(error) {
        })
        .finally(function() {});

      AXIOS.get("http://localhost:3000/city/", { crossdomain: true })
        .then(response => {
          this.city = response.data;
        })
        .catch(function(error) {
        })
        .finally(function() {});
    },

    editItem(item) {
      this.editedIndex = 100;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.tourlist.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tourlist.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tourlist[this.editedIndex], this.editedItem);
      } else {

        AXIOS.post("http://localhost:3000/tourlist/insert", this.editedItem)
        .then(response => {
        })
        .catch(function(error) {
        })
        .finally(function() {});
        this.tourlist.push(this.editedItem);
      }
      this.close();
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
