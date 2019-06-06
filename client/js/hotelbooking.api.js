const apiUrl='http://103.237.144.222:3000';
// Make a request for a user with a given ID
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
    bookingrequest: {
      supplier:"FLC",
      roomId: "",
      hotelId: "",
      hotelName: "Hotel...",
      price: "",
      amountPeople: "",
      roomQty: 0,
      checkin: "",
      checkout: "",
      golfer: 0,
      ungolfer: 0,
      roomTypeId: "",
      roomTypeName: "RoomType...",
      packageId: "",
      packageName: "Package ...",
      optionServiceId:"",
      optionServiceName:"(Option) Another Service...",
      name: "",
      email: "",
      phone: "",
      other: ""
    },
    flcHotels: [],
    vinHotels: [],
    vinPackage: [],
    flcPackage: [],
    vinroomTypes:[],
    flcroomTypes:[],
    vinOptionService:[],
    flcOptionService:[],
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
      AXIOS.get(apiUrl +'/hotel/combobox/hotel/VIN', { crossdomain: true })
      .then((response) => {
        this.vinHotels = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
    AXIOS.get(apiUrl +'/hotel/combobox/hotel/FLC', { crossdomain: true })
      .then((response) => {
        this.flcHotels = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
      AXIOS.get(apiUrl +'/hotel/combobox/package/VIN', { crossdomain: true })
        .then((response) => {
          this.vinPackage = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      AXIOS.get(apiUrl +'/hotel/combobox/package/FLC', { crossdomain: true })
        .then((response) => {
          this.flcPackage = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
        AXIOS.get(apiUrl +'/hotel/combobox/roomtype/VIN', { crossdomain: true })
        .then((response) => {
          this.vinroomTypes = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
      AXIOS.get(apiUrl +'/hotel/combobox/roomtype/FLC', { crossdomain: true })
        .then((response) => {
          this.flcroomTypes = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
        AXIOS.get(apiUrl +'/hotel/combobox/addition-service/FLC', { crossdomain: true })
        .then((response) => {
          this.flcOptionService = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
        AXIOS.get(apiUrl +'/hotel/combobox/addition-service/VIN', { crossdomain: true })
        .then((response) => {
          this.vinOptionService = response.data;
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
      if (this.bookingrequest.supplier=='FLC') {
      this.bookingrequest.checkin=document.getElementById('flccheckin').value;
      this.bookingrequest.checkout=document.getElementById('flccheckout').value;
      }
      else{
        this.bookingrequest.checkin=document.getElementById('vincheckin').value;
      this.bookingrequest.checkout=document.getElementById('vincheckout').value;
      }
    },
    reserveHotel() {
      this.bookingstep.find = true;
      this.bookingstep.confirm = true;
      this.bookingstep.finish = true;
      AXIOS.post(apiUrl +'/mail/hotel-booking', this.bookingrequest)
        .then(response => {
          console.log(this.bookingrequest);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () { });
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
      this.bookingrequest.hotelId= "";
      this.bookingrequest.hotelName="Hotel...";
      this.bookingrequest.supplier=param;
    }
  }
})




