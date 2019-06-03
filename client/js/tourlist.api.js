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

if (urlParams.has('des')) {
  AXIOS.get('http://localhost:3000/tourlist/des/' + urlParams.get('des'), { crossdomain: true })
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
else if (urlParams.has('tstyle')) {
  AXIOS.get('http://localhost:3000/tourlist/tstyle/' + urlParams.get('tstyle'), { crossdomain: true })
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


