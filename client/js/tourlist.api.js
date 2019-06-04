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
console.log(urlParams);
console.log(urlParams.has('des'));
console.log(urlParams.get('des'));

if (urlParams.has('destination')) {
  AXIOS.get('http://localhost:3000/tourlist/destination-search/' + urlParams.get('destination'), { crossdomain: true })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}
else if (urlParams.has('travelstyle')) {
  AXIOS.get('http://localhost:3000/tourlist/travelstyle-search/' + urlParams.get('travelstyle'), { crossdomain: true })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  
}
else if (urlParams.has('city')) {
  AXIOS.get('http://localhost:3000/tourlist/city-search/' + urlParams.get('city'), { crossdomain: true })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  
}


