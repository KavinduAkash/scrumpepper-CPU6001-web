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
import * as BaseUrl from "../../../../server/base_urls";

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

class ProjectReportsVelocity extends React.Component {

    state = {
        burnDown: null,
        burnUp: null,
        velocity: null,
    }

    componentDidMount() {
        this.loadVelocity(this.props.projectReducer.project.id);
    }

    loadVelocity = (projectId) => {
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
        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}project-report/sprint-velocity/${projectId}`, request_body, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    this.setState({velocity: response.data.body});
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
        let velocityLabels = [];
        let velocityIdeal = [];
        let velocityDone = [];

        if(this.state.velocity!=null) {
            this.state.velocity.map((result, index)=>{
                velocityLabels.push(result.sprint.sprintName);
                velocityIdeal.push(result.ideal);
                velocityDone.push(result.done);
            });
        }

        let sprintVelocity = {
            labels: velocityLabels,
            datasets: [
                {
                    label: "Completed",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    data: velocityDone
                },
                {
                    label: "Total Points",
                    fillColor: "#BDBDBD",
                    data: velocityIdeal
                },
            ]
        };


        let pp = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        return(
            <div>
                <div>
                    <h3>Sprint Velocity</h3>
                    {
                        <Bar options={pp} data={sprintVelocity} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectReportsVelocity));
