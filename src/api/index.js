import dao from "./dao"
import config from "../config"
import { Notify, FormatReqPath } from "../utils"

class Api {
  // =======1.2. 登录 ==========

  /***
   * @POST
   * @desc 1.2.1. 登录验证接口
   */
  async login(par = {}) {
    const params = { data: par, url: config.http.urls.login, header: {} }
    try {
      return await dao.post(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  // =======1.3. 用户管理 ==========

  /***
   * @GET
   * @desc 1.3.1. 用户数据列表
   */
  async users(par = {}) {
    const params = { data: par, url: config.http.urls.users, header: {} }
    try {
      return await dao.get(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /**
   * @POST
   * @desc 1.3.2. 添加用户
   */
  async add_users(par = {}) {
    const params = { data: par, url: config.http.urls.add_users, header: {} }
    console.log(params)
    try {
      return await dao.post(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @PUT
   * @desc 1.3.3. 修改用户状态
   */
  async users_status(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.users_status, par),
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
   * @GET
   * @desc 1.3.4. 根据 ID 查询用户信息
   */
  async search_users(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.search_users, par),
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
   * @desc 1.3.5. 编辑用户提交
   */
  async edit_users(par = {}) {
    const params = {
      data: par,
      url: FormatReqPath(config.http.urls.edit_users, par),
      header: {}
    }
    try {
      return await dao.put(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @GET
   * @desc 1.3.6. 删除单个用户
   */
  async del_users(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.del_users, par),
      header: {}
    }
    try {
      return await dao.delete(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @PUT
   * @desc 1.3.7. 分配用户角色
   */
  async user_role(par = {}) {
    const params = {
      data: { rid: par.rid },
      url: FormatReqPath(config.http.urls.user_role, par),
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

  // ======== 1.4. 权限管理 ========

  /***
   * @GET
   * @desc 1.4.1. 所有权限列表
   */
  async all_rights(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.all_rights, par),
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
   * @GET
   * @desc ### 1.4.2. 左侧菜单权限
   */
  async menus(par = {}) {
    const params = { data: par, url: config.http.urls.menus, header: {} }
    try {
      return await dao.get(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  // ======== 1.5. 角色管理 ========

  /***
   * @GET
   * @desc 1.5.1. 角色列表
   */
  async all_roles(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.all_roles, par),
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
   * @POST
   * @desc 1.5.2. 添加角色
   */
  async add_roles(par = {}) {
    const params = { data: par, url: config.http.urls.add_roles, header: {} }
    try {
      return await dao.post(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @GET
   * @desc 1.5.3. 根据 ID 查询角色
   */
  async search_roles(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.search_roles, par),
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
   * @desc 1.5.4. 编辑提交角色
   */
  async edit_roles(par = {}) {
    const params = {
      data: par,
      url: FormatReqPath(config.http.urls.edit_roles, par),
      header: {}
    }
    try {
      return await dao.put(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @DELETE
   * @desc 1.5.5. 删除角色
   */
  async del_roles(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.del_roles, par),
      header: {}
    }
    try {
      return await dao.delete(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /**
   * @POST
   * @desc 1.5.6. 角色授权
   */
  async update_roles(par = {}) {
    const params = {
      data: { rids: par.rids },
      url: FormatReqPath(config.http.urls.update_roles, par),
      header: {}
    }
    try {
      return await dao.post(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /**
   * @delete
   * @desc 1.5.7. 删除角色指定权限
   */
  async del_user_roles(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.del_user_roles, par),
      header: {}
    }
    try {
      return await dao.delete(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /**
   * ===========1.6.商品分类管理==========
   */

  /**
   * @GET
   * @desc 1.6.1. 商品分类数据列表
   */
  async all_categories(par = {}) {
    const params = {
      data: par,
      url: config.http.urls.all_categories,
      header: {}
    }
    // console.log(params)
    try {
      return await dao.get(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /**
   * @POST
   * @desc 1.6.2. 添加分类
   */
  async add_categories(par = {}) {
    const params = { data: par, url: config.http.urls.add_categories, header: {} }
    try {
      return await dao.post(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /**
   * @GET
   * @desc 1.6.3. 根据 id 查询分类
   */
  async search_categories(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.search_categories, par),
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
   * @desc 1.6.4. 编辑提交分类
   */
  async update_categories(par = {}) {
    const params = {
      data: { cat_name: par.cat_name },
      url: FormatReqPath(config.http.urls.update_categories, par),
      header: {}
    }
    try {
      return await dao.put(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @DELETE
   * @desc 1.6.5. 删除分类
   */
  async del_categories(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.del_categories, par),
      header: {}
    }
    try {
      return await dao.delete(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  ///////////////////////////////////////////////

  /**
   * ===========1.7. 分类参数管理==========
   */

  /**
   * @GET
   * @desc 1.7.1. 参数列表
   */
  async all_attributes(par = {}) {
    const params = {
      data: par,
      url: config.http.urls.all_attributes,
      header: {}
    }
    // console.log(params)
    try {
      return await dao.get(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /**
   * @POST
   * @desc 1.6.2. 添加分类
   */
  async add_attributes(par = {}) {
    const params = { data: par, url: config.http.urls.add_attributes, header: {} }
    try {
      return await dao.post(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /**
   * @GET
   * @desc 1.6.3. 根据 id 查询分类
   */
  async search_attributes(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.search_attributes, par),
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
   * @desc 1.6.4. 编辑提交分类
   */
  async update_attributes(par = {}) {
    const params = {
      data: { cat_name: par.cat_name },
      url: FormatReqPath(config.http.urls.update_attributes, par),
      header: {}
    }
    try {
      return await dao.put(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  /***
   * @DELETE
   * @desc 1.6.5. 删除分类
   */
  async del_attributes(par = {}) {
    const params = {
      data: {},
      url: FormatReqPath(config.http.urls.del_attributes, par),
      header: {}
    }
    try {
      return await dao.delete(params)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}

export default new Api()
