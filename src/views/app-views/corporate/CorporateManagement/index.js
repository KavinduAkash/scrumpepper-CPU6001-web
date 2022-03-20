import React from "react";
import {
    AutoComplete,
    Avatar,
    Button,
    Card,
    Col,
    Modal,
    Row,
    Table,
    Tooltip,
    Input,
    Tabs,
    Form,
    Upload, Image, Select, message, Tag
} from "antd";
import { UserOutlined, AppleOutlined, PlusOutlined, HomeOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as spinner_actions from "../../../../redux/actions/Spinner";
import '../../../../assets/less/custom-styles/common.scss'
import './corporatae-manage.scss'
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../../server/base_urls";
import * as Swal from "sweetalert2";

const { Meta } = Card;

const size = 'small';

const { TabPane } = Tabs;
const { Option } = AutoComplete;

const rules = {
    corporate_name: [
        {
            required: true,
            message: 'Please input corporate name'
        }
    ],
    address: [
        {
            required: true,
            message: 'Please input address'
        }
    ],
    contact_number_1: [
        {
            required: true,
            message: 'Please input contact number 1'
        }
    ],
    email: [
        {
            required: true,
            message: 'Please input corporate email address'
        },
        {
            type: 'email',
            message: 'Please enter a validate email!'
        }
    ],
}

const columns = [
    {
        title: 'Project Name',
        dataIndex: 'name',
        key: 'name',
        width: '50%',
    },
    {
        title: 'Created Date',
        dataIndex: 'date',
        key: 'date',
        width: '20%',
    }
];

const member_columns_admin = [
    {
        title: 'Member Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
        width: '20%',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '20%',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
    }
];

const member_columns_employee = [
    {
        title: 'Member Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
        width: '35%',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '20%',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '5%',
    }
];

const create_project_columns_employee = [
    {
        title: 'Member',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
        width: '40%',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '25%',
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
        width: '5%',
    }
];

const add_new_corporate_employee_columns = [
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

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

class CorporateManagementView extends React.Component {

    state = {

        corporate:null,
        access_type:null,
        employee_list:[],
        projects:[],
        corporate_employee_results:[],

        add_corporate_employee_modal: false,
        add_corporate_employee_options: [],

        //create new project
        create_project_modal: false,
        temporary_selected_employee: null,
        temporary_selected_employee_search: "",
        temporary_selected_employee_role: 'TEAM_MEMBER',
        temporary_selected_employees_list: [],
        temporary_selected_employees_list_x: [],
        project_name: '',

        // create a corporate
        id: 0,
        name: '',
        address: '',
        contactNumber1: '',
        contactNumber2: '',
        email: '',
        corporate_long: null,
        status_type: '',

        // member update
        u_open: false,
        u_id: 0,
        u_first_name: '',
        u_last_name: '',
        u_email: '',
        u_contact: '',
        u_ref: '',
        u_created: '',
        u_accepted: '',
        u_role: '',
        u_status: ''

    };

    componentDidMount() {
        this.loadCorporateDetails();
    }

    loadCorporateDetails = () => {
        this.props.handleSpinner(true);

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
            corporateId: this.props.corporateReducer.corporate_id
        };

        axios.post(`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}corporate/corporates-details`, req_obj, {headers})
            .then(res => {
                console.log(res.data);
                if(res.data.success) {
                    let body = res.data.body;
                    let accessType = body.accessType;
                    let corporate = body.corporate;
                    let employeeList = body.employeeList;
                    let projects = body.projects;
                    this.setState({
                        corporate:corporate,
                        access_type:accessType,
                        employee_list:employeeList,
                        projects:projects,
                        id: corporate.id,
                        name: corporate.name,
                        address: corporate.address,
                        contactNumber1: corporate.contactNumber1,
                        contactNumber2: corporate.contactNumber2,
                        email: corporate.email,
                        status_type: corporate.statusType
                    })
                }
                this.props.handleSpinner(false);
            })
            .catch(err => {
                this.props.handleSpinner(false);
                console.log(err)
            });
    };

    renderTitle = (title) => (
        <span>
        {title}
            <a
                style={{ float: 'right' }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
      more
    </a>
  </span>
    );

    renderItem = (title, count) => ({
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <span>
        <UserOutlined /> {count}
      </span>
            </div>
        ),
    });

    updateCorporateDetails = () => {
        this.state.name===''?message.error('Corporate name can not be empty'):
            this.state.address===''?message.error('Corporate address can not be empty'):
                this.state.email===''?message.error('Corporate email can not be empty'):
                    !validateEmail(this.state.email)?message.error('Invalid corporate email'):
                        this.state.contactNumber1===''?message.error('Corporate contact 1 can not be empty'):
                            this.updateCorporateDetails_()
    }

    updateCorporateDetails_ = () => {
        this.props.handleSpinner(true);
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
            id: this.state.id,
            name: this.state.name,
            address: this.state.address,
            contactNumber1: this.state.contactNumber1,
            contactNumber2: this.state.contactNumber1,
            email: this.state.email,
            corporateLogo: null,
            statusType: this.state.status_type,
        };

        axios.put(`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}corporate/update`, req_obj, {headers})
            .then(res => {
                console.log(res.data);
                if(res.data.success) {
                    message.success("Corporate's details updated successfully");
                    this.loadCorporateDetails();
                }
                this.props.handleSpinner(false);
            })
            .catch(err => {
                this.props.handleSpinner(false);
                console.log(err)
            });
    }

    onSearchCorporateEmployees = value => {
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
            corporateId: this.props.corporateReducer.corporate_id,
            search: value
        };

        axios.post(`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}corporate/employee/search`, req_obj, {headers})
            .then(res => {
                console.log(res.data);
                this.setState({corporate_employee_results:res.data.body})
            })
            .catch(err => {
                console.log(err)
            });

    };

    onSearchUsers = e => {
        let value = e.target.value;
        this._onSearchUsers(value);
    }

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

        axios.post(`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}user/search?keyword=${value}&corporate=${this.props.corporateReducer.corporate_id}&project=${0}`, req_obj, {headers})
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

    };

    sendInvitations = val => {
        this.props.handleSpinner(true);
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        axios.post(`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}corporate/employee/create`, val, {headers})
            .then(res => {
                console.log(res.data);
                if(res.data.success) {
                    this.setState({
                        add_corporate_employee_options: res.data.body
                    })
                }
                this.props.handleSpinner(false);
                this.setState({
                    add_corporate_employee_modal: false,
                    add_corporate_employee_options: []
                })
            })
            .catch(err => {
                this.props.handleSpinner(false);
                console.log(err)
            });
    }

    setCreateProjectModalVisibility = value => {
        this.setState({create_project_modal: value});
    };

    addCorporateEmployeeModalVisibility = value => {
        this.setState({add_corporate_employee_modal: value});
        this._onSearchUsers("");
    };

    onSelectNewCorporateEmployeeToAdd = employee => {
        this.setState({temporary_selected_employee: employee});
    };

    addMemberToProjectCreate = () => {
      let temporarySelectedEmployee = this.state.temporary_selected_employee;
      let temporarySelectedEmployeeRole = this.state.temporary_selected_employee_role;
      let temporarySelectedEmployeesList = this.state.temporary_selected_employees_list;
      let temporarySelectedEmployeesList_x = this.state.temporary_selected_employees_list_x;
      let obj = {
          member:temporarySelectedEmployee,
          role:temporarySelectedEmployeeRole
      }


      if(temporarySelectedEmployeesList_x.includes(temporarySelectedEmployee)) {
          message.info('This member already added');
      } else {
          temporarySelectedEmployeesList.push(obj);
          temporarySelectedEmployeesList_x.push(temporarySelectedEmployee);
          this.setState({
              temporary_selected_employees_list: temporarySelectedEmployeesList,
              temporary_selected_employees_list_x: temporarySelectedEmployeesList_x,
          });
          this.clearProjectTempUserAddFields();
      }
    };

    handleChangeScrumRole = val => {
        this.setState({temporary_selected_employee_role: val});
    }

    searchProjectTempUser = val => {
        this.setState({temporary_selected_employee_search: val})
    }

    clearProjectTempUserAddFields = () => {
        this.setState({temporary_selected_employee_search: "", temporary_selected_employee_role: "TEAM_MEMBER"})
    }

    removeTempMembersFromCreateProject = val => {
        let temporarySelectedEmployeesList = this.state.temporary_selected_employees_list;
        let temporarySelectedEmployeesList_x = this.state.temporary_selected_employees_list_x;
        temporarySelectedEmployeesList.splice(val, 1);
        temporarySelectedEmployeesList_x.splice(val, 1);
        this.setState({
            temporary_selected_employees_list: temporarySelectedEmployeesList,
            temporary_selected_employees_list_x: temporarySelectedEmployeesList_x,
        });
    };

    onChangeProjectName = val => {
      this.setState({
          project_name: val.target.value
      })
    };

    create_project = () => {
        this.props.handleSpinner(true);
        let project_members = [];
        if(this.state.project_name!="") {
            this.state.temporary_selected_employees_list.map(val=>{
                let obj = {
                    projectId: 0,
                    corporateEmployeeId: val.member.id,
                    scrumRole: val.role
                }
                project_members.push(obj);
            });

            let req_body={
                corporateId: this.props.corporateReducer.corporate_id,
                projectName: this.state.project_name,
                projectMembers: project_members
            }

            let headers = {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
            };

            axios.post(`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}project/create`, req_body, {headers})
                .then(res => {
                    console.log(res.data);
                    this.props.handleSpinner(false);
                    this.setState({create_project_modal: false});
                    this.loadCorporateDetails();
                })
                .catch(err => {
                    console.log(err)
                    this.props.handleSpinner(false);
                });


        } else {
            message.error('Please enter project name');
        }
    };

    removeCorporateMember = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    update_member = (e, status) => {
        if(status) {
            this.setState({
                u_open: status,
                u_id: e.id,
                u_first_name: e.user.firstName,
                u_last_name: e.user.lastName,
                u_email: e.user.email,
                u_contact: e.user.contactNumber?e.user.contactNumber:" - ",
                u_ref: e.user.refNo,
                u_created: e.createdDate,
                u_accepted: e.acceptedDate,
                u_role: e.corporateAccessType,
                u_status: e.statusType
            })
        } else {
            this.setState({
                u_open: false,
                u_id: 0,
                u_first_name: '',
                u_last_name: '',
                u_email: '',
                u_contact: '',
                u_ref: '',
                u_created: '',
                u_accepted: '',
                u_role: '',
                u_status: ''
            })
            this.loadCorporateDetails()
        }
    }

    onChange_member_role = e => {
        this.setState({
            u_role: e
        })
    }

    action_update_member = () => {
        this.props.handleSpinner(true);
        let req_body={
            memberId: this.state.u_id,
            accessType: this.state.u_role,
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        axios.patch(`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}corporate/employee/update`, req_body, {headers})
            .then(res => {
                this.update_member(null, false);
                message.success("Member updated successfully!");
                this.props.handleSpinner(false);
            })
            .catch(err => {
                console.log(err)
                this.props.handleSpinner(false);
            });
    };


    render() {

        let list_add_employee_options = [];
        if(this.state.add_corporate_employee_options!=null && this.state.add_corporate_employee_options!="" && this.state.add_corporate_employee_options!= undefined) {
            this.state.add_corporate_employee_options.map((result, index)=>{
                let obj = {
                    key: index,
                    user: <div>
                        <div>{`${result.firstName} ${result.lastName}`}</div>
                        <div><span>{`${result.refNo}`}</span>{`${" | "}`}<span>{`${result.email}`}</span></div>
                    </div>,
                    action: (result.yourCorporate)? <Tag color="purple">Employee</Tag>
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
                            Send Invitation
                        </Button>
                };
                list_add_employee_options.push(obj);
            })
        }
        let options = [];

        let employees = [];
        let employee_list = [];
        this.state.employee_list.map(val=>{
            let obj = {
                key: val.id,
                name: val.user.firstName + " " + val.user.lastName,
                email: val.user.email,
                role: val.corporateAccessType,
                action:  (this.state.access_type==="CORPORATE_SUPER" || this.state.access_type==="CORPORATE_ADMIN")?<div>
                    <Button type="text" primary style={{color:'#3e79f7'}} onClick={()=>this.update_member(val, true)}>
                        Update
                    </Button>
                    <Button type="text" danger>
                        Remove
                    </Button>
                </div>:<Button type="text" primary style={{color:'#3e79f7'}}>
                    View
                </Button>
            }
            employee_list.push(obj);
            employees.push(<Avatar style={{ backgroundColor: '#f56a00' }}>{val.user.firstName.charAt(0)}</Avatar>);
        });

        let projects = [];
        this.state.projects.map(val => {
            let project = val.project;
            let createdDate = project.createdDate;
            createdDate = createdDate.split("T")[0];
            let obj = {
               key: project.id,
               name: project.projectName,
               date: createdDate,
           }
            projects.push(obj);
        });

        let mapped_corporate_employee_results = [];
        if(this.state.corporate_employee_results!=null && this.state.corporate_employee_results!="" && this.state.corporate_employee_results!=undefined) {
            this.state.corporate_employee_results.map((val) => {
                    mapped_corporate_employee_results.push(
                        <Option key={val.id} value={`${val.user.firstName} ${val.user.lastName} • ${val.user.refNo}`} className={'user-search-option'}>
                            <div className={'option-container'} onClick={()=>this.onSelectNewCorporateEmployeeToAdd(val)}>
                                <div>
                                    <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />} />
                                </div>
                                <div>
                                    <div className={'topic'}>{`${val.user.firstName} ${val.user.lastName} `}<span className={'description'}>{`• ${val.user.refNo}`}</span></div>
                                    <div className={'description'}>{`• ${val.user.email}`}</div>
                                </div>
                            </div>
                        </Option>
                    )
                }
            );
        }

        let temporary_selected_employees_list = [];
        this.state.temporary_selected_employees_list.map((val, index) => {
                let obj = {
                    key: index,
                    name: val.member.user.firstName + " " + val.member.user.lastName,
                    email: val.member.user.email,
                    role: val.role,
                    action:  <div>
                        <Button type="text" danger onClick={()=>this.removeTempMembersFromCreateProject(index)}>
                            Remove
                        </Button>
                    </div>
                }
                temporary_selected_employees_list.push(obj);
            });

        let corporate_name = this.state.name;
        let corporate_address = this.state.address;
        let corporate_email =  this.state.email;
        let corporate_contact_1 = this.state.contactNumber1;
        let corporate_contact_2 = this.state.contactNumber2;
        console.log("corporate_contact_2: ", corporate_contact_2);

        let is_admin_editable = (this.state.access_type==="CORPORATE_SUPER" || this.state.access_type==="CORPORATE_ADMIN");

        let corporate_roles = [
          'CORPORATE_SUPER',
          'CORPORATE_ADMIN',
          'CORPORATE_EMPLOYEE',
        ];

        return (
         <>
             {/*modals*/}
             {/*create a project modal*/}
             <Modal
                 title={`Create a Project @ ${(this.state.corporate!=null && this.state.corporate!="" && this.state.corporate!=undefined)?this.state.corporate.name:null}`}
                 centered
                 // visible={this.state.visible}
                 visible={this.state.create_project_modal}
                 onCancel={() => this.setCreateProjectModalVisibility(false)}
                 width={1000}
                 footer={null}
             >

                 <div>
                     <Form layout="vertical" onFinish={this.handleSubmitCreateCorporate}>

                         <Row>
                             <Col sm={24} md={24} lg={24} xl={24}>
                                 <Form.Item
                                     name="project_name"
                                     label="Project Name"
                                     // rules={rules.corporate_name}
                                     hasFeedback
                                 >
                                     <Input placeholder={'Project Name'} value={this.state.project_name} onChange={this.onChangeProjectName} />
                                 </Form.Item>
                             </Col>
                         </Row>

                         <Row>
                             <Col sm={24} md={16} lg={16} xl={16}>
                                 <AutoComplete style={{ width: '95%' }} onSearch={this.onSearchCorporateEmployees} value={this.state.temporary_selected_employee_search} onChange={this.searchProjectTempUser}placeholder="input here">
                                     {mapped_corporate_employee_results}
                                 </AutoComplete>
                             </Col>
                             <Col sm={24} md={6} lg={6} xl={6}>
                                 <Select defaultValue="TEAM_MEMBER" value={this.state.temporary_selected_employee_role} style={{ width: '95%' }}
                                         onChange={this.handleChangeScrumRole}
                                 >
                                     <Option value="TEAM_MEMBER">Team Member</Option>
                                     <Option value="SCRUM_MASTER">Scrum Master</Option>
                                     <Option value="PRODUCT_OWNER">Product Owner</Option>
                                     <Option value="OTHER">Other</Option>
                                 </Select>
                             </Col>
                             <Col sm={24} md={2} lg={2} xl={2}>
                                 <Button type="text" primary style={{color:'#3e79f7'}} onClick={this.addMemberToProjectCreate}>
                                     Add
                                 </Button>
                             </Col>
                         </Row>
                         <Row>
                             <Col sm={24} md={24} lg={24} xl={24} className={'text-center w-100 mt-5'}>
                                 <Table dataSource={temporary_selected_employees_list} columns={create_project_columns_employee}/>
                             </Col>
                         </Row>
                         <Row>
                             <Col sm={24} md={24} lg = {24} xl={24} className={'text-right mt-3'}>
                                 <Button
                                     type="primary"
                                     size={size}
                                     className={'sp-main-btn'}
                                     onClick={this.create_project}
                                 >
                                     Create The Project
                                 </Button>
                             </Col>
                         </Row>
                     </Form>
                 </div>
             </Modal>


             <Modal
                 title={`Update Corporate Member`}
                 centered
                 visible={this.state.u_open}
                 onCancel={()=>this.update_member(null, false)}
                 width={600}
                 footer={null}
             >

                 <Form layout="vertical"
                       className={'mt-3'}
                 >
                     <Row style={{justifyContent: 'center'}}>
                         <Col sm={11} md={11} lg={11} xl={11} style={{margin:'1px'}}>
                             <Form.Item
                                 label="First Name"
                                 required={false}
                             >
                                 <div className={'text-fix-data'}>{ this.state.u_first_name }</div>
                             </Form.Item>
                         </Col>
                         <Col sm={11} md={11} lg={11} xl={11} style={{margin:'1px'}}>
                             <Form.Item
                                 label="Last Name"
                                 required={false}
                             >
                                 <div className={'text-fix-data'}>{ this.state.u_last_name }</div>
                             </Form.Item>
                         </Col>
                         <Col sm={22} md={22} lg={22} xl={22} style={{margin:'1px'}}>
                             <Form.Item
                                 label="Email"
                                 required={false}
                             >
                                 <div className={'text-fix-data'}>{ this.state.u_email }</div>
                             </Form.Item>
                         </Col>
                         <Col sm={11} md={11} lg={11} xl={11} style={{margin:'1px'}}>
                             <Form.Item
                                 label="Contact"
                                 required={false}
                             >
                                 <div className={'text-fix-data'}>{ this.state.u_contact }</div>
                             </Form.Item>
                         </Col>
                         <Col sm={11} md={11} lg={11} xl={11} style={{margin:'1px'}}>
                             <Form.Item
                                 label="Ref"
                                 required={false}
                             >
                                 <div className={'text-fix-data'}>{ this.state.u_ref }</div>
                             </Form.Item>
                         </Col>
                         <Col sm={11} md={11} lg={11} xl={11} style={{margin:'1px'}}>
                             <Form.Item
                                 label="Invitation Created Date"
                                 required={false}
                             >
                                 <div className={'text-fix-data'}>{ this.state.u_created }</div>
                             </Form.Item>
                         </Col>
                         <Col sm={11} md={11} lg={11} xl={11} style={{margin:'1px'}}>
                             <Form.Item
                                 label="Invitation Accepted Date"
                                 required={false}
                             >
                                 <div className={'text-fix-data'}>{ this.state.u_accepted }</div>
                             </Form.Item>
                         </Col>
                         <Col sm={11} md={11} lg={11} xl={11} style={{margin:'1px'}}>
                             <Form.Item
                                 label="Corporate Role"
                                 required={false}
                             >
                                 <Select
                                     value={this.state.u_role}
                                     style={{
                                         width: '100%',
                                         border: '1px solid gray',
                                         borderRadius: '11px'
                                     }}
                                         onChange={this.onChange_member_role}
                                 >
                                     {
                                         corporate_roles.map((result, index)=><Option value={result}>{result}</Option>)
                                     }
                                 </Select>
                             </Form.Item>
                         </Col>
                         <Col sm={11} md={11} lg={11} xl={11} style={{margin:'1px'}}>
                             <Form.Item
                                 label="Status"
                                 required={false}
                             >
                                 <div className={'text-fix-data'}>{ this.state.u_status }</div>
                             </Form.Item>
                         </Col>
                         <Col sm={22} md={22} lg = {22} xl={22} className={'text-right mt-3'}>
                             <Button
                                 type="primary"
                                 size={size}
                                 className={'sp-main-btn'}
                                 onClick={this.action_update_member}
                             >
                                 Save Changes
                             </Button>
                         </Col>
                     </Row>
                 </Form>


             </Modal>


             {/*Add member modal*/}
             <Modal
                 title={`Add Corporate Employee`}
                 centered
                 visible={this.state.add_corporate_employee_modal}
                 onCancel={() => this.addCorporateEmployeeModalVisibility(false)}
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

                        <Table dataSource={list_add_employee_options} columns={add_new_corporate_employee_columns}/>
                    </div>
             </Modal>

             <div className={'page-margin-handler'}>

                 <div className={'text-right'}>
                    <span style={{fontWeight: 'bold'}}>Your Role: </span><Tag color={'geekblue'} key={ this.state.access_type }>{ this.state.access_type }</Tag>
                 </div>

             <Tabs defaultActiveKey="1">

{/*=================tab 1============================================================================================*/}
                 <TabPane
                     tab={<span><HomeOutlined />Home</span>}
                     key="1"
                 >

                     {
                         is_admin_editable?
                             <Form layout="vertical"
                                   className={'mt-3'}
                             >

                                 {/*<Row>*/}
                                 {/*    <Col sm={24} md={24} lg={24} xl={24}>*/}
                                 {/*        <Upload*/}
                                 {/*            name="avatar"*/}
                                 {/*            listType="picture-card"*/}
                                 {/*            className="avatar-uploader"*/}
                                 {/*            showUploadList={false}*/}
                                 {/*            customRequest={this.avatarUpload}*/}
                                 {/*            beforeUpload={this.beforeUpload}*/}
                                 {/*            onChange={this.handleChange}*/}
                                 {/*        >*/}
                                 {/*            {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : "sss"}*/}
                                 {/*        </Upload>*/}
                                 {/*    </Col>*/}
                                 {/*</Row>*/}

                                 <Row>
                                     <Col sm={24} md={24} lg={24} xl={24}>
                                         <Form.Item
                                             label="Corporate Name"
                                             rules={rules.corporate_name}
                                             hasFeedback
                                             required={is_admin_editable}
                                         >
                                             <Input placeholder={'Corporate Name'} value={corporate_name} disabled={!is_admin_editable} onChange={this.onChangeCorporateName} />
                                         </Form.Item>
                                     </Col>
                                 </Row>

                                 <Row>
                                     <Col sm={24} md={24} lg={24} xl={24}>
                                         <Form.Item
                                             label="Corporate Address"
                                             rules={rules.address}
                                             required={is_admin_editable}
                                             hasFeedback
                                         >
                                             <Input.TextArea placeholder={'Corporate Address'} value={corporate_address} disabled={!is_admin_editable} onChange={this.onChangeCorporateAddress} />
                                         </Form.Item>
                                     </Col>
                                 </Row>

                                 <Row>
                                     <Col sm={24} md={24} lg={24} xl={24}>
                                         <Form.Item
                                             label="Corporate Email"
                                             rules={rules.email}
                                             required={is_admin_editable}
                                             hasFeedback
                                         >
                                             <Input placeholder={'Corporate Email'} value={corporate_email} disabled={!is_admin_editable} onChange={this.onChangeCorporateEmail} />
                                         </Form.Item>
                                     </Col>
                                 </Row>

                                 <Row>
                                     <Col sm={24} md={11} lg={11} xl={11}>
                                         <Form.Item
                                             label="Contact Number 1"
                                             rules={rules.contact_number_1}
                                             required={is_admin_editable}
                                             hasFeedback
                                         >
                                             <Input placeholder={'Corporate Contact Number 1'} value={corporate_contact_1} disabled={!is_admin_editable} onChange={this.onChangeCorporateContact1} />
                                         </Form.Item>
                                     </Col>
                                     <Col md={1} lg={1} xl={1}></Col>
                                     <Col sm={24} md={11} lg={11} xl={11}>
                                         <Form.Item
                                             label="Contact Number 2"
                                             // rules={rules.contact_number_2}
                                             hasFeedback
                                         >
                                             <Input placeholder={'Corporate Contact Number 2'} value={corporate_contact_2} disabled={!is_admin_editable} onChange={this.onChangeCorporateContact2} />
                                         </Form.Item>
                                     </Col>
                                 </Row>
                                 {
                                     is_admin_editable?
                                         <Row>
                                             <Col sm={24} md={24} lg={24} xl={24}>
                                                 <Form.Item>
                                                     <Col sm={24} md={24} lg = {24} xl={24} className={'text-right'}>
                                                         <Button
                                                             type="primary"
                                                             size={size}
                                                             className={'sp-main-btn'}
                                                             loading={this.state.loading_button}
                                                             onClick={this.updateCorporateDetails}
                                                             htmlType={"submit"}
                                                         >
                                                             Save Changes
                                                         </Button>
                                                     </Col>
                                                 </Form.Item>
                                             </Col>
                                         </Row>
                                         :
                                         null
                                 }
                             </Form>
                             :
                             <Form layout="vertical"
                                   className={'mt-3'}
                             >
                                 <Row>
                                     <Col sm={24} md={24} lg={24} xl={24}>
                                         <Form.Item
                                             label="Corporate Name"
                                             rules={rules.corporate_name}
                                             hasFeedback
                                             required={is_admin_editable}
                                         >
                                             <div className={'text-fix-data'}>{ corporate_name }</div>
                                         </Form.Item>
                                     </Col>
                                 </Row>

                                 <Row>
                                     <Col sm={24} md={24} lg={24} xl={24}>
                                         <Form.Item
                                             label="Corporate Address"
                                             rules={rules.address}
                                             required={is_admin_editable}
                                             hasFeedback
                                         >
                                             <div className={'text-fix-data'}>{ corporate_address }</div>
                                         </Form.Item>
                                     </Col>
                                 </Row>

                                 <Row>
                                     <Col sm={24} md={24} lg={24} xl={24}>
                                         <Form.Item
                                             label="Corporate Email"
                                             rules={rules.email}
                                             required={is_admin_editable}
                                             hasFeedback
                                         >
                                             <div className={'text-fix-data'}>{ corporate_email }</div>
                                         </Form.Item>
                                     </Col>
                                 </Row>

                                 <Row>
                                     <Col sm={24} md={11} lg={11} xl={11}>
                                         <Form.Item
                                             label="Contact Number 1"
                                             rules={rules.contact_number_1}
                                             required={is_admin_editable}
                                             hasFeedback
                                         >
                                             <div className={'text-fix-data'}>{ corporate_contact_1 }</div>
                                         </Form.Item>
                                     </Col>
                                     <Col md={1} lg={1} xl={1}></Col>
                                     <Col sm={24} md={11} lg={11} xl={11}>
                                         <Form.Item
                                             label="Contact Number 2"
                                             // rules={rules.contact_number_2}
                                             hasFeedback
                                         >
                                             <div className={'text-fix-data'}>{ (corporate_contact_2!=null & corporate_contact_2!="")?corporate_contact_2:" - " }</div>
                                         </Form.Item>
                                     </Col>
                                 </Row>
                             </Form>
                     }
                 </TabPane>

{/*=================tab 2============================================================================================*/}
                 <TabPane
                     tab={<span><TeamOutlined  />Members</span>}
                     key="2"
                 >
                     <Row>

                         {
                             (this.state.access_type==="CORPORATE_SUPER" || this.state.access_type==="CORPORATE_ADMIN")?
                                 <Col sm={24} md={24} lg = {24} xl={24} className={'text-right'}>
                                     <Button
                                         type="primary"
                                         icon={<PlusOutlined />}
                                         size={size}
                                         className={'sp-main-btn'}
                                         onClick={()=>this.addCorporateEmployeeModalVisibility(true)}
                                     >
                                         Add Corporate Member
                                     </Button>
                                 </Col>:null
                         }
                         <Col sm={24} md={24} lg={24} xl={24} className={'text-center w-100 mt-5'}>
                                     <Table dataSource={employee_list} columns={this.state.access_type=="CORPORATE_SUPER" || this.state.access_type=="CORPORATE_ADMIN"?member_columns_admin:member_columns_employee}/>
                         </Col>
                     </Row>
                 </TabPane>

{/*=================tab 3============================================================================================*/}
                 <TabPane
                     tab={<span><ProfileOutlined  />
                     {
                         this.state.access_type=="CORPORATE_SUPER" || this.state.access_type=="CORPORATE_ADMIN" ? "Corporate Projects" : "My Projects"
                     }
                     </span>}
                     key="3"
                 >
                     <Row>
                         {
                             (this.state.access_type==="CORPORATE_SUPER" || this.state.access_type==="CORPORATE_ADMIN")?
                                 <Col sm={24} md={24} lg = {24} xl={24} className={'text-right'}>
                                     <Button
                                         type="primary"
                                         icon={<PlusOutlined />}
                                         size={size}
                                         className={'sp-main-btn'}
                                         onClick={()=>this.setCreateProjectModalVisibility(true)}
                                     >
                                         Create a Project
                                     </Button>
                                 </Col>:null
                         }
                     </Row>
                     <Row>
                         <Col sm={24} md={24} lg={24} xl={24} className={'text-center mt-5'}>
                             <AutoComplete
                                 dropdownClassName="certain-category-search-dropdown"
                                 dropdownMatchSelectWidth={500}
                                 style={{ minWidth: '80%' }}
                                 options={options}
                             >
                                 <Input.Search size="large" placeholder="input here" />
                             </AutoComplete>
                         </Col>
                         <Col sm={24} md={24} lg={24} xl={24} className={'text-center w-100 mt-5'}>
                             <Table dataSource={projects} columns={columns}/>
                         </Col>
                     </Row>
                 </TabPane>

             </Tabs>

             </div>
         </>
        )
    }

}

const mapStateToProps = (state) => ({

    corporateReducer: state.corporateReducer,

});

const mapDispatchToProps = (dispatch) => {
    return {
        // corporateHandler: (data) => dispatch(corporate_actions.storeCorporateId(data)),
        handleSpinner: (data) => dispatch(spinner_actions.handlerSpinner(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CorporateManagementView));
