<script>
import PageHader from "components/PageHader"
export default {
  name: "IndexRights",
  data() {
    return {
      rightsList: [],
    }
  },
  async created() {
    this.rightsList = await this.AllRights()
  },
  methods: {
    /**
     * @param {type:string}} list or true 两个参数
     * @desc 请求所以的权限两个状态的接口
     */
    async AllRights(type = "list") {
      return await this.$api.all_rights({ type })
    },
  },
  render(h) {
    return (
      <div class="rights">
        <PageHader title="角色列表"></PageHader>
        <el-card class="card">
          <section class="card_table">
            <el-table data={this.rightsList} style="width: 100%" border stripe>
              <el-table-column label="#" type="index" width="80px" align="center" />
              <el-table-column label="权限名称" prop="authName" align="center" />
              <el-table-column label="路径" prop="path" align="center" />
              <el-table-column
                label="权限等级"
                align="center"
                {...{
                  scopedSlots: {
                    default: data => {
                      return data.row.level == 0 ? (
                        <el-tag>一级</el-tag>
                      ) : data.row.level == 1 ? (
                        <el-tag type="success">二级</el-tag>
                      ) : (
                        <el-tag type="warning">三级</el-tag>
                      )
                    },
                  },
                }}
              />
            </el-table>
          </section>
        </el-card>
      </div>
    )
  },
}
</script>

