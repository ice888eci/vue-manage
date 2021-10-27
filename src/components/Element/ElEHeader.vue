<template>
  <div class="ele_header">
    <el-menu
      :default-active="active"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="1">商城管理后台</el-menu-item>
      <el-menu-item index="2" @click="() => $emit(`update:isCollapse`, !isCollapse)">
        <template slot="title">
          <i :class="[isCollapse ? `el-icon-s-unfold` : `el-icon-s-fold`]" size="22px"> </i>
        </template>
      </el-menu-item>
      <el-submenu index="3">
        <template #title>
          <i class="el-icon-user-solid" size="22px"> </i>
        </template>
        <el-menu-item index="3-1">
          <template #title>
            <i class="el-icon-edit" size="22px"> </i>
            <span>修改密码</span>
          </template>
        </el-menu-item>
        <el-menu-item index="3-2" @click="onExitLogin()">
          <template #title>
            <i class="el-icon-switch-button" size="22px"> </i>
            <span>退出登陆</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "ElEHeader",
  data() {
    return {
      active: "1",
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onExitLogin() {
      // this.$notify({ title: "操作成功", message: "退出成功", type: "success", duration: 1000 })
      setTimeout(() => {
        this.$utils.delToken()
        this.$router.replace({ name: `Login` })
      }, 1000)
    },
  },
}
</script>

<style  scoped lang='less'>
.el-menu--horizontal > .el-menu-item,
.el-submenu.is-active .el-submenu__title {
  border: none;
}
.el-submenu:last-of-type {
  float: right;
}
</style>