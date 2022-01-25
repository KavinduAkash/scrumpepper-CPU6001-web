import React from "react";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import './project.scss'
import Cookies from "js-cookie";
import {withRouter} from "react-router-dom";
import {Profile} from "../profile";
import ProjectSet from '../../../components/sp-componenets/project-component/project-set';
import axios from "axios";

class Project extends React.Component {

    state = {
        my_project: []
    };

    componentDidMount() {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }
        this.load_projects();
    }

    load_projects = () => {
        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        axios.get('http://localhost:8080/v1/project/my-projects', {headers})
            .then(res => {
                console.log(res.data);
                this.setState({my_project: res.data.body});
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        return(
            <div>

                {
                    this.state.my_project.map(val=>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24}>
                                <ProjectSet val={val} />
                            </Col>
                        </Row>
                    )
                }

            </div>
        );
    }

}

export default withRouter(Project)
