import Vuex from "vuex"
import Vue from "vue"

import menus from "./modules/menus"
import tabs from "./modules/tabs"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { menus, tabs }
})
