import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://103.237.144.222:3000/`,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.token,
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json, text/plain, */*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Credentials": true
    }
  })
}
// 103.237.144.222:3000
