import { Notification } from "element-ui"
import config from "../config"
class Utils {
  setToken(token) {
    localStorage.setItem(config.TokenName, token)
  }
  getToken() {
    return localStorage.getItem(config.TokenName)
  }
  delToken() {
    return localStorage.removeItem(config.TokenName)
  }
  setData(key, data) {
    let formatData = typeof data == "object" ? JSON.stringify(data) : data
    localStorage.setItem(key, formatData)
  }
  getData(key) {
    if (localStorage.getItem(key) != null) {
      try {
        return JSON.parse(localStorage.getItem(key))
      } catch (e) {
        // console.log("字符串类型的不需要转JSON")
        return localStorage.getItem(key)
      }
    }
    return false
  }

  formatReqPath(url, params) {
    for (const [key, val] of Object.entries(params)) {
      url = url.replace(`:${key}`, val)
    }
    return url
  }
}
export default new Utils()

export function Notify(params) {
  const normal = {
    title: "操作成功",
    message: "",
    type: "success",
    offset: 50,
    duration: 1500
  }
  Object.assign(normal, params)
  Notification(normal)
}
