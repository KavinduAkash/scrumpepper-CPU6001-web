import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {Dropdown, Layout, Menu} from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import Logo from './Logo';
import NavPanel from './NavPanel';
import NavSearch  from './NavSearch';
import { toggleCollapsedNav, onMobileNavToggle } from 'redux/actions/Theme';
import { NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from 'constants/ThemeConstant';
import utils from 'utils'
import Cookies from "js-cookie";
import {withRouter} from "react-router-dom";

const { Header } = Layout;





export const HeaderNav = props => {
  const { navCollapsed, mobileNav, navType, headerNavColor, toggleCollapsedNav, onMobileNavToggle, isMobile, currentTheme, direction } = props;
  const [searchActive, setSearchActive] = useState(false)

  const onSearchClose = () => {
    setSearchActive(false)
  }

  const onToggle = () => {
    if(!isMobile) {
      toggleCollapsedNav(!navCollapsed)
    } else {
      onMobileNavToggle(!mobileNav)
    }
  }

  const isNavTop = navType === NAV_TYPE_TOP ? true : false
  const mode = ()=> {
    if(!headerNavColor) {
      return utils.getColorContrast(currentTheme === 'dark' ? '#00000' : '#ffffff' )
    }
    return utils.getColorContrast(headerNavColor)
  }
  const navMode = mode()
  const getNavWidth = () => {
    if(isNavTop || isMobile) {
      return '0px'
    }
    if(navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`
    } else {
      return `${SIDE_NAV_WIDTH}px`
    }
  }

  useEffect(() => {
    if(!isMobile) {
      onSearchClose()
    }
  })

  const logout = () => {
    Cookies.remove('68e78905f4c');
    Cookies.remove('68e75190f4c');
    // this.setState({loading: false});
    props.history.push("/auth/login");
  }

  const gotToProfile = () => {
    props.history.push("/app/profile");
  }

  let menu = (
      <Menu>
        <Menu.Item>
          <a onClick={gotToProfile}>
            Profile
          </a>
        </Menu.Item>
        <Menu.Item danger><a onClick={logout}>Logout</a></Menu.Item>
      </Menu>
  );


  return (
    <Header className={`app-header ${navMode}`} style={{backgroundColor: headerNavColor}}>
      <div className={`app-header-wrapper ${isNavTop ? 'layout-top-nav' : ''}`}>
        <Logo logoType={navMode}/>
        <div className="nav" style={{width: `calc(100% - ${getNavWidth()})`}}>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">          
              {
                isNavTop && !isMobile ?
                null
                :
                <li className="ant-menu-item ant-menu-item-only-child" onClick={() => {onToggle()}}>
                  {navCollapsed || isMobile ? <MenuUnfoldOutlined className="nav-icon" /> : <MenuFoldOutlined className="nav-icon" />}
                </li>
              }
            </ul>
          </div>
          <div className="nav-right">
            {/*<NavPanel direction={direction} />*/}

            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <UserOutlined /> My Account <DownOutlined />
              </a>
            </Dropdown>

          </div>
          <NavSearch active={searchActive} close={onSearchClose}/>
        </div>
      </div>
    </Header>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction } =  theme;
  return { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction }
};

export default connect(mapStateToProps, {toggleCollapsedNav, onMobileNavToggle})(withRouter(HeaderNav));
