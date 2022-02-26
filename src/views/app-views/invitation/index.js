import React from "react";
import {Button, Table, Tag} from "antd";
import Cookies from "js-cookie";
import axios from "axios";


const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Corporate',
        dataIndex: 'corporate',
        key: 'corporate',
    },
    {
        title: 'Response',
        dataIndex: 'response',
        key: 'response',
    },
];

class Invitation extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }
        this.load_invitations();
    }

    load_invitations = () => {
        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let method = "get";

        axios[method](`http://localhost:8080/v1/corporate/employee/invitations`, {headers: headers})
            .then(async response => {
                console.log(response);
                if(response.data.success) {
                    this.setState({data: response.data.body});
                }
            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });

    };

    sendResponse = value => {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let method = "post";

        let body = {
            invitationId: value.id,
            invitationStatus: value.status
        }

        axios[method](`http://localhost:8080/v1/corporate/employee/approve`, body, {headers: headers})
            .then(async response => {
                console.log(response);
                if(response.data.success) {
                    this.setState({data: response.data.body});
                    this.load_invitations();
                }
            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    render() {

        let data_list = [];
        if(this.state.data!=null & this.state.data!=undefined & this.state.data!="") {
            this.state.data.map((result, index)=>{

                let split = (result.invitationDate).split("T");
                let split1 = split[1].split(".");

                let obj = {
                   key: index,
                   date: `${split[0]} ${split1[0]}`,
                   corporate: result.corporate.name,
                   response: (result.status=="PENDING")?
                       <div>
                           <Button type="primary" onClick={()=>this.sendResponse({id:result.id, status:`ACCEPTED`})}>Accept</Button>
                           <Button type="danger" onClick={()=>this.sendResponse({id:result.id, status:`REJECT`})}>Reject</Button>
                       </div>

                       :(result.status=="ACCEPTED")?<Tag color="geekblue">Accepted</Tag>:<Tag color="orange">Rejected</Tag>
               }
               data_list.push(obj);
            });
        }

        return(
            <div>
                <Table dataSource={data_list} columns={columns} />
            </div>
        );
    }

}

export default Invitation;
