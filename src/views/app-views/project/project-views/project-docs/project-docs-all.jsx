import React from "react";
import {Button} from "antd";
import * as innerRouters from './docs-inner-routers';

class ProjectDocsAll extends React.Component {

    openEditor = () => {
        this.props.history.push(innerRouters.inner_route_editor);
    }

    render() {
        return(
            <div>
                <div></div>
                <br/>
                <div style={{textAlign: 'right'}}>
                    <Button type="primary" onClick={this.openEditor}>New Room</Button>
                </div>
            </div>
        );
    }

}

export default ProjectDocsAll;
