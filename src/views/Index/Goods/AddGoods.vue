<template>
  <div class="add_goods">
    <PageHader title="添加商品"></PageHader>
    <el-card class="card">
      <el-alert title="消息提示的文案" type="info" show-icon />

      <el-steps :active="active * 1" align-center class="add_goods_steps" finish-status="success">
        <el-step title="基本信息" />
        <el-step title="商品参数" />
        <el-step title="商品属性" />
        <el-step title="商品图片" />
        <el-step title="商品内容" />
        <el-step title="完成" />
      </el-steps>

      <el-form :model="form" status-icon :rules="rules" ref="addFormRef" label-position="top">
        <el-tabs
          class="add_goods_tabs"
          tab-position="left"
          v-model="active"
          :before-leave="onBeforeLeave"
          @tab-click="onTabClick"
        >
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model.trim="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model.number="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model.number="form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model.number="form.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品种类">
              <el-cascader v-model="form.goods_cat" :options="options" :props="props" clearable />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <el-form-item :label="item.attr_name" v-for="item in manyData" :key="item.attr_id">
              <el-checkbox-group
                v-model="item.attr_vals"
                v-for="(val, index) in item.attr_vals"
                :key="index"
              >
                <el-checkbox :label="val"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <el-form-item :label="item.attr_name" v-for="item in onlyData" :key="item.attr_id">
              <el-input v-model.trim="item.attr_vals" disabled></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              :action="uploadUrl"
              :on-preview="onPreview"
              :on-success="onSuccess"
              :on-remove="onRemove"
              :headers="headers"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>

          <el-tab-pane label="商品内容">
            <quill-editor v-model.trim="form.goods_introduce" />
            <el-button type="primary" @click="addGoods" style="margin: 10px 0">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!--  -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import config from "config"
import PageHader from "components/PageHader"
export default {
  name: "IndexAddGoods",
  data() {
    return {
      active: 0,
      //
      uploadUrl: `${config.http.baseURL}/upload`,
      previewPath: "",
      previewVisible: false,
      headers: {
        Authorization: this.$utils.getToken(),
      },
      manyData: [],
      onlyData: {},
      options: [],
      form: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_introduce: "",
        goods_cat: [],
        pics: [],
        attrs: [],
      },
      props: { label: "cat_name", expandTrigger: "hover", value: "cat_id" },
      rules: {
        goods_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        goods_price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        goods_weight: [{ required: true, message: "请输入商品重量", trigger: "blur" }],
        goods_number: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        goods_cat: [{ required: true, message: "请选择商品分类", trigger: "blur" }],
      },
    }
  },
  async created() {
    this.options = await this.$api.all_categories({ type: 3 })
  },
  computed: {
    formatGoodsCat() {
      return this.form.goods_cat.length ? this.form.goods_cat.join(",") : ""
    },
    goodsCatSuccess() {
      return this.form.goods_cat.length == 3 ? true : false
    },
    getId() {
      return this.form.goods_cat.length == 3 ? this.form.goods_cat[0] : null
    },
  },
  methods: {
    async addGoods() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error("请填写必要的表单项！")

        const form = JSON.parse(JSON.stringify(this.form))
        this.manyData.forEach(item => {
          const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals.join(",") }
          this.form.attrs.push(newInfo)
        })
        // 处理静态属性
        this.onlyData.forEach(item => {
          const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals }
          this.form.attrs.push(newInfo)
        })
        form.attrs = this.form.attrs
        form.goods_cat = form.goods_cat.join(",")

        await this.$api.add_goods(form)
        setTimeout(() => this.$router.push({ name: "IndexGoods" }))
      })
    },
    onSuccess(response, file, fileList) {
      this.form.pics.push({ pic: response.data.tmp_path })
    },
    onRemove(file, fileList) {
      let path = file.response.data.tmp_path
      let index = this.form.pics.findIndex(v => v.tmp_path == path)
      this.form.pics.splice(index, 1)
    },
    onPreview(file) {
      let path = file.response.data.url
      this.previewPath = path
      this.previewVisible = true
    },

    async onTabClick() {
      if (this.active == 1) {
        this.manyData = await this.AllAttributes()
        return
      }
      if (this.active == 2) {
        this.onlyData = await this.AllAttributes("only")

        return
      }
    },
    async AllAttributes(sel = "many") {
      const res = await this.$api.all_attributes({
        id: this.form.goods_cat[2],
        sel,
      })
      if (sel == "many") {
        res.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(",") : []
        })
      }
      return res
    },

    onBeforeLeave(newA, oldA) {
      if (oldA == 0 && !this.goodsCatSuccess) {
        this.$message.info("请先选择分类")
        return false
      }
    },
  },
  components: { PageHader },
}
</script>

<style  scoped lang='less'>
.add_goods_steps {
  padding: 20px 0;
  font-size: 12px;
}
.add_goods_tabs {
  height: auto;
}
/deep/.ql-editor {
  min-height: 240px;
}
</style>