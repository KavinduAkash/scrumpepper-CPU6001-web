import React from "react";
import {withRouter} from "react-router-dom";
import {AutoComplete, Button, Input, Modal, Table, Tag} from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import * as Swal from "sweetalert2";
import * as spinner_actions from "../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../redux/actions/Navigation";
import * as project_actions from "../../../../redux/actions/Project";
import * as document_actions from "../../../../redux/actions/Documents";
import * as poker_actions from "../../../../redux/actions/Poker";
import {connect} from "react-redux";
import * as BaseUrl from "../../../../server/base_urls";

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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
];

const addProjectMembersColumns = [
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        width: '80%',
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
    }
];

class ProjectTeams extends React.Component {

    state = {
        team: [],
        addProjectMembers: false,
        add_corporate_employee_options: []
    }

    componentDidMount() {
        this.getTeam();
    }

    getTeam = () => {
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
        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}project-member/get-team?id=${this.props.projectReducer.project.id}`, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    this.setState({team: response.data.body});
                }
            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);
        });
    }

    onSearchUsers = e => {
        let value  = e.target.value;
        this._onSearchUsers(value);
    };

    _onSearchUsers = value => {
        let res = [];

        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let req_obj = {
        };

        axios.post(`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}user/search?keyword=${value}&corporate=${this.props.corporateReducer.corporate_id}&project=${this.props.projectReducer.project.id}`, req_obj, {headers})
            .then(res => {
                console.log(res.data);
                if(res.data.success) {
                    this.setState({
                        add_corporate_employee_options: res.data.body
                    })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    addProjectMemberModalVisibility = e => {
        this.setState({addProjectMembers: e});
        if(e) {
            this._onSearchUsers("");
        }
    }

    render() {

        let managerTeam = [];
        let otherTeam = [];
        this.state.team.map((result, index)=>{
            let obj = {
                name: `${ result.corporateEmployee.user.firstName } ${ result.corporateEmployee.user.lastName }`,
                role: result.scrumRole
            }
            if(result.scrumRole=='PRODUCT_OWNER' || result.scrumRole=='SCRUM_MASTER') {
                managerTeam.push(obj);
            } else {
                otherTeam.push(obj);
            }
        });


        let list_add_employee_options = [];
        if(this.state.add_corporate_employee_options!=null && this.state.add_corporate_employee_options!="" && this.state.add_corporate_employee_options!= undefined) {
            this.state.add_corporate_employee_options.map((result, index)=>{
                let obj = {
                    key: index,
                    user: <div>
                        <div>{`${result.firstName} ${result.lastName}`}</div>
                        <div><span>{`${result.refNo}`}</span>{`${" | "}`}<span>{`${result.email}`}</span></div>
                    </div>,
                    action: (result.yourCorporate)? <Tag color="purple">Member</Tag>
                        :
                        <Button
                            type="primary"
                            onClick={()=>this.sendInvitations({
                                userId: result.id,
                                corporateId: this.props.corporateReducer.corporate_id,
                                email: result.email,
                                accessType: 'CORPORATE_EMPLOYEE'
                            })}
                        >
                            Add
                        </Button>
                };
                list_add_employee_options.push(obj);
            })
        }





        return(
            <div>

                <Modal
                    title={`Add Corporate Employee`}
                    centered
                    visible={this.state.addProjectMembers}
                    onCancel={() => this.addProjectMemberModalVisibility(false)}
                    width={600}
                    footer={null}
                >
                    <div className={'text-center'}>
                        <AutoComplete
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={500}
                            style={{ minWidth: '80%' }}
                        >
                            <Input.Search size="large" placeholder="input here" onChange={this.onSearchUsers}/>
                        </AutoComplete>

                        <Table dataSource={list_add_employee_options} columns={addProjectMembersColumns}/>
                    </div>
                </Modal>

                <h3>Team</h3>
                <br/>
                <div>
                    <Button onClick={()=>this.addProjectMemberModalVisibility(true)}>Add Member</Button>
                </div>
                <div>
                    <div>
                        <h5>Managers</h5>
                        <Table dataSource={managerTeam} columns={columns} />
                    </div>
                    <div>
                        <h5>Other Members</h5>
                        <Table dataSource={otherTeam} columns={columns} />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectTeams));
