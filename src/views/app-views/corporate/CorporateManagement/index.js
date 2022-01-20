import React from "react";
import {AutoComplete, Avatar, Button, Card, Col, Modal, Row, Table, Tooltip, Input, Tabs} from "antd";
import { UserOutlined, AppleOutlined, AntDesignOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as corporate_actions from "../../../../redux/actions/Corporate";
import '../../../../assets/less/custom-styles/common.scss'
import './corporatae-manage.scss'
import Flex from 'components/shared-components/Flex'
import Cookies from "js-cookie";
import axios from "axios";
const { Meta } = Card;

const size = 'small';

const { TabPane } = Tabs;

const columns = [
    {
        title: 'Project Name',
        dataIndex: 'name',
        key: 'name',
        width: '50%',
    },
    {
        title: 'Team',
        dataIndex: 'team',
        key: 'team',
        width: '30%',
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

class CorporateManagementView extends React.Component {

    state = {

        corporate:null,
        access_type:null,
        employee_list:[],
        projects:[]

    };


    componentDidMount() {
        this.loadCorporateDetails();
    }

    loadCorporateDetails = () => {
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

        axios.post('http://localhost:8080/v1/corporate/corporates-details', req_obj, {headers})
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
                        projects:projects
                    })
                }
            })
            .catch(err => {
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






    render() {

        let options = [
            {
                label: this.renderTitle('Libraries'),
                options: [this.renderItem('AntDesign', 10000), this.renderItem('AntDesign UI', 10600)],
            },
            {
                label: this.renderTitle('Solutions'),
                options: [this.renderItem('AntDesign UI FAQ', 60100), this.renderItem('AntDesign FAQ', 30010)],
            },
            {
                label: this.renderTitle('Articles'),
                options: [this.renderItem('AntDesign design language', 100000)],
            },
        ];

        let employees = [];
        let employee_list = [];
        this.state.employee_list.map(val=>{
            let obj = {
                key: val.id,
                name: val.user.firstName + " " + val.user.lastName,
                email: val.user.email,
                role: val.corporateAccessType,
                action:  <div>
                    <Button type="text" primary style={{color:'#3e79f7'}}>
                        Update
                    </Button>
                    <Button type="text" danger>
                        Remove
                    </Button>
                </div>
            }
            employee_list.push(obj);
            employees.push(<Avatar style={{ backgroundColor: '#f56a00' }}>{val.user.firstName.charAt(0)}</Avatar>);
        });

        let projects = [];
        this.state.projects.map(val => {
            let project = val.project;
            let projectMember = val.projectMember;
            let obj = {
               key: project.id,
               name: project.projectName,
               team: projectMember.size,
               date: project.createdDate,
           }
            projects.push(obj);
        });

        return (
         <>
             <div className={'page-margin-handler'}>

             <Tabs defaultActiveKey="1">

                 {/*tab 1*/}
                 <TabPane
                     tab={<span><AppleOutlined />Home</span>}
                     key="1"
                 >


                     <Row>
                         <Col sm={24} md={24} lg={24} xl={24}>
                             <h4>Corporate</h4>
                         </Col>
                         <Col sm={24} md={24} lg={24} xl={24}>
                             <Card
                                 style={{ width: '100%' }}
                             >
                                 <Row>
                                     <Col sm={24} md={24} lg={4} xl={4} className={'text-center w-100'}>
                                         {
                                             (this.state.corporate!=null && this.state.corporate!="" && this.state.corporate!=undefined)?
                                                 <Avatar size={100} src={this.state.corporate.corporateLogo} />:
                                                 <Avatar size={100} icon={<UserOutlined />} />
                                         }
                                     </Col>
                                     <Col sm={24} md={24} lg={20} xl={20}>
                                         <Row className={'ww'}>
                                             <Col sm={24} md={24} lg={24} xl={24}>
                                                 <Flex alignItems="center"
                                                       mobileFlex={true}
                                                       className="mb-3 text-center"
                                                 >
                                                     <h2>
                                                         {(this.state.corporate!=null && this.state.corporate!="" && this.state.corporate!=undefined)?this.state.corporate.name:null}
                                                     </h2>
                                                     <Button size="small" className="ml-2">Edit</Button>
                                                 </Flex>
                                             </Col>
                                         </Row>
                                         <Row>
                                             <Col sm={24} md={24} lg={12} xl={12}>
                                                 <table className={'info-tbl'}>
                                                     <tr>
                                                         <td className={'topic'}>Email</td>
                                                         <td className={'value-gap'}>{(this.state.corporate!=null && this.state.corporate!="" && this.state.corporate!=undefined)?this.state.corporate.email:null}</td>
                                                     </tr>
                                                     <tr>
                                                         <td className={'topic'}>Address</td>
                                                         <td className={'value-gap'}>{(this.state.corporate!=null && this.state.corporate!="" && this.state.corporate!=undefined)?this.state.corporate.address:null}</td>
                                                     </tr>
                                                 </table>
                                             </Col>
                                             <Col sm={24} md={24} lg={12} xl={12}>
                                                 <table className={'info-tbl'}>
                                                     <tr>
                                                         <td className={'topic'}>Contact 1</td>
                                                         <td className={'value-gap'}>{(this.state.corporate!=null && this.state.corporate!="" && this.state.corporate!=undefined)?this.state.corporate.contactNumber1:null}</td>
                                                     </tr>
                                                     <tr>
                                                         <td className={'topic'}>Contact 2</td>
                                                         <td className={'value-gap'}>{(this.state.corporate!=null && this.state.corporate!="" && this.state.corporate!=undefined)?this.state.corporate.contactNumber2:" - "}</td>
                                                     </tr>
                                                 </table>
                                             </Col>
                                         </Row>
                                     </Col>
                                 </Row>
                             </Card>
                         </Col>

                         <Col sm={24} md={24} lg={24} xl={24}>
                             <h4>Members</h4>
                         </Col>
                         <Col sm={24} md={24} lg={24} xl={24}>
                             <Card
                                 style={{ width: '100%' }}
                             >
                                 <Row>
                                     <Col sm={20} md={20} lg={20} xl={20}>
                                         <Avatar.Group maxCount={5} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                             {
                                                 employees
                                             }
                                         </Avatar.Group>
                                     </Col>
                                     <Col sm={4} md={4} lg={4} xl={4}>
                                         <Button
                                             type="primary"
                                             size={''}
                                             className={'sp-main-btn'}
                                             // onClick={this.openCorporateCreateModal}
                                         >
                                             Manage Members
                                         </Button>
                                     </Col>
                                 </Row>
                             </Card>
                         </Col>
                     </Row>


                 </TabPane>

                 {/*tab 2*/}
                 <TabPane
                     tab={<span><AppleOutlined />Members</span>}
                     key="2"
                 >
                     <Row>
                         <Col sm={24} md={24} lg={24} xl={24} className={'text-center'}>
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
                                     <Table dataSource={employee_list} columns={this.state.access_type=="CORPORATE_SUPER" || this.state.access_type=="CORPORATE_ADMIN"?member_columns_admin:member_columns_employee}/>
                         </Col>
                     </Row>
                 </TabPane>

                 {/*tab 3*/}
                 <TabPane
                     tab={<span><AppleOutlined />
                     {
                         this.state.access_type=="CORPORATE_SUPER" || this.state.access_type=="CORPORATE_ADMIN" ? "Corporate Projects" : "My Projects"
                     }
                     </span>}
                     key="3"
                 >
                     <Row>
                         <Col sm={24} md={24} lg={24} xl={24} className={'text-center'}>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CorporateManagementView));
