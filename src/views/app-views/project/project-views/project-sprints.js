import React from "react";
import {withRouter} from "react-router-dom";
import SprintContainer from "../../../../components/sp-componenets/sprint-components/sprint-container";
import { PlusOutlined } from '@ant-design/icons';
import {Button, message} from "antd";
import SprintEditModal from "../../../../components/sp-componenets/sprint-components/sprint-edit-modal";
import * as spinner_actions from "../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../redux/actions/Navigation";
import * as project_actions from "../../../../redux/actions/Project";
import {connect} from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../../server/base_urls";

class ProjectSprints extends React.Component {

    state = {
        isEditModal: false,
        modalType: null,
        sprint: null,
        sprint_list: [],
        loading: false,
    }

    componentDidMount() {
        this.getAllSprints();
    }

// Data fetching -------------------------------------------------------------------------------------------------------
    getAllSprints = () => {
        this.setState({loading: true});
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let method = "get";

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}sprint/get?project=${this.props.projectReducer.id}`, {headers: headers})
            .then(async response => {
                if(response.status==200) {
                    if(response.data.success) {
                        this.setState({
                            sprint_list: response.data.body
                        })
                        this.setState({loading: false});
                    } else {
                        message.error(response.msg);
                        this.setState({loading: false});
                    }
                }
            })
            .catch(async error => {
                this.setState({loading: false});
                message.error('Something went wrong!');
        });
    }
// Handle sprint -------------------------------------------------------------------------------------------------------
    handleModal = (type, val) => {
        if(!val) {
            this.setState({isEditModal: val, modalType: null})
            this.getAllSprints();
        } else {
            this.setState({isEditModal: val, modalType: type})
        }
    }

    openSprintCreateModal = () => {
        this.handleModal('CREATE', true);
    }

    openSprintUpdateModal = (p) => {
        console.log('Sprint-Data: ', p);
        this.setState({sprint: p});
        this.handleModal('UPDATE', true);
    }

    render() {
        return(
            <div>
                <h3>Sprints</h3>
                <div>

                    {
                        this.state.sprint_list.map((r, i)=><SprintContainer sprint={r} key={i} updateSprint={this.openSprintUpdateModal} />)
                    }
                    <div>
                        <Button type="primary" onClick={this.openSprintCreateModal}><PlusOutlined />Create Sprint</Button>
                    </div>
                </div>

                {
                    this.state.isEditModal?
                        <SprintEditModal type={this.state.modalType} sprint={this.state.sprint} isEditVisible={this.state.isEditModal} onClose={this.handleModal} projectId={this.props.projectReducer.id} />
                        :null
                }


                {
                    this.state.loading?
                        <div className="loading-overlay-2">
                            <div className="bounce-loader">
                                <img src={'/img/preloader.gif'} alt=""/>
                            </div>
                        </div>
                        :null
                }

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
