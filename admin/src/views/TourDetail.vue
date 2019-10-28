<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>TOUR DETAIL CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" @click="initialize()">Reload</v-btn>
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-form ref="form" v-model="valid">
          <v-card>
            <v-toolbar dark color="primary">
          <v-btn color="blue darken-1" :disabled="!valid" fab small dark  @click="dialog = false">X</v-btn>
              <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" :disabled="!valid" dark @click="save">Save</v-btn>
            </v-toolbar>
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
                    <CustomEditForm
                      :idComponent="'prodgram'"
                      :dataParent="editedItem.program"
                      v-on:childtoparent="editedItem.program=$event"
                    ></CustomEditForm>
                  </v-flex>
                </v-layout>
                <v-layout wrap class="sub-add-component my-4">
                  <v-flex xs12 sm12 md2 class="sub-add-component">
                    <v-select
                      v-model="editedItem.timeLine.icon"
                      :items="icons"
                      item-text="iconCode"
                      item-value="iconCode"
                      label="Icon"
                      class="icon__group"
                    >
                      <template slot="selection" slot-scope="{ item }">
                        <div v-html="item.iconCode"></div>
                      </template>
                      <template slot="item" slot-scope="{ item }">
                        <div v-html="item.iconCode"></div>
                      </template>
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md2 class="sub-add-component">
                    <v-text-field v-model="editedItem.timeLine.time" label="Timeline Time"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md5 class="sub-add-component">
                    <v-text-field v-model="editedItem.timeLine.title" label="Timeline Title"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md1 class="sub-add-component">
                    <v-text-field v-model="editedItem.timeLine.order" label="Order"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addProgramTimeLine">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>Program TimeLine</b>
                    </h5>
                    <CustomEditForm
                      :idComponent="'programV2'"
                      :dataParent="editedItem.timeLine.program"
                      v-on:childtoparent="editedItem.timeLine.program=$event"
                    ></CustomEditForm>
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
                          <v-icon class="px-2" small @click="editProgramTimeLine(props.item)">edit</v-icon>
                          <v-icon small @click="deleteProgramTimeLine(props.index)">delete</v-icon>
                        </td>
                        <td>{{props.item.order}}</td>
                        <td>{{props.item.time}}</td>
                        <td>{{props.item.title}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap class="sub-add-component my-4">
                  <v-flex xs12 sm12 md6 class="sub-add-component">
                    <v-text-field
                      v-model="editedItem.content.contentName"
                      label="Addition Information Name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md2 class="sub-add-component">
                    <v-text-field v-model="editedItem.content.order" label="Order"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md2 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addAdditionContent">Add</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card sub-add-component">
                    <h5>
                      <b>Addition Information</b>
                    </h5>
                    <CustomEditForm
                      :idComponent="'content'"
                      :dataParent="editedItem.content.contentDetail"
                      v-on:childtoparent="editedItem.content.contentDetail=$event"
                    ></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="contentHeader"
                      :items="editedItem.additionContents"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon class="px-2" small @click="editAdditionContent(props.item)">edit</v-icon>
                          <v-icon small @click="deleteAdditionContent(props.index)">delete</v-icon>
                        </td>
                        <td>{{props.item.order}}</td>
                        <td>{{props.item.contentName}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Transport</b>
                    </h5>
                    <CustomEditForm
                      :idComponent="'transport'"
                      :dataParent="editedItem.transport"
                      v-on:childtoparent="editedItem.transport=$event"
                    ></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Service Include</b>
                    </h5>
                    <CustomEditForm
                      :idComponent="'serviceinclude'"
                      :dataParent="editedItem.serviceInclude"
                      v-on:childtoparent="editedItem.serviceInclude=$event"
                    ></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Service Not Include</b>
                    </h5>
                    <CustomEditForm
                      :idComponent="'servicenot'"
                      :dataParent="editedItem.shouldTake"
                      v-on:childtoparent="editedItem.shouldTake=$event"
                    ></CustomEditForm>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="group-card">
                    <h5>
                      <b>Should Take</b>
                    </h5>
                    <CustomEditForm
                      :idComponent="'shouldtake'"
                      :dataParent="editedItem.shouldTake"
                      v-on:childtoparent="editedItem.shouldTake=$event"
                    ></CustomEditForm>
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
            <v-icon
              small
              class="mr-2"
              @click.stop="dialog_detail = true;selectedItem=props.item"
            >settings_overscan</v-icon>
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)" :disabled="!deletePermision">delete</v-icon>
          </td>
          <td v-html="replace(props.item.tourId.tourName)"></td>
          <td>
            <p v-html="props.item.lang"></p>
          </td>
          <td>
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
          <span class="headline">Tour detail</span>
        </v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialog_detail = false">Close</v-btn>
         </v-toolbar>
        <v-card-text>
          <div
            v-for="(item,i) in orderProgram"
            :key="i +'tourdetail'"
            class="d-flex justify-start"
          >
            <div class="icon__component">
              <span class="icon__line" v-html="item.icon"></span>
            </div>
            <div class="content__component">
              <div>
                <span class="p-2 mx-2 font-weight-black">{{item.time}}</span>
                <span class="p-2 mx-2 font-weight-black">{{item.title}}</span>
              </div>
              <div class="content__program" v-html="item.program"></div>
            </div>
          </div>
          <div v-for="(item,i) in orderAdditionInfo" :key="i +'additioncontent'">
            <h4>{{item.contentName}}</h4>
            <div class="content__program" v-html="item.contentDetail"></div>
          </div>
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
import _ from "lodash";

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
    DocUpload
  },
  data: () => ({
    _:_,
    dialog_detail: false,
    editedIndex: -1,
    selectedItem: {},
    editedProgramTimeLineIndex: -1,
    editedContentIndex: -1,
    apiIP: apiIP,
    valid: true,
    uploadDocument: [],
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    componentLoaded: false,
    endDateModal: false,
    dialog: false,
    programTimelineHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "Order", value: "order" },
      { text: "Time", value: "time" },
      { text: "Title", value: "title" }
    ],
    contentHeader: [
      { text: "Actions", value: "name", sortable: false },
      { text: "Order", value: "order" },
      { text: "ContentName", value: "contentName" }
    ],
    headers: [
      { text: "Actions", value: "name", sortable: false },
      {
        text: "Tour",
        align: "center",
        sortable: false,
        value: "tourId.tourName"
      },
      { text: "Language", align: "center", value: "lang" },
      { text: "ModifyDate", align: "center", value: "modifyDate" }
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
      timeLine: {
        icon: "",
        time: "",
        title: "",
        program: "",
        order: 0
      },
      content: {
        contentName: "",
        contentDetail: "",
        order: 0
      },
      programV2: [],
      additionContents: [],
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
      timeLine: {
        icon: "",
        time: "",
        title: "",
        program: "",
        order: 0
      },
      content: {
        contentName: "",
        contentDetail: "",
        order: 0
      },
      programV2: [],
      additionContents: [],
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
    icons: [
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--secondary">fiber_manual_record</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--success">fiber_manual_record</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--warning">fiber_manual_record</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--danger">fiber_manual_record</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--primary">fiber_manual_record</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--info">fiber_manual_record</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--light">fiber_manual_record</i>'
      },

      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--success">brightness_auto</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--warning">brightness_auto</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--secondary">brightness_auto</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--danger">brightness_auto</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--primary">brightness_auto</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--info">brightness_auto</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--light">brightness_auto</i>'
      },

      {
        iconName: "Spinner",
        iconCode: '<i class="material-icons custom__icon--success">fastfood</i>'
      },
      {
        iconName: "Spinner",
        iconCode: '<i class="material-icons custom__icon--warning">fastfood</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--secondary">fastfood</i>'
      },
      {
        iconName: "Spinner",
        iconCode: '<i class="material-icons custom__icon--danger">fastfood</i>'
      },
      {
        iconName: "Spinner",
        iconCode: '<i class="material-icons custom__icon--primary">fastfood</i>'
      },
      {
        iconName: "Spinner",
        iconCode: '<i class="material-icons custom__icon--info">fastfood</i>'
      },
      {
        iconName: "Spinner",
        iconCode: '<i class="material-icons custom__icon--light">fastfood</i>'
      },

      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--success">monetization_on</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--warning">monetization_on</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--secondary">monetization_on</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--danger">monetization_on</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--primary">monetization_on</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--info">monetization_on</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--light">monetization_on</i>'
      },

      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--success">turned_in_not</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--warning">turned_in_not</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--secondary">turned_in_not</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--danger">turned_in_not</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--primary">turned_in_not</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--info">turned_in_not</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--light">turned_in_not</i>'
      },

      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--success">favorite_border</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--warning">favorite_border</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--secondary">favorite_border</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--danger">favorite_border</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--primary">favorite_border</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--info">favorite_border</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--light">favorite_border</i>'
      },

      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--success">copyright</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--warning">copyright</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--secondary">copyright</i>'
      },
      {
        iconName: "Spinner",
        iconCode: '<i class="material-icons custom__icon--danger">copyright</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--primary">copyright</i>'
      },
      {
        iconName: "Spinner",
        iconCode: '<i class="material-icons custom__icon--info">copyright</i>'
      },
      {
        iconName: "Spinner",
        iconCode: '<i class="material-icons custom__icon--light">copyright</i>'
      },

      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--success">check_circle</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--warning">check_circle</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--secondary">check_circle</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--danger">check_circle</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--primary">check_circle</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--info">check_circle</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--light">check_circle</i>'
      },

      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--success">verified_user</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--warning">verified_user</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--secondary">verified_user</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--danger">verified_user</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--primary">verified_user</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--info">verified_user</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--light">verified_user</i>'
      },

      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--success">calendar_today</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--warning">calendar_today</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--secondary">calendar_today</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--danger">calendar_today</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--primary">calendar_today</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--info">calendar_today</i>'
      },
      {
        iconName: "Spinner",
        iconCode:
          '<i class="material-icons custom__icon--light">calendar_today</i>'
      }
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
    tourListByLang() {
      if (this.componentLoaded === false) {
        return;
      }
      this.tourlist.forEach(element => {
        element.tourIntros.forEach(area => {
          if (area.lang.toUpperCase() === "EN") {
            element.tourName = area.tourName;
          }
        });
      });
      return this.tourlist;
    },
    orderProgram(){
      return _.orderBy(this.selectedItem.programV2,Number,'order');
    },
    orderAdditionInfo(){
      return _.orderBy(this.selectedItem.additionContents,Number,'order');
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
      AXIOS.get(apiIP + "/tourlist/getused", { crossdomain: true })
        .then(response => {
          this.tourlist = response.data;
          this.tourlistFilter = response.data;
          this.tourlistFilter.unshift({
            tourCode: "ALL",
            tourName: "ALL",
            tourIntros: [
              {
                tourName: "ALL",
                lang: "EN"
              }
            ],
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
      this.editedIndex = this.tourdetail.indexOf(item);
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
        this.editedContentIndex = -1;
        this.editedProgramTimeLineIndex = -1;
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
      console.log(this.editedProgramTimeLineIndex);
      if (this.editedProgramTimeLineIndex > -1) {
        this.editedItem.programV2[
          this.editedProgramTimeLineIndex
        ].icon = this.editedItem.timeLine.icon;
        this.editedItem.programV2[
          this.editedProgramTimeLineIndex
        ].time = this.editedItem.timeLine.time;
        this.editedItem.programV2[
          this.editedProgramTimeLineIndex
        ].title = this.editedItem.timeLine.title;
        this.editedItem.programV2[
          this.editedProgramTimeLineIndex
        ].program = this.editedItem.timeLine.program;
        this.editedItem.programV2[
          this.editedProgramTimeLineIndex
        ].order = this.editedItem.timeLine.order;
        console.log(this.editedItem.programV2);
      } else {
        this.editedItem.programV2.push({
          icon: this.editedItem.timeLine.icon,
          time: this.editedItem.timeLine.time,
          title: this.editedItem.timeLine.title,
          program: this.editedItem.timeLine.program,
          order: this.editedItem.timeLine.order
        });
      }
      this.editedProgramTimeLineIndex = -1;
    },
    deleteProgramTimeLine(item) {
      const index = this.editedItem.programV2.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.programV2.splice(index, 1);
    },
    editProgramTimeLine(item) {
      console.log(this.editedItem.programV2);
      this.editedProgramTimeLineIndex = this.editedItem.programV2.indexOf(item);
      this.editedItem.timeLine.time = item.time;
      this.editedItem.timeLine.title = item.title;
      this.editedItem.timeLine.program = item.program;
      this.editedItem.timeLine.order = item.order;
    },

    addAdditionContent() {
      if (this.editedContentIndex > -1) {
        this.editedItem.additionContents[
          this.editedContentIndex
        ].contentDetail = this.editedItem.content.contentDetail;
         this.editedItem.additionContents[
          this.editedContentIndex
        ].contentName = this.editedItem.content.contentName;
        this.editedItem.additionContents[
          this.editedContentIndex
        ].order = this.editedItem.content.order;
      } else {
        this.editedItem.additionContents.push({
          contentName: this.editedItem.content.contentName,
          contentDetail: this.editedItem.content.contentDetail,
          order: this.editedItem.content.order
        });
      }
      this.editedContentIndex = -1;
      //   this.close()
      // var isFound = false;
      // this.editedItem.additionContents.forEach(element => {
      //   if (element.contentName == this.editedItem.content.contentName) {
      //     element.contentDetail = this.editedItem.content.contentDetail;
      //     element.order = this.editedItem.content.order;
      //     isFound = true;
      //     return;
      //   }
      // });
      // if (isFound === false) {
      //   this.editedItem.additionContents.push({
      //     contentName: this.editedItem.content.contentName,
      //     contentDetail: this.editedItem.content.contentDetail,
      //     order: this.editedItem.content.order
      //   });
      // }
    },
    deleteAdditionContent(item) {
      const index = this.editedItem.additionContents.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.additionContents.splice(index, 1);
    },
    editAdditionContent(item) {
      this.editedContentIndex = this.editedItem.additionContents.indexOf(item);
      this.editedItem.content.contentName = item.contentName;
      this.editedItem.content.contentDetail = item.contentDetail;
      this.editedItem.content.order = item.order;
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
.custom__icon--success {
  color: #28a745 !important;
}
.custom__icon--primary {
  color: #007bff !important;
}
.custom__icon--secondary {
  color: #6c757d !important;
}
.custom__icon--danger {
  color: #dc3545 !important;
}
.custom__icon--warning {
  color: #ffc107 !important;
}
.custom__icon--info {
  color: #17a2b8 !important;
}
.custom__icon--light {
  color: #fdfdfd !important;
}
/* .icon__group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
} */
/* .v-list.theme--light {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  overflow: scroll;
} */
.icon__component {
  width: 50px;
  max-width: 50px;
}
.icon__line {
  position: relative;
  height: 100%;
  width: 100%;
  display: inline-block;
  z-index: 1;
}
.icon__line i {
  position: absolute;
  top: 0;
  left: 30%;
  z-index: 1;
}
.icon__line::after {
  content: " ";
  border: 1px solid gray;
  height: 100%;
  position: absolute;
  left: 50%;
  bottom: 0px;
  z-index: -0;
}
.icon__line::before {
  content: " ";
  border: 1px solid gray;
  height: 100%;
  position: absolute;
  left: 50%;
  z-index: -0;
}
.content__program img {
  max-width: 100%;
  width: 100% !important;
}
</style>
