<template>
  <div class="Roles">
    <PageHader title="角色列表"></PageHader>
    <el-card class="card">
      <section class="card_add_user">
        <el-row type="flex" class="row-bg" justify="start">
          <el-col :span="6">
            <el-button type="primary" @click="() => (isShowAddDialog = true)">添加角色</el-button>
          </el-col>
        </el-row>
      </section>

      <section class="card_table" style="margin: 15px 0">
        <el-table :data="roleList" style="width: 100%">
          <el-table-column type="expand">
            <template #default="props">
              <el-row v-for="v1 in props.row.children" :key="v1.id" class="layout_row">
                <!-- 一级 -->
                <el-col :span="5">
                  <el-tag type="success" closable @close="onCloseTag(props.row, v1.id)">
                    {{ v1.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 二级 -->
                <el-col :span="19">
                  <el-row v-for="v2 in v1.children" :key="v2.id" class="layout_row">
                    <el-col :span="6">
                      <el-tag closable @close="onCloseTag(props.row, v2.id)">
                        {{ v2.authName }}
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!-- 三级 -->

                    <el-col :span="18">
                      <el-tag
                        type="warning"
                        closable
                        @close="onCloseTag(props.row, v3.id)"
                        v-for="v3 in v2.children"
                        :key="v3.id"
                      >
                        {{ v3.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="#" type="index" />
          <el-table-column label="角色名称" prop="roleName" />
          <el-table-column label="角色描述" prop="roleDesc" />

          <el-table-column label="操作" prop="desc" align="center">
            <template #default="props">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="onEditUser(props.row.id)"
              />
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="onDelUser(props.row.id)"
              />
              <el-tooltip content="分配权限" placement="top" :enterable="false">
                <el-button
                  type="warning"
                  icon="el-icon-thumb"
                  size="mini"
                  @click="onRightsUser(props.row)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>

    <!-- 添加角色弹出层 -->
    <ELEDialog
      title="添加角色"
      :isShow="isShowAddDialog"
      @confirm="addConfirm"
      @changeStatus="() => (isShowAddDialog = false)"
    >
      <ELEForm :formData="addForm" ref="addFormRef" @values="v => (addValues = v)"></ELEForm>
    </ELEDialog>

    <!-- 编辑角色弹出层 -->
    <ELEDialog
      title="编辑角色"
      :isShow="isShowEditDialog"
      @confirm="editConfirm"
      @changeStatus="() => (isShowEditDialog = false)"
    >
      <ELEForm :formData="editForm" ref="editFormRef" @values="v => (editValues = v)"></ELEForm>
    </ELEDialog>

    <!-- 分配角色弹出层 -->
    <ELEDialog
      width="55%"
      title="编辑角色"
      :isShow="isShowRightsDialog"
      @confirm="rightsConfirm"
      @changeStatus="() => (isShowRightsDialog = false)"
    >
      <el-tree
        ref="rightsTreeRef"
        node-key="id"
        show-checkbox
        :data="rightsList"
        :props="rightsConfig.props"
        :default-expanded-keys="rightsConfig.defaultExpandedKeys"
        :default-checked-keys="rightsConfig.defaultCheckedkeys"
      />
    </ELEDialog>
  </div>
</template>

<script>
import ELEDialog from "components/Element/ELEDialog"
import ELEForm from "components/Element/ELEForm"
import PageHader from "components/PageHader"
export default {
  name: "IndexRoles",
  data() {
    return {
      roleList: [],
      rightsList: [],
      isShowAddDialog: false,
      isShowEditDialog: false,
      isShowRightsDialog: false,
      addValues: {},
      editValues: {},
      addForm: {
        id: null,
        labelWidth: "70px",
        inline: false,
        size: "small",
        isShowBtn: false,
        formItem: [
          {
            type: "text",
            label: "名称",
            isDisabled: false,
            placeholder: "请输入角色名称",
            prop: "roleName",
            value: "",
            required: true,
          },
          {
            type: "text",
            label: "描述",
            isDisabled: false,
            placeholder: "请输入角色描述",
            prop: "roleDesc",
            value: "",
            required: true,
          },
        ],
        rules: {
          roleName: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
          ],
          roleDesc: [
            { required: true, message: "请输入角色描述", trigger: "blur" },
            { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" },
          ],
        },
      },
      editForm: {
        id: null,
        labelWidth: "70px",
        inline: false,
        size: "small",
        isShowBtn: false,
        formItem: [
          {
            type: "text",
            label: "名称",
            isDisabled: false,
            placeholder: "请输入角色名称",
            prop: "roleName",
            value: "",
            required: true,
          },
          {
            type: "text",
            label: "描述",
            isDisabled: false,
            placeholder: "请输入角色描述",
            prop: "roleDesc",
            value: "",
            required: true,
          },
        ],
        rules: {
          roleName: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
          ],
          roleDesc: [
            { required: true, message: "请输入角色描述", trigger: "blur" },
            { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" },
          ],
        },
      },

      rightsConfig: {
        roleId: null,
        props: { children: "children", label: "authName" },
        defaultExpandedKeys: [],
        defaultCheckedkeys: [],
      },
    }
  },
  computed: {
    addFormRef() {
      return this.$refs.addFormRef && this.$refs.addFormRef
    },
    editFormRef() {
      return this.$refs.editFormRef && this.$refs.editFormRef
    },
    rightsTreeRef() {
      return this.$refs.rightsTreeRef && this.$refs.rightsTreeRef
    },
  },
  created() {
    this.initRoleList()
  },

  methods: {
    /**
     * @desc 分配权限确认按钮弹出侧 通过Ref获取到选中一半的和全部选中的id 请求数据
     */
    async rightsConfirm() {
      const rids = [
        ...this.rightsTreeRef.getCheckedKeys(),
        ...this.rightsTreeRef.getHalfCheckedKeys(),
      ].join(",")
      this.update_roles({ rids, roleId: this.rightsConfig.roleId })
      this.initRoleList(500)
      this.isShowRightsDialog = false
    },

    /**
     * @desc 更新树状权限接口
     */
    async update_roles(params) {
      await this.$api.update_roles(params)
    },

    /**
     * @param {role:string}}角色列
     * @desc 点击打开树状图 获取tree数据并展开选中的数据 每次进入都需清除上次的keys
     */
    async onRightsUser(role) {
      this.rightsConfig.roleId = role.id
      this.rightsConfig.defaultCheckedkeys = []
      this.rightsList = await this.AllRightsTree()
      this.$utils.getLeafKeys(role, this.rightsConfig.defaultCheckedkeys)
      this.rightsConfig.defaultExpandedKeys = this.rightsConfig.defaultCheckedkeys
      this.isShowRightsDialog = true
    },
    /**
     * @param {type:string}}
     * @desc 请求所有树状权限
     */
    async AllRightsTree(type = "tree") {
      return await this.$api.all_rights({ type })
    },

    initRoleList(timeout = 0) {
      setTimeout(async () => (this.roleList = await this.AllRoles()), timeout)
    },

    /**
     * @param {type:string}}
     * @desc 角色列表接口
     */
    async AllRoles() {
      return await this.$api.all_roles()
    },

    /**
     * @param {roleName:string,roleDesc:string}}
     * @desc 添加角色接口
     * @doubt 为什么要解构params? 因为它上面有get set原型属性
     */
    async AddRoles(params) {
      return await this.$api.add_roles(params)
    },

    /**
     * @param {params:{id:number}}
     * @desc 删除一个用户数据接口
     */
    async DelRolesr(id) {
      return await this.$api.del_roles({ id })
    },

    /**
     * @param {roleId!:string,rightId:string}
     * @desc 删除角色指定的权限
     */
    async DelUserRolesr(params) {
      return await this.$api.del_user_roles(params)
    },

    /**
     * @param {params:{id:number}}
     * @desc 查询一个用户数据接口
     */
    async SearchRolesr(id) {
      return await this.$api.search_roles({ id })
    },

    /**
     * @param {id!:string,roleName?:string,roleDesc?:string}
     * @desc 更新修改的数据
     */
    async EditRolesr(params) {
      return await this.$api.edit_roles(params)
    },

    /**
     * @param {role:array}} 当前顶层roleList
     * @desc 删除用户标签权限监听事件
     */
    async onCloseTag(role, rightId) {
      try {
        // 点击后再执行
        await this.$confirm("此操作将永久删除该用户,是否继续?", "温馨提示", {
          type: "warning",
        })
        // 浅拷贝删除后把返回最新数据重新加载
        role.children = await this.DelUserRolesr({ roleId: role.id, rightId })
      } catch (_) {
        this.$message.info("已取消删除")
      }
    },

    /**
     * @param {roleName:string}} 用户ID
     * @desc 删除用户一条数据
     */
    async onDelUser(id) {
      try {
        await this.$confirm("此操作将永久删除该用户,是否继续?", "温馨提示", { type: "warning" })
        this.DelRolesr(id)
        // 删除后延迟更新
        this.initRoleList(500)
      } catch (_) {
        this.$message.info("已取消删除")
      }
    },

    /**
     * @param {roleName:string,roleDesc:string}}
     * @desc 添加时点击提交表单时候触发 并检测是否合法，如果合法则提交创建该用户并刷新页面
     * @doubt 为什么要解构params? 因为它上面有get set原型属性
     */
    async addConfirm() {
      const checkAllStatus = await this.addFormRef.validate()
      if (!checkAllStatus) return
      this.AddRoles(this.addValues)
      // 初始化列表
      this.initRoleList(500)
      // 关闭
      this.isShowAddDialog = false
    },

    async onEditUser(id) {
      const res = await this.SearchRolesr(id)
      this.editForm.id = id
      for (const item of this.editForm.formItem) {
        for (const key of Object.keys(res)) {
          if (item.prop == key) {
            item.value = res[key]
            break
          }
        }
      }
      this.isShowEditDialog = true
    },

    /**
     * @param {roleName:string,roleDesc:string}}
     * @desc 修改用户时点击提交表单时候触发 并检测是否合法，如果合法则提交编辑该用户并刷新页面
     * @doubt
     */
    async editConfirm() {
      const checkAllStatus = await this.editFormRef.validate()
      if (!checkAllStatus) return
      const params = { id: this.editForm.id, ...this.editValues }
      this.EditRolesr(params)
      this.initRoleList(500)
      this.isShowEditDialog = false
    },
  },

  components: { PageHader, ELEDialog, ELEForm },
}
</script>

<style  scoped lang='less'>
.el-tag {
  margin: 7px;
}
.layout_row:first-of-type {
  border-top: none;
}
.layout_row {
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
}
</style>