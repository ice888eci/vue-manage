<script>
import "@/assets/less/components/PageHader.less"
export default {
  // functional: true,
  props: {
    title: { type: String, default: "", require: true },
    subtitle: {
      type: String,
      default() {
        const _ = [
          `( *・ω・)✄╰ひ╯`,
          `(ÒωÓױ)呃！！！`,
          `(๑>◡<๑) `,
          `(,,Ծ▽Ծ,,)`,
          `=͟͟͞͞( •̀д•́)`,
          `┌(ㆆ㉨ㆆ)ʃ`,
          `( >﹏<。)～`,
          `（⺻▽⺻ ）`,
        ]
        return _[Math.floor(Math.random() * _.length)]
      },
    },
  },

  render(h) {
    return (
      <div class="page_header">
        <i class="el-icon-back" onClick={() => this.$router.back()}></i>
        <h1>{this.title}</h1>
        <span>{this.subtitle}</span>
      </div>
    )
  },
}
</script>