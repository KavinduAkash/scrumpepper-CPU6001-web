import React from "react";
import './poker-styles.scss'
import {Button, Col, Row, Table} from "antd";
import { UnorderedListOutlined } from '@ant-design/icons';
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
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        vote: 5
    },
    {
        key: '2',
        name: 'John',
        vote: 5
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
        selected_value: -1
    }

    componentDidMount() {
        let room = this.props.pokerReducer.room;
        let sprint_id = 0;
        if(room.sprint!=null) {
            sprint_id = room.sprint.id;
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

                    this.setState({user_stories: response.data.body})
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

                    this.setState({user_stories: response.data.body});
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
        if (stompClient) {
            var chatMessage = {
                voter_id: this.state.userData.userid,
                room_ref: this.state.ref,
                candidate_id: 1,
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

// ---------------------------------------------------------------------------------------------------------------------

    render() {

        let cards = [];
        fib[0].map((result, index)=>
        {
           let obj = <span className={`poker-card ${result==this.state.selected_value?`select-poker-card`:``}`} onClick={()=>this.sendPrivateValue(result)}>{result}</span>;
            cards.push(obj);
        });


        let result_options = [];
        if(this.state.value!=null) {
            this.state.value.map((result, index)=>{
                let obj = {
                    key: index,
                    name: `${result.firstName} ${result.lastName}`,
                    vote: result.vote
                }
                result_options.push(obj);
            })
        }

        return(
            <div>
                <div><span>All Poker Rooms</span><span>{`${" > "}`}</span><span style={{fontWeight: 'bold'}}>{this.state.ref}</span></div>
                <br/>
                <div>{`Connect: ${this.state.userData.connected}`}</div>
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
                                <Button type={'text'}><UnorderedListOutlined /></Button>
                            </div>
                            <div className={'btn-panel-2'}>
                                <Button type={'primary'}>Start</Button>
                            </div>
                        </div>
                    </div>


                    <div className={'poker-card-panel'}>

                        {
                            cards
                        }
                        
                        {/*<span className={"poker-card"}>1</span>*/}
                        {/*<span className={"poker-card select-poker-card"}>2</span>*/}
                        {/*<span className={"poker-card"}>3</span>*/}
                        {/*<span className={"poker-card"}>5</span>*/}
                        {/*<span className={"poker-card"}>8</span>*/}
                    </div>
                    
                    
                    
                    <div className={'vote-display'}>
                        <div className={'vote-display-row'}>
                            <span className={'item'}>
                                <span className={'card'}>1</span>
                                <span>-</span>
                                <span>2</span>
                            </span>
                            <span className={'item'}>
                                <span className={'card'}>1</span>
                                <span>-</span>
                                <span>2</span>
                            </span>
                            <span className={'item'}>
                                <span className={'card'}>1</span>
                                <span>-</span>
                                <span>2</span>
                            </span>
                            <span className={'item'}>
                                <span className={'card'}>1</span>
                                <span>-</span>
                                <span>2</span>
                            </span>
                            <span className={'item'}>
                                <span className={'card'}>1</span>
                                <span>-</span>
                                <span>2</span>
                            </span>
                            <span className={'item-2'}>
                                <Button type={'primary'}>Save</Button>
                            </span>
                            <span className={'item-2'}>
                                <Button type={'primary'}>Retry</Button>
                            </span>
                        </div>
                        <div className={'vote-display-tbl'}>
                            <Table dataSource={result_options} columns={columns} />
                        </div>
m
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
