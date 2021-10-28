import Vue from "vue"
import "element-ui/lib/theme-chalk/index.css"
import {
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
  Popconfirm
} from "element-ui"
Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Icon)

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)

Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Card)

Vue.use(Row)
Vue.use(Col)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Switch)
Vue.use(Tooltip)

Vue.use(Pagination)

Vue.use(Dialog)

// Vue.use(Popconfirm)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

// import {
//   Pagination,
//   Dialog,
//   Autocomplete,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
//   Input,
//   InputNumber,
//   Radio,
//   RadioGroup,
//   RadioButton,
//   Checkbox,
//   CheckboxButton,
//   CheckboxGroup,
//   Switch,
//   Select,
//   Option,
//   OptionGroup,
//   Button,
//   ButtonGroup,

//   DatePicker,
//   TimeSelect,
//   TimePicker,
//   Popover,
//   Tooltip,
//   Breadcrumb,
//   BreadcrumbItem,

//   Tabs,
//   TabPane,
//   Tag,
//   Tree,
//   Alert,
//   Slider,

//   Row,
//   Col,
//   Upload,
//   Progress,
//   Spinner,
//   Badge,
//   Card,
//   Rate,
//   Steps,
//   Step,
//   Carousel,
//   CarouselItem,
//   Collapse,
//   CollapseItem,
//   Cascader,
//   ColorPicker,
//   Transfer,
//   Container,
//   Header,
//   Aside,
//   Main,
//   Footer,
//   Timeline,
//   TimelineItem,
//   Link,
//   Divider,
//   Image,
//   Calendar,
//   Backtop,
//   PageHeader,
//   CascaderPanel,
//   Loading,
//   MessageBox,
//   Message,
//   Notification,
// } from 'element-ui'

/* 
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;

  */
