const config = {
  http: {
    // baseURL: `http://127.0.0.1:8888/api/private/v1/`,
    baseURL: `/api`,
    timeout: 3000,
    urls: {
      login: `login`,
    },
  },
  TokenName: `MallToken`,
}
Object.freeze(config)
export default config
