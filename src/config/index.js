const config = {
  http: {
    // baseURL: `http://127.0.0.1:8888/api/private/v1/`,
    baseURL: `/api`,
    timeout: 3000,
    urls: {
      login: `login`,
      menus: `menus`,
      users: `users`,
      users_status: `users/:uId/state/:type`,
      add_users: `users`,
      search_users: `users/:id`,
      edit_users: `users/:id`,
      del_users: `users/:id`
    }
  },
  TokenName: `MallToken`
}
Object.freeze(config)
export default config
