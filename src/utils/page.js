const PageStaticData = {
  login: {
    banners: [
      {
        img: require("../assets/svg/Main.svg"),
        title: "欢迎登录，商城App管理后台"
      },
      {
        img: require("../assets/svg/Normal.svg"),
        title: "您可以输入账号密码进行登录"
      },
      {
        img: require("../assets/svg/Engineer.svg"),
        title: "或者注册一个新的管理员账号"
      }
    ]
  },
  home: {
    menus: {
      icons: {
        777: "el-icon-house",
        125: "el-icon-user",
        103: "el-icon-setting",
        101: "el-icon-goods",
        102: "el-icon-present",
        145: "el-icon-time"
      },
      home: {
        id: 777,
        authName: "系统首页",
        order: 0,
        path: "home",
        closable: true,
        children: []
      }
    }
  },
  users: {}
}
Object.freeze(PageStaticData)
export default PageStaticData
