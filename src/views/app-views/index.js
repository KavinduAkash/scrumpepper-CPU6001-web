import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        {/*<Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />*/}
        {/*<Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/profile`} />*/}
          <Route path={`${APP_PREFIX_PATH}/profile`} component={lazy(() => import(`./profile`))} />
          <Route path={`${APP_PREFIX_PATH}/project`} component={lazy(() => import(`./project`))} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
