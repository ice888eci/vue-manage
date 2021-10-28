import dao from "./dao"
import config from "../config"
import utils, { Notify } from "../utils"

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

  /***
   * @GET
   * @method menus
   * @param {void}
   * @desc 首页Aisde数据
   */
  async menus(requestParams = {}) {
    const params = { data: requestParams, url: config.http.urls.menus, header: {} }
    try {
      return await dao.get(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @GET
   * @method users
   * @param {query?:string} 查询参数
   * @param {pagenum!:number} 当前页码
   * @param {pagesize!:number} 每页显示条数
   * @desc 首页users表格数据
   */
  async users(requestParams = {}) {
    const params = { data: requestParams, url: config.http.urls.users, header: {} }
    try {
      const res = await dao.get(params)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @PUT
   * @param {uid!:string|number} 用户ID
   * @param {type!:boolean} 用户状态
   */
  async users_status(requestParams = {}) {
    const params = {
      data: {},
      url: utils.formatReqPath(config.http.urls.users_status, requestParams),
      header: {}
    }
    try {
      const res = await dao.put(params)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /**
   * @POST
   * @param {username!:string} 用户名称
   * @param {password!:string} 用户密码
   * @param {email!:string} 用户名称
   * @param {mobile!:string|number} 用户密码
   */
  async add_users(requestParams = {}) {
    const params = { data: requestParams, url: config.http.urls.add_users, header: {} }
    try {
      return await dao.post(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /**
   * @GET
   * @param {id!:string} 用户ID
   */
  async search_users(requestParams = {}) {
    const params = {
      data: {},
      url: utils.formatReqPath(config.http.urls.search_users, requestParams),
      header: {}
    }
    try {
      return await dao.get(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @PUT
   * @param {id!:string|number} 用户ID
   * @param {email!:string} 邮箱
   * @param {mobile!:string} 手机号
   */
  async edit_users(requestParams = {}) {
    const params = {
      data: requestParams,
      url: utils.formatReqPath(config.http.urls.edit_users, requestParams),
      header: {}
    }
    try {
      const res = await dao.put(params)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @DELETE
   * @param {id!:string|number} 用户ID
   */
  async del_users(requestParams = {}) {
    const params = {
      data: {},
      url: utils.formatReqPath(config.http.urls.del_users, requestParams),
      header: {}
    }
    try {
      const res = await dao.delete(params)
      console.log(res, 11)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}

export default new Api()
