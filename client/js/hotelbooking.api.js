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
      bookingstep:1,
    },
    created() {
      this.initialize();
    },
    methods: {
      initialize() {
        if (urlParams.has('destination')) {
          AXIOS.get('http://localhost:3000/tourlist/destination-search/' + urlParams.get('destination'), { crossdomain: true })
            .then((response) => {
              console.log(response.data);
              this.tourlist = response.data;
              console.log(this.tourlist);
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
              console.log(response.data);
              this.tourlist = response.data;
              console.log(this.tourlist);
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
              console.log(response.data);
              this.tourlist = response.data;
              console.log(this.tourlist);
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
              console.log(response.data);
              this.tourlist = response.data;
              console.log(this.tourlist);
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
              console.log(response.data);
              this.tourlist = response.data;
              console.log(this.tourlist);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
            });
        }
      }
    }
  })
  
  
  
  
  