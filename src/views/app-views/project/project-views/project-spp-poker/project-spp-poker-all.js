import React from "react";
import {withRouter} from "react-router-dom";
import {Button, message, Table} from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../../../server/base_urls";
import SppPokerModal from "../../../../../components/sp-componenets/spp-poker-components/spp-poker-modal";
import * as innerRoutes from "./poker-inner-routers";

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
        selectedRoom: null
    }

    componentDidMount() {
        this.load_all_rooms();
    }

    load_all_rooms = () => {
        // if(Cookies.get('68e78905f4c')=="" ||
        //     Cookies.get('68e78905f4c')==null ||
        //     Cookies.get('68e78905f4c')==undefined) {
        //     this.props.history.push("/auth/login");
        // }
        //
        // let headers = {
        //     'Content-Type':'application/json',
        //     'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        // };
        //
        // let method = "patch";
        //
        // axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}user-story/move`, body, {headers: headers})
        //     .then(async response => {
        //
        //         if(response.data.success) {
        //             message.success('User story moved to sprint successfully');
        //             this.load_backlog_data();
        //         }
        //
        //     }).catch(async error => {
        //     this.setState({loading: false});
        //     this.setState({showMessage:1});
        //     setTimeout(() => {
        //         this.setState({showMessage:0});
        //     }, 2000);
        //
        // });
    }

    new_room = () => {
        // if(Cookies.get('68e78905f4c')=="" ||
        //     Cookies.get('68e78905f4c')==null ||
        //     Cookies.get('68e78905f4c')==undefined) {
        //     this.props.history.push("/auth/login");
        // }
        //
        // let headers = {
        //     'Content-Type':'application/json',
        //     'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        // };
        //
        // let method = "post";
        //
        // let body = {
        //     id: 0,
        //     projectId:,
        //     sprintId:,
        //     description:,
        //     status: 1
        // }
        //
        // axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}user-story/move`, body, {headers: headers})
        //     .then(async response => {
        //
        //         if(response.data.success) {
        //             message.success('User story moved to sprint successfully');
        //             this.load_backlog_data();
        //         }
        //
        //     }).catch(async error => {
        //     this.setState({loading: false});
        //     this.setState({showMessage:1});
        //     setTimeout(() => {
        //         this.setState({showMessage:0});
        //     }, 2000);
        //
        // });
    }

    handle_modal = (val, open) =>{
        // this.setState({
        //     isEdit: open,
        //     selectedRoom: val
        // })
        this.props.history.push(innerRoutes.inner_route_new_room);
    }

    render() {
        return(
            <div>
                <div style={{fontWeight: 'bold'}}>All Poker Rooms</div>
                <br/>
                <h3>SPP Poker</h3>
                {
                    this.state.isEdit?
                    <SppPokerModal isEditVisible={this.state.isEdit} openModal={this.handle_modal} data={this.state.selectedRoom} />
                    : null
                }
                <div style={{textAlign: 'right'}}>
                    <Button type="primary" onClick={()=>this.handle_modal(null, true)}>New Room</Button>
                </div>
                <br/>
                <div>
                    <Table dataSource={[]} columns={columns} />
                </div>
            </div>
        );
    }

}

export default ProjectSppPokerAll;
