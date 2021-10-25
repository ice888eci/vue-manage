import dao from "./dao"
import config from "../config"
class Api {
  async login(requestParams = {}) {
    const params = { data: requestParams, url: config.http.urls.login, header: {} }
    try {
      return await dao.post(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}

export default new Api()
