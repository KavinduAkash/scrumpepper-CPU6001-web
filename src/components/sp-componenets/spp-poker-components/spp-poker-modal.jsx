import React from "react";
import {Button, Form, Input, Modal, Select, message} from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../server/base_urls";
import * as spinner_actions from "../../../redux/actions/Spinner";
import * as navigation_actions from "../../../redux/actions/Navigation";
import * as project_actions from "../../../redux/actions/Project";
import {connect} from "react-redux";

const { Option } = Select;

class SppPokerModal extends React.Component{

    state = {
        id: 0,
        projectId: 0,
        sprintId: 0,
        description: "",
        status: 1,
        edit: true,
        sprints: []
    }

    componentDidMount() {
        this.load_all_sprints();
        if(this.props.data) {
            let d = this.props.data;
            this.setState({
                id: d.id,
                projectId: d.projectId,
                sprintId: d.sprintId,
                description: d.description,
                status: d.status,
                edit: d.status==0?false:true
            })
        }else {
            this.setState({
                id: 0,
                projectId: 0,
                sprintId: 0,
                description: "",
                status: 1,
                edit: true
            })
        }
    }

    load_all_sprints = () => {
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
                if(response.data.success) {
                    this.setState({
                        sprints: response.data.body
                    })
                }
            }).catch(async error => {
            this.setState({loading: false});
            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    onClose = () => {
        this.props.openModal(null, false);
    }

    onChangeSprint = e => {
        this.setState({
            sprintId: e
        })
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeStatus = e => {
        this.setState({
            status: e
        })
    }

    handle_room = (type) => {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let method = "post";
        if(type=="UPDATE") {
            method = "put"
        }

        let body = {
            id: this.state.id,
            projectId: this.state.projectId,
            sprintId: this.state.sprintId,
            description: this.state.description,
            status: this.state.status,
        }

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}sppoker/room/${type=="UPDATE"?"update":"create"}`, body, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    message.success(`Chat Room ${type=="UPDATE"?"updated":"started"} successfully`);
                }
            }).catch(async error => {
            this.setState({loading: false});
            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    render() {

        let sprints = this.state.sprints;

        return(
            <Modal
                title="Basic Modal"
                visible={this.props.isEditVisible}
                onCancel={this.onClose}
                footer={false}
                className={'sprint-edit-modal'}
            >
                <div>
                    <Form
                        layout="vertical"
                    >
                        <Form.Item
                            label="Note"
                        >
                            <Input.TextArea placeholder="input placeholder" value={this.state.goal} onChange={this.onChangeDescription} />
                        </Form.Item>

                        <Form.Item
                            label="Sprint"
                        >
                        <Select style={{ width: 120 }} onChange={this.onChangeSprint}>
                            {
                                sprints.map((result, index)=><Option value={result.id}>{result.sprintName}</Option>)
                            }
                        </Select>
                        </Form.Item>

                        {
                            this.state.id!=0?
                                <Form.Item
                                    label="Status"
                                >
                                    <Select style={{ width: 120 }} onChange={this.onChangeStatus} disble={!this.state.edit}>
                                        <Option value={1}>Ongoing </Option>
                                        <Option value={1}>Stopped </Option>
                                    </Select>
                                </Form.Item>
                                :
                                null
                        }


                        <Form.Item className={'text-right'}>
                            {
                                this.state.id==0?
                                    <Button type="primary" onClick={()=>this.handle_room("START")}>Start</Button>
                                    :
                                    <Button type="primary" onClick={()=>this.handle_room("UPDATE")}>Update</Button>
                            }
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(SppPokerModal);
