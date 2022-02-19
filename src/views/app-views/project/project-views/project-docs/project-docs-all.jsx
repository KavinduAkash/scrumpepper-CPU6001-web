import React from "react";
import {Button} from "antd";
import * as innerRouters from './docs-inner-routers';
import DocsModal from "./docs-modal";
import * as spinner_actions from "../../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../../redux/actions/Navigation";
import * as project_actions from "../../../../../redux/actions/Project";
import * as document_actions from "../../../../../redux/actions/Documents";
import {connect} from "react-redux";

class ProjectDocsAll extends React.Component {

    state = {
        isEdit: false,
    }

    openCreateNewDoc = value => {
        this.setState({isEdit: value})
    }

    navigateToEdit = data => {
        this.props.storeCurrentDoc(data);
        this.setState({isEdit: false});
        this.openEditor();
    }

    openEditor = () => {
        this.props.history.push(innerRouters.inner_route_editor);
    }

    render() {
        return(
            <div>
                <DocsModal isEditVisible={this.state.isEdit} openEdit={this.openCreateNewDoc} navigateToEdit={this.navigateToEdit}  />
                <div></div>
                <br/>
                <div style={{textAlign: 'right'}}>
                    <Button type="primary" onClick={()=>this.openCreateNewDoc(true)}>New Document</Button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    corporateReducer: state.corporateReducer,
    projectReducer: state.projectReducer,
    documentReducer: state.documentReducer
});

const mapDispatchToProps = (dispatch) => {
    return {
        // corporateHandler: (data) => dispatch(corporate_actions.storeCorporateId(data)),
        handleSpinner: (data) => dispatch(spinner_actions.handlerSpinner(data)),
        handleNavigation: (data) => dispatch(navigation_actions.handlerNavigation(data)),
        handleProjectId: (data) => dispatch(project_actions.handleProjectId(data)),
        storeCurrentDoc: (data) => dispatch(document_actions.storeCurrentDocument(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDocsAll);
