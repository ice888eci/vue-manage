<script>
import "@/assets/less/components/PageHader.less"
export default {
  functional: true,
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
  render(h, { props }) {
    return (
      <div class="page_header">
        <i class="el-icon-back"></i>
        <h1>{props.title}</h1>
        <span>{props.subtitle}</span>
      </div>
    )
  },
}
</script>