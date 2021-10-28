<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    class="dialog"
    destroy-on-close
  >
    <section class="dialog-main">
      <slot></slot>
    </section>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="() => (dialogVisible = false)">取 消</el-button>
        <el-button type="primary" @click="onConfirm()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "ELEDialog",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    isShow: {
      type: Boolean,
      default: false,
      require: true,
    },
    width: {
      type: String,
      default: "50%",
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.isShow
      },
      set(v) {
        this.$emit("changeStatus", v)
      },
    },
  },
  methods: {
    onConfirm() {
      this.$emit("confirm", false)
    },
  },
}
</script>

<style  scoped lang='less'>
</style>