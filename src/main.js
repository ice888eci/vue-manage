import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"

import api from "./api"
import utils from "./utils"
import page from "./utils/page"
import "./plugins"

Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.prototype.$page = page

Vue.config.productionTip = false

new Vue({ router, store, render: h => h(App) }).$mount("#app")
