const path = require("path")
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/", // 公共路径
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json"]
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("less", resolve("./src/assets/less"))
      .set("img", resolve("./src/assets/img"))
      .set("svg", resolve("./src/assets/svg"))
      .set("components", resolve("./src/components"))
      .set("views", resolve("./src/views"))
      .set("utils", resolve("./src/utils"))
      .set("api", resolve("./src/api"))
  },
  devServer: {
    proxy: {
      "/api": {
        host: "127.0.0.1",
        port: 8888,
        target: "http://127.0.0.1:8888/api/private/v1/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}
