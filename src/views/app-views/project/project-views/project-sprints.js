import React from "react";
import {withRouter} from "react-router-dom";
import SprintContainer from "../../../../components/sp-componenets/sprint-components/sprint-container";

class ProjectSprints extends React.Component {

    render() {
        return(
            <div>
                <h3>Sprints</h3>
                <div>
                    <SprintContainer />
                </div>
            </div>
        );
    }

}

export default withRouter(ProjectSprints);
