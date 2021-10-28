<template>
  <div class="ele_pagination">
    <el-pagination
      :current-page.sync="currentPageNum"
      :page-size.sync="currentPageSize"
      @size-change="onCurrentChange"
      @current-change="onCurrentChange"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
    />
  </div>
</template>

<script>
export default {
  name: "ELEPagination",
  props: {
    pagenum: {
      type: Number,
      default: 0,
    },
    pagesize: {
      type: Number,
      default: 2,
    },

    total: {
      type: Number,
      default: 0,
    },

    pageSizes: {
      type: Array,
      default() {
        return [1, 2, 5, 10]
      },
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
  },

  computed: {
    /**
     * @computed currentPageNum
     * @get 返回父组件的pagenum的值
     * @set @val 是.sync同步的值 然后向上父组件同步
     * @desc
     */
    currentPageNum: {
      get() {
        return this.pagenum
      },
      set(val) {
        this.$emit("update:pagenum", val)
      },
    },
    currentPageSize: {
      get() {
        return this.pagesize
      },
      set(val) {
        this.$emit("update:pagesize", val)
      },
    },
  },
  methods: {
    /**
     * @method onCurrentChange
     * @param {Type} 可能是currentPageNum或者currentPageSize
     * @returns {Type} void
     * @desc 使用sync同步更新了page-size.sync & page-size.sync所以不需要再多建立方法去重新赋值他们
     */
    onCurrentChange() {
      this.$emit("pagination", { pagenum: this.currentPageNum, pagesize: this.currentPageSize })
    },
  },
  components: {},
}
</script>

<style  scoped lang='less'>
.ele_pagination {
  margin-top: 20px;
}
</style>