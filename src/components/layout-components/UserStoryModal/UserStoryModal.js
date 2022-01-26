import React from "react";
import {Button, Col, Empty, Form, Input, InputNumber, Modal, Row, Select, Tabs, Tag} from "antd";
import JoditEditor from "jodit-react";
import TaskSetComponent from "../../sp-componenets/user-story-component/TaskSetComponent";

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
            style={{ marginRight: 3 }}
        >
            {label}
        </Tag>
    );
}


class UserStoryModal extends React.Component {

    state = {
        content: ""
    }

    onChangeDescription = val => {
        this.setState({content: val})
        console.log("Content : ", val);
    }

    render() {


        return(
            <Modal
                title={'New User Story'}
                centered
                // visible={this.state.visible}
                visible={true}
                // onCancel={() => this.setCreateProjectModalVisibility(false)}
                width={1000}
                footer={null}
            >

                <Tabs defaultActiveKey="2">
                    <TabPane
                        tab={
                            <span>
                             Attributes
                            </span>
                        }
                        key="1"
                    >

                        <Form>
                            <Row>
                                <Col sm={24} md={24} lg={4} xl={4}>
                                    User Story
                                </Col>
                                <Col sm={24} md={24} lg={20} xl={20}>
                                    <Input.TextArea />
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
                                        value={this.state.content}
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
                                        mode="multiple"
                                        showArrow
                                        tagRender={tagRender}
                                        defaultValue={['gold', 'cyan']}
                                        style={{ width: '100%' }}
                                        options={options}
                                    />
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col sm={24} md={24} lg={4} xl={4}>
                                    Priority
                                </Col>
                                <Col sm={24} md={24} lg={20} xl={20}>
                                    <Select defaultValue="lucy" style={{ width: '100%' }}
                                        // onChange={handleChange}
                                    >
                                        <Option value="high">High</Option>
                                        <Option value="medium">Medium</Option>
                                        <Option value="low">Low</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Form>

                    </TabPane>


                    <TabPane
                        tab={
                            <span>
                             Tasks
                            </span>
                        }
                        key="2"
                    >
                        {/*<Empty*/}
                        {/*    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"*/}
                        {/*    imageStyle={{*/}
                        {/*        height: 60,*/}
                        {/*    }}*/}
                        {/*    description={*/}
                        {/*        <span>*/}
                        {/*            No <a href="#API">tasks</a> yet.*/}
                        {/*        </span>*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    <Button type="primary">Create New</Button>*/}
                        {/*</Empty>*/}

                        <TaskSetComponent />

                    </TabPane>

                </Tabs>
            </Modal>
            );
    }
}

export default UserStoryModal;
