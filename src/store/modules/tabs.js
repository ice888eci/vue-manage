import utils from "utils"
import page from "utils/page"

const state = () => ({
  TabsList: utils.getData("TabsList") ? utils.getData("TabsList") : [page.home.menus.home],
  TabsActive: utils.getData("MenuActive") ? utils.getData("MenuActive") : "/home"
})
const getters = {}
const mutations = {
  setTab(state, tab) {
    state.TabsList.push(tab)
  },
  setTabActive(state, ActiveTabPath) {
    if (state.TabsActive == ActiveTabPath) return
    state.TabsActive = ActiveTabPath
  },
  delTabActive(state, DelTabIndex) {
    state.TabsList.splice(DelTabIndex, 1)
  }
}
const actions = {
  addTab({ state, commit, rootState }, path) {
    const MenuList = rootState.menus.MenuList
    const hasTab = state.TabsList.find(item => `/${item.path}` == path)
    if (!hasTab) {
      for (const tab of MenuList) {
        if (`/${tab.path}` == path) {
          commit("setTab", tab)
          break
        }
        for (const childrenTab of tab.children) {
          if (`/${childrenTab.path}` == path) {
            commit("setTab", childrenTab)
            break
          }
        }
      }
    }
    // 加入后设置为选中状态
    commit("setTabActive", path)

    utils.setData("TabsList", state.TabsList)
  },

  setActiveTab({ commit }, ActiveTabPath) {
    commit("setTabActive", ActiveTabPath)
    // 想要和同modules通信需要加上第三个参数{ root: true }
    commit("menus/setMenuActive", ActiveTabPath, { root: true })

    utils.setData("MenuActive", ActiveTabPath)
  },

  removeTab({ state, dispatch, commit }, ActiveTabPath) {
    const index = state.TabsList.findIndex(item => `/${item.path}` == ActiveTabPath)
    // 删除被选中的才会调整当前active 否则只删除不调整当前选择的
    if (state.TabsActive == ActiveTabPath) {
      // 删除后优先选择后面的
      // nextTab路径需要加上前面需要 `/`
      const nextTab = state.TabsList[index + 1] || state.TabsList[index - 1]
      commit("delTabActive", index)
      dispatch("setActiveTab", `/${nextTab.path}`)
    } else {
      commit("delTabActive", index)
    }
    utils.setData("TabsList", state.TabsList)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
