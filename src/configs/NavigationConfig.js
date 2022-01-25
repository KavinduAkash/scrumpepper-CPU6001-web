import { 
  DashboardOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  RedoOutlined,
  AreaChartOutlined,
  TeamOutlined,
  SettingOutlined,
  BookOutlined,
  BellOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const dashBoardNavTree = [
// {
//   key: 'home',
//   path: `${APP_PREFIX_PATH}/home`,
//   title: 'home',
//   icon: DashboardOutlined,
//   breadcrumb: false,
//   submenu: []
// },
  {
    key: 'project',
    path: `${APP_PREFIX_PATH}/project`,
    title: 'project',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'corporate',
    path: `${APP_PREFIX_PATH}/corporate`,
    title: 'corporate',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
  key: 'profile',
  path: `${APP_PREFIX_PATH}/profile`,
  title: 'profile',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
  },
]

const navigationConfig = [
  ...dashBoardNavTree
]

export const projectManagementNavTree = [
  {
    key: 'Home',
    path: `${APP_PREFIX_PATH}/project/home`,
    title: 'Home',
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'SPP Poker',
    path: `${APP_PREFIX_PATH}/project/spp-poker`,
    title: 'SPP Poker',
    icon: ClockCircleOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'Backlog',
    path: `${APP_PREFIX_PATH}/project/backlog`,
    title: 'Backlog',
    icon: UnorderedListOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'Sprints',
    path: `${APP_PREFIX_PATH}/project/sprints`,
    title: 'Sprints',
    icon: RedoOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'Reports',
    path: `${APP_PREFIX_PATH}/project/reports`,
    title: 'Reports',
    icon: AreaChartOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'Team',
    path: `${APP_PREFIX_PATH}/project/team`,
    title: 'Team',
    icon: TeamOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'Notifications',
    path: `${APP_PREFIX_PATH}/project/notifications`,
    title: 'Notifications',
    icon: BellOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'Docs',
    path: `${APP_PREFIX_PATH}/project/docs`,
    title: 'Docs',
    icon: BookOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'Settings',
    path: `${APP_PREFIX_PATH}/project/settings`,
    title: 'Settings',
    icon: SettingOutlined,
    breadcrumb: false,
    submenu: []
  },
]
