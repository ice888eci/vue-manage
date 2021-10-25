<template>
  <div class="login">
    <section class="login_img">
      <div class="circular"></div>
      <el-carousel class="banner" height="340px" :autoplay="false">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <img :src="item.img" />
          <h3 class="banner_title">{{ item.title }}</h3>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="login_input">
      <div class="center">
        <div class="login_text">
          登录
          <small>此页面已加密</small>
        </div>

        <div class="login_form">
          <input v-model="username" type="text" placeholder="账户名" />
          <input v-model="password" type="password" placeholder="密码" />
          <div class="login_submit">
            <div class="login_button" @click="onUserLogin()">
              登 录
              <i class="el-icon-right"></i>
            </div>
            <div class="reg_text">
              还没有账户？
              <span>注册</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      banners: this.$page.login.banners,
      username: `admin`,
      password: `123456`,
      rules: {
        pass: "",
      },
    }
  },
  methods: {
    async onUserLogin() {
      const result = await this.$api.login({ username: this.username, password: this.password })
      if (result != null) {
        this.$utils.setToken(result.token)
        this.$router.push({ name: "Index" })
      }
    },
  },
}
</script>

<style lang='less' scoped>
@import "~less/page/login.less";
</style>