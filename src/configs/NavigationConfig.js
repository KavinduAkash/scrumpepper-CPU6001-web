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
  ClockCircleOutlined,
  MailOutlined,
  UserOutlined,
  DesktopOutlined,
  ProfileOutlined
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
    icon: ProfileOutlined ,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'corporate',
    path: `${APP_PREFIX_PATH}/corporate`,
    title: 'corporate',
    icon: DesktopOutlined ,
    breadcrumb: false,
    submenu: []
  },
  // {
  // key: 'profile',
  // path: `${APP_PREFIX_PATH}/profile`,
  // title: 'profile',
  // icon: UserOutlined ,
  // breadcrumb: false,
  // submenu: []
  // },
  {
    key: 'invitations',
    path: `${APP_PREFIX_PATH}/invitation`,
    title: 'Invitations',
    icon: MailOutlined,
    breadcrumb: false,
    submenu: []
  },
]

const navigationConfig = [
  ...dashBoardNavTree
]

export const projectManagementNavTree = [
  {
    key: 'User Story',
    path: ``,
    title: 'User Story',
    icon: UnorderedListOutlined,
    breadcrumb: false,
    submenu: [
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
    ]
  },
    {
    key: 'Estimations',
    path: ``,
    title: 'Estimations',
    icon: ClockCircleOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'SPP Poker',
        path: `${APP_PREFIX_PATH}/project/spp-poker`,
        title: 'SPP Poker',
        icon: ClockCircleOutlined,
        breadcrumb: false,
        submenu: []
      },
    ]
  },
  {
    key: 'Reports',
    path: ``,
    title: 'Reports',
    icon: AreaChartOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'Burn Up Chart',
        path: `${APP_PREFIX_PATH}/project/reports-burnup`,
        title: 'Burn Up',
        icon: AreaChartOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'Burn Down Chart',
        path: `${APP_PREFIX_PATH}/project/reports-burndown`,
        title: 'Burn Down',
        icon: AreaChartOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'Velocity',
        path: `${APP_PREFIX_PATH}/project/reports-velocity`,
        title: 'Sprint Velocity',
        icon: AreaChartOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'Team Performance',
        path: `${APP_PREFIX_PATH}/project/team-performance`,
        title: 'Team Performance',
        icon: AreaChartOutlined,
        breadcrumb: false,
        submenu: []
      }
    ]
  },
  {
    key: 'Other',
    path: ``,
    title: 'Other',
    icon: TeamOutlined,
    breadcrumb: true,
    submenu: [
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
  },
]
