import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from 'antd';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';
import Loading from "../components/shared-components/Loading";
import {ThemeSwitcherProvider} from "react-css-theme-switcher";

export const Views = (props) => {
  const { locale, location, direction, loading } = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <Route path={APP_PREFIX_PATH}>
            <AppLayout direction={direction} location={location}/>
          </Route>
        </Switch>
      </ConfigProvider>
      <Loading loading={loading}/>
    </IntlProvider>
  )
}

const mapStateToProps = ({ theme, auth, spinnerReducer }) => {
  const { locale, direction } =  theme;
  const { token } = auth;
  const { loading } = spinnerReducer;
  return { locale, token, direction, loading}
};

export default withRouter(connect(mapStateToProps)(Views));
