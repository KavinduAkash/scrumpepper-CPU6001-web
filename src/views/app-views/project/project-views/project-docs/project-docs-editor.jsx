import React from "react";
import {withRouter} from "react-router-dom";
import QEditor from "../../../../../components/sp-componenets/qeditor/qeditor";
import * as innerRoutes from './docs-inner-routers';
import {Form, Input} from "antd";

class ProjectDocsEditor extends React.Component {

    state = {
        title: "",
    }

    onChangeTitle = e => {
        this.setState({title: e.target.value});
    }

    offEditor = () => {
        this.props.history.push(innerRoutes.inner_route_home);
    }

    render() {
        return(
            <div>
                <div>
                    <div><span onClick={this.offEditor}>All Project Docs</span><span>{`${" > "}`}</span><span style={{fontWeight: 'bold'}}>New Doc Editor</span></div>
                </div>
                <br/>
                <h3>Editor</h3>
                <br/>
                <div>
                    <Form
                        layout="vertical"
                    >
                        <Form.Item>
                            <Input placeholder="Document Title..." value={this.state.title} onChange={this.onChangeTitle} />
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <QEditor />
                </div>
            </div>
        );
    }

}

export default withRouter(ProjectDocsEditor);
