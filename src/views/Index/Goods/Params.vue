<template>
  <div class="params">
    <PageHader title="分类参数" />

    <el-card class="card">
      <el-alert title="警告提示的文案" type="warning" show-icon style="margin: 0px 0 10px" />

      <section class="choose_category">
        <p>选择商品分类</p>
        <el-cascader
          v-model="cascaderConfig.active"
          :options="cascaderConfig.option"
          :props="cascaderConfig.props"
          @change="onCascaderChange"
        />
      </section>

      <el-tabs v-model="activeTab" @tab-click="onTabChange">
        <el-tab-pane label="用户管理" name="many">
          <section class="card_add_user" style="margin: 0px 0 10px">
            <el-row type="flex" class="row-bg" justify="start">
              <el-col :span="6">
                <el-button type="primary" @click="onAddParams()" :disabled="isParamsButtonShow">
                  添加参数
                </el-button>
              </el-col>
            </el-row>
          </section>

          <el-table :data="manyData" border style="width: 100%" stripe>
            <el-table-column type="expand" width="50">
              <template #default="scope">
                <el-tag
                  style="margin: 3px"
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="onClose(i, scope.row)"
                  >{{ item }}</el-tag
                >

                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="onInputConfirm(scope.row)"
                  @blur="onInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)"
                  >+ 新增标签</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="100"> </el-table-column>
            <el-table-column property="attr_name" label="参数名称"> </el-table-column>
            <el-table-column label="操作">
              <template #default="props">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="onEdit(props.row)"
                />
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="onDelUser(props.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="配置管理" name="only">
          <section class="card_add_user">
            <el-row type="flex" class="row-bg" justify="start">
              <el-col :span="6">
                <el-button
                  type="primary"
                  @click="() => (isShowAddDialog = true)"
                  :disabled="isParamsButtonShow"
                  >静态参数</el-button
                >
              </el-col>
            </el-row>
          </section>

          <el-table :data="onlyData" border style="width: 100%" stripe>
            <el-table-column type="expand" width="50">
              <template #default="scope">
                <el-tag
                  style="margin: 3px"
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="onClose(i, scope.row)"
                  >{{ item }}</el-tag
                >

                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="onInputConfirm(scope.row)"
                  @blur="onInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)"
                  >+ 新增标签</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="100"> </el-table-column>
            <el-table-column property="attr_name" label="参数名称"> </el-table-column>
            <el-table-column label="操作">
              <template #default="props">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="onEdit(props.row)"
                />
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="onDelUser(props.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!--  -->
    <ELEDialog
      title="动态参数"
      :isShow="isShowAddDialog"
      @confirm="addConfirm"
      @changeStatus="() => (isShowAddDialog = false)"
    >
      <ELEForm :formData="addForm" ref="addFormRef" @values="v => (addValues = v)"></ELEForm>
    </ELEDialog>

    <!-- 编辑用户弹出层 -->
    <ELEDialog
      title="动态编辑"
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
import ELEDialog from "components/Element/ELEDialog"
import ELEForm from "components/Element/ELEForm"
export default {
  name: "IndexParams",
  data() {
    return {
      isShowAddDialog: false,
      isShowEditDialog: false,
      activeTab: "many",
      cascaderConfig: {
        option: [],
        active: [],
        props: { expandTrigger: "hover", label: "cat_name", value: "cat_id" },
      },
      onlyData: [],
      manyData: [],
      addForm: {
        id: null,
        labelWidth: "100px",
        inline: false,
        size: "small",
        isShowBtn: false,
        formItem: [
          {
            type: "text",
            label: "动态参数",
            isDisabled: false,
            placeholder: "请输入动态参数",
            prop: "attr_name",
            value: "",
            required: true,
          },
        ],
        rules: {
          attr_name: [
            { required: true, message: "请输入动态参数", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
          ],
        },
      },
      editForm: {
        id: null,
        labelWidth: "100px",
        inline: false,
        size: "small",
        isShowBtn: false,
        formItem: [
          {
            type: "text",
            label: "编辑参数",
            isDisabled: false,
            placeholder: "请编辑动态参数",
            prop: "attr_name",
            value: "",
            required: true,
          },
        ],
        rules: {
          attr_name: [
            { required: true, message: "请编辑动态参数", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
          ],
        },
      },
      addValues: {},
      editValues: {},
    }
  },
  async created() {
    this.cascaderConfig.option = await this.$api.all_categories({ type: 3 })
  },
  computed: {
    isParamsButtonShow() {
      return this.cascaderConfig.active.length !== 3 ? true : false
    },
    getId() {
      return this.cascaderConfig.active.length == 3 ? this.cascaderConfig.active[2] : null
    },
    addFormRef() {
      return this.$refs.addFormRef && this.$refs.addFormRef
    },
    editFormRef() {
      return this.$refs.editFormRef && this.$refs.editFormRef
    },
  },
  methods: {
    // 标签失去焦点事件 失去焦点判断input是否为空 为空的话直接返回 不为空则添加完成请求接口
    onInputConfirm(row) {
      row.inputValue = row.inputValue.trim()
      if (!row.inputValue.length) {
        row.inputVisible = false
        return
      }
      row.attr_vals.push(row.inputValue)
      // push后清空内容
      row.inputValue = ""
      row.inputVisible = false
      this.updateTag(row)
    },

    async updateTag(row) {
      await this.$api.update_attributes_tag({
        id: this.getId,
        attrId: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: this.activeTab,
        attr_vals: row.attr_vals.join(","),
      })
    },

    //删除标签同步接口
    onClose(i, row) {
      row.attr_vals.splice(i, 1)
      this.updateTag(row)
    },

    // vif删除了所以需要等待渲染完毕再focus
    showInput(row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 编辑提交按钮事件
    async editConfirm(state) {
      const checkAllStatus = await this.editFormRef.validate()
      if (!checkAllStatus) return
      const params = {
        id: this.editForm.cat_id,
        ...this.editValues,
        attrId: this.editForm.attr_id,
        attr_sel: this.activeTab,
      }
      await this.$api.update_attributes(params)
      this.AllAttributes(this.getId)
      this.isShowEditDialog = false
    },
    // 添加提交按钮事件
    async addConfirm() {
      const checkAllStatus = await this.addFormRef.validate()
      console.log(checkAllStatus)
      if (!checkAllStatus) return
      const params = { id: this.getId, ...this.addValues, attr_sel: this.activeTab }
      await this.$api.add_attributes(params)
      this.AllAttributes(this.getId)
      this.isShowAddDialog = false
    },
    // 所以数据
    async AllAttributes(id) {
      const res = await this.$api.all_attributes({ id, sel: this.activeTab })

      res.forEach(item => {
        item.inputVisible = false
        item.inputValue = ""
        item.attr_vals = item.attr_vals ? item.attr_vals.split(",") : []
      })
      this[`${this.activeTab}Data`] = res

      console.log(res)
    },
    // 打开弹出侧
    onAddParams() {
      this.isShowAddDialog = true
    },
    // 切换tab
    onTabChange() {
      this.cascaderConfig.active = []
    },

    // 三级联动选中后刷新页面
    onCascaderChange(idsArr) {
      if (this.isParamsButtonShow) return
      this.AllAttributes(this.getId)
    },

    async onEdit({ attr_id: attrId, cat_id: id }) {
      this.isShowEditDialog = true
      const res = await this.$api.search_attributes({ attrId, id, attr_sel: this.activeTab })
      this.$set(this.editForm, "attr_id", res.attr_id)
      this.$set(this.editForm, "cat_id", res.cat_id)
      this.editForm.formItem[0].value = res.attr_name
    },

    async onDelUser({ attr_id: attrid, cat_id: id }) {
      try {
        await this.$confirm("此操作将永久删除该用户,是否继续?", "温馨提示", { type: "warning" })
        await this.$api.del_attributes({ attrid, id })
        this.AllAttributes(this.getId)
      } catch (_) {
        this.$message.info("已取消删除")
      }
    },
  },
  components: { PageHader, ELEDialog, ELEForm },
}
</script>

<style  scoped lang='less'>
.choose_category {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  p {
    font-size: 14px;
    margin-right: 15px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>