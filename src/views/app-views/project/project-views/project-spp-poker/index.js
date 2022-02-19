import React from 'react';
import * as innerRoutes from "./poker-inner-routers";
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import AllRooms from './project-spp-poker-all';
import NewRoom from './project-spp-poker-new';
import PlayRoom from './project-spp-poker-play';
import {compose} from "redux";
import {connect} from "react-redux";
import * as spinner_actions from "../../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../../redux/actions/Navigation";
import * as project_actions from "../../../../../redux/actions/Project";

class Poker extends React.Component {
    render() {
        return(
            <div>
                <Switch>
                    <Route exact path={innerRoutes.inner_route_home} component={AllRooms}/>
                    <Route path={innerRoutes.inner_route_new_room} component={NewRoom}/>
                    <Route path={innerRoutes.inner_route_play} component={PlayRoom}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    corporateReducer: state.corporateReducer,
    projectReducer: state.projectReducer
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSpinner: (data) => dispatch(spinner_actions.handlerSpinner(data)),
        handleNavigation: (data) => dispatch(navigation_actions.handlerNavigation(data)),
        handleProjectId: (data) => dispatch(project_actions.handleProjectId(data))
    };
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Poker);
// export default connect(mapStateToProps, mapDispatchToProps)(Poker);
