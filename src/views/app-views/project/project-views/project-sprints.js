import React from "react";
import {withRouter} from "react-router-dom";
import SprintContainer from "../../../../components/sp-componenets/sprint-components/sprint-container";
import { PlusOutlined } from '@ant-design/icons';
import {Button} from "antd";

class ProjectSprints extends React.Component {

    render() {
        return(
            <div>
                <h3>Sprints</h3>
                <div>
                    <SprintContainer />
                    <SprintContainer />
                    <div>
                        <Button type="primary"><PlusOutlined />Create Sprint</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(ProjectSprints);
