<template>
  <div class="goods">
    <PageHader title="商品列表"></PageHader>
    <el-card class="card">
      <!-- 操作区域 -->
      <section class="users_card_operate">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              type="text"
              clearable
              placeholder="请输入内容"
              v-model="pages.query"
              @change="() => AllGoods()"
            >
              <el-button slot="append" icon="el-icon-search" @click="() => AllGoods()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="() => $router.push({ name: `IndexAddGoods` })"
              >添加商品</el-button
            >
          </el-col>
        </el-row>
      </section>
      <section>
        <el-table :data="goods" style="width: 100%" border stripe>
          <el-table-column type="index" label="#" width="80"> </el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="400"> </el-table-column>
          <el-table-column prop="goods_price" label="商品价格(元)" width="100"> </el-table-column>
          <el-table-column prop="goods_weight" label="商品重量"> </el-table-column>
          <el-table-column label="创建时间" width="170">
            <template #default="scope">
              {{ scope.row.add_time | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="slotProps">
              <el-tooltip content="编辑用户" placement="top" :enterable="false">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="onEdit(slotProps.row)"
                ></el-button>
              </el-tooltip>

              <el-tooltip content="删除用户" placement="top" :enterable="false">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="onDel(slotProps.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>

    <!-- 分页组件区域  可支持sync同步更新-->
    <ELEPagination
      :pagenum.sync="pages.pagenum"
      :pagesize.sync="pages.pagesize"
      :total="pages.total"
      @pagination="onPagination"
    />

    <!-- 编辑用户弹出层 -->
    <ELEDialog
      title="修改商品"
      :isShow="isShowEditDialog"
      @confirm="editConfirm"
      @changeStatus="() => (isShowEditDialog = false)"
    >
      <ELEForm :formData="editForm" ref="editFormRef" @values="v => (editValues = v)"></ELEForm>
    </ELEDialog>
  </div>
</template>

<script>
import PageHader from "components/PageHader"
import ELEPagination from "components/Element/ELEPagination"
import ELEDialog from "components/Element/ELEDialog"
import ELEForm from "components/Element/ELEForm"
export default {
  name: "IndexGoods",
  data() {
    return {
      isShowEditDialog: false,
      goods: [],
      pages: { query: "", pagenum: 1, pagesize: 10, total: 0 },
      editForm: {},
      editValues: {},
    }
  },
  computed: {
    editFormRef() {
      return this.$refs.editFormRef && this.$refs.editFormRef
    },
  },
  filters: {
    formatTime(v) {
      const dt = new Date(v)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + "").padStart(2, "0")
      const d = (dt.getDate() + "").padStart(2, "0")
      const hh = (dt.getHours() + "").padStart(2, "0")
      const mm = (dt.getMinutes() + "").padStart(2, "0")
      const ss = (dt.getSeconds() + "").padStart(2, "0")
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
  },
  created() {
    this.AllGoods(0)
  },
  methods: {
    async editConfirm() {},

    onPagination() {
      this.AllGoods()
    },
    onEdit(row) {
      this.isShowEditDialog = true
      console.log(row)
    },
    async onDel({ goods_id }) {
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {})
        await this.$api.del_goods({ id: goods_id })
        this.$message({ type: "success", message: "删除成功!" })
        this.AllGoods()
      } catch (error) {
        this.$message({ type: "info", message: "已取消删除" })
      }
    },
    AllGoods(timeout = 500) {
      setTimeout(async () => {
        const { query, pagenum, pagesize } = this.pages
        const res = await this.$api.all_goods({ query, pagenum, pagesize })
        this.goods = res.goods
        this.pages.total = res.total
        this.pages.pagenum = res.pagenum * 1
        console.log(this.pages)
      }, timeout)
    },
  },
  components: { PageHader, ELEPagination, ELEDialog, ELEForm },
}
</script>

<style  scoped lang='less'>
</style>