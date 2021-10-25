import { Notification } from 'element-ui'
import config from '../config'
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
}
export default new Utils()

export function Notify(params) {
  const normal = {
    title: '操作成功',
    message: '',
    type: 'success',
    offset: 50,
    duration: 1500,
  }
  Object.assign(normal, params)
  Notification(normal)
}
