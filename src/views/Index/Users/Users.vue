<template>
  <div class="users">
    <PageHader title="管理用户"></PageHader>

    <el-card class="users_card">
      <!-- 操作区域 -->
      <section class="users_card_operate">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              type="text"
              clearable
              placeholder="请输入内容"
              v-model="pages.query"
              @change="() => ReqInit()"
            >
              <el-button slot="append" icon="el-icon-search" @click="() => ReqInit()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="() => (userAddDialog = true)">添加用户</el-button>
          </el-col>
        </el-row>
      </section>

      <!-- 表单区域 -->
      <section class="users_card_table" style="margin: 20px 0">
        <el-table ref="table" :data="users" highlight-current-row border empty-text="暂无数据">
          <!--      @current-change="onCurrentChange" -->
          <el-table-column type="index" label="#" width="60"> </el-table-column>
          <el-table-column property="username" label="姓名" width="150"> </el-table-column>
          <el-table-column property="email" label="邮箱" width="200"> </el-table-column>
          <el-table-column property="mobile" label="电话" width="160"> </el-table-column>
          <el-table-column property="role_name" label="身份" width="150"> </el-table-column>
          <el-table-column label="状态" width="100">
            <!-- 想要拿到作用域的值必须带上slot的姓名 -->
            <template #default="slotProps">
              <el-switch
                v-model="slotProps.row.mg_state"
                @change="onUserState({ uId: slotProps.row.id, type: slotProps.row.mg_state })"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="slotProps">
              <el-tooltip content="编辑用户" placement="top" :enterable="false">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="onEditUserForm(slotProps.row.id)"
                ></el-button>
              </el-tooltip>

              <el-tooltip content="删除用户" placement="top" :enterable="false">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="onDelUser(slotProps.row.id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="分配用户" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-thumb" size="mini"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </section>

      <!-- 分页组件区域  可支持sync同步更新-->
      <ELEPagination
        :pagenum.sync="pages.pagenum"
        :pagesize.sync="pages.pagesize"
        :total="pages.total"
        @pagination="onPagination"
      />

      <!-- 添加用户弹出层 -->
      <ELEDialog
        title="添加用户"
        :isShow="userAddDialog"
        @confirm="onAddUserConfirm"
        @changeStatus="() => (userAddDialog = false)"
      >
        <ELEForm :formData="addUserForm" ref="addFormRef"></ELEForm>
      </ELEDialog>

      <!-- 编辑用户弹出层 -->
      <ELEDialog
        title="编辑用户"
        :isShow="userEditDialog"
        @confirm="onEditUserConfirm"
        @changeStatus="() => (userEditDialog = false)"
      >
        <ELEForm :formData="editUserForm" ref="editFormRef"></ELEForm>
      </ELEDialog>
    </el-card>
  </div>
</template>

<script>
import PageHader from "components/PageHader"
import ELEPagination from "components/Element/ELEPagination"
import ELEDialog from "components/Element/ELEDialog"
import ELEForm from "components/Element/ELEForm"

export default {
  name: "IndexUsers",
  data() {
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) return callback()
      callback(new Error("请输入合法的邮箱"))
    }
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
      if (regMobile.test(value)) return callback()
      callback(new Error("请输入合法的手机号"))
    }
    return {
      users: [],
      pages: { query: "", pagenum: 1, pagesize: 2, total: 0 },
      userAddDialog: false,
      userEditDialog: false,
      editUserForm: {
        id: null,
        labelWidth: "70px",
        inline: false,
        size: "small",
        formItem: [
          {
            type: "text",
            label: "用户名",
            isDisabled: true,
            placeholder: "请输入用户名",
            prop: "username",
            value: "",
            required: true,
          },
          {
            type: "email",
            label: "邮箱",
            isDisabled: false,
            placeholder: "请输入邮箱",
            prop: "email",
            value: "",
            required: true,
          },
          {
            type: "tel",
            label: "手机号",
            isDisabled: false,
            placeholder: "请输入手机号",
            prop: "mobile",
            value: "",
            required: true,
          },
        ],
        rules: {
          email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            { validator: checkEmail, trigger: "blur" },
          ],
          mobile: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            { validator: checkMobile, trigger: "blur" },
          ],
        },
      },
      addUserForm: {
        id: null,
        labelWidth: "70px",
        inline: false,
        size: "small",
        isShowBtn: false,
        formItem: [
          {
            type: "text",
            label: "用户名",
            isDisabled: false,
            placeholder: "请输入用户名",
            prop: "username",
            value: "",
            required: true,
          },
          {
            type: "password",
            label: "密码",
            isDisabled: false,
            placeholder: "请输入密码",
            prop: "password",
            value: "",
            required: true,
          },
          {
            type: "email",
            label: "邮箱",
            isDisabled: false,
            placeholder: "请输入邮箱",
            prop: "email",
            value: "",
            required: true,
          },
          {
            type: "tel",
            label: "手机号",
            isDisabled: false,
            placeholder: "请输入手机号",
            prop: "mobile",
            value: "",
            required: true,
          },
        ],
        rules: {
          username: [
            { required: true, message: "请输入用户名称", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" },
          ],
          email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            { validator: checkEmail, trigger: "blur" },
          ],
          mobile: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            { validator: checkMobile, trigger: "blur" },
          ],
        },
      },
    }
  },
  created() {
    this.ReqInit()
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
    /**
     * @param {id:number}} 用户Id
     * @desc 点击按钮后触发事件，根据ID请求用户编辑数据，随后把响应数据对应赋值到编辑表单中,然后更新ReqInit接口
     */
    async onEditUserForm(id) {
      const res = await this.SearchUser(id)
      // 保存用于onEditUserConfirm中请求edit_status接口
      this.editUserForm.id = id
      for (const item of this.editUserForm.formItem) {
        for (const key of Object.keys(res)) {
          if (item.prop == key) {
            item.value = res[key]
            break
          }
        }
      }
      this.ReqInit()
      this.userEditDialog = true
    },

    async onDelUser(id) {
      try {
        await this.$confirm("此操作将永久删除该用户,是否继续?", "温馨提示", { type: "warning" })
        this.DelUser(id)
        this.ReqInit()
      } catch (_) {
        this.$message.info("已取消删除")
      }
    },

    /**
     * @param {state:Boolean}} 子组件传过来的修改userEditDialog的值
     * @desc 点击确认后调用编辑的Ref获取当前表单检测状态,如果正确则调用编辑接口更新用户数据,然后更新ReqInit接口
     * @bug 1.更新完毕后数据无变化,需刷新才可以看到  解决方案:加载完毕数据再次请求
     * @bug 2.点击离开后下次进入数据还是上一个数据 解决方案:watch监听发生改变重新给子组件赋值
     */
    async onEditUserConfirm(state) {
      const checkAllStatus = await this.editFormRef.validate()
      if (!checkAllStatus) return
      const params = { id: this.editUserForm.id, ...this.editFormRef.form }
      this.EditUser(params)
      this.ReqInit()
      this.userEditDialog = state
    },

    /**
     * @param {id:Boolean}} 用户Id
     * @desc 请求需要修改用户数据
     */
    async SearchUser(id) {
      return await this.$api.search_users({ id })
    },

    /**
     * @param {params:{id:number,email?:string,mobile?:string}}
     * @desc 更新编辑后的数据
     */
    async EditUser(params) {
      await this.$api.edit_users(params)
    },

    /**
     * @param {params:{id:number}}
     * @desc 删除一个用户数据
     */
    async DelUser(id) {
      await this.$api.del_users({ id })
    },

    /**
     * @param {state:Boolean}}
     * @desc Dialog子组件传上来的
     */
    async onAddUserConfirm(state) {
      const checkAllStatus = await this.addFormRef.validate()
      if (!checkAllStatus) return
      const params = this.addFormRef.form
      this.AddUsers(params)
      this.userAddDialog = false
    },

    /**
     * @param {params:{username:string,password:string,email:string,mobile:string|number}}
     * @returns {void}
     * @desc 添加用户
     */
    async AddUsers(params) {
      await this.$api.add_users(params)
    },

    /**
     * @param {params:{query:string,pagenum:number,pagesize:number}}
     * @returns {void}
     * @desc 请求的table数据列表
     */
    async ReqInit() {
      const { query, pagenum, pagesize } = this.pages
      const { pagenum: pageNum, total, users } = await this.$api.users({ query, pagenum, pagesize })
      this.users = users
      this.pages.total = total
      this.pages.pagenum = pageNum
    },

    /**
     * @param {pages:{pagenum:number,pagesize:numbber}} 子组件向上传递的
     * @returns {void}
     * @desc 子组件改变调用接口初始化表单和分页
     */
    onPagination(pages) {
      this.ReqInit()
    },

    /**
     * @param {params:{uId!:number|string,type!:boolean}} 子组件向上传递的
     * @desc 更改用户状态
     */
    async onUserState(params) {
      await this.$api.users_status(params)
    },
  },

  components: { PageHader, ELEPagination, ELEDialog, ELEForm },
}
</script>

<style  scoped lang='less'>
</style>