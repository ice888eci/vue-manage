import Vue from "vue"

// 导入富文本编辑器及样式
import VueQuillEditor from "vue-quill-editor"
import "quill/dist/quill.core.css" // import styles
import "quill/dist/quill.snow.css" // for snow theme
import "quill/dist/quill.bubble.css" // for bubble theme
Vue.use(VueQuillEditor)

// element-ui引入
import "element-ui/lib/theme-chalk/index.css"
import {
  Cascader,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Input,
  Button,
  Container,
  Header,
  Aside,
  Main,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Notification,
  Tabs,
  TabPane,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Message,
  Tag,
  Tree,
  Select,
  Option,
  Alert,
  Step,
  Steps,
  Checkbox,
  CheckboxGroup,
  Upload
} from "element-ui"

const comps = [
  Upload,
  Checkbox,
  CheckboxGroup,
  Step,
  Steps,
  Alert,
  Cascader,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Input,
  Button,
  Container,
  Header,
  Aside,
  Main,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Tabs,
  TabPane,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  Tag,
  Tree,
  Select,
  Option
]
for (const comp of comps) {
  Vue.use(comp)
}

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
