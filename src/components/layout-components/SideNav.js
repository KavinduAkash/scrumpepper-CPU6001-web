import React from "react";
import {Button, Layout, Tooltip} from 'antd';
import { connect } from 'react-redux';
import { SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE } from 'constants/ThemeConstant';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from './MenuContent'
import './SideNav.scss';
import { LeftOutlined } from '@ant-design/icons';

const { Sider } = Layout;

export const SideNav = ({navCollapsed, sideNavTheme, routeInfo, hideGroupTitle, localization = true }) => {
  const props = { sideNavTheme, routeInfo , hideGroupTitle, localization}
  return (
    <Sider 
      className={`side-nav ${sideNavTheme === SIDE_NAV_DARK? 'side-nav-dark' : ''}`} 
      width={SIDE_NAV_WIDTH} 
      collapsed={navCollapsed}
    >

      <div className={'sp-side-nav'}>
        <div>
          <Tooltip title="search">
            <Button type="primary" shape="circle" icon={<LeftOutlined />} />
          </Tooltip>
        </div>

        <div>
          Project X
        </div>
      </div>

      <Scrollbars autoHide>
        <MenuContent 
          type={NAV_TYPE_SIDE} 
          {...props}
        />
      </Scrollbars>
    </Sider>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, sideNavTheme } =  theme;
  return { navCollapsed, sideNavTheme }
};

export default connect(mapStateToProps)(SideNav);
