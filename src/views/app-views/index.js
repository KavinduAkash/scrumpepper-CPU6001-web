import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import Corporate from "./corporate";
import CorporateManagementView from "./corporate/CorporateManagement";

// project-views
import ProjectHome from "./project/project-home/project-home";
import ProjectSPPPoker from "./project/project-home/project-spp-poker";
import ProjectBacklog from "./project/project-home/project-backlog";
import ProjectSprints from "./project/project-home/project-sprints";
import ProjectReports from "./project/project-home/project-reports";
import ProjectTeam from "./project/project-home/project-teams";
import ProjectNotifications from "./project/project-home/project-notifications";
import ProjectDocs from "./project/project-home/project-docs";
import ProjectSettings from "./project/project-home/project-settings";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        {/*<Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />*/}
        {/*<Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/profile`} />*/}
          <Route path={`${APP_PREFIX_PATH}/profile`} component={lazy(() => import(`./profile`))} />
          <Route exact path={`${APP_PREFIX_PATH}/corporate`} component={Corporate} />
          <Route path={`${APP_PREFIX_PATH}/corporate/manage`} component={CorporateManagementView} />
          <Route exact path={`${APP_PREFIX_PATH}/project`} component={lazy(() => import(`./project`))} />
          <Route path={`${APP_PREFIX_PATH}/project/home`} component={ProjectHome} />
          <Route path={`${APP_PREFIX_PATH}/project/spp-poker`} component={ProjectSPPPoker} />
          <Route path={`${APP_PREFIX_PATH}/project/backlog`} component={ProjectBacklog} />
          <Route path={`${APP_PREFIX_PATH}/project/sprints`} component={ProjectSprints} />
          <Route path={`${APP_PREFIX_PATH}/project/reports`} component={ProjectReports} />
          <Route path={`${APP_PREFIX_PATH}/project/team`} component={ProjectTeam} />
          <Route path={`${APP_PREFIX_PATH}/project/notifications`} component={ProjectNotifications} />
          <Route path={`${APP_PREFIX_PATH}/project/docs`} component={ProjectDocs} />
          <Route path={`${APP_PREFIX_PATH}/project/settings`} component={ProjectSettings} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
