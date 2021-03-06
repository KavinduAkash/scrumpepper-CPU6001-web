import React from "react";
import {withRouter} from "react-router-dom";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import Cookies from "js-cookie";
import axios from "axios";
import * as Swal from "sweetalert2";
import * as spinner_actions from "../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../redux/actions/Navigation";
import * as project_actions from "../../../../redux/actions/Project";
import {connect} from "react-redux";
import {message, Select} from "antd";
import * as BaseUrl from "../../../../server/base_urls";

const { Option } = Select;

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );
const options = {
    responsive: true,
    elements: {
        line: {
            tension: 0
        }
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};


const options2 = {
    type: 'bar',
    options: {
        barValueSpacing: 20,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

let labels = ["2022-03-02", "2022-03-03", "2022-03-04", "2022-03-05", "2022-03-06", "2022-03-07", "2022-03-08", "2022-03-09", "2022-03-10", "2022-03-11"];

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2, 3, 2],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: false,
        },
        {
            label: 'Dataset 2',
            data: [12, 30, 3, 5, 2, 3, 2],
            borderColor: '#E0E0E0',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            fill: false,
        },
    ],
};

class ProjectReportsBurnup extends React.Component {

    state = {
        burnDown: null,
        burnUp: null,
        velocity: null,
        sprints: [],
        selectedSprint: 0
    }

    componentDidMount() {
        this.getAllSprints();
    }


    onChangeSprint = e => {
        this.setState({
            selectedSprint: e
        })
        this.loadBurnUp(e);
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
                                this.loadBurnUp(response.data.body[0].id);
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

    loadBurnUp = (id) => {
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
        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}project-report/burnup/${id}`, request_body, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    this.setState({burnUp: response.data.body});
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
        let burnUpLabel = [];
        let burnUpIdeal = [];
        let burnUpRemainingEffortData = [];
        let burnUpData = null;

        if(this.state.burnUp!=null) {
            let pre = 0;
            this.state.burnUp.data.map((result, index)=>{
                burnUpLabel.push(result.label);
                let date = new Date(result.label);
                console.log("--------------------------------------------------")
                console.log("Date: ", date.setHours(0,0,0,0))
                console.log("Date compare: ", new Date().setHours(0,0,0,0)>=date.setHours(0,0,0,0))
                if(result.active & (new Date().setHours(0,0,0,0)>=date.setHours(0,0,0,0))) {
                    if(result.remainingEffortPoints==0) {
                        burnUpRemainingEffortData.push(pre);
                    } else {
                        burnUpRemainingEffortData.push(result.remainingEffortPoints);
                        pre = result.remainingEffortPoints;
                    }
                }
                burnUpIdeal.push(result.idealPoints);
            });
            if(burnUpLabel!=null && burnUpLabel!=undefined && burnUpLabel!="") {
                labels = burnUpLabel;
                burnUpData = {
                    labels,
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: burnUpRemainingEffortData,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            fill: false,
                        },
                        {
                            label: 'Dataset 2',
                            data: burnUpIdeal,
                            borderColor: '#E0E0E0',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            fill: false,
                        },
                    ],
                };
            }
        }

        return(
            <div>
                this is project reports
                <div>
                    <h3>Burn up</h3>
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
                    {
                        burnUpData!=null?<Line options={options} data={burnUpData} />:null
                    }
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({

    corporateReducer: state.corporateReducer,
    projectReducer: state.projectReducer

});

const mapDispatchToProps = (dispatch) => {
    return {
        // corporateHandler: (data) => dispatch(corporate_actions.storeCorporateId(data)),
        handleSpinner: (data) => dispatch(spinner_actions.handlerSpinner(data)),
        handleNavigation: (data) => dispatch(navigation_actions.handlerNavigation(data)),
        handleProjectId: (data) => dispatch(project_actions.handleProjectId(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectReportsBurnup));
