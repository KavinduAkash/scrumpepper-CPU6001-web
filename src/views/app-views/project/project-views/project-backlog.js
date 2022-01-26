import React from "react";
import {withRouter} from "react-router-dom";
import BacklogTable from "../../../../components/layout-components/BacklogTable/backlog-table";
import UserStoryModal from "../../../../components/layout-components/UserStoryModal/UserStoryModal";

class ProjectBacklog extends React.Component {

    render() {
        return(
            <div>
                this is project backlog
                <div>
                    <h3>Backlog</h3>
                </div>
                <UserStoryModal/>
                <div>
                    <BacklogTable />
                </div>
            </div>
        );
    }

}

export default withRouter(ProjectBacklog);
