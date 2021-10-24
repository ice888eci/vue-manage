class Utils {
  getToken() {
    return localStorage.getItem('token')
  }
}
export default new Utils()
