import React from "react";
import {withRouter} from "react-router-dom";
import BacklogTable from "../../../../components/layout-components/BacklogTable/backlog-table";
import UserStoryModal from "../../../../components/layout-components/UserStoryModal/UserStoryModal";
import {connect} from "react-redux";
import * as spinner_actions from "../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../redux/actions/Navigation";
import * as project_actions from "../../../../redux/actions/Project";
import Cookies from "js-cookie";
import axios from "axios";
import {Button, notification} from "antd";
import { MenuOutlined, PlusCircleOutlined } from '@ant-design/icons';
import * as BaseUrl from '../../../../server/base_urls'

class ProjectBacklog extends React.Component {

    state = {
      user_story_modal: false,
      user_stories: [],
      selected_user_story: null,
      isEdit: false
    };

    componentDidMount() {
        this.load_backlog_data();
    }

    load_backlog_data = () => {

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

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}user-story/get-project?id=${this.props.projectReducer.id}&corporate=${this.props.corporateReducer.corporate_id}`, {headers: headers})
            .then(async response => {

                if(response.data.success) {
                    this.setState({user_stories: []})
                    this.setState({user_stories: response.data.body})
                }

            }).catch(async error => {
            this.setState({loading: false});
            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    };

    openEdit = (data, index) => {
        this.setState({
            selected_user_story: data,
            isEdit: true
        })
        this.onChangeUserStoryModal(true);
    }

    onChangeUserStoryModal = val => {
      this.setState({user_story_modal: val});
        if(!val) {
            this.setState({isEdit: false});
        }
        this.load_backlog_data();

    };

    render() {

        let project_id = this.props.projectReducer.id;
        let project = this.props.projectReducer.project;
        let data = this.state.user_stories;



        return(
            <div>
                {this.props.projectReducer.id}
                <div>
                    <h3>Backlog</h3>
                </div>
                {
                    this.state.user_story_modal?
                        <UserStoryModal
                            user_story_modal_visibility={this.state.user_story_modal}
                            project_id={project_id}
                            modal_controller={this.onChangeUserStoryModal}
                            data={this.state.selected_user_story}
                            project={project}
                            isEdit={this.state.isEdit}
                        />
                        :""
                }
                <div>

                    {
                        (data!=null & data!='' & data!=undefined)?
                            data.length>6?<div>
                                <Button block style={{backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: '0px', marginBottom: '10px'}}
                                        onClick={()=>this.onChangeUserStoryModal(true)}
                                >
                                    <PlusCircleOutlined /> New User Story
                                </Button>
                            </div>
                                :""
                            :""
                    }

                    {
                        (this.state.user_stories!=null & this.state.user_stories!='' & this.state.user_stories!=undefined)?
                            this.state.user_stories?data.length!=0?<BacklogTable user_stories={this.state.user_stories} openEdit={this.openEdit} />
                            :null:null:null
                    }
                    <div>
                        <Button block style={{backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: '0px', marginTop: '10px'}}
                                onClick={()=>this.onChangeUserStoryModal(true)}
                        >
                            <PlusCircleOutlined /> New User Story
                        </Button>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectBacklog));
