import Vue from "vue"
import VueRouter from "vue-router"
import config from "../config"

Vue.use(VueRouter)
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {}
  },
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    meta: { isLogin: true },
    redirect: "home",
    children: [
      {
        path: "home",
        name: "IndexHome",
        component: () => import("../views/Index/Home.vue"),
        meta: { isLogin: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    if (localStorage.getItem(config.TokenName) != null) {
      return next()
    } else {
      next({ path: "/login" })
    }
  } else {
    // 登录后不让进login
    if (localStorage.getItem(config.TokenName) != null && to.path == "/login") {
      router.back()
    }
    next()
  }
})

export default router
