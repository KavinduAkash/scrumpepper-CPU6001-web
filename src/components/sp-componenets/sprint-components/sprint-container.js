import React from "react";
import {Button, Col, Dropdown, Menu, Row, Select, Table, Tag, Tooltip} from "antd";
import './sprint-container.scss'
import { CaretDownOutlined, MinusCircleOutlined, WarningOutlined, NodeIndexOutlined, ArrowRightOutlined, DeleteOutlined, EyeOutlined, UnorderedListOutlined, EditOutlined, EllipsisOutlined, CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, MenuOutlined, SelectOutlined, AlertOutlined, PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import {arrayMoveImmutable} from "array-move";
import SprintEditModal from "./sprint-edit-modal";
import Cookies from "js-cookie";
import axios from "axios";
import * as Swal from "sweetalert2";
import * as BaseUrl from "../../../server/base_urls";

const { SubMenu } = Menu;
const { Option } = Select;
const menu = (
    <Menu>
        <Menu.ItemGroup title="Group title">
            <Menu.Item>1st menu item</Menu.Item>
            <Menu.Item>2nd menu item</Menu.Item>
        </Menu.ItemGroup>
        <SubMenu title="sub menu">
            <Menu.Item>3rd menu item</Menu.Item>
            <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
        <SubMenu title="disabled sub menu" disabled>
            <Menu.Item>5d menu item</Menu.Item>
            <Menu.Item>6th menu item</Menu.Item>
        </SubMenu>
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

class SprintContainer extends React.Component {

    state = {
        loading: false,
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
        toggle: false
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

// Start sprint --------------------------------------------------------------------------------------------------------
    startSprint = () => {
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
        let request_body = {}
        let method = "patch";
        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}sprint/start?id=${this.props.sprint.id}`, request_body, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    this.props.loadSprints();
                    Swal.fire(
                        'Success',
                        'Sprint started successfully!',
                        'success'
                    )
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

    onChangeUserStoryStatus = (e, i) => {
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
        let request_body = {
            userStoryId: i,
            status: e
        }
        let method = "patch";
        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}user-story`, request_body, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    this.props.loadSprints();
                    Swal.fire(
                        'Success',
                        'Sprint started successfully!',
                        'success'
                    )
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

    render() {

        let dataSource = [];
        let todo = 0;
        let process = 0;
        let done = 0;
        this.props.sprint.userStory.map((r, i)=>{
            let isOtherSprints = (r.otherSprints!=null & r.otherSprints!='' & r.otherSprints!=undefined)?r.otherSprints.length>0?true:false:false;

            let menu = (
                <Menu>
                    <Menu.Item style={{color:'#1976D2'}} onClick={()=>this.props.openEdit(r, i, this.props.sprint)}><EyeOutlined /> View</Menu.Item>
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
                    onClick={()=>this.props.openEdit(r, i, this.props.sprint)}
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
                    <Select defaultValue={r.statusType} style={{ width: 120 }}
                        onChange={(value)=>this.onChangeUserStoryStatus(value, r.id)}
                    >
                        <Option value="TODO" style={{backgroundColor: '#CFD8DC'}}>Todo</Option>
                        <Option value="PROCESSING" style={{backgroundColor: '#B3E5FC'}}>Processing</Option>
                        <Option value="COMPLETED" style={{backgroundColor: '#C8E6C9'}}>Done</Option>
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
            if(r.statusType=='TODO') {todo = todo + 1}
            if(r.statusType=='PROCESSING') {process = process + 1}
            if(r.statusType=='DONE') {done = done + 1}
        })

        return (
            <div>
                <div className={'sprint-container'}>
                    {/*header*/}
                    <div className={'sprint-container-header'}>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'section1'}>
                                <span className={'drop-arrow'}><Button type={'text'} onClick={this.toggle}>{ this.state.toggle?<CaretDownOutlined />:<CaretRightOutlined />}</Button></span>
                                <span className={'title'}>{`${this.props.sprint.sprintName}`}</span>
                                <span className={'edit'}><Button type={'text'} onClick={()=>this.props.updateSprint(this.props.sprint)}><EditOutlined />Edit</Button></span>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'section2'}>
                                <span><Tag icon={<ClockCircleOutlined />} color="default">{`${todo}`}</Tag></span>
                                <span><Tag icon={<SyncOutlined />} color="processing">{`${process}`}</Tag></span>
                                <span><Tag icon={<CheckCircleOutlined />} color="success">{`${done}`}</Tag></span>
                                {
                                    this.props.sprint.statusType=="TODO"?
                                    <span className={'action-1'}><Button type="primary" size={'small'} onClick={this.startSprint}>Start Sprint</Button></span>:
                                        this.props.sprint.statusType=="PROCESSING"?"PROCESSING":""
                                }

                                <span className={'action-1'}>
                               <Dropdown overlay={menu}>
                                   <Button type={'text'} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        <EllipsisOutlined />
                                   </Button>
                               </Dropdown>
                           </span>
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
                                <Button
                                    onClick={()=>this.props.openNewUserStory(true, this.props.sprint)}
                                >
                                    <PlusOutlined /> New User Story
                                </Button>
                            </div>
                            :null
                    }
                </div>

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

export default SprintContainer;
