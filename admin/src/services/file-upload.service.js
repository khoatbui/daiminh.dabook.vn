import * as axios from 'axios'
axios.defaults.timeout = 100000
function upload (url, formData) {
  return axios.post(url, formData)
    .then(x => x.data)
}

export { upload }
