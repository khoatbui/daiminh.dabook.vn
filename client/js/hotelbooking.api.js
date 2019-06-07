const apiUrl = 'http://103.237.144.222:3000';

// Now the app has started!
const AXIOS = axios.create({
  baseURL: `http://localhost:8082/Fleet-App/api/`,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token,
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json, text/plain, */*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': true
  }
})


var urlParams = new URLSearchParams(window.location.search);
var app = new Vue({
  el: '#app',
  data: {
    bookingstep: {
      find: true,
      confirm: false,
      finish: false
    }, //FIND => CONFIRM => FINISH
    formCheck: {
      name: "",
      email: "",
      phone: "",
      isFail: true
    },
    bookingrequest: {
      supplier: "FLC",
      roomId: "",
      hotelId: "",
      hotelName: "Hotel name / Location...",
      price: "1000000",
      amountPeople: "",
      roomQty: 1,
      checkin: "",
      checkout: "",
      golfer: 1,
      ungolfer: 0,
      personQty: 1,
      roomTypeId: "",
      roomTypeName: "RoomType...",
      packageId: "",
      packageName: "Service package ...",
      optionServiceId: "",
      optionServiceName: "(Option) Another Service...",
      name: "",
      email: "",
      phone: "",
      other: ""
    },
    flcHotels: [],
    vinHotels: [],
    vinPackage: [],
    flcPackage: [],
    vinroomTypes: [],
    flcroomTypes: [],
    vinOptionService: [],
    flcOptionService: [],
    roomTypes: [{ 'id': 1, 'value': 'Hotel' },
    { 'id': 2, 'value': 'Villa' }],
    serviceTypes: [{ 'id': 1, 'value': 'include 18 holds' },
    { 'id': 2, 'value': 'include 6 holds' },
    { 'id': 3, 'value': 'dinner' },
    { 'id': 4, 'value': 'Car' }]
  },
  created() {
    this.initialize();
    this.binCombobox();
  },
  methods: {
    initialize() {
      if (urlParams.has('destination')) {
        AXIOS.get('http://localhost:3000/tourlist/destination-search/' + urlParams.get('destination'), { crossdomain: true })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });
      }
      else if (urlParams.has('travelstyle')) {
        AXIOS.get('http://localhost:3000/tourlist/travelstyle-search/' + urlParams.get('travelstyle'), { crossdomain: true })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });

      }
      else if (urlParams.has('city')) {
        AXIOS.get('http://localhost:3000/tourlist/city-search/' + urlParams.get('city'), { crossdomain: true })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });

      }
      else if (urlParams.has('searchbox')) {
        AXIOS.get('http://localhost:3000/tourlist/searchbox-search/' + urlParams.get('searchbox'), { crossdomain: true })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });

      }
      else {
        AXIOS.get('http://localhost:3000/tourlist/', { crossdomain: true })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });
      }
    },
    binCombobox() {
      AXIOS.get(apiUrl + '/hotel/combobox/hotel/VIN', { crossdomain: true })
        .then((response) => {
          this.vinHotels = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      AXIOS.get(apiUrl + '/hotel/combobox/hotel/FLC', { crossdomain: true })
        .then((response) => {
          this.flcHotels = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      AXIOS.get(apiUrl + '/hotel/combobox/package/VIN', { crossdomain: true })
        .then((response) => {
          this.vinPackage = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      AXIOS.get(apiUrl + '/hotel/combobox/package/FLC', { crossdomain: true })
        .then((response) => {
          this.flcPackage = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      AXIOS.get(apiUrl + '/hotel/combobox/roomtype/VIN', { crossdomain: true })
        .then((response) => {
          this.vinroomTypes = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      AXIOS.get(apiUrl + '/hotel/combobox/roomtype/FLC', { crossdomain: true })
        .then((response) => {
          this.flcroomTypes = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      AXIOS.get(apiUrl + '/hotel/combobox/addition-service/FLC', { crossdomain: true })
        .then((response) => {
          this.flcOptionService = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      AXIOS.get(apiUrl + '/hotel/combobox/addition-service/VIN', { crossdomain: true })
        .then((response) => {
          this.vinOptionService = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
    },
    getRoomTypeByHotel() {
      AXIOS.get(apiUrl + '/hotel/combobox/roomtype/FLC', { crossdomain: true })
        .then((response) => {
          this.flcroomTypes = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
    },
    getVinRoomTypeByHotel() {
      AXIOS.get(apiUrl + `/roomtype/combobox/roomtype-by-hotel/${this.bookingrequest.hotelId}`, { crossdomain: true })
        .then((response) => {
          console.log(response.data);
          this.vinroomTypes = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
    },
    getVinPackageByHotel() {
      AXIOS.get(apiUrl + `/packagehotelrel/combobox/package-by-hotel-roomtype/hotel/${this.bookingrequest.hotelId}/roomType/${this.bookingrequest.roomTypeId}`, { crossdomain: true })
        .then((response) => {
          this.vinPackage = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
    },
    searchHotel() {
      this.bookingstep.find = true;
      this.bookingstep.confirm = true;
      console.log(this.bookingrequest.supplier);
      if (this.bookingrequest.supplier == 'FLC') {
        this.bookingrequest.checkin = document.getElementById('flccheckin').value;
        this.bookingrequest.checkout = document.getElementById('flccheckout').value;
      }
      else {
        this.bookingrequest.checkin = document.getElementById('vincheckin').value;
        this.bookingrequest.checkout = document.getElementById('vincheckout').value;
      }
      AXIOS.post(apiUrl + "/packagehotelrel/price", this.bookingrequest)
        .then(response => {
          this.bookingrequest.price = response.data[0].price;
        })
        .catch(function (error) {
        })
        .finally(function () { });
    },
    reserveHotel() {
      if (this.bookingrequest.name.length === 0) {
        this.formCheck = {
          name: "text-rose",
          email: "",
          phone: "",
          isFail: false
        }
      }
      else if (this.bookingrequest.email.length === 0) {
        this.formCheck = {
          name: "",
          email: "text-rose",
          phone: "",
          isFail: false
        }
      }
      else if (this.bookingrequest.phone.length === 0) {
        this.formCheck = {
          name: "",
          email: "",
          phone: "text-rose",
          isFail: false
        }
      }
      else {
        this.formCheck = {
          name: "",
          email: "",
          phone: "",
          isFail: true
        }
        this.bookingstep.find = true;
        this.bookingstep.confirm = true;
        this.bookingstep.finish = true;
        AXIOS.post(apiUrl + '/mail/hotel-booking', this.bookingrequest)
          .then(response => {
            console.log(this.bookingrequest);
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () { });


      }
    },
    back() {
      this.bookingstep.find = true;
      this.bookingstep.confirm = false;
      this.bookingstep.finish = false;
    },
    showBank(bank) {

    },
    showPoposer() {

    },
    plusPerson() {
      this.bookingrequest.golfer++;
    },
    minusPerson() {
      this.bookingrequest.golfer--;
    },
    plusUnGolferPerson() {
      this.bookingrequest.ungolfer++;
    },
    minusUnGolferPerson() {
      this.bookingrequest.ungolfer--;
    },
    plusRoom() {
      this.bookingrequest.roomQty++;
    },
    minusRoom() {
      this.bookingrequest.roomQty--;
    },
    clearSearch(param) {
      this.bookingrequest.packageId = "";
      this.bookingrequest.packageName = "ServiceType...";
      this.bookingrequest.roomTypeId = "";
      this.bookingrequest.roomTypeName = "RoomType...";
      this.bookingrequest.hotelId = "";
      this.bookingrequest.hotelName = "Hotel...";
      this.bookingrequest.supplier = param;
    }
  },
  computed: {
    // a computed getter
    totalPrice: function () {
      // `this` points to the vm instance
      var a = moment(this.bookingrequest.checkin, 'D-M-YYYY');
      var b = moment(this.bookingrequest.checkout, 'D-M-YYYY');
      var diffDays = b.diff(a, 'days');
      console.log(diffDays);
      return this.bookingrequest.price * diffDays * this.bookingrequest.roomQty;
    },
    totalTime: function () {
      var a = moment(this.bookingrequest.checkin, 'D-M-YYYY');
      var b = moment(this.bookingrequest.checkout, 'D-M-YYYY');
      var diffDays = b.diff(a, 'days');
      return diffDays;
    }
  }
})




$('.starttime').datetimepicker({
  icons: {
    time: "fa fa-clock-o",
    date: "fa fa-calendar",
    up: "fa fa-chevron-up",
    down: "fa fa-chevron-down",
    previous: 'fa fa-chevron-left',
    next: 'fa fa-chevron-right',
    today: 'fa fa-screenshot',
    clear: 'fa fa-trash',
    close: 'fa fa-remove'
  },
  format: 'DD-MM-YYYY'
});
$('.endtime').datetimepicker({
  icons: {
    time: "fa fa-clock-o",
    date: "fa fa-calendar",
    up: "fa fa-chevron-up",
    down: "fa fa-chevron-down",
    previous: 'fa fa-chevron-left',
    next: 'fa fa-chevron-right',
    today: 'fa fa-screenshot',
    clear: 'fa fa-trash',
    close: 'fa fa-remove'
  }, format: 'DD-MM-YYYY'
});
$("#starttime").on("dp.change", function (e) {
  $('#endtime').data("DateTimePicker").minDate(e.date);
});
$("#endtime").on("dp.change", function (e) {
  $('#starttime').data("DateTimePicker").maxDate(e.date);
});    