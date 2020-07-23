class ApiService {
  constructor() {
    this.axios = null
  }

  setAxios(axios) {
    this.axios = axios
  }

  removeHeader() {
    this.axios.defaults.headers.common = {}
  }
  get(resource = '') {
    return this.axios.$get(resource)
  }
  post(data, resource = '') {
    console.log('axios porst', resource, data)
    return this.axios.$post(resource, data)
  }
  put(data, resource = '', option = null) {
    return this.axios.$put(resource, data, option)
  }
  delete(resource = '') {
    return this.axios.$delete(resource)
  }
  customRequest(data) {
    return this.axios(data)
  }
}

const apiService = new ApiService()

export default apiService
