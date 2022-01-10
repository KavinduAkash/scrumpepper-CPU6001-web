import React from "react";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import './project.scss'

class Project extends React.Component {

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

export default Project;
