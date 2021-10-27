<template>
  <div class="ElTabs">
    <div class="TabsFather">
      <ul class="TabsTitle">
        <li
          :class="[`/${item.path}` == TabsActive ? 'active' : '']"
          v-for="item in TabsList"
          :key="item.id"
          @click="onTabChange(`/${item.path}`)"
        >
          <i :class="MenuListIcons[item.id]"></i>
          <span>{{ item.authName }}</span>
          <i
            class="el-icon-close"
            v-if="!item.closable"
            @click.stop="onRemoveTabs(`/${item.path}`)"
          >
          </i>
        </li>
      </ul>
    </div>
    <div class="TabsContent">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "ElETabs",
  computed: {
    ...mapState({
      TabsList: state => state.tabs.TabsList,
      TabsActive: state => state.tabs.TabsActive,
      MenuListIcons: state => state.menus.MenuListIcons,
    }),
  },

  methods: {
    onTabChange(ActiveTabPath) {
      if (ActiveTabPath == this.$route.path) return
      this.$store.dispatch("tabs/setActiveTab", ActiveTabPath)
      this.$router.push({ path: ActiveTabPath })
    },
    onRemoveTabs(ActiveTabPath) {
      this.$store.dispatch("tabs/removeTab", ActiveTabPath)
    },
  },
}
</script>

<style  scoped lang='less'>
@import "~less/components/ElETabs";
</style>