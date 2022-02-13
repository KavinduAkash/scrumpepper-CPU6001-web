import React from "react";
import {Button, Col, Dropdown, Menu, Row, Select, Table, Tag, Tooltip} from "antd";
import './sprint-container.scss'
import { MinusCircleOutlined, WarningOutlined, NodeIndexOutlined, ArrowRightOutlined, DeleteOutlined, EyeOutlined, UnorderedListOutlined, EditOutlined, EllipsisOutlined, CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, MenuOutlined, SelectOutlined, AlertOutlined, PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import {arrayMoveImmutable} from "array-move";
import SprintEditModal from "./sprint-edit-modal";
const { SubMenu } = Menu;
const { Option } = Select;
const menu = (
    <Menu>
        <Menu.Item style={{color:'#1976D2'}}><EyeOutlined /> View</Menu.Item>
        <Menu.ItemGroup title="Move to sprint">
            <Menu.Item><ArrowRightOutlined /> Move to Sprint 1</Menu.Item>
            <Menu.Item><ArrowRightOutlined /> Move to Sprint 2</Menu.Item>
            <Menu.Item><ArrowRightOutlined /> Move to Sprint 3</Menu.Item>
        </Menu.ItemGroup>
        <Menu.Item style={{color:'#AD1457'}}><DeleteOutlined /> Remove</Menu.Item>
    </Menu>
);
const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
const columns = [
    {
        title: 'Sort',
        dataIndex: 'sort',
        width: '2.5%',
        className: 'drag-visible',
        render: () => <DragHandle />,
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        className: 'drag-visible',
        width: '2.5%',
    },
    {
        title: 'User Story',
        dataIndex: 'user_story',
        width: '70%',
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        width: '5%',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        width: '5%',
    },
    {
        title: 'Sprint',
        dataIndex: 'sprint',
        width: '10%',
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        width: '5%',
    }
];

const SortableItem = SortableElement(props => <tr {...props} />);
const SortableBody = SortableContainer(props => <tbody {...props} />);

class BacklogContainer extends React.Component {

    state = {
        dataSource: [
            {
                key: 1,
                edit: <Button type={'link'}
                    // onClick={()=>this.props.openEdit(r, i)}
                >
                    <SelectOutlined />
                </Button>,
                user_story: 'test',
                priority:
                    <Tooltip placement="top" title={'Priority High'}>
                        <span style={{color: 'red'}}>
                            <AlertOutlined />
                        </span>
                    </Tooltip>
                ,
                status:
                    <Select defaultValue="lucy" style={{ width: 120 }}
                        // onChange={handleChange}
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                ,
                actions:
                    <Dropdown overlay={menu}>
                        <Button type={'text'} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <EllipsisOutlined />
                        </Button>
                    </Dropdown>,
                index: 0
            },
            {
                key: 2,
                edit: <Button type={'link'}
                    // onClick={()=>this.props.openEdit(r, i)}
                >
                    <SelectOutlined />
                </Button>,
                user_story: 'test',
                status: 'Active',
                priority: "High",
                index: 1
            }
        ],
        toggle: true
    }

// Table ---------------------------------------------------------------------------------------------------------------
    DraggableContainer = props => (
        <SortableBody
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={this.onSortEnd}
            {...props}
        />
    );

    onSortEnd = ({ oldIndex, newIndex }) => {
        const { dataSource } = this.state;
        if (oldIndex !== newIndex) {
            const newData = arrayMoveImmutable([].concat(dataSource), oldIndex, newIndex).filter(
                el => !!el,
            );
            console.log(newData);
            this.setState({ dataSource: newData });
        }
    };

    DraggableContainer = props => (
        <SortableBody
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={this.onSortEnd}
            {...props}
        />
    );

    DraggableBodyRow = ({ className, style, ...restProps }) => {
        const { dataSource } = this.state;
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };

// Change toggle -------------------------------------------------------------------------------------------------------

    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        });
    };

//----------------------------------------------------------------------------------------------------------------------


    render() {




        let userStories = this.props.user_stories;
        let dataSource = [];
        if(userStories!=null & userStories!='' & userStories!=undefined) {
            userStories.map((r, i)=>{

                let isOtherSprints = (r.otherSprints!=null & r.otherSprints!='' & r.otherSprints!=undefined)?r.otherSprints.length>0?true:false:false;

                let menu = (
                    <Menu>
                        <Menu.Item style={{color:'#1976D2'}} onClick={()=>this.props.openEdit(r, i)}><EyeOutlined /> View</Menu.Item>
                        <Menu.ItemGroup title="Move to sprint">
                            {
                                isOtherSprints?r.otherSprints.map((rx, index)=><Menu.Item key={index} onClick={()=>this.props.move_user_story(r.id, rx.id)}><ArrowRightOutlined />Move to {rx.sprintName}</Menu.Item>):<Tag icon={<MinusCircleOutlined />} color="default">
                                    No Sprints
                                </Tag>
                            }
                        </Menu.ItemGroup>
                        <Menu.Item style={{color:'#AD1457'}}><DeleteOutlined /> Remove</Menu.Item>
                    </Menu>
                );


                let obj = {
                    key: i,
                    edit: <Button type={'link'}
                        onClick={()=>this.props.openEdit(r, i)}
                    >
                        <SelectOutlined />
                    </Button>,
                    user_story: r.title,
                    priority:
                    (r.priority=='HIGH')?
                            <Tooltip placement="top" title={'Priority High 🤯'}>
                                <span style={{color: 'red'}}>
                                    <AlertOutlined />
                                </span>
                            </Tooltip>
                            :(r.priority=='MEDIUM')?
                        <Tooltip placement="top" title={'Priority Medium 🙂'}>
                                <span style={{color: 'green'}}>
                                    <AlertOutlined />
                                </span>
                        </Tooltip>
                        :<Tooltip placement="top" title={'Priority low ☺️'}>
                                <span style={{color: '#90CAF9'}}>
                                    <AlertOutlined />
                                </span>
                        </Tooltip>
                    ,
                    status:
                        <Select defaultValue="TODO" style={{ width: 120 }}
                            // onChange={handleChange}
                        >
                            <Option value="TODO" style={{backgroundColor: '#CFD8DC'}}>Todo</Option>
                            <Option value="PROCESSING" style={{backgroundColor: '#B3E5FC'}}>Processing</Option>
                            <Option value="DONE" style={{backgroundColor: '#C8E6C9'}}>Done</Option>
                        </Select>
                    ,
                    sprint: <span>{r.sprint!=null?r.sprint.sprintName:<Tooltip placement="top" title={'No assigned sprint yet ⚠️'}><WarningOutlined /></Tooltip>}
                        <a type={'text'} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <NodeIndexOutlined />
                            </a>
                    </span>,
                    actions:
                        <Dropdown overlay={menu}>
                            <Button type={'text'} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <EllipsisOutlined />
                            </Button>
                        </Dropdown>,
                    index: 0
                }
                dataSource.push(obj);
            })
        }







        return (
            <div>
                <div className={'sprint-container'}>
                    {/*header*/}
                    <div className={'sprint-container-header'}>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'section1'}>
                                {/*<span className={'drop-arrow'}><Button type={'text'} onClick={this.toggle}>{ this.state.toggle?<CaretDownOutlined />:<CaretRightOutlined />}</Button></span>*/}
                                <span className={'title'}>{`${'Backlog'}`}</span>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'section2'}>
                                <span><Tag icon={<UnorderedListOutlined />} color="default">{`${0}`}</Tag></span>
                            </Col>
                        </Row>
                    </div>

                    {/*body*/}
                    {
                        this.state.toggle?
                            <div className={'sprint-container-body'}>
                                <Table
                                    pagination={false}
                                    dataSource={dataSource}
                                    columns={columns}
                                    rowKey="index"
                                    components={{
                                        body: {
                                            wrapper: this.DraggableContainer,
                                            row: this.DraggableBodyRow,
                                        },
                                    }}
                                    showHeader={false}
                                />
                            </div>
                            :null
                    }

                    {/*footer*/}
                    {
                        this.state.toggle?
                            <div className={'sprint-container-footer'}>
                                <Button onClick={()=>this.props.onChangeUserStoryModal(true)}>
                                    <PlusOutlined /> New User Story
                                </Button>
                            </div>
                            :null
                    }
                </div>
            </div>
        );
    }

}

export default BacklogContainer;
