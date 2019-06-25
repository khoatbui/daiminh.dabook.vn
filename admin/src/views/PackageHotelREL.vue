<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>HOTEL PACKAGE PRICE CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-dialog v-model="dialog" max-width="1000px">
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
                      v-model="editedItem.supplierId"
                      :items="supplier"
                      item-text="supplierName"
                      item-value="_id"
                      label="Supplier"
                      v-bind:class="{ disabled: disableSelect }"
                      @input="changedSupplierCombobox"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.hotelId"
                      :items="hotel"
                      item-text="hotelName"
                      item-value="_id"
                      label="Hotel"
                      v-bind:class="{ disabled: disableSelect }"
                      @input="changedHotelCombobox"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.roomTypeId"
                      :items="roomtype"
                      item-text="roomTypeName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Room Type"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.packageId"
                      :items="packages"
                      item-text="packageName"
                      item-value="_id"
                      v-bind:class="{ disabled: disableSelect }"
                      label="Package"
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
                  <v-flex xs6 sm3 md2>
                    <v-checkbox v-model="editedItem.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs6 sm3 md2>
                    <v-checkbox v-model="editedItem.isDefault" :label="`IsDefault?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-menu
                      v-model="menu1"
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
                      <v-date-picker v-model="editedItem.startDate" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
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
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field
                      required
                      :rules="rule.priceRule"
                      v-model="editedItem.price"
                      label="Base Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field
                      required
                      v-model="editedItem.markUpPlus"
                      label="Mark up (+) | Example: 50000 | Min 50000"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field
                      required
                      v-model="editedItem.markUpPercent"
                      label="Mark up(%) | Example: 30 | Min : 3%"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field
                      required
                      :rules="rule.less4PriceRule"
                      v-model="editedItem.less4Price"
                      label="Children less 4 year old Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field
                      required
                      :rules="rule.less12PriceRule"
                      v-model="editedItem.less12Price"
                      label="Children less 12 year old Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="sub-add-component">
                    <v-text-field
                      required
                      :rules="rule.more12PriceRule"
                      v-model="editedItem.more12Price"
                      label="More 12 year old Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4 sm2 md1 class="sub-add-component" v-for="(day,index) in days">
                    <v-checkbox :value="day" v-model="editedItem.days" :label="day.shortDay" :disabled="editedItem.isAllDays"></v-checkbox>
                  </v-flex>
                  <v-flex xs4 sm2 md1 class="sub-add-component">
                    <v-switch :value="editedItem.isAllDays"  v-model="editedItem.isAllDays" :label="`ALL DAYS`"></v-switch>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addNewPriceRange">Add</v-btn>
                    <v-btn color="red darken-4" dark @click="deleteAllOldPriceRange">Delete Price</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="priceHeaders"
                      :items="itemsWithTotalPriceEdit"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="deletepriceRangeItem(props.index)">delete</v-icon>
                        </td>
                        <td
                          class="text-xs-right"
                          style="color:green;font-weight:bold"
                        >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.price) }}</td>
                        <td
                          class="text-xs-right"
                        >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.markUpPlus) }}</td>
                        <td class="text-xs-right">{{ props.item.markUpPercent }}</td>
                        <td
                          class="text-xs-right"
                          style="color:red;font-weight:bold"
                        >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.totalPrice) }}</td>
                        <td
                          class="text-xs-right"
                        >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.less4Price) }}</td>
                        <td
                          class="text-xs-right"
                        >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.less12Price) }}</td>
                        <td
                          class="text-xs-right"
                        >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.more12Price) }}</td>
                        <td class="text-xs-right">{{props.item.startDate.substring(0, 10)}}</td>
                        <td class="text-xs-right">{{props.item.endDate.substring(0, 10)}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field
                      required
                      v-model="editedItem.optionService.optionServiceCode"
                      label="Option Service Code"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field
                      required
                      v-model="editedItem.optionService.optionServiceName"
                      label="Option Service Name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field
                      v-model="editedItem.optionService.optionPrice"
                      label="Service Price"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-text-field v-model="editedItem.optionService.optionNote" label="Note"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-checkbox v-model="editedItem.optionService.isUsed" :label="`IsUsed?`"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="sub-add-component">
                    <v-btn color="blue darken-1" dark @click="addNewOptionPriceRange">Add</v-btn>
                    <v-btn
                      color="red darken-4"
                      dark
                      @click="deleteAllOldOptionPriceRange"
                    >Delete Price</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12 class="border-top">
                    <v-data-table
                      :headers="optionPriceHeaders"
                      :items="editedItem.optionServices"
                      class="elevation-1"
                      width="100%"
                    >
                      <template v-slot:items="props">
                        <td class="justify-center px-0">
                          <v-icon small @click="deleteOptionServiceItem(props.index)">delete</v-icon>
                        </td>
                        <td class="text-xs-right">{{props.item.optionServiceCode}}</td>
                        <td class="text-xs-right">{{props.item.optionServiceName}}</td>
                        <td
                          class="text-xs-right"
                          style="color:green;font-weight:bold"
                        >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.optionPrice) }}</td>
                        <td class="text-xs-right">{{ props.item.isUsed }}</td>
                        <td class="text-xs-right">{{ props.item.optionNote }}</td>
                      </template>
                    </v-data-table>
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
      <v-dialog v-model="dialogPrice" max-width="1200">
        <v-card>
          <v-card-title
            class="headline pink white--text"
          >[{{selectedItemLoadDetail.hotelId.hotelCode }}] {{selectedItemLoadDetail.hotelId.hotelName}} ==> {{selectedItemLoadDetail.roomTypeId.roomTypeName}}</v-card-title>

          <v-card-text>
            <v-layout wrap>
              <v-flex sm4 xs12 class="text-sm-left text-xs-center">
                <v-btn dark fab small color="blue dark-1" @click="$refs.calendar.prev()">
                  <i class="fas fa-chevron-left"></i>
                </v-btn>
              </v-flex>
              <v-flex sm4 xs12>
                <v-menu
                  ref="startMenu"
                  v-model="startMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="start"
                  transition="scale-transition"
                  min-width="290px"
                  lazy
                  offset-y
                  full-width
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="start"
                      label="Start Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="start" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="startMenu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.startMenu.save(start)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex sm4 xs12 class="text-sm-right text-xs-center">
                <v-btn dark fab small color="blue dark-1" @click="$refs.calendar.next()">
                  <i class="fas fa-chevron-right"></i>
                </v-btn>
              </v-flex>
              <v-flex xs12 class="mb-3">
                <v-sheet height="400">
                  <v-calendar
                    ref="calendar"
                    v-model="start"
                    :type="type"
                    :end="end"
                    :start="start"
                    color="primary"
                  >
                    <template v-slot:day="{ date }">
                      <template v-for="event in eventsMap[date]">
                        <v-menu :key="event.title" v-model="event.open" full-width offset-x>
                          <template v-slot:activator="{ on }">
                            <div
                              v-if="!event.time"
                              v-ripple
                              class="my-event"
                              v-bind:class="{'my-event-odd':event.color,'my-event-even':!event.color }"
                              v-on="on"
                              v-html="new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.title)"
                            ></div>
                          </template>
                          <v-card color="grey lighten-4" width="350px" flat>
                            <v-toolbar color="primary" dark>
                              <v-btn icon>
                                <v-icon>edit</v-icon>
                              </v-btn>
                              <v-toolbar-title
                                v-html="new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.details.price)"
                              ></v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>favorite</v-icon>
                              </v-btn>
                              <v-btn icon>
                                <v-icon>more_vert</v-icon>
                              </v-btn>
                            </v-toolbar>
                            <v-card-title primary-title>
                              <v-list style="width:100%">
                                <v-list-tile-content>
                                  <v-list-tile-title class="flex-table">
                                    <b class="mr-4">PRICE</b>
                                    <span
                                      v-html="new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.details.price)"
                                    ></span>
                                  </v-list-tile-title>
                                  <v-list-tile-title class="flex-table">
                                    <b class="mr-4">MARKUP-PLUS(+)</b>
                                    <span
                                      v-html="new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.details.markUpPlus)"
                                    ></span>
                                  </v-list-tile-title>
                                  <v-list-tile-title class="flex-table">
                                    <b class="mr-4">MARKUP_PERCENT(%)</b>
                                    <span v-html="event.details.markUpPercent"></span>
                                  </v-list-tile-title>
                                  <v-list-tile-title class="flex-table">
                                    <b class="mr-4">CHILDREN(0~4)</b>
                                    <span
                                      v-html="new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.details.less4Price)"
                                    ></span>
                                  </v-list-tile-title>
                                  <v-list-tile-title class="flex-table">
                                    <b class="mr-4">CHILDREN(4~12)</b>
                                    <span
                                      v-html="new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.details.less12Price)"
                                    ></span>
                                  </v-list-tile-title>
                                  <v-list-tile-title class="flex-table">
                                    <b class="mr-4">GUEST(>12)</b>
                                    <span
                                      v-html="new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.details.more12Price)"
                                    ></span>
                                  </v-list-tile-title>
                                </v-list-tile-content>
                              </v-list>
                            </v-card-title>
                            <v-card-actions>
                              <v-btn flat color="secondary">Cancel</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-menu>
                      </template>
                    </template>
                  </v-calendar>
                </v-sheet>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-actions class="mt-4">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat="flat" @click="dialogPrice = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-container fluid grid-list-xl pl-0 pr-0>
      <v-card>
        <v-layout pl-2 pr-2>
          <v-flex xs12 sm6 md3 p-2>
            <v-select
              v-model="filterByCombo.supplierId"
              :items="supplierFilter"
              item-text="supplierName"
              item-value="_id"
              label="Supplier"
              @input="changedSupplierCombobox"
              return-object
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md3 p-2>
            <v-select
              v-model="filterByCombo.hotelId"
              :items="hotelFilter"
              item-text="hotelName"
              item-value="_id"
              label="Hotel"
              @input="changedHotelCombobox"
              return-object
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md3 p-2>
            <v-select
              v-model="filterByCombo.roomTypeId"
              :items="roomtypeFilter"
              item-text="roomTypeName"
              item-value="_id"
              label="Room Type"
              return-object
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md3 p-2>
            <v-select
              v-model="filterByCombo.packageId"
              :items="packagesFilter"
              item-text="packageName"
              item-value="_id"
              label="Package"
              return-object
            ></v-select>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>

    <v-data-table
      :headers="headers"
      :items="itemsWithTotalPrice"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr class="whitespace-nowrap">
          <td class="justify-center px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
          <td style="width:100px">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.supplierId.supplierName }}</span>
              </template>
              <span>{{ props.item.supplierId.supplierName }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.hotelId.hotelCode }}</span>
              </template>
              <span>{{ props.item.hotelId.hotelCode }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.hotelId.hotelName }}</span>
              </template>
              <span>{{ props.item.hotelId.hotelName }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.roomTypeId.roomTypeName }}</span>
              </template>
              <span>{{ props.item.roomTypeId.roomTypeName }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.packageId.packageName }}</span>
              </template>
              <span>{{ props.item.packageId.packageName }}</span>
            </v-tooltip>
          </td>
          <td style="color:green;font-weight:bold">
            <v-btn
              color="teal accent-4"
              dark
              small
              @click.stop="loadCalendarPrice(props.item);dialogPrice = true"
            >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.price)}}</v-btn>
          </td>
          <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.markUpPlus)}}</td>
          <td>{{ props.item.markUpPercent }}</td>
          <td
            style="color:red;font-weight:bold"
          >{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.totalPrice) }}</td>
          <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.less4Price)}}</td>
          <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.less12Price)}}</td>
          <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.more12Price)}}</td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.startDate.substring(0, 10) }}</span>
              </template>
              <span>{{ props.item.startDate.substring(0, 10) }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.endDate.substring(0, 10)}}</span>
              </template>
              <span>{{ props.item.endDate.substring(0, 10) }}</span>
            </v-tooltip>
          </td>
          <td>{{ props.item.lang }}</td>
          <td>{{ props.item.isUsed }}</td>
          <td>{{props.item.createBy}}</td>
          <td>{{props.item.createDate.substring(0, 10)}}</td>
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
    <v-snackbar v-model="snackbar.snackbar">
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-btn absolute dark fab bottom right small color="pink">
      <download-excel :data="packagesHotelREL" name="markup.xls">
        <i class="far fa-file-excel"></i>
      </download-excel>
    </v-btn>
  </div>
</template>
<script>
var apiIP = process.env.VUE_APP_API_IPADDRESS;
import axios from "axios";
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
  data: () => ({
    type: "month",
    start: "2019-01-01",
    end: "2019-01-06",
    typeOptions: [
      { text: "Day", value: "day" },
      { text: "4 Day", value: "4day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" },
      { text: "Custom Daily", value: "custom-daily" },
      { text: "Custom Weekly", value: "custom-weekly" }
    ],
    filterByCombo: {
      supplierId: {
        supplierCode: "ALL"
      },
      hotelId: {
        hotelCode: "ALL"
      },
      roomTypeId: {
        roomTypeCode: "ALL"
      },
      packageId: {
        packageCode: "ALL"
      }
    },
    startMenu: false,
    events: [],
    selectedItemLoadDetail: {
      hotelId: {
        hotelCode: "",
        hotelName: ""
      },
      roomTypeId: {
        roomTypeCode: "",
        roomTypeName: ""
      }
    },
    days: [
      { selected: false, dayCode: 1, shortDay: "Hai", day: "Mondays" },
      { selected: false, dayCode: 2, shortDay: "Ba", day: "Tuesdays" },
      { selected: false, dayCode: 3, shortDay: "Bon", day: "Wednesdays" },
      { selected: false, dayCode: 4, shortDay: "Nam", day: "Thursdays" },
      { selected: false, dayCode: 5, shortDay: "Sau", day: "Fridays" },
      { selected: false, dayCode: 6, shortDay: "Bay", day: "Saturdays" },
      { selected: false, dayCode: 7, shortDay: "CN", day: "Sundays" }
    ],
    search: "",
    valid: true,
    date: new Date().toISOString().substr(0, 10),
    startDateModal: false,
    endDateModal: false,
    dialog: false,
    dialogPrice: false,
    headers: [
      { text: "Actions", sortable: false },
      { text: "Supplier", value: "supplierId.supplierName" },
      { text: "HotelCode", value: "hotelId.hotelCode" },
      { text: "Hotel", value: "hotelId.hotelName" },
      { text: "Room Type", value: "roomTypeId.roomTypeName" },
      { text: "Package", value: "packageId.packageName" },
      { text: "Price", value: "price" },
      { text: "MarkUp(+)", value: "markUpPlus" },
      { text: "MarkUp(%)", value: "markUpPercent" },
      { text: "TotalPrice", value: "totalPrice" },
      { text: "Less 4", value: "less4Price" },
      { text: "Less 12", value: "less12Price" },
      { text: "More 12", value: "more12Price" },
      { text: "StartDate", value: "startDate" },
      { text: "EndDate", value: "endDate" },
      { text: "Language", value: "lang" },
      { text: "Used", value: "isUsed" },
      { text: "CreateBy", value: "createBy" },
      { text: "CreateDate", value: "createDate" }
    ],
    priceHeaders: [
      { text: "Actions", sortable: false },
      { text: "Price", value: "price" },
      { text: "MarkUp(+)", value: "markUpPlus" },
      { text: "MarkUp(%)", value: "markUpPercent" },
      { text: "Total Price", value: "totalPrice" },
      { text: "Less 4", value: "less4Price" },
      { text: "Less 12", value: "less12Price" },
      { text: "More 12", value: "more12Price" },
      { text: "StartDate", value: "startDate" },
      { text: "EndDate", value: "endDate" }
    ],
    optionPriceHeaders: [
      { text: "Actions", sortable: false },
      { text: "OptionServiceCode", value: "optionServiceCode" },
      { text: "OptionServiceName", value: "optionServiceName" },
      { text: "Price", value: "optionPrice" },
      { text: "IsUsed", value: "isUsed" },
      { text: "Note", value: "optionNote" }
    ],
    priceRange: [],
    roomtype: [],
    supplier: [],
    hotel: [],
    packages: [],
    roomtypeFilter: [],
    supplierFilter: [],
    hotelFilter: [],
    packagesFilter: [],
    packagesHotelREL: [],
    rule: {
      markUpPlusRule: [
        // v => (v.toString().length > 0) || "Required field",
        // v => /^\d+$/.test(v) || "Only accept number",
        // v => parseInt(v) >= 50000 ||( "Minimum = 50.000 VND")
      ],
      markUpPercentRule: [
        // v => v.toString().length > 0 || "Required field",
        // v => /^$|^\d+$/.test(v) || "Only accept number",
        // v => parseInt(v) >= 3 || "Minimum = 3%"
      ],
      priceRule: [
        v => v.toString().length > 0 || "Required field",
        v => /^\d+$/.test(v) || "Only accept number",
        v => parseInt(v) >= 1 || "Minimum = 1"
      ]
    },
    language: [
      { langCode: "EN", langName: "English" },
      { langCode: "KO", langName: "Korea" },
      { langCode: "VI", langName: "VietNam" }
    ],
    editedIndex: -1,
    editId: "",
    disableSelect: false,
    menu1: false,
    menu2: false,
    editedItem: {
      supplierId: "",
      hotelId: "",
      roomTypeId: "",
      packageId: "",
      price: 10000000,
      markUpPercent: 10,
      isAllDays:true,
      days: [],
      markUpPlus: 50000,
      less4Price: 10000000,
      less12Price: 10000000,
      more12Price: 10000000,
      priceRanges: [],
      optionService: {
        optionPrice: 50000,
        optionServiceCode: "",
        optionServiceName: "",
        optionNote: "",
        isUsed: true
      },
      optionServices: [],
      lang: "EN",
      isUsed: true,
      isDefault: false,
      createBy: "",
      modifyBy: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD")
    },
    defaultItem: {
      supplierId: "",
      hotelId: "",
      roomTypeId: "",
      packageId: "",
      isAllDays:true,
      days: [],
      price: 10000000,
      markUpPercent: 10,
      markUpPlus: 50000,
      less4Price: 10000000,
      less12Price: 10000000,
      more12Price: 10000000,
      priceRanges: [],
      optionService: {
        optionPrice: 50000,
        optionServiceCode: "",
        optionServiceName: "",
        optionNote: "",
        isUsed: true
      },
      optionServices: [],
      lang: "EN",
      isUsed: true,
      isDefault: false,
      createBy: "",
      modifyBy: "",
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD")
    },
    snackbar: {
      snackbar: false,
      text: ""
    }
  }),

  computed: {
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    itemsWithTotalPrice() {
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it

      return this.packagesHotelREL
        .map(obj =>
          Object.assign({}, obj, {
            totalPrice:
              obj.markUpPercent == 0
                ? obj.price + obj.markUpPlus
                : obj.markUpPlus !== 0
                ? obj.price * ((obj.markUpPercent + 100) / 100) + obj.markUpPlus
                : obj.price * ((obj.markUpPercent + 100) / 100)
          })
        )
        .filter(i => {
          return (
            (this.filterByCombo.supplierId.supplierCode === "ALL" ||
              i.supplierId._id === this.filterByCombo.supplierId._id) &&
            (this.filterByCombo.hotelId.hotelCode === "ALL" ||
              i.hotelId._id === this.filterByCombo.hotelId._id) &&
            (this.filterByCombo.roomTypeId.roomTypeCode === "ALL" ||
              i.roomTypeId._id === this.filterByCombo.roomTypeId._id) &&
            (this.filterByCombo.packageId.packageCode === "ALL" ||
              i.packageId._id === this.filterByCombo.packageId._id)
          );
        });
    },
    itemsWithTotalPriceEdit() {
      // This creates a new empty object, copies the item into it,
      // then calculates `fullAddress` and copies that entry into it
      return this.editedItem.priceRanges.map(obj =>
        Object.assign({}, obj, {
          totalPrice:
            obj.markUpPercent == 0
              ? obj.price + obj.markUpPlus
              : obj.markUpPlus !== 0
              ? obj.price * ((obj.markUpPercent + 100) / 100) + obj.markUpPlus
              : obj.price * ((obj.markUpPercent + 100) / 100)
        })
      );
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
    moment: function() {
      return moment();
    },
    initialize() {
      AXIOS.get(apiIP + "/packagehotelrel/", { crossdomain: true })
        .then(response => {
          this.packagesHotelREL = response.data;
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/supplier/", { crossdomain: true })
        .then(response => {
          this.supplier = response.data;
          this.supplierFilter = response.data;
          this.supplierFilter.unshift({
            supplierCode: "ALL",
            supplierName: "ALL",
            supplierId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/hotel/", { crossdomain: true })
        .then(response => {
          this.hotel = response.data;
          this.hotelFilter = response.data;
          this.hotelFilter.unshift({
            hotelCode: "ALL",
            hotelName: "ALL",
            hotelId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/roomtype/", { crossdomain: true })
        .then(response => {
          this.roomtype = response.data;
          this.roomtypeFilter = response.data;
          this.roomtypeFilter.unshift({
            roomTypeCode: "ALL",
            roomTypeName: "ALL",
            roomTypeId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/package/", { crossdomain: true })
        .then(response => {
          this.packages = response.data;
          this.packagesFilter = response.data;
          this.packagesFilter.unshift({
            packageCode: "ALL",
            packageName: "ALL",
            packageId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});
    },

    editItem(item) {
      this.editedIndex = 100;
      console.log(this.editedItem);
      this.editedItem = Object.assign({}, item);
      this.editedItem.supplierId = item.supplierId._id;
      this.editedItem.hotelId = item.hotelId._id;
      this.editedItem.roomTypeId = item.roomTypeId._id;
      this.editedItem.packageId = item.packageId._id;
      this.editedItem.startDate = moment(item.startDate)
        .utc()
        .format("YYYY-MM-DD");
      this.editedItem.endDate = moment(item.endDate)
        .utc()
        .format("YYYY-MM-DD");
      this.editedItem.optionService = {
        optionPrice: 50000,
        optionServiceCode: "",
        optionServiceName: "",
        optionNote: "",
        isUsed: true
      };
      this.editedItem.days=[];
      this.disableSelect = true;
      this.dialog = true;
      delete this.editedItem._id;
      this.editId = item._id;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        AXIOS.delete(apiIP + "/packagehotelrel/" + item._id)
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
      this.editedItem.modifyBy = this.user.userName;
      this.editedItem.createBy = this.user.userName;
      if (
        this.editedItem.markUpPlus.toString().length <= 0 &&
        this.editedItem.markUpPercent.toString().length <= 0
      ) {
        this.editedItem.markUpPercent = process.env.VUE_APP_API_DEFAULT_MARKUP;
        // IMPORTANT
      }
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          AXIOS.post(
            apiIP + "/packagehotelrel/update/" + this.editId,
            this.editedItem
          )
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        } else {
          AXIOS.post(apiIP + "/packagehotelrel/insert", this.editedItem)
            .then(response => {})
            .catch(function(error) {})
            .finally(function() {});
        }
        this.editedItem.priceRange = [];
        this.initialize();
        this.close();
      }
    },

    changedSupplierCombobox(event) {
      console.log(event);
      this.defaultItem.markUpPlus = event.markUpPlus;
      this.defaultItem.markUpPercent = event.markUpPercent;
      this.defaultItem.less4Price = event.less4Price;
      this.defaultItem.less12Price = event.less12Price;
      this.defaultItem.more12Price = event.more12Price;
      this.editedItem.markUpPlus = event.markUpPlus;
      this.editedItem.markUpPercent = event.markUpPercent;
      this.editedItem.less4Price = event.less4Price;
      this.editedItem.less12Price = event.less12Price;
      this.editedItem.more12Price = event.more12Price;
      console.log(this.defaultItem);
      AXIOS.get(apiIP + "/hotel/combobox/hotel/" + event._id, {
        crossdomain: true
      })
        .then(response => {
          this.hotel = response.data;
          this.hotelFilter = response.data;
          this.hotelFilter.unshift({
            hotelCode: "ALL",
            hotelName: "ALL",
            hotelId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});

      AXIOS.get(apiIP + "/package/combobox/package/" + event._id, {
        crossdomain: true
      })
        .then(response => {
          this.packages = response.data;
          this.packagesFilter = response.data;
          this.packagesFilter.unshift({
            packageCode: "ALL",
            packageName: "ALL",
            packageId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});
    },

    changedHotelCombobox(event) {
      AXIOS.get(apiIP + "/roomtype/combobox/roomtype/" + event._id, {
        crossdomain: true
      })
        .then(response => {
          this.roomtype = response.data;
          this.roomtypeFilter = response.data;
          this.roomtypeFilter.unshift({
            roomTypeCode: "ALL",
            roomTypeName: "ALL",
            roomTypeId: -1
          });
        })
        .catch(function(error) {})
        .finally(function() {});
    },
    changedRoomTypeCombobox(event) {
      console.log(this.filterByCombo.roomTypeId);
    },
    addNewPriceRange() {
     if (this.editedItem.isAllDays==true) {
       this.editedItem.days=[];
     }
      this.editedItem.priceRanges.push({
        price: this.editedItem.price,
        markUpPercent: this.editedItem.markUpPercent,
        markUpPlus: this.editedItem.markUpPlus,
        less4Price: this.editedItem.less4Price,
        less12Price: this.editedItem.less12Price,
        more12Price: this.editedItem.more12Price,
        isUsed: this.editedItem.isUsed,
        startDate: this.editedItem.startDate,
        endDate: this.editedItem.endDate,
        days: this.editedItem.days.slice(),
        isAllDays:this.editedItem.isAllDays
      });
      console.log(this.editedItem.priceRanges);
    },
    addNewOptionPriceRange() {
      this.editedItem.optionServices.push({
        optionPrice: this.editedItem.optionService.optionPrice,
        optionServiceCode: this.editedItem.optionService.optionServiceCode,
        optionServiceName: this.editedItem.optionService.optionServiceName,
        optionNote: this.editedItem.optionService.optionNote,
        isUsed: this.editedItem.optionService.isUsed
      });
    },

    deletepriceRangeItem(item) {
      this.editedItem.priceRanges.splice(item, 1);
    },
    deleteOptionServiceItem(item) {
      this.editedItem.optionServices.splice(item, 1);
    },
    deleteAllOldOptionPriceRange() {
      var r = confirm("Are you sure you want to delete all option service?");
      if (r == true) {
        this.editedItem.optionServices = [];
      }
    },
    deleteAllOldPriceRange() {
      var r = confirm("Are you sure you want to delete all option service?");
      if (r == true) {
        this.editedItem.priceRanges = [];
      }
    },
    loadCalendarPrice(item) {
      this.selectedItemLoadDetail = item;
      console.log(this.selectedItemLoadDetail);
      this.events = [];
      var color = "";
      item.priceRanges.forEach((element, index) => {
        if (index % 2 == 0) {
          color = true;
        } else {
          color = false;
        }
        var startDate = moment(element.startDate);
        var endDate = moment(element.endDate);
        for (let index = 0; index <= endDate.diff(startDate, "days"); index++) {
          this.events.push({
            title: element.price,
            details: element,
            date: moment(startDate)
              .add(index, "days")
              .format("YYYY-MM-DD"),
            open: false,
            color: color
          });
        }
      });
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
.whitespace-nowrap td {
  white-space: nowrap;
}
.border-top {
  border-top: 1ps solid #1976d2 !important;
}
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;

  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
.my-event-odd {
  background-color: #0d47a1;
  color: #ffffff;
  border: 1px solid #0d47a1;
}
.my-event-even {
  background-color: #e53935;
  color: #ffffff;
  border: 1px solid #e53935;
}
.padding-price {
  border: 1px solid gray;
}
.sub-add-component {
  background-color: rgb(205, 224, 243) !important;
}
.flex-table {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid gray;
  padding: 10px;
}
</style>
