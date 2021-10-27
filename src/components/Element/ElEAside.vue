<template>
  <div class="el_aside">
    <el-menu
      class="el-menu-vertical-demo"
      :router="true"
      :collapse="isCollapse"
      :default-active="MenuActive"
      :unique-opened="true"
    >
      <template v-for="item in MenuList">
        <el-menu-item
          :key="item.id"
          :index="`/${item.path}`"
          v-if="!item.children.length"
          @click="onActiveChange(`/${item.path}`)"
        >
          <i :class="MenuListIcons[item.id]"></i>
          <span> {{ item.authName }}</span>
        </el-menu-item>

        <el-submenu :index="`/${item.path}`" v-else :key="item.id">
          <template #title>
            <i :class="MenuListIcons[item.id]"></i>
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item
            :index="`/${val.path}`"
            v-for="val in item.children"
            :key="val.id"
            @click="onActiveChange(`/${val.path}`)"
          >
            <i class="el-icon-menu"></i>
            <span> {{ val.authName }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "ElAside",
  props: {
    isCollapse: { type: Boolean, default: false },
  },
  async created() {
    this.$store.dispatch("menus/getMenuList")
  },
  computed: {
    ...mapState({
      MenuList: state => state.menus.MenuList,
      MenuListIcons: state => state.menus.MenuListIcons,
      MenuActive: state => state.menus.MenuActive,
    }),
  },
  methods: {
    onActiveChange(path) {
      this.$store.commit("menus/setMenuActive", path)
      this.$store.dispatch("tabs/addTab", path)
    },
  },
}
</script>

<style  scoped lang='less'>
.el_aside {
  height: 100%;
  box-sizing: border-box;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: inherit;
    .el-menu-item.is-active {
      color: #fff;
      background: #0397ff;
    }
    .el-menu--collapse {
      height: inherit;
    }
  }
}
</style>