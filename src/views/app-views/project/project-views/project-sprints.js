import React from "react";
import {withRouter} from "react-router-dom";
import SprintContainer from "../../../../components/sp-componenets/sprint-components/sprint-container";
import { PlusOutlined } from '@ant-design/icons';
import {Button} from "antd";
import SprintEditModal from "../../../../components/sp-componenets/sprint-components/sprint-edit-modal";
import * as spinner_actions from "../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../redux/actions/Navigation";
import * as project_actions from "../../../../redux/actions/Project";
import {connect} from "react-redux";

class ProjectSprints extends React.Component {

    state = {
        isEditModal: false,
        modalType: null,
        sprint: null
    }

    handleModal = (type, val) => {
        if(!val) {
            this.setState({isEditModal: val, modalType: null})
        } else {
            this.setState({isEditModal: val, modalType: type})
        }
    }

    openSprintCreateModal = () => {
        this.handleModal('CREATE', true);
    }

    openSprintUpdateModal = (p) => {
        this.setState({sprint: p});
        this.handleModal('UPDATE', true);
    }

    render() {
        return(
            <div>
                <h3>Sprints</h3>
                <div>
                    <SprintContainer />
                    <SprintContainer />
                    <div>
                        <Button type="primary" onClick={this.openSprintCreateModal}><PlusOutlined />Create Sprint</Button>
                    </div>
                </div>

                <SprintEditModal type={this.state.modalType} isEditVisible={this.state.isEditModal} onClose={this.handleModal} projectId={this.props.projectReducer.id} />

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
        // corporateHandler: (data) => dispatch(corporate_actions.storeCorporateId(data)),
        handleSpinner: (data) => dispatch(spinner_actions.handlerSpinner(data)),
        handleNavigation: (data) => dispatch(navigation_actions.handlerNavigation(data)),
        handleProjectId: (data) => dispatch(project_actions.handleProjectId(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectSprints));
