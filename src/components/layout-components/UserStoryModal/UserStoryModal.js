import React from "react";
import {Button, Col, Empty, Form, Input, InputNumber, Modal, Row, Select, Tabs, Tag} from "antd";
import JoditEditor from "jodit-react";
import TaskSetComponent from "../../sp-componenets/user-story-component/TaskSetComponent";
import Cookies from "js-cookie";
import axios from "axios";
import * as Swal from "sweetalert2";
import MemberManagementModal from "./MemberManagementModal";

const { Option } = Select;

const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
}

const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];


function tagRender(props) {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3, color: '#01579B', backgroundColor: '#E8EAF6'}}
        >
            {label}
        </Tag>
    );
}


class UserStoryModal extends React.Component {

    state = {
        user_story_id: 0,
        user_story: "",
        content: "",
        label: [],
        priority: "MEDIUM",
        project_name: "",
        isEdit: false,
        user_story_label: [],
        tasks: [],
        memberModal: false,
        taskId: 0
    }

    componentDidMount() {
        this.loadProjectUserStoryLbl();
        this.prepareData(this.props.data, this.props.isEdit)
    }

    loadProjectUserStoryLbl = () => {

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

        axios[method](`http://localhost:8080/v1/user-story/get-project-lbl?id=${this.props.project.id}`, {headers: headers})
            .then(async response => {

                if(response.data.success) {
                    let label_list = response.data.body;
                    let lbl = [];
                    label_list.map(val=>{
                        lbl.push({value:val.lbl});
                    });
                    this.setState({label: lbl});
                }

            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    };

    prepareResponseData = (data, isEdit) => {
        this.loadProjectUserStoryLbl();
        this.prepareData(data, isEdit)
    }

    prepareData = (data, isEdit) => {
        if(isEdit) {

            let label_list = [];
            data.userStoryLbl.map(r=>{
                label_list.push(r.lbl)
            })

            console.log("prosp: Lbl-list: ", data);
            console.log("Lbl-list: ", label_list);

            this.setState({
                user_story_id: data.id,
                user_story: data.title,
                content: data.description,
                user_story_label: label_list,
                priority: data.priority,
                project_name: this.props.project.projectName,
                isEdit: isEdit,
                tasks: data.tasks
            });
        } else {
            this.setState({
                project_name: this.props.project.projectName,
            });
        }
    }

    onChangeDescription = val => {
        this.setState({content: val})
    }

    closeModal = () => {
        this.props.modal_controller(false);
    }

    onChangeUserStoryTitle = e => {
        this.setState({user_story: e.target.value});
    }

    onChangeLabel = val => {
        this.setState({
            user_story_label: val
        })
    }

    onChangeUserStory = (val) => {
        if(val=="CREATE") {
            if(Cookies.get('68e78905f4c')=="" ||
                Cookies.get('68e78905f4c')==null ||
                Cookies.get('68e78905f4c')==undefined) {
                this.props.history.push("/auth/login");
            }

            let headers = {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
            };

            let request_body = {
                projectId: this.props.project_id,
                userStoryId: this.state.user_story_id,
                title: this.state.user_story,
                description: this.state.content,
                userStoryLabels: this.state.user_story_label,
                priority: this.state.priority
            }

            let method = "post";

            axios[method](`http://localhost:8080/v1/user-story?id=${this.props.current_sprint?this.props.current_sprint.id:0}`, request_body, {headers: headers})
                .then(async response => {

                    if(response.data.success) {
                        this.prepareResponseData(response.data.body, true);

                        Swal.fire(
                            'Success',
                            'User story created successfully!',
                            'success'
                        )
                    }

                }).catch(async error => {
                this.setState({loading: false});

                this.setState({showMessage:1});
                setTimeout(() => {
                    this.setState({showMessage:0});
                }, 2000);

            });
        } else {
            if(Cookies.get('68e78905f4c')=="" ||
                Cookies.get('68e78905f4c')==null ||
                Cookies.get('68e78905f4c')==undefined) {
                this.props.history.push("/auth/login");
            }

            let headers = {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
            };

            let request_body = {
                projectId: this.props.project_id,
                userStoryId: this.state.user_story_id,
                title: this.state.user_story,
                description: this.state.content,
                userStoryLabels: this.state.user_story_label,
                priority: this.state.priority
            }

            let method = "post";

            axios[method](`http://localhost:8080/v1/user-story?id=${this.props.current_sprint?this.props.current_sprint.id:0}`, request_body, {headers: headers})
                .then(async response => {

                    if(response.data.success) {
                        this.prepareResponseData(response.data.body, true);

                        Swal.fire(
                            'Success',
                            'User story updated successfully!',
                            'success'
                        )

                    }

                }).catch(async error => {
                this.setState({loading: false});

                this.setState({showMessage:1});
                setTimeout(() => {
                    this.setState({showMessage:0});
                }, 2000);

            });
        }
    }


    // Task Management -------------------------------------------------------------------------------------------------

    createTask = (taskLbl, title) => {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let request_body = {
            userStoryId: this.state.user_story_id,
            title: title,
            statusType: "TODO"
        }

        let method = "post";

        axios[method](`http://localhost:8080/v1/task`, request_body, {headers: headers})
            .then(async response => {

                if(response.data.success) {
                    let tasks = this.state.tasks;
                    tasks.push(response.data.body);
                    this.setState({tasks: tasks});
                }

            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    };

    updateTask = (taskId, taskLbl, title) => {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let request_body = {
            taskId: taskId,
            userStoryId: this.state.user_story_id,
            title: title,
            statusType: "TODO"
        }

        let method = "post";

        axios[method](`http://localhost:8080/v1/task`, request_body, {headers: headers})
            .then(async response => {

                if(response.data.success) {
                    let tasks = this.state.tasks;
                    this.setState({tasks: tasks});
                }

            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    };

    handleMembers = (taskId) => {
        if(taskId!=0) {
            this.setState({
                memberModal: true,
                taskId: taskId
            })
        } else {
            this.setState({
                memberModal: false,
                taskId: taskId
            })
        }
    }







    render() {

        let {user_story_id, user_story, content, label, priority, user_story_label} = this.state;

        return(
            <div>

            <Modal
                title={(this.state.isEdit && this.state.user_story!="")?`${this.state.project_name} -> ${(this.state.user_story.length>100)?`${this.state.user_story.slice(0, 97)}...`
                    :this.state.user_story}`:`${this.state.project_name} -> New User story`}
                centered
                // visible={this.state.visible}
                visible={this.props.user_story_modal_visibility}
                onCancel={this.closeModal}
                width={1000}
                footer={null}
            >

                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                             Attributes
                            </span>
                        }
                        key="1"
                    >

                        <div>
                            <Row>
                                <Col sm={24} md={24} lg={4} xl={4}>
                                    User Story
                                </Col>
                                <Col sm={24} md={24} lg={20} xl={20}>
                                    <Input.TextArea value={user_story} onChange={this.onChangeUserStoryTitle} />
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col sm={24} md={24} lg={4} xl={4}>
                                    Description
                                </Col>
                                <Col sm={24} md={24} lg={20} xl={20} className={'custom-text-editor'}>

                                    <JoditEditor
                                        ref={null}
                                        value={content}
                                        config={config}
                                        tabIndex={1} // tabIndex of textarea
                                        onBlur={newContent => this.onChangeDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                                        onChange={newContent => {}}
                                    />

                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col sm={24} md={24} lg={4} xl={4}>
                                    Label
                                </Col>
                                <Col sm={24} md={24} lg={20} xl={20}>
                                    <Select
                                        mode="tags"
                                        showArrow
                                        tagRender={tagRender}
                                        value={user_story_label}
                                        // defaultValue={['XXXX', 'YYYY']}
                                        style={{ width: '100%' }}
                                        options={label}
                                        onChange={this.onChangeLabel}
                                    />
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col sm={24} md={24} lg={4} xl={4}>
                                    Priority
                                </Col>
                                <Col sm={24} md={24} lg={20} xl={20}>
                                    <Select defaultValue="MEDIUM" style={{ width: '100%' }}
                                        // onChange={handleChange}
                                    >
                                        <Option value="HIGH">High</Option>
                                        <Option value="MEDIUM">Medium</Option>
                                        <Option value="LOW">Low</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col sm={24} md={24} lg={24} xl={24} className={'text-right'}>
                                    {
                                        <Button type="primary"
                                            onClick={
                                                user_story_id!=0?
                                                    ()=>this.onChangeUserStory("UPDATE") :
                                                    ()=>this.onChangeUserStory("CREATE")}
                                        >
                                            {
                                                user_story_id==0?"Create":"Update"
                                            }
                                        </Button>
                                    }
                                </Col>
                            </Row>
                        </div>

                    </TabPane>


                    <TabPane
                        tab={
                            <span>
                             Tasks
                            </span>
                        }
                        key="2"
                        disabled={this.state.user_story_id<=0}
                    >
                        {
                            this.state.tasks.length==0?
                                <Empty
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        <span>
                                    No <a href="#API">tasks</a> yet.
                                </span>
                                    }
                                >
                                    <Button
                                        type="primary"
                                        onClick={()=>this.createTask(null, null)}
                                    >Create New</Button>
                                </Empty>
                                :
                                <TaskSetComponent tasks={this.state.tasks} createTask={this.createTask} updateTask={this.updateTask} handleMembers={this.handleMembers} />
                        }

                    </TabPane>

                </Tabs>
            </Modal>
                {
                    (this.state.memberModal & this.state.taskId!=0)?<MemberManagementModal member_modal_visibility={true} taskId={this.state.taskId} handleMembers={this.handleMembers} />:null
                }

            </div>
            );
    }
}

export default UserStoryModal;
