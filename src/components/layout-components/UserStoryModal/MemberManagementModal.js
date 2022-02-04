import React from 'react'
import {Button, Modal, Table, Tabs} from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '80%'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '20%'
    },
];

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        action: <Button>Assign</Button>
    },
    {
        key: '2',
        name: 'John',
        action: <Button>Assign</Button>
    },
];

class MemberManagementModal extends React.Component {

    state = {
        taskAssigns_list: [],
        projectMembers_list: [],
        corporateEmployees_list: []
    }

    componentDidMount() {
        this.getTaskMembers(this.props.taskId);
    }

    getTaskMembers = (id) => {
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

        axios[method](`http://localhost:8080/v1/project-member/task/${id}`, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    console.log("=================================");
                    console.log(response.data.body);
                    this.prepareMembers(response.data.body);
                    let data = response.data.body;
                    this.prepareMembers(data);
                }
            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    prepareMembers = (data) => {
        let taskAssigns = data.taskAssigns;
        let projectMembers = data.projectMembers;
        let corporateEmployees = data.corporateEmployees;
        let x = [];
        taskAssigns.map((r, i)=>{
            let obj = {key: r.id, name: r.user.firstName, action: <Button type="danger" shape="round" icon={<CloseOutlined />} size={'small'} onClick={()=>this.handleTaskMember("REMOVE", r.id)} />}
            x.push(obj);
        })
        let y = [];
        projectMembers.map((r, i)=>{
            let obj = {key: r.id, name: r.user.firstName, action: <Button type="primary" shape="round" icon={<PlusOutlined />} size={'small'} onClick={()=>this.handleTaskMember("ADD", r.id)} />}
            y.push(obj);
        })
        let z = [];
        corporateEmployees.map((r, i)=>{
            let obj = {key: r.id, name: r.user.firstName, action: <Button type="primary" shape="round" icon={<PlusOutlined />} size={'small'} onClick={()=>this.handleTaskMember("ADD", r.id)} />}
            z.push(obj);
        })
        this.setState({
            taskAssigns_list: x,
            projectMembers_list: y,
            corporateEmployees_list: z
        })
    };

    handleTaskMember = (type, id) => {
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
            taskId: this.props.taskId,
            corporateEmployeeId: id
        };

        let url = null;

        let method = "patch";
        switch (type) {
            case 'ADD':
                url = `http://localhost:8080/v1/task`;
                break;
            case 'REMOVE':
                url = `http://localhost:8080/v1/task/remove`;
                break;
        }
        axios[method](url, body, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    this.getTaskMembers(this.props.taskId);
                }
                this.setState({loading: false});
            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    closeModal = () => {
        this.props.handleMembers(0);
    }

    render() {
        return(
            <Modal
                title={`Members`}
                centered
                // visible={this.state.visible}
                visible={this.props.member_modal_visibility}
                onCancel={this.closeModal}
                width={520}
                footer={null}
            >
                <Tabs defaultActiveKey="1"
                      // onChange={callback}
                >
                    <TabPane tab="Task Assigns" key="1">

                        <Table
                            pagination={false}
                            dataSource={this.state.taskAssigns_list}
                            columns={columns}
                            header={false}
                            className={'project-set-tbl'}
                        />


                    </TabPane>
                    <TabPane tab="Project Members" key="2">
                        <Table
                            pagination={false}
                            dataSource={this.state.projectMembers_list}
                            columns={columns}
                            header={false}
                            className={'project-set-tbl'}
                        />
                    </TabPane>
                    <TabPane tab="Other employees" key="3">
                        <Table
                            pagination={false}
                            dataSource={this.state.corporateEmployees_list}
                            columns={columns}
                            header={false}
                            className={'project-set-tbl'}
                        />
                    </TabPane>
                </Tabs>
            </Modal>
        )
    }

}

export default MemberManagementModal;
