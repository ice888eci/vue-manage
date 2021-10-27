import api from "api"
import utils from "utils"
import page from "utils/page"

const state = () => ({
  MenuList: utils.getData("MenuList") ? utils.getData("MenuList") : [],
  MenuActive: utils.getData("MenuActive") ? utils.getData("MenuActive") : "/home",
  MenuListIcons: page.home.menus.icons,
  MenuHome: page.home.menus.home
})

const mutations = {
  setMenuList(state, list) {
    state.MenuList = [state.MenuHome, ...list]
    utils.setData("MenuList", state.MenuList)
  },
  setMenuActive(state, MenuCurrent) {
    if (state.MenuActive == MenuCurrent) return
    state.MenuActive = MenuCurrent
    utils.setData("MenuActive", MenuCurrent)
  }
}
const actions = {
  async getMenuList({ commit }) {
    if (utils.getData("MenuList")) return
    const list = await api.menus()
    commit("setMenuList", list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
