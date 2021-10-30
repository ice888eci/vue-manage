const config = {
  http: {
    // baseURL: `http://127.0.0.1:8888/api/private/v1/`,
    baseURL: `/api`,
    timeout: 3000,
    urls: {
      //  == == == 1.2.登录 == == ==
      login: `login`,
      //  == == == 1.3.用户管理 == == ==
      users: `users`,
      users_status: `users/:uId/state/:type`,
      add_users: `users`,
      search_users: `users/:id`,
      edit_users: `users/:id`,
      del_users: `users/:id`,
      user_role: `users/:id/role`,
      //  == == == 1.4.权限管理 == == ==
      all_rights: `rights/:type`,
      menus: `menus`,
      // == == == 1.5.角色管理 == == ==
      all_roles: `roles`,
      add_roles: `roles`,
      search_roles: `roles/:id`,
      edit_roles: `roles/:id`,
      del_roles: `roles/:id`,
      del_user_roles: `roles/:roleId/rights/:rightId`,
      update_roles: `roles/:roleId/rights`,
      // == == == 1.6.商品分类管理 == == ==
      all_categories: `categories`,
      add_categories: `categories`,
      search_categories: `categories/:id`,
      update_categories: `categories/:id`,
      del_categories: `categories/:id`,

      // == == == 1.7.分类参数管理 == == ==
      all_attributes: `categories/:id/attributes`,
      add_attributes: `categories/:id/attributes`,
      del_attributes: `categories/:id/attributes/:attrid`,
      search_attributes: `categories/:id/attributes/:attrId`,
      update_attributes: `categories/:id/attributes/:attrId`,

      // == == == 1.8. 商品管理 == == ==
      all_goods: `goods`,
      add_goods: `goods`,
      del_goods: `goods/:id`,
      search_goods: `goods/:id`,
      update_goods: `goods/:id`,

      // == == == 1.9. 图片上传 == == ==
      upload: `upload`,

      // == == == 1.10. 订单管理 == == ==
      all_orders: `orders`,
      update_orders_address: ``,
      search_orders_kuaidi: `/kuaidi/:id`,
      search_orders: `orders/:id`,
      update_orders: `orders/:id`,

      // == == == 1.10. 订单管理 == == ==
      all_reports: `reports/type/1`
    }
  },
  TokenName: `MallToken`
}
Object.freeze(config)
export default config
