<template>
  <div class="categories">
    <PageHader title="商品分类" />

    <el-card class="card">
      <section class="card_add_user">
        <el-row type="flex" class="row-bg" justify="start">
          <el-col :span="6">
            <el-button type="primary" @click="onAddDialoging()">添加分类</el-button>
          </el-col>
        </el-row>
      </section>

      <zk-table
        style="margin: 15px 0"
        ref="table"
        index-text="#"
        :data="list"
        :columns="columns"
        :border="props.border"
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType"
        :children-prop="props.childrenProp"
        :is-fold="props.isFold"
        :expand-type="props.expandType"
        :selection-type="props.selectionType"
      >
        <template #isEfficient="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <template #sort="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>

        <template #opt="scope">
          <el-tooltip content="编辑分类" placement="top" :enterable="false">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="onEdit(scope.row.cat_id)"
            ></el-button>
          </el-tooltip>

          <el-tooltip content="删除分类" placement="top" :enterable="false">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="onDel(scope.row.cat_id)"
            ></el-button>
          </el-tooltip>
        </template>
      </zk-table>
    </el-card>

    <ELEPagination
      :pagenum.sync="pages.pagenum"
      :pagesize.sync="pages.pagesize"
      :total="pages.total"
      @pagination="onPagination"
    />

    <!-- 添加弹出侧 -->
    <ELEDialog
      title="添加分类"
      :isShow="isShowAddDialog"
      @confirm="onAddConfirm"
      @changeStatus="() => (isShowAddDialog = false)"
    >
      <ELEForm
        :formData="addForm"
        :optionsData="parentCateList"
        ref="addFormRef"
        @values="v => (addValues = v)"
      />
    </ELEDialog>

    <!-- 编辑弹出层 -->

    <ELEDialog
      title="编辑分类"
      :isShow="isShowEditDialog"
      @confirm="onEditConfirm"
      @changeStatus="() => (isShowEditDialog = false)"
    >
      <ELEForm :formData="editForm" ref="editFormRef" @values="v => (editValues = v)" />
    </ELEDialog>
  </div>
</template>

<script>
// 表格引入
import ZkTable from "vue-table-with-tree-grid"
import PageHader from "components/PageHader"
import ELEDialog from "components/Element/ELEDialog"
import ELEForm from "components/Element/ELEForm"
import ELEPagination from "components/Element/ELEPagination"

export default {
  name: "IndexCategories",

  data() {
    return {
      isShowAddDialog: false,
      isShowEditDialog: false,
      pages: { query: "", pagenum: 1, pagesize: 5, total: 0 },
      props: {
        border: true,
        showRowHover: false,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false,
        childrenProp: `children`,
      },
      list: [],
      parentCateList: [],
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          width: "400px",
        },
        {
          label: "是否有效",
          minWidth: "50px",
          type: "template",
          template: "isEfficient",
        },
        {
          label: "排序",
          type: "template",
          template: "sort",
        },
        {
          label: "操作",
          minWidth: "200px",
          // 将当前列定义为模板列
          type: "template",
          // 当前列使用的模板名称
          template: "opt",
        },
      ],
      addValues: {},
      addForm: {
        id: null,
        labelWidth: "70px",
        inline: false,
        size: "small",
        isShowBtn: false,
        formItem: [
          {
            type: "text",
            label: "分类名称",
            isDisabled: false,
            placeholder: "请输入分类名称",
            prop: "cat_name",
            value: "",
            required: true,
          },
          {
            type: "cascader",
            label: "请选择",
            placeholder: "请选择分类名称",
            prop: "cascader",
            props: { value: `cat_id`, label: "cat_name" },
            value: "",
            required: true,
          },
        ],
        rules: {
          cat_name: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
          ],
        },
      },
      editValues: {},
      editForm: {
        id: null,
        labelWidth: "70px",
        inline: false,
        size: "small",
        isShowBtn: false,
        formItem: [
          {
            type: "text",
            label: "更换名称",
            isDisabled: false,
            placeholder: "请输入分类名称",
            prop: "cat_name",
            value: "",
            required: true,
          },
        ],
        rules: {
          cat_name: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
          ],
        },
      },
    }
  },

  created() {
    this.AllCategories(0)
  },
  computed: {
    addFormRef() {
      return this.$refs.addFormRef && this.$refs.addFormRef
    },
    editFormRef() {
      return this.$refs.editFormRef && this.$refs.editFormRef
    },
  },
  methods: {
    async onAddDialoging() {
      this.isShowAddDialog = true
      this.parentCateList = await this.$api.all_categories({ type: 2 })
    },
    /**
     * @desc 子组件改变调用接口初始化表单和分页
     */
    onPagination(pages) {
      this.AllCategories(0)
    },

    async AddCategories(params) {
      this.$api.add_categories(params)
    },

    async AllCategories(timeout = 500) {
      setTimeout(async () => {
        const { query, pagenum, pagesize } = this.pages
        console.log(this.pages, "page")
        const res = await this.$api.all_categories({ query, pagenum, pagesize })
        this.pages.pagenum = res.pagenum + 1
        this.pages.pagesize = res.pagesize
        this.pages.total = res.total
        this.list = res.result
        console.log(res)
      }, timeout)
    },

    /**
     *@desc 格式化form表单emit上来的数据用于发送添加请求
     */
    formatReqAddParams(clear = false) {
      let cat_pid = 0,
        cat_level = 0

      if (clear) {
        this.addValues = {}
        return {}
      }
      const { cascader, cat_name } = this.addValues
      if (cascader.length > 0) {
        cat_pid = cascader[cascader.length - 1]
        cat_level = cascader.length
      }
      return { cat_pid, cat_name, cat_level }
    },
    async onAddConfirm() {
      const checkAllStatus = await this.addFormRef.validate()
      if (!checkAllStatus) return
      this.AddCategories(this.formatReqAddParams())
      this.AllCategories()
      this.isShowAddDialog = false
    },

    /**
     * @params {id} cat_id
     * @desc 修改时通过cat_id查询此数据
     */
    async onEdit(id) {
      this.isShowEditDialog = true
      const { cat_name, cat_id } = await this.$api.search_categories({ id })
      this.editForm.id = cat_id
      this.editForm.formItem[0].value = cat_name
    },

    /**
     * @params {id} cat_id
     * @desc 修改提交时更新
     */
    async onEditConfirm() {
      const checkAllStatus = await this.editFormRef.validate()
      // console.log(checkAllStatus)
      if (!checkAllStatus) return
      // 生成参数
      const params = { id: this.editForm.id, ...this.editValues }
      // 请求
      await this.$api.update_categories(params)
      //  初始化页面
      this.AllCategories()
      this.isShowEditDialog = false
    },

    async onDel(id) {
      try {
        await this.$confirm("此操作将永久删除该用户,是否继续?", "温馨提示", { type: "warning" })
        await this.$api.del_categories({ id })
        // 删除后延迟更新
        this.AllCategories()
      } catch (_) {
        this.$message.info("已取消删除")
      }
    },
  },

  components: { PageHader, ZkTable, ELEDialog, ELEForm, ELEPagination },
}
</script>

<style  scoped lang='less'>
</style>