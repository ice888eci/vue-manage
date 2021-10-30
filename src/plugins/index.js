import Vue from "vue"

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
  Option
} from "element-ui"

const comps = [
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
