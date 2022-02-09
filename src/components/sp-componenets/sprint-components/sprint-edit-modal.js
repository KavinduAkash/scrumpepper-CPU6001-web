import React from "react";
import {Button, Form, Input, Modal} from "antd";
import { DatePicker, message } from 'antd';
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../server/base_urls";
import moment from "moment";
const { RangePicker } = DatePicker;
const key = 'updatable';

class SprintEditModal extends React.Component {

    state = {
        name: '',
        goal: '',
        startDate: '',
        endDate: '',
    }

    componentDidMount() {
        if(this.props.sprint) {
            this.setState({
                name: this.props.sprint.sprintName,
                goal: this.props.sprint.description,
                startDate: this.props.sprint.startDate,
                endDate: this.props.sprint.endDate,
            })
        }
    }

    onClose = () => {
        this.cleanInputs();
        this.props.onClose(null, false);
    }

    onChangeName = e => {
        this.setState({name: e.target.value})
    }

    onChangeGoal = e => {
        this.setState({goal: e.target.value})
    }

    onChangeDateRange = (date, dateString) => {
        if (dateString[0] !== "" || dateString[1] !== "") {
            let start = new Date(dateString[0]);
            let end = new Date(dateString[1]);
            start = (start.toISOString()).split("T")[0];
            end = (end.toISOString()).split("T")[0];
            this.setState({
                startDate: start,
                endDate: end
            });
        }
    };

    cleanInputs = () => {
        this.setState({
            name: '',
            goal: '',
            startDate: '',
            endDate: '',
        })
    }

// Create --------------------------------------------------------------------------------------------------------------
    createSprint = () => {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let body = {
            projectId: this.props.projectId,
            sprintName: this.state.name,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.goal,
        }

        let method = "post";

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}sprint/add`, body, {headers: headers})
            .then(async response => {
                if(response.status==200) {
                    if(response.data.success) {
                        message.success('Sprint created successfully!');
                        this.cleanInputs();
                        this.onClose();
                    }
                }
            }).catch(async error => {
            message.error('Something went wrong!');
        });
    }

// Update --------------------------------------------------------------------------------------------------------------
    updateSprint = () => {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let body = {
            id: this.props.sprint?this.props.sprint.id:0,
            projectId: this.props.projectId,
            sprintName: this.state.name,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.goal,
        }

        let method = "patch";

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}sprint/update`, body, {headers: headers})
            .then(async response => {
                if(response.status==200) {
                    if(response.data.success) {
                        message.success('Sprint updated successfully!');
                        this.cleanInputs();
                        this.onClose();
                    }
                }
            }).catch(async error => {
            message.error('Something went wrong!');
        });
    }

    render() {

        // Modal function type
        let type = this.props.type;

        // Date Range
        let dateRange = null;
        if (this.state.startDate !== null && this.state.startDate !== undefined && this.state.startDate !== "") {
            let startdate = this.state.startDate;
            let enddate = this.state.endDate;
            dateRange = [moment(startdate), moment(enddate)];
        } else {
            dateRange = null;
        }

        return(
            <Modal
                title="Basic Modal"
                visible={this.props.isEditVisible}
                onCancel={this.onClose}
                footer={false}
                className={'sprint-edit-modal'}
            >


                <Form
                    layout="vertical"
                >
                    <Form.Item
                        label="Sprint Name"
                        required
                        // tooltip="This is a required field"
                    >
                        <Input placeholder="input placeholder" value={this.state.name} onChange={this.onChangeName} />
                    </Form.Item>
                    <Form.Item
                        label="Sprint Goal"
                        // tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
                    >
                        <Input.TextArea placeholder="input placeholder" value={this.state.goal} onChange={this.onChangeGoal} />
                    </Form.Item>
                    <Form.Item
                        label="Sprint Duration"
                        // tooltip="This is a required field"
                    >
                        <RangePicker value={dateRange} onChange={this.onChangeDateRange} />
                    </Form.Item>
                    <Form.Item className={'text-right'}>
                        {
                            type=='CREATE'?
                                <Button type="primary" onClick={this.createSprint}>Submit</Button>
                                :
                                <Button type="primary" onClick={this.updateSprint}>Update</Button>
                        }
                    </Form.Item>
                </Form>


            </Modal>
        )
    }

}

export default SprintEditModal;
