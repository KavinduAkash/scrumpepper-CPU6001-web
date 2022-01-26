import React from "react";
import {Button, Layout, Tooltip} from 'antd';
import { connect } from 'react-redux';
import { SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE } from 'constants/ThemeConstant';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from './MenuContent'
import './SideNav.scss';
import { LeftOutlined } from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import * as spinner_actions from "../../redux/actions/Spinner";
import * as navigation_actions from "../../redux/actions/Navigation";

const { Sider } = Layout;

export const SideNav = ({navCollapsed, sideNavTheme, routeInfo, hideGroupTitle, localization = true, navigation, handleNavigation, history }) => {
  const props = { sideNavTheme, routeInfo , hideGroupTitle, localization, navigation, handleNavigation, history}

  const move_to_back = () => {
    handleNavigation(1);
    navigate_to_project();
  }

  const navigate_to_project = () => {
    props.history.push('/')
  }

  return (
    <Sider 
      className={`side-nav ${sideNavTheme === SIDE_NAV_DARK? 'side-nav-dark' : ''}`} 
      width={SIDE_NAV_WIDTH} 
      collapsed={navCollapsed}
    >

      {
        navigation==2?
        <div className={'sp-side-nav'}>
          <div>
            <Tooltip title="Go Back">
              <Button type="primary" shape="circle" icon={<LeftOutlined />} onClick={move_to_back} />
            </Tooltip>
          </div>

          <div>
            Project X
          </div>
        </div>:null
      }

      <Scrollbars autoHide>
        <MenuContent 
          type={NAV_TYPE_SIDE} 
          {...props}
        />
      </Scrollbars>
    </Sider>
  )
}

const mapStateToProps = ({ theme, navigationReducer }) => {
  const { navCollapsed, sideNavTheme } =  theme;
  const { navigation } = navigationReducer;
  return { navCollapsed, sideNavTheme, navigation }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // corporateHandler: (data) => dispatch(corporate_actions.storeCorporateId(data)),
    handleSpinner: (data) => dispatch(spinner_actions.handlerSpinner(data)),
    handleNavigation: (data) => dispatch(navigation_actions.handlerNavigation(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideNav));
