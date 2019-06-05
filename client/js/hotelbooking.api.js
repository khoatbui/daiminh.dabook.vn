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
      bookingstep:{
          find:true,
          confirm:false,
          finish:false
      }, //FIND => CONFIRM => FINISH
      bookingrequest:{
        roomId:"",
        hotelId:"",
        hotelName:"Hotel...",
        price:"",
        amountPeople:"",
        roomQty:0,
        checkin:"",
        checkout:"",
        golfer:0,
        ungolfer:0,
        roomTypeId:"",
        roomTypeName:"RoomType...",
        serviceTypeId:"",
        serviceTypeName:"ServiceType..."
      },
      hotels:[{'id':1,'value':'Ha Long'},
      {'id':2,'value':'Quang Ninh'},
      {'id':3,'value':'Hai Phong'},
      {'id':4,'value':'Da Nang'}],
      roomTypes:[{'id':1,'value':'Hotel'},
      {'id':2,'value':'Villa'}],
      serviceTypes:[{'id':1,'value':'include 18 holds'},
      {'id':2,'value':'include 6 holds'},
      {'id':3,'value':'dinner'},
      {'id':4,'value':'Car'}]
    },
    created() {
      this.initialize();
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
      searchHotel(){
          this.bookingstep.find=true;
          this.bookingstep.confirm=true;
      },
      reserveHotel(){
        this.bookingstep.find=true;
        this.bookingstep.confirm=true;
        this.bookingstep.finish=true;
      },
      showBank(bank){

      },
      showPoposer(){

      },
      plusPerson(){
        this.bookingrequest.golfer++;
      },
      minusPerson(){
        this.bookingrequest.golfer--;
      },
      plusUnGolferPerson(){
        this.bookingrequest.ungolfer++;
      },
      minusUnGolferPerson(){
        this.bookingrequest.ungolfer--;
      },
      plusRoom(){
        this.bookingrequest.roomQty++;
      },
      minusRoom(){
        this.bookingrequest.roomQty--;
      }
    }
  })
  
  
  
  
  