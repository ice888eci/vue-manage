import { Notification } from "element-ui"
import config from "../config"
class Utils {
  setToken(token) {
    sessionStorage.setItem(config.TokenName, token)
  }
  getToken() {
    return sessionStorage.getItem(config.TokenName)
  }
  delToken() {
    return sessionStorage.removeItem(config.TokenName)
  }
  setData(key, data) {
    let formatData = typeof data == "object" ? JSON.stringify(data) : data
    sessionStorage.setItem(key, formatData)
  }
  getData(key) {
    if (sessionStorage.getItem(key) != null) {
      try {
        return JSON.parse(sessionStorage.getItem(key))
      } catch (e) {
        // console.log("字符串类型的不需要转JSON")
        return sessionStorage.getItem(key)
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

  getLeafKeys(node, arr) {
    // 如果当前 node 节点不包含 children属性, 则是三级节点
    if (!node.children) return arr.push(node.id)
    node.children.forEach(item => {
      this.getLeafKeys(item, arr)
    })
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
