import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import * as innerRoutes from "./docs-inner-routers";
import AllDocs from './project-docs-all';
import DocEditor from './project-docs-editor';
import * as spinner_actions from "../../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../../redux/actions/Navigation";
import * as project_actions from "../../../../../redux/actions/Project";
import {compose} from "redux";
import {connect} from "react-redux";

class ProjectDocs extends React.Component {
    render() {
        return(
            <div>
                <Switch>
                    <Route exact path={innerRoutes.inner_route_home} component={AllDocs}/>
                    <Route path={innerRoutes.inner_route_editor} component={DocEditor}/>
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

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ProjectDocs);
