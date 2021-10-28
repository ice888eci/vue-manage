import axios from "axios"
import config from "../config"
import utils, { Notify } from "../utils"
import { Loading } from "element-ui"
let loadingInstance

class Dao {
  constructor() {
    axios.defaults.baseURL = config.http.baseURL
    axios.defaults.timeout = config.http.timeout
    this.requestInterceptors().then()
    this.responseInterceptors().then()
  }

  async requestInterceptors() {
    axios.interceptors.request.use(
      config => {
        loadingInstance = Loading.service({ text: `加载中` })
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
  }
  async responseInterceptors() {
    axios.interceptors.response.use(
      response => {
        loadingInstance.close()
        const { data, meta } = response.data
        // console.log(data, meta, 111)
        switch (meta.status) {
          case 200:
            Notify({ message: meta.msg })
            return data
          case 201:
            Notify({ message: meta.msg })
            return data
          case 400:
            Notify({ type: "error", message: meta.msg })
            throw new Error(meta.msg)

          case 500:
            Notify({ type: "error", message: meta.msg, title: "服务器错误" })
            throw new Error(response.data.message)
        }

        return response
      },
      error => {
        loadingInstance.close()
        Notify({ type: "error", title: "响应失败", message: "当前网略不太好" })
        return Promise.reject(error)
      }
    )
  }
  async get(params) {
    try {
      return await axios.get(params.url, {
        params: params.data,
        headers: { Authorization: utils.getToken(), ...params.header }
      })
    } catch (e) {
      throw new Error(`GET-Error:${e.message}`)
    }
  }
  async post(params) {
    try {
      return await axios.post(params.url, params.data, {
        headers: { Authorization: utils.getToken(), ...params.header }
      })
    } catch (e) {
      throw new Error(`POST-Error:${e.message}`)
    }
  }

  async delete(params) {
    try {
      return await axios.delete(params.url, {
        params: params.data,
        headers: { Authorization: utils.getToken(), ...params.header }
      })
    } catch (e) {
      throw new Error(`DELETE-Error:${e.message}`)
    }
  }

  async put(params) {
    try {
      return await axios.put(params.url, params.data, {
        headers: { Authorization: utils.getToken(), ...params.header }
      })
    } catch (e) {
      throw new Error(`PUT-Error:${e.message}`)
    }
  }
}

export default new Dao()
