import React from "react";
import {withRouter} from "react-router-dom";
import {Button, message, Table} from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../../../server/base_urls";
import SppPokerModal from "../../../../../components/sp-componenets/spp-poker-components/spp-poker-modal";
import * as innerRoutes from "./poker-inner-routers";
import * as spinner_actions from "../../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../../redux/actions/Navigation";
import * as project_actions from "../../../../../redux/actions/Project";
import * as document_actions from "../../../../../redux/actions/Documents";
import * as poker_actions from "../../../../../redux/actions/Poker";
import {connect} from "react-redux";

const columns = [
    {
        title: 'Start Date & Time',
        dataIndex: 'sdate',
        key: 'sdate',
    },
    {
        title: 'End Date & Time',
        dataIndex: 'edate',
        key: 'edate',
    },
    {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    },
];

class ProjectSppPokerAll extends React.Component {

    state = {
        isEdit: false,
        selectedRoom: null,
        rooms: []
    }

    componentDidMount() {
        this.load_all_rooms();
    }

    load_all_rooms = () => {
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

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}sppoker/room/get/${this.props.projectReducer.project.id}`, {headers: headers})
            .then(async response => {

                if(response.data.success) {

                    this.setState({rooms: response.data.body})
                }

            }).catch(async error => {
            this.setState({loading: false});
            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    start_room = (data) => {
        this.props.storePokerRoom(data);
        this.props.history.push(innerRoutes.inner_route_play);
        this.setState({
            isEdit: false,
            selectedRoom: null
        })
    }

    handle_modal = (val, open) =>{
        this.setState({
            isEdit: open,
            selectedRoom: val
        })
        // this.props.history.push(innerRoutes.inner_route_new_room);
    }

    render() {
        let {rooms} = this.state;
        let room_list = [];
        rooms.map((result, index)=>{

            let cd = result.startedDate;
            let cdSplit = cd.split('T');
            let cd1 = cdSplit[0];
            let cd2 = cdSplit[1].split('.')[0];

            let md = result.closeDate;
            let md1 = "";
            let md2 = "";
            if(md!=null) {
                let mdSplit = md.split('T');
                md1 = mdSplit[0];
                md2 = mdSplit[1].split('.')[0];
            }

            let obj = {
                sdate: `${cd1} ${cd2}`,
                edate: md!=null?`${md1} ${md2}`:"-",
                note: result.note,
                action: <Button type={'text'} onClick={()=>this.start_room(result)}>Join</Button>,
            }

            room_list.push(obj);
        })
        return(
            <div>
                <div style={{fontWeight: 'bold'}}>All Poker Rooms</div>
                <br/>
                <h3>SPP Poker</h3>
                {
                    this.state.isEdit?
                    <SppPokerModal isEditVisible={this.state.isEdit} openModal={this.handle_modal} data={this.state.selectedRoom} startRoom={this.start_room} />
                    : null
                }
                <div style={{textAlign: 'right'}}>
                    <Button type="primary" onClick={()=>this.handle_modal(null, true)}>New Room</Button>
                </div>
                <br/>
                <div>
                    <Table dataSource={room_list} columns={columns} />
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    corporateReducer: state.corporateReducer,
    projectReducer: state.projectReducer,
    documentReducer: state.documentReducer
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSppPokerAll);
