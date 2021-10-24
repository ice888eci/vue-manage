import axios from 'axios'
import config from '../config'
import utils from '../utils'
class Dao {
  constructor() {
    axios.defaults.baseURL = config.axios.baseURL
    axios.defaults.timeout = config.axios.timeout
    this.requestInterceptors().then()
    this.responseInterceptors().then()
  }

  async requestInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        Promise.reject(error)
      }
    )
  }
  async responseInterceptors() {
    axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
  async get(params) {
    try {
      return await axios.get(params.url, {
        params: params.data,
        headers: { ...utils.getToken(), ...params.header },
      })
    } catch (error) {
      throw new Error(`get:${e.message}`)
    }
  }
  async post(params) {
    try {
      return await axios.post(params.url, params.data, {
        headers: { ...utils.getToken(), ...params.header },
      })
    } catch (error) {
      throw new Error(`post:${e.message}`)
    }
  }

  async delete() {}
  async pul() {}
}

export default new Dao()
