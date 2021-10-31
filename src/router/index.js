import Vue from "vue"
import VueRouter from "vue-router"
import config from "../config"
import utils from "../utils"
Vue.use(VueRouter)
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
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
      /**
       * 首页路由
       */
      {
        path: "home",
        name: "IndexHome",
        component: () => import("../views/Index/Home.vue"),
        meta: { isLogin: true }
      },

      /**
       * 用户管理路由 manage
       */
      {
        path: "users",
        name: "IndexUsers",
        component: () => import("../views/Index/Users/Users.vue"),
        meta: { isLogin: true }
      },

      /**
       * 权限管理路由
       */
      {
        path: "roles",
        name: "IndexRoles",
        component: () => import("../views/Index/Rights/Roles.vue"),
        meta: { isLogin: true }
      },
      {
        path: "rights",
        name: "IndexRights",
        component: () => import("../views/Index/Rights/Rights.vue"),
        meta: { isLogin: true }
      },

      /**
       * 商品管理路由
       */
      {
        path: "goods",
        name: "IndexGoods",
        component: () => import("../views/Index/Goods/Goods.vue"),
        meta: { isLogin: true }
      },
      {
        path: "params",
        name: "IndexParams",
        component: () => import("../views/Index/Goods/Params.vue"),
        meta: { isLogin: true }
      },
      {
        path: "addGoods",
        name: "IndexAddGoods",
        component: () => import("../views/Index/Goods/AddGoods.vue"),
        meta: { isLogin: true }
      },
      {
        path: "categories",
        name: "IndexCategories",
        component: () => import("../views/Index/Goods/Categories.vue"),
        meta: { isLogin: true }
      },

      /**
       * 订单管理路由
       */
      {
        path: "orders",
        name: "IndexOrders",
        component: () => import("../views/Index/Orders/Orders.vue"),
        meta: { isLogin: true }
      },

      /**
       * 数据管理路由
       */
      {
        path: "reports",
        name: "IndexReports",
        component: () => import("../views/Index/Reports/Reports.vue"),
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
    if (utils.getData(config.TokenName) != null) {
      return next()
    } else {
      next({ path: "/login" })
    }
  } else {
    // 登录后不让进login
    if (utils.getData(config.TokenName) != null && to.path == "/login") {
      router.back()
    }
    next()
  }
})

export default router
