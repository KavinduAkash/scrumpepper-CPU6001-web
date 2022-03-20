import React from "react";
import * as spinner_actions from "../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../redux/actions/Navigation";
import * as project_actions from "../../../../redux/actions/Project";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Collapse, Alert, Select, message, Table} from 'antd';
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../../server/base_urls";

const { Panel } = Collapse;
const { Option } = Select;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Responsibility',
        dataIndex: 'responsibility',
        key: 'responsibility',
    },
];


class ProjectTeamPerformance extends React.Component {

    state = {
        sprints: [],
        selectedSprint: 0,
        member_performance: [],
    }

    componentDidMount() {
        this.getAllSprints();
    }

    getAllSprints = () => {
        this.setState({loading: true});
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

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}sprint/get?project=${this.props.projectReducer.id}`, {headers: headers})
            .then(async response => {
                if(response.status==200) {
                    if(response.data.success) {
                        this.setState({
                            sprints: response.data.body,
                        })
                        if(response.data.body!=null) {
                            if(response.data.body.length>0) {
                                this.setState({
                                    selectedSprint: response.data.body[0].id
                                })
                                this.loadMemberPerformance(response.data.body[0].id);
                            }
                        }
                        this.setState({loading: false});
                    } else {
                        message.error(response.msg);
                        this.setState({loading: false});
                    }
                }
            })
            .catch(async error => {
                this.setState({loading: false});
                message.error('Something went wrong!');
            });
    }

    loadMemberPerformance = (id) => {
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }
        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };
        let request_body = {}
        let method = "get";
        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}project-report/team-performance/${id}`, request_body, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    this.setState({member_performance: response.data.body});
                }
            }).catch(async error => {
            this.setState({loading: false});
            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);
        });
    }

    onChangeSprint = e => {
        this.setState({
            selectedSprint: e
        })
        this.loadMemberPerformance(e);
    }

    render() {

        let member_responsibility = [];
        this.state.member_performance.map((result, index)=>{
            let us = [];
            result.userStories.map((r, i)=>{
                let u = {
                    key: i,
                    name: r.userStory.title,
                    responsibility: `${r.responsibility}%`,
                }
                us.push(u);
            })
            let obj = {
                name: `${result.projectMember.corporateEmployee.user.firstName} ${result.projectMember.corporateEmployee.user.lastName}`,
                responsibility: result.responsibility,
                totalResponsibility: result.totalResponsibility,
                userStories: us
            };
            member_responsibility.push(obj);
        })

        return(
            <div>
                <h3>Team Performance</h3>
                <br/>
                <div>
                    <Select value={this.state.selectedSprint} style={{ width: 120 }}
                            onChange={this.onChangeSprint}
                    >
                        {
                            this.state.sprints.map((result, index)=><Option value={result.id}>{result.sprintName}</Option>)
                        }
                    </Select>
                </div>
                <br/>
                <div>
                    <h4>Member Responsibility</h4>
                    <Alert
                        description="Scrum follows team working as a key rule and total team need to supportive for each to each. As a result of it, unable to measure performance and task responsibility for each member in scrum. Following results are depend on considering members maximum responsibility as a team of a sprint."
                        type="info"
                        closable
                    />
                    <br/>
                    <Collapse defaultActiveKey={['0']} >
                        {
                            member_responsibility.map((result, index)=>
                                <Panel header={result.name} key={index} extra={<span><span>{`Max Responsibility: ${result.totalResponsibility}% `}</span> - <span style={{color: 'green'}}>{`Done: ${result.responsibility}%`}</span></span>}>
                                    <Table header={false} pagination={false} dataSource={result.userStories} columns={columns} className={'project-set-tbl'} />
                                </Panel>
                            )
                        }
                    </Collapse>

                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({

    corporateReducer: state.corporateReducer,
    projectReducer: state.projectReducer

});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSpinner: (data) => dispatch(spinner_actions.handlerSpinner(data)),
        handleNavigation: (data) => dispatch(navigation_actions.handlerNavigation(data)),
        handleProjectId: (data) => dispatch(project_actions.handleProjectId(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectTeamPerformance));
