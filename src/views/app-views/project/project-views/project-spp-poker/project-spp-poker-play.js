import React from "react";
import './poker-styles.scss'
import {AutoComplete, Button, Col, Input, Modal, Row, Table, Tag} from "antd";
import { UnorderedListOutlined, CheckCircleOutlined, SyncOutlined, SaveOutlined, RedoOutlined, ArrowRightOutlined } from '@ant-design/icons';
import * as spinner_actions from "../../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../../redux/actions/Navigation";
import * as project_actions from "../../../../../redux/actions/Project";
import * as document_actions from "../../../../../redux/actions/Documents";
import * as poker_actions from "../../../../../redux/actions/Poker";
import {connect} from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../../../server/base_urls";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

const fib = [
    [
        0,1,2,3,5,8,13,21,34,55,89,"?"
    ]
]
var stompClient =null;

const us_columns = [
    {
        title: 'User Story',
        dataIndex: 'user_story',
        key: 'user_story',
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Vote',
        dataIndex: 'vote',
        key: 'vote',
    },
];

class ProjectSppPokerPlay extends React.Component {

    state = {
        ref: "",
        user_stories: [],
        userData:{
            userid: '',
            receivername: '',
            connected: false,
            message: ''
        },
        value: [],
        selected_value: -1,
        openUserStoryModal: false,
        selected_user_story: 0
    }

    componentDidMount() {
        let room = this.props.pokerReducer.room;
        let sprint_id = 0;
        if(room!=null && room!=undefined) {
            if(room.sprint!=null) {
                sprint_id = room.sprint.id;
            }
        }
        let userData1 = this.state.userData;
        let x = {...userData1,"userid": this.props.userReducer.user.id};
        this.setState({
            ref: room.roomRef,
            sprintId: sprint_id,
            userData: x
        })
        console.log("Room: ", room);
        if(sprint_id!=0) {
            this.load_sprint_data(sprint_id);
        } else {
            this.load_project_data(room.project.id);
        }
        this.registerUser();
    }

    load_project_data = project_id => {
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

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}user-story/get-project?id=${this.props.projectReducer.project.uuid}&corporate=${this.props.corporateReducer.corporate_id}`, {headers: headers})
            .then(async response => {

                if(response.data.success) {

                    this.setState({user_stories: response.data.body, selected_user_story: response.data.body[0].id})
                    console.log("Room-p: ", response.data.body);
                }

            }).catch(async error => {
            this.setState({loading: false});
            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    load_sprint_data = sprint_id => {
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

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}user-story/get-sprint?id=${sprint_id}`, {headers: headers})
            .then(async response => {

                if(response.data.success) {

                    this.setState({user_stories: response.data.body, selected_user_story: response.data.body[0].id});
                    console.log("Room-s: ", response.data.body);


                }

            }).catch(async error => {
            this.setState({loading: false});
            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

// ---------------------------------------------------------------------------------------------------------------------

    registerUser=()=>{
        this.connect();
    }

    connect =()=>{
        let Sock = new SockJS('http://localhost:8081/ws');
        stompClient = over(Sock);
        stompClient.connect({},this.onConnected, this.onError);
    }

    onConnected = () => {
        let userData1 = this.state.userData;
        let x = {...userData1,"connected": true}
        this.setState({userData: x});
        stompClient.subscribe('/user/'+this.state.ref+'/private', this.onPrivateMessage);
        this.userJoin();
    }

    onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);

        console.log("VALUE: ", payloadData);

        this.setState({
            value: payloadData.votes
        })
    }

    userJoin=()=>{
        var chatMessage = {
            senderName: this.state.userData.username,
            status:"JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        this.load_initial();
    }


    load_initial = () => {
        let headers = {
            'Content-Type':'application/json',
            // 'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let method = "post";

        let body = {
        }

        axios[method](`http://localhost:8081/v1/votex/private-message-just-connect?ref=${this.state.ref}`, body, {headers: headers})
            .then(async response => {
                console.log(response);
                if(response.data.success) {
                    this.setState({
                        value: response.data.body.votes
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


    onError = (err) => {
        console.log(err);
    }

    sendPrivateValue=(vote)=>{

        console.log("Selected User Story: ", this.state.selected_user_story);

        if (stompClient) {
            var chatMessage = {
                voter_id: this.state.userData.userid,
                room_ref: this.state.ref,
                candidate_id: this.state.selected_user_story,
                vote: vote
            };

            // if(userData.username !== tab){
            //     privateChats.get(tab).push(chatMessage);
            //     setPrivateChats(new Map(privateChats));
            // }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            let userData1 = this.state.userData;
            let x = {...userData1,"message": ""};
            this.setState({userData: x, selected_value: vote});
        }
    }

    openUserStoriesModal = e => {
        this._openUserStoriesModal(e);
    }

    _openUserStoriesModal = e => {
        this.setState({openUserStoryModal: e});
    }

// ---------------------------------------------------------------------------------------------------------------------


    render() {

        let cards = [];
        fib[0].map((result, index)=>
        {
           let obj = <span className={`poker-card ${result==this.state.selected_value?`select-poker-card`:``}`} onClick={()=>this.sendPrivateValue(result)}>{result}</span>;
            cards.push(obj);
        });


        let result_count = [];

        fib[0].map((result, index)=>{
            let obj = {
                value: result,
                count: 0
            }
            result_count.push(obj);
        })

        let result_options = [];
        console.log("result_count: ", result_count)
        if(result_count.length>0) {
            if(this.state.value!=null) {
                this.state.value.map((result, index)=>{
                    let obj = {
                        key: index,
                        name: `${result.firstName} ${result.lastName}`,
                        vote: result.vote
                    }
                    let i = result_count.findIndex((obj => obj.value == result.vote));
                    result_count[i].count = result_count[i].count + 1;
                    result_options.push(obj);
                })
            }
        }

        let userStories = this.state.user_stories;
        let ccs = "";
        let us_list = [];
        if(userStories!=null & userStories!="" & userStories!=undefined) {
            ccs = userStories[0].title;
            userStories.map((result, index)=>{
                let obj = {
                    key: index,
                    user_story: result.title,
                    action: <Button type={'text'}>Vote</Button>
                }
                us_list.push(obj);
            })
        }


        let open = this.state.openUserStoryModal;
        if(this.state.selected_user_story==0) {
            open = true
        }

        return(
            <div>

                <Modal
                    title={`User Stories`}
                    centered
                    visible={open}
                    onCancel={() => this._openUserStoriesModal(false)}
                    width={600}
                    footer={null}
                >
                    <div className={'text-center'}>
                        <Table dataSource={us_list} columns={us_columns}/>
                    </div>
                </Modal>

                <div><span>All Poker Rooms</span><span>{`${" > "}`}</span><span style={{fontWeight: 'bold'}}>{this.state.ref}</span></div>
                <br/>
                <div>
                    {
                        this.state.userData.connected?
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                Connected
                            </Tag>
                            :
                            <div>
                                <Tag icon={<SyncOutlined spin />} color="processing">
                                    Connecting...
                                </Tag>
                                <div>
                                    ( Please wait. Still you are connecting to the SPP Poker Server. )
                                </div>
                            </div>

                    }

                </div>
                {/*<div>{`value: ${this.state.value}`}</div>*/}
                <br/>
                <div>
                    <div>
                        {/*<div className={'user-story-display'}>*/}
                        {/*    <div className={'btn-panel'}>*/}
                        {/*        <Button type={'text'}><UnorderedListOutlined /></Button>*/}
                        {/*    </div>*/}
                        {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi corporis, eius expedita in minima quasi reprehenderit. Eligendi et praesentium saepe sed sunt. Aut beatae, commodi ex hic laborum molestias!*/}
                        {/*</div>*/}
                        <div className={'user-story-display'}>
                            <div className={'btn-panel'}>
                                <Button type={'text'} onClick={()=>this.openUserStoriesModal(true)}><UnorderedListOutlined /></Button>
                            </div>
                            {/*<div className={'btn-panel-2'}>*/}
                            {/*    <Button type={'primary'}>Start</Button>*/}
                            {/*</div>*/}
                            <div
                                style={{textAlign: 'center', fontWeight: 'bolder'}}
                            >
                                {
                                    ccs
                                }
                            </div>

                        </div>
                    </div>


                    <div className={'poker-card-panel'}>

                        {
                            cards
                        }

                    </div>
                    
                    
                    
                    <div className={'vote-display text-center'}>
                        <div className={'vote-display-row'}>
                            {
                                result_count.map((result, index)=>
                                        <span className={'item'} key={index}>
                                            <span className={'card'}>{result.value}</span>
                                            <span>-</span>
                                            <span>{result.count}</span>
                                        </span>
                                )
                            }

                            <div className={'mt-3'}>
                                <span className={'item-2'}>
                                    <Button type={'primary'}><SaveOutlined /> Save</Button>
                                </span>
                            </div>

                        </div>
                        <div className={'vote-display-tbl text-center'} style={{margin: "auto"}}>
                            <Table dataSource={result_options} columns={columns} />
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    corporateReducer: state.corporateReducer,
    projectReducer: state.projectReducer,
    documentReducer: state.documentReducer,
    pokerReducer: state.pokerReducer,
    userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        // corporateHandler: (data) => dispatch(corporate_actions.storeCorporateId(data)),
        handleSpinner: (data) => dispatch(spinner_actions.handlerSpinner(data)),
        handleNavigation: (data) => dispatch(navigation_actions.handlerNavigation(data)),
        handleProjectId: (data) => dispatch(project_actions.handleProjectId(data)),
        storeCurrentDoc: (data) => dispatch(document_actions.storeCurrentDocument(data)),
        storePokerRoom: (data) => dispatch(poker_actions.storePokerRoom(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSppPokerPlay);
