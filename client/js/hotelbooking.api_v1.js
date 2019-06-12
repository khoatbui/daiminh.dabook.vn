//http://103.237.144.222:3000
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
      price: 1000000,
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
      packageCode:"",
      optionServiceId: "",
      optionServiceName: "(Option) Another Service...",
      name: "",
      email: "",
      phone: "",
      other: "",
      totalPrice:""
    },
    orderCode:"",
    flcHotels: [],
    vinHotels: [],
    vinPackage: [],
    flcPackage: [],
    vinroomTypes: [],
    flcroomTypes: [],
    vinOptionService: [],
    flcOptionService: [],
    selectedBank:{},
    banks:[],
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
        AXIOS.get(apiUrl + '/tourlist/destination-search/' + urlParams.get('destination'), { crossdomain: true })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });
      }
      else if (urlParams.has('travelstyle')) {
        AXIOS.get(apiUrl + '/tourlist/travelstyle-search/' + urlParams.get('travelstyle'), { crossdomain: true })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });

      }
      else if (urlParams.has('city')) {
        AXIOS.get(apiUrl + '/tourlist/city-search/' + urlParams.get('city'), { crossdomain: true })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });

      }
      else if (urlParams.has('searchbox')) {
        AXIOS.get(apiUrl + '/tourlist/searchbox-search/' + urlParams.get('searchbox'), { crossdomain: true })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });

      }
      else {
        AXIOS.get(apiUrl + '/tourlist/', { crossdomain: true })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });
      }

      AXIOS.get(apiUrl + '/payments', { crossdomain: true })
      .then((response) => {
          this.banks = response.data;
          this.selectedBank=this.banks[0];
      })
      .catch((error) => {
          console.log(error);
      })
      .finally(() => {
      });
    },
    binCombobox() {
      AXIOS.get(apiUrl + '/hotel/combobox/hotelbysuppliercode/VIN', { crossdomain: true })
        .then((response) => {
          this.vinHotels = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      AXIOS.get(apiUrl + '/hotel/combobox/hotelbysuppliercode/FLC', { crossdomain: true })
        .then((response) => {
          this.flcHotels = response.data;
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
    getFlcRoomTypeByHotel() {
      AXIOS.get(apiUrl + `/roomtype/combobox/roomtype/${this.bookingrequest.hotelId}`, { crossdomain: true })
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
      AXIOS.get(apiUrl + `/roomtype/combobox/roomtype/${this.bookingrequest.hotelId}`, { crossdomain: true })
        .then((response) => {
          this.vinroomTypes = response.data;
        })
        .catch((error) => {
        })
        .finally(() => {
        });
    },
    getVinPackageByHotel() {
      AXIOS.get(apiUrl + `/packagehotelrel/combobox/packagebyhotelroomtype/hotel/${this.bookingrequest.hotelId}/roomType/${this.bookingrequest.roomTypeId}`, { crossdomain: true })
        .then((response) => {
          this.vinPackage = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
    },
    getFlcPackageByHotel() {

      AXIOS.get(apiUrl + `/packagehotelrel/combobox/packagebyhotelroomtype/hotel/${this.bookingrequest.hotelId}/roomType/${this.bookingrequest.roomTypeId}`, { crossdomain: true })
        .then((response) => {
          console.log(response.data);
          this.flcPackage = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
    },
    changePackageCombobox(package) {
      this.bookingrequest.packageId = package.packageId._id;
      this.bookingrequest.packageName = package.packageId.packageName;
      this.bookingrequest.packageCode = package.packageId.packageCode;
      this.bookingrequest.price = package.price;
      console.log(this.bookingrequest);
    },
    searchHotel() {
      this.bookingstep.find = true;
      this.bookingstep.confirm = true;
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
            this.orderCode=response.data;

          })
          .catch(function (error) {
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
      this.selectedBank = this.banks.find(x => x.bankCode.toUpperCase() === bank.toUpperCase())
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
      return this.bookingrequest.price * diffDays * this.bookingrequest.roomQty;
    },
    totalPriceFLC: function () {
      // `this` points to the vm instance
      var a = moment(this.bookingrequest.checkin, 'D-M-YYYY');
      var b = moment(this.bookingrequest.checkout, 'D-M-YYYY');
      var diffDays = b.diff(a, 'days');
      return this.bookingrequest.price * diffDays * this.bookingrequest.roomQty;
    },
    totalTime: function () {
      var a = moment(this.bookingrequest.checkin, 'D-M-YYYY');
      var b = moment(this.bookingrequest.checkout, 'D-M-YYYY');
      var diffDays = b.diff(a, 'days');
      return diffDays;
    },
    getPackageNote: function () {
      var package = this.vinPackage.filter(obj => { return obj._id === this.bookingrequest.packageId })
      return package.note;
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
  format: 'DD-MM-YYYY',
  widgetPositioning: {
    horizontal: 'auto',
    vertical: 'bottom'
  },
  minDate: moment()
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
  }, format: 'DD-MM-YYYY',
  widgetPositioning: {
    horizontal: 'auto',
    vertical: 'bottom'
  }
});
$(".starttime").on("dp.change", function (e) {
  $('.endtime').data("DateTimePicker").minDate(e.date);
});  