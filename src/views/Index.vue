<template>
  <div class="index">
    <el-container>
      <el-header>
        <ElEHeader :isCollapse.sync="isCollapse" />
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '63.5px' : '200px'" style="transition: all 0.5s">
          <ElEAside :isCollapse="isCollapse" />
        </el-aside>
        <el-main>
          <ElETabs>
            <router-view />
          </ElETabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ElEHeader from "components/Element/ElEHeader"
import ElEAside from "components/Element/ElEAside"
import ElETabs from "components/Element/ElETabs"
export default {
  name: "Index",
  data() {
    return {
      isCollapse: false,
    }
  },
  methods: {
    async open() {
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {})
        this.$message({ type: "success", message: "删除成功!" })
      } catch (error) {
        this.$message({ type: "info", message: "已取消删除" })
      }
    },
  },

  components: { ElEHeader, ElEAside, ElETabs },
}
</script>

<style  scoped lang='less'>
</style>