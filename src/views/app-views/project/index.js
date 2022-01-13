import React from "react";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import './project.scss'
import Cookies from "js-cookie";
import {withRouter} from "react-router-dom";
import {Profile} from "../profile";

class Project extends React.Component {

    componentDidMount() {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }
    }

    render() {
        return(
            <div>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Card>
                            <div className="mt-3">
                                <div className={'project-corporate-header'}>
                                    <div className={'project-corporate-header-logo'}>
                                        <img src="https://freepngimg.com/thumb/google/66893-guava-logo-google-plus-suite-png-image-high-quality.png" alt="" width={20}/>
                                    </div>
                                    <h4>Google</h4>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Card>
                            <div className="mt-3">
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Card>
                            <div className="mt-3">
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default withRouter(Project)
