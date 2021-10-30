<template>
  <el-form
    ref="form"
    :model="form"
    :label-width="formData.labelWidth"
    :inline="formData.inline"
    :rules="formData.rules"
    :size="formData.size"
    :label-position="formData.labelPosition"
  >
    <el-form-item
      v-for="(item, index) in formData.formItem"
      :key="index"
      :label="item.label"
      :prop="item.prop"
    >
      <!-- 文本框 -->
      <el-input
        v-if="item.type === 'text'"
        v-model="form[item.prop]"
        :disabled="item.isDisabled"
        :placeholder="item.placeholder || '请输入'"
      />
      <!-- 密码框 -->
      <el-input
        v-if="item.type === 'password'"
        v-model="form[item.prop]"
        type="password"
        :disabled="item.isDisabled"
      />

      <el-input
        v-if="item.type === 'email'"
        v-model="form[item.prop]"
        type="email"
        :disabled="item.isDisabled"
      />

      <el-input
        v-if="item.type === 'tel'"
        v-model="form[item.prop]"
        type="mobile"
        :disabled="item.isDisabled"
      />

      <!-- 单选框 -->
      <el-radio-group v-if="item.type === 'radio'" v-model="form[item.prop]">
        <el-radio v-for="item in item.options" :key="item.value" :label="item.value">
          {{ item.name }}
        </el-radio>
      </el-radio-group>
      <!-- 单选按钮 -->
      <el-radio-group
        v-if="item.type === 'radioButton'"
        v-model="form[item.prop]"
        :disabled="item.isDisabled"
      >
        <el-radio-button v-for="item in item.options" :key="item.value" :label="item.value">
          {{ item.name }}
        </el-radio-button>
      </el-radio-group>
      <!-- 多选框组 -->
      <el-checkbox-group v-if="item.type === 'checkbox'" v-model="form[item.prop]">
        <el-checkbox
          v-for="item in item.options"
          :key="item.value"
          :disabled="item.isDisabled"
          :label="item.value"
        >
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <!-- 下拉框 -->
      <el-select
        v-if="item.type === 'select'"
        v-model="form[item.prop]"
        :multiple="item.multiple"
        collapse-tags
        clearable
        :disabled="item.isDisabled"
        :placeholder="item.placeholder"
      >
        <el-option
          v-for="item in item.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.isDisabled"
        />
      </el-select>
      <!-- 联级面板 -->
      <el-cascader
        v-if="item.type === 'cascader'"
        v-model="form[item.prop]"
        :options="optionsData"
        :placeholder="item.placeholder || '请选择'"
        :props="item.props || {}"
        clearable
      />
      <!-- 开关 -->
      <el-switch v-if="item.type === 'switch'" v-model="form[item.prop]" />
      <!-- 日期选择器 -->
      <el-date-picker
        v-if="item.type === 'date'"
        v-model="form[item.prop]"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
      />
      <!-- 时间选择器 -->
      <el-time-picker
        v-if="item.type === 'time'"
        v-model="form[item.prop]"
        placeholder="请选择时间"
      />
      <!-- 日期时间选择器 -->
      <el-date-picker
        v-if="item.type === 'dateTime'"
        v-model="form[item.prop]"
        type="datetime"
        placeholder="选择日期时间"
      />
      <!-- 日期和时间范围选择器  -->
      <el-date-picker
        v-if="item.type === 'datetimerange'"
        v-model="form[item.prop]"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </el-form-item>

    <el-form-item v-if="formData.isShowBtn == true">
      <el-button type="primary" @click="onSubmit()"> 保存 </el-button>
      <el-button @click="resetForm()"> 重置 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
    optionsData: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    formRef() {
      return this.$refs.form && this.$refs.form
    },
  },
  created() {
    this.initValue(this.formData.formItem)
    console.log(this.formData, 111)
  },
  methods: {
    onSubmit() {
      this.formRef.validate(valid => {
        if (valid) {
          console.log(this.form)
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.formRef.resetFields()
    },

    initValue(arr) {
      const obj = {}
      arr.forEach(item => {
        // 这里不能写成this.form = obj  因为传递的不是值，而是引用，他们指向了同一个空间！
        if (item.id) obj[item.id] = item.id
        obj[item.prop] = item.value
      })
      this.form = { ...obj }
    },
    // 检测所有value是否合法 注意需要异步等待callback回调后再返回
    validate() {
      return new Promise(res => {
        this.formRef.validate(valid => res(valid))
      })
    },
  },

  // 每次打开编辑都需要更新一次 v-model双向绑定更新的太慢
  watch: {
    formData: {
      handler(val) {
        this.initValue(val.formItem)
        // console.log(1)
      },
      deep: true,
    },
    form: {
      handler(val) {
        this.$emit("values", val)
        // console.log(val, 1111111)
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
</style>
