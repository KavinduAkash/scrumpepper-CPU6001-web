import React from 'react'
import {Row, Col, Card, Avatar, Button, notification} from 'antd';
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
        info : {
            id : 0,
            username : '',
            first_name : '',
            last_name : '',
            email : '',
            contact : '',
            website : '',
            created_date : '',
            status : ''
        }
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
                    id : data.id,
                    username : data.refNo,
                    first_name : data.firstName,
                    last_name : data.lastName,
                    email : data.email,
                    contact : data.contactNumber,
                    website : '',
                    created_date : data.createdDate,
                    status : data.statusType
                }
                this.setState({
                    info: info
                })

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

        let email = this.state.info.email;
        if(email.length>20) {
            email = email.substring(0, 20) + "...";
        }

        return (
            <>
                <PageHeaderAlt background="/img/others/img-22.jpg" cssClass="bg-primary" overlap>
                    <div className="container text-center">
                        <div className="py-5 my-md-5">
                        </div>
                    </div>
                </PageHeaderAlt>
                <div className="container my-4">
                    {/*<ProfileInfo avatarSize={avatarSize} info = {this.state.info} />*/}

                    <Card>
                        <Row justify="center">
                            <Col sm={24} md={23} lg={23}>
                                <div>
                                    <div className="rounded p-2 bg-white shadow-sm mx-auto" style={{'marginTop': '-3.5rem', 'maxWidth': `${avatarSize + 16}px`}}>
                                        <Avatar shape="square" size={avatarSize} src="/img/avatars/thumb-16.png" />
                                    </div>

                                    <Flex alignItems="center"
                                          mobileFlex={false}
                                          className="mb-5 mt-3 text-center"
                                          justifyContent={'center'}
                                    >
                                        <h2 className="mb-0 mt-md-0 mt-2">{this.state.info.first_name} {this.state.info.last_name}</h2>
                                        <div className="ml-md-3 mt-3 mt-md-0">
                                            {/*<Button size="small" type="primary">Follow</Button>*/}
                                            <Button size="small" className="ml-2">Edit</Button>
                                        </div>
                                    </Flex>

                                    <div className="ml-md-4 w-100">
                                        <Row gutter="16"
                                             style={{justifyContent:'center'}}
                                        >
                                            <Col xs={24} sm={24} md={8}>
                                                <Row className="mb-2">
                                                    <Col xs={12} sm={12} md={9}>
                                                        <Icon type={MailOutlined} className="text-primary font-size-md"/>
                                                        <span className="text-muted ml-2">Email:</span>
                                                    </Col>
                                                    <Col xs={12} sm={12} md={15}>
                                                        <span className="font-weight-semibold">{email}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} sm={12} md={9}>
                                                        <Icon type={PhoneOutlined} className="text-primary font-size-md"/>
                                                        <span className="text-muted ml-2">Phone:</span>
                                                    </Col>
                                                    <Col xs={12} sm={12} md={15}>
                                                        <span className="font-weight-semibold">
                                                            {
                                                                (this.state.info.contact==null || this.state.info.contact=='' || this.state.info.contact==undefined)?
                                                                    ' - ':
                                                                    this.state.info.contact
                                                            }
                                                        </span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} sm={24} md={8}>
                                                <Row className="mb-2 mt-2 mt-md-0 ">
                                                    <Col xs={12} sm={12} md={9}>
                                                        <Icon type={UserOutlined} className="text-primary font-size-md"/>
                                                        <span className="text-muted ml-2">Username:</span>
                                                    </Col>
                                                    <Col xs={12} sm={12} md={15}>
                                                        <span className="font-weight-semibold">{this.state.info.username}</span>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-2">
                                                    <Col xs={12} sm={12} md={9}>
                                                        <Icon type={GlobalOutlined} className="text-primary font-size-md"/>
                                                        <span className="text-muted ml-2">Website:</span>
                                                    </Col>
                                                    <Col xs={12} sm={12} md={15}>
                                                        <span className="font-weight-semibold">{
                                                            (this.state.info.website==null || this.state.info.website=='' || this.state.info.website==undefined)?
                                                                ' - ':
                                                                this.state.info.website
                                                        }</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>



                    <Row gutter="16">
                        {/*<Col xs={24} sm={24} md={8}>*/}
                        {/*    <Connection />*/}
                        {/*    <Group />*/}
                        {/*</Col>*/}
                        {/*<Col xs={24} sm={24} md={16}>*/}
                        {/*    <Experiences />*/}
                        {/*    <Interested />*/}
                        {/*</Col>*/}
                    </Row>
                </div>
            </>
        )
    }
}


export default withRouter(Profile)
