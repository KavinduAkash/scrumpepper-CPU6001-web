import React from "react";
import {Button, Col, Dropdown, Input, Menu, Row, Select} from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined, UserAddOutlined } from '@ant-design/icons';
import './task.scss'

const { Option } = Select;

class Task extends React.Component {

    state = {
        is_edit_text: false,
        task_name: ""
    }

    onClickEdit = val => {
        this.setState({is_edit_text: val})
    };

    onEditFocus = val => {
        this.setState({is_edit_text: val})
    };

    onChangeTaskName = e => {
        this.setState({task_name: e.target.value})
    }

    onChangeText = e => {
        if (e.key === 'Enter') {
            this.onEditFocus(false);
        }
    }

    render() {

        let task_name = this.state.task_name
        let task_name_text = (this.state.task_name).slice(0,50)
        if(task_name_text.length>50) {
            task_name_text = (this.state.task_name).slice(0,47) + "..."
        }
        let is_edit_task = this.state.is_edit_text;

        let menu =  (<Menu>
            <Menu.Item icon={<DeleteOutlined />} danger>
                Remove
            </Menu.Item>
        </Menu>);

        return(
            <div className={'sp-task'}>
                <Row className={'sp-task-container'}>
                    <Col sm={2} md={2} lg={2} xl={2} className={'sp-task-ref'}>
                        <div>
                            TX-1
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
                        <Dropdown overlay={menu}>
                            <a className={'sp-task-user'}>
                                <UserAddOutlined />
                            </a>
                        </Dropdown>
                    </Col>
                    <Col sm={5} md={5} lg={5} xl={5} className={'sp-task-status text-right'}>
                            <Select defaultValue="todo" style={{ width: 150 }}
                                // onChange={handleChange}
                                    className={'text-left'}
                            >
                                <Option value="todo">TO DO</Option>
                                <Option value="inprogress">IN PROGRESS</Option>
                                <Option value="done">DONE</Option>
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
