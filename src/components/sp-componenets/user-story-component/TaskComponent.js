import React from "react";
import {Button, Col, Dropdown, Input, Menu, Row, Select} from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined, UserAddOutlined } from '@ant-design/icons';
import './task.scss'

const { Option } = Select;

class Task extends React.Component {

    state = {
        task_id: 0,
        is_edit_text: false,
        task_name: "",
        addMember: false,
        taskStatus: "TODO"
    }

    componentDidMount() {
            this.setState({
                task_id: this.props.task.id,
                task_name: (this.props.task.title!=null & this.props.task.title!=undefined)?this.props.task.title:'',
                taskStatus: this.props.task.statusType
            })
        console.log("Task Status: ", this.props.task.statusType);
    }

    componentWillMount() {
        this.setState({
            task_id: this.props.task.id,
            task_name: (this.props.task.title!=null & this.props.task.title!=undefined)?this.props.task.title:'',
            taskStatus: this.props.task.statusType
        })
        console.log("Task Status2: ", this.props.task.statusType);
    }

    onClickEdit = val => {
        this.setState({is_edit_text: val})
    };

    onEditFocus = val => {
        this.setState({is_edit_text: val})
        if(!val) {
            this.handleTask();
        }
    };

    onChangeTaskName = e => {
        this.setState({task_name: e.target.value})
    }

    onChangeText = e => {
        if (e.key === 'Enter') {
            this.onEditFocus(false);
        }
    }

    handleTask = () => {
        if(this.state.task_id==0) {
            this.props.createTask(null, this.state.task_name);
        } else {
            this.props.updateTask(this.state.task_id, null, this.state.task_name);
        }
    }

    openAddMember = () => {
       this.props.memberModal(this.state.task_id);
    }

    onChangeTaskStatus = e => {
        this.setState({taskStatus: e})
        this.props.updateTaskStatus(this.state.task_id, e);
    }

    render() {

        let task_id = this.state.task_id;
        let task_name = this.state.task_name;
        let task_status = this.state.taskStatus;
        console.log("Status: ", task_status);
        let task_name_text = (this.state.task_name).slice(0,50)
        if(task_name_text.length>50) {
            task_name_text = (this.state.task_name).slice(0,47) + "..."
        }
        let is_edit_task = this.state.is_edit_text;

        let menu =  (<Menu>
            <Menu.Item>
                <Input placeholder="Basic usage" />
            </Menu.Item>
        </Menu>);

        return(
            <div className={'sp-task'}>
                <Row className={'sp-task-container'}>
                    <Col sm={2} md={2} lg={2} xl={2} className={'sp-task-ref'}>
                        <div>
                            TX-{task_id}
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={12} xl={12} className={'sp-task-text'}>
                        {
                            (is_edit_task || task_name=="") ?<Input placeholder="Basic usage" value={ task_name } onKeyUp={this.onChangeText} onChange={this.onChangeTaskName} onFocus={()=>this.onEditFocus(true)} onBlur={()=>this.onEditFocus(false)} />:
                                <div className={'task-text'}>
                                    <span>{ task_name_text }</span>
                                    <Button type="link" onClick={()=>this.onClickEdit(true)}><EditOutlined /></Button>
                                </div>
                        }
                    </Col>
                    <Col sm={4} md={4} lg={4} xl={4} className={'text-right'}>

                        {
                            this.state.addMember?
                            <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode">
                            </Select>
                            :
                                <a className={'sp-task-user'} onClick={this.openAddMember}>
                                    <UserAddOutlined />
                                </a>
                        }

                    </Col>
                    <Col sm={5} md={5} lg={5} xl={5} className={'sp-task-status text-right'}>
                            <Select value={task_status} style={{ width: 150 }}
                                onChange={this.onChangeTaskStatus}
                                    className={'text-left'}
                            >
                                <Option value="TODO">TO DO</Option>
                                <Option value="PROCESSING">IN PROGRESS</Option>
                                <Option value="COMPLETED">DONE</Option>
                            </Select>
                    </Col>
                    <Col sm={1} md={1} lg={1} xl={1} className={'text-right'}>

                        <Dropdown overlay={menu}>
                            <a className={'sp-task-menu'}>
                                <MoreOutlined />
                            </a>
                        </Dropdown>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default Task
