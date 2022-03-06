import React from 'react'
import {Row, Col, Card, Avatar, Button, notification, Form, Input, message, Checkbox} from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import { Icon } from 'components/util-components/Icon'
import {
    GlobalOutlined,
    MailOutlined,
    HomeOutlined,
    PhoneOutlined,
    UserOutlined
} from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Experiences = () => (
    <Card title="Experiences">
        <div className="mb-3">
            <Row>
                <Col sm={24} md={22}>
                    {/*{employementList.map((elm, i) => {*/}
                    {/*    return (*/}
                    {/*        <div className={`${i === (employementList.length - 1)? '' : 'mb-4'}`} key={`eduction-${i}`}>*/}
                    {/*            <AvatarStatus src={elm.img} name={elm.title} subTitle={elm.duration}/>*/}
                    {/*            <p className="pl-5 mt-2 mb-0">{elm.desc}</p>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*})}*/}
                </Col>
            </Row>
        </div>
    </Card>
)

const Interested = () => (
    <Card title="Interested">
        <Row gutter={30}>
            {/*<Col sm={24} md={12}>*/}
            {/*    {interestedList.filter((_, i) => i < 4).map((elm, i) => {*/}
            {/*        return (*/}
            {/*            <div className="mb-3" key={`interested-${i}`}>*/}
            {/*                <h4 className="font-weight-semibold">{elm.title}</h4>*/}
            {/*                <p>{elm.desc}</p>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</Col>*/}
            {/*<Col sm={24} md={12}>*/}
            {/*    {interestedList.filter((_, i) => i >= 4).map((elm, i) => {*/}
            {/*        return (*/}
            {/*            <div className="mb-3" key={`interested-${i}`}>*/}
            {/*                <h4 className="font-weight-semibold">{elm.title}</h4>*/}
            {/*                <p>{elm.desc}</p>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</Col>*/}
        </Row>
    </Card>
)

const Connection = () => (
    <Card title="Connection">
        {/*{*/}
        {/*    connectionList.map((elm, i) => {*/}
        {/*        return (*/}
        {/*            <div className={`${i === (connectionList.length - 1)? '' : 'mb-4'}`} key={`connection-${i}`}>*/}
        {/*                <AvatarStatus src={elm.img} name={elm.name} subTitle={elm.title}/>*/}
        {/*            </div>*/}
        {/*        )*/}
        {/*    })*/}
        {/*}*/}
    </Card>
)

const Group = () => (
    <Card title="Group">
        {/*{*/}
        {/*    groupList.map((elm, i) => {*/}
        {/*        return (*/}
        {/*            <div className={`${i === (groupList.length - 1)? '' : 'mb-4'}`} key={`connection-${i}`}>*/}
        {/*                <AvatarStatus src={elm.img} name={elm.name} subTitle={elm.desc}/>*/}
        {/*            </div>*/}
        {/*        )*/}
        {/*    })*/}
        {/*}*/}
    </Card>
)

export class Profile extends React.Component {

    state = {
        id : 0,
        username : '',
        first_name : '',
        last_name : '',
        email : '',
        contact : '',
        website : '',
        created_date : '',
        status : '',
        passwordx: '',
        conform_password: '',
        change: false,
        loading: false
    };

    componentDidMount() {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }
        this.loadData();
    }

    loadData = () => {
        this.setState({loading: true});
        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let method = "get";

        axios[method](`http://localhost:8080/v1/user/details`, {headers: headers})
            .then(async response => {

                console.log(response);
                let data = response.data.body;
                let info = {
                }
                this.setState({
                    id : data.id,
                    username : data.refNo,
                    first_name : data.firstName,
                    last_name : data.lastName,
                    email : data.email,
                    contact : data.contactNumber,
                    website : '',
                    created_date : data.createdDate,
                    status : data.statusType
                })
                this.setState({loading: false});
            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });

    };

    onChangeFirstName = e => {
        this.setState({first_name: e.target.value});
    };
    onChangeLastName = e => {
        this.setState({last_name: e.target.value});
    };
    onChangeUsername = e => {
        this.setState({username: e.target.value});
    };
    onChangeMobile = e => {
        this.setState({contact: e.target.value});
    };
    onChangeWebsite = e => {
        this.setState({website: e.target.value});
    };

    onChangePassword = e => {
        this.setState({passwordx: e.target.value});
    };

    onChangeConformPassword = e => {
        this.setState({conform_password: e.target.value});
    };

    onChangePasswordCheckbox = e => {
        this.setState({change: !this.state.change, password: "", conform_password: ""})
    }

    onUpdate = () => {
        if(this.state.first_name=="") {
            message.error("Please, enter first name");
        } else if(this.state.last_name=="") {
            message.error("Please, enter last name");
        } else if(this.state.change) {
            if(this.state.passwordx==="") {
                message.error("Please, enter password");
            } else {
                if (this.state.conform_password === "") {
                    message.error("Please, enter conform password");
                } else {
                    if (this.state.conform_password === this.state.passwordx) {
                        this.updateData();
                    } else {
                        message.error("Password and conform password does not match");
                    }
                }
            }
        } else {
            this.updateData();
        }
    }

    updateData = () => {
        this.setState({loading: true});
        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let method = "put";

        let body = {
            id: this.state.id,
            refNo: this.state.username,
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            contactNumber: this.state.contact,
            password: this.state.passwordx===""?null:this.state.passwordx,
            statusType: this.state.status,
        }

        axios[method](`http://localhost:8080/v1/user/update`, body, {headers: headers})
            .then(async response => {
                if(response.status===200) {
                    if(response.data.success) {
                        message.success("Your details updated successfully");
                        this.setState({
                            change: false,
                            password: "",
                            conform_password: ""
                        })
                        this.loadData();
                    }
                }
                this.setState({loading: false});
            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });

    };

    render() {
        const avatarSize = 150;

        let email = this.state.email;
        if(email.length>20) {
            email = email.substring(0, 20) + "...";
        }

        return (
            <>
                <div className="container my-4">
                    {/*<ProfileInfo avatarSize={avatarSize} info = {this.state.info} />*/}

                    <Card style={{border: "1px solid black"}}>
                        <Row justify="center">
                            <Col sm={24} md={24} lg={24}>
                                <div>
                                    <div className="rounded p-2 bg-white shadow-sm mx-auto" style={{border: "1px solid black", 'marginTop': '-3.5rem', 'maxWidth': `${avatarSize + 16}px`}}>
                                        <Avatar shape="square" size={avatarSize} src="/img/avatars/user-vector.jpg" />
                                    </div>

                                    <Flex alignItems="center"
                                          mobileFlex={false}
                                          className="mb-5 mt-3 text-center"
                                          justifyContent={'center'}
                                    >
                                        <h2 className="mb-0 mt-md-0 mt-2">{this.state.first_name} {this.state.last_name}</h2>
                                        {/*<div className="ml-md-3 mt-3 mt-md-0">*/}
                                        {/*</div>*/}
                                    </Flex>
                                    <div>
                                        <Row style={{justifyContent: 'center'}}>
                                            <Col className={"m-2"} md={11} lg={11} xl={11}>
                                                <span>First Name</span><span className={'required-text'}>*</span>
                                                <Input placeholder="First Name" value={this.state.first_name} onChange={this.onChangeFirstName} />
                                            </Col>
                                            <Col className={"m-2"} md={11} lg={11} xl={11}>
                                                <span>Last Name</span><span className={'required-text'}>*</span>
                                                <Input placeholder="Last Name" value={this.state.last_name} onChange={this.onChangeLastName} />
                                            </Col>
                                        </Row>
                                        <Row style={{justifyContent: 'center'}}>
                                            <Col className={"m-2"} md={6} lg={6} xl={6}>
                                                <span>Ref Name</span><span className={'required-text'}>*</span>
                                                <Input placeholder="Ref Name" value={this.state.username} disabled={true} onChange={this.onChangeUsername} />
                                            </Col>
                                            <Col className={"m-2"} md={16} lg={16} xl={16}>
                                                <span>Email</span><span className={'required-text'}>*</span>
                                                <Input type={'email'} placeholder="email" disabled={true} value={this.state.email}/>
                                            </Col>
                                        </Row>
                                        <Row style={{justifyContent: 'center'}}>
                                            <Col className={"m-2"} md={11} lg={11} xl={11}>
                                                <span>Mobile</span>
                                                <Input placeholder="Mobile" value={this.state.contact} onChange={this.onChangeMobile}/>
                                            </Col>
                                            <Col className={"m-2"} md={11} lg={11} xl={11}>
                                                <span>Website</span>
                                                <Input placeholder="www.example.com" value={this.state.website} onChange={this.onChangeWebsite}/>
                                            </Col>
                                        </Row>
                                        <Row style={{justifyContent: 'center'}}>
                                            <Col className={"mt-2"} md={22} lg={22} xl={22}>
                                                <Checkbox onChange={this.onChangePasswordCheckbox}>Change Password</Checkbox>
                                            </Col>
                                        </Row>
                                        {
                                            this.state.change?
                                                <Row style={{justifyContent: 'center'}}>
                                                    <Col className={"m-2"} md={11} lg={11} xl={11}>
                                                        <span>Password</span>
                                                        <Input.Password autoComplete="new-password" placeholder={'New Password'} value={this.state.passwordx} onChange={this.onChangePassword} />
                                                    </Col>
                                                    <Col className={"m-2"} md={11} lg={11} xl={11}>
                                                        <span>Conform Password</span> {this.state.password!==""?<span className={'required-text'}>*</span>:null}
                                                        <Input.Password placeholder={'Conform Password'} value={this.state.conform_password} onChange={this.onChangeConformPassword} />
                                                    </Col>
                                                </Row>:null
                                        }
                                        <Row style={{justifyContent: 'center'}}>
                                            <Col className={"text-right"} md={22} lg={22} xl={22}>
                                                <Button type={'primary'} onClick={this.onUpdate}>Update</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>

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
            </>
        )
    }
}


export default withRouter(Profile)
