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

  /***
   * @PUT
   * @param {id!:string|number} 用户ID
   * @param {type!:boolean} 分配用户角色
   */
  async user_role(requestParams = {}) {
    const params = {
      data: { rid: requestParams.rid },
      url: utils.formatReqPath(config.http.urls.user_role, requestParams),
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
    console.log(params)
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

  /***
   * @name 权限管理
   * @GET
   * @param {type!:string} 值 list or tree list列表显示权限, tree树状显示权限
   * @desc 所有权限列表接口
   */
  async all_rights(requestParams = {}) {
    const params = {
      data: {},
      url: utils.formatReqPath(config.http.urls.all_rights, requestParams),
      header: {}
    }
    // console.log(params)
    try {
      const res = await dao.get(params)
      // console.log(res, 11)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @name
   * @DELETE
   * @param {type!:string} 值 list or tree list列表显示权限, tree树状显示权限
   * @desc 角色列表
   */
  async all_roles(requestParams = {}) {
    const params = {
      data: {},
      url: utils.formatReqPath(config.http.urls.all_roles, requestParams),
      header: {}
    }
    // console.log(params)
    try {
      const res = await dao.get(params)
      // console.log(res, 11)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @name
   * @POST
   * @param {type!:string} 值 roleName角色名称 or roleDesc角色描述
   * @desc 添加角色
   */
  async add_roles(requestParams = {}) {
    const params = { data: requestParams, url: config.http.urls.add_roles, header: {} }
    // console.log(params)
    try {
      return await dao.post(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @name
   * @GET
   * @param {id!:string} 角色 ID
   * @desc 根据ID查询角色
   */
  async search_roles(requestParams = {}) {
    const params = {
      data: {},
      url: utils.formatReqPath(config.http.urls.search_roles, requestParams),
      header: {}
    }
    try {
      const res = await dao.get(params)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @name
   * @PUT
   * @param {id!:string,roleName?:string,roleDesc?:string}
   * @desc 编辑提交角色
   */
  async edit_roles(requestParams = {}) {
    const params = {
      data: requestParams,
      url: utils.formatReqPath(config.http.urls.edit_roles, requestParams),
      header: {}
    }
    console.log(params)
    try {
      const res = await dao.put(params)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @name
   * @DELETE
   * @param {id!:string}
   * @desc 删除角色
   */
  async del_roles(requestParams = {}) {
    const params = {
      data: {},
      url: utils.formatReqPath(config.http.urls.del_roles, requestParams),
      header: {}
    }
    try {
      const res = await dao.delete(params)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @name
   * @DELETE
   * @param {roleId!:string,rightId:string}
   * @desc 删除角色指定的权限
   */
  async del_user_roles(requestParams = {}) {
    const params = {
      data: {},
      url: utils.formatReqPath(config.http.urls.del_user_roles, requestParams),
      header: {}
    }
    try {
      const res = await dao.delete(params)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @name
   * @POST
   * @param {roleId!:string,rightId:string}
   * @desc 更新树状权限
   */
  async update_roles(requestParams = {}) {
    const params = {
      data: { rids: requestParams.rids },
      url: utils.formatReqPath(config.http.urls.update_roles, requestParams),
      header: {}
    }
    console.log(params)
    try {
      const res = await dao.post(params)
      return res
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}

export default new Api()
