import React from "react";
import {withRouter} from "react-router-dom";
import {Table} from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import * as Swal from "sweetalert2";
import * as spinner_actions from "../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../redux/actions/Navigation";
import * as project_actions from "../../../../redux/actions/Project";
import * as document_actions from "../../../../redux/actions/Documents";
import * as poker_actions from "../../../../redux/actions/Poker";
import {connect} from "react-redux";

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
];

class ProjectTeams extends React.Component {

    state = {
        team: []
    }

    componentDidMount() {
        this.getTeam();
    }

    getTeam = () => {
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
        axios[method](`http://localhost:8080/v1/project-member/get-team?id=${this.props.projectReducer.project.id}`, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    this.setState({team: response.data.body});
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

        let managerTeam = [];
        let otherTeam = [];
        this.state.team.map((result, index)=>{
            let obj = {
                name: `${ result.corporateEmployee.user.firstName } ${ result.corporateEmployee.user.lastName }`,
                role: result.scrumRole
            }
            if(result.scrumRole=='PRODUCT_OWNER' || result.scrumRole=='SCRUM_MASTER') {
                managerTeam.push(obj);
            } else {
                otherTeam.push(obj);
            }
        });

        return(
            <div>
                <h3>Team</h3>
                <div>
                    <div>
                        <h5>Managers</h5>
                        <Table dataSource={managerTeam} columns={columns} />
                    </div>
                    <div>
                        <h5>Other Members</h5>
                        <Table dataSource={otherTeam} columns={columns} />
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    corporateReducer: state.corporateReducer,
    projectReducer: state.projectReducer,
    documentReducer: state.documentReducer
});

const mapDispatchToProps = (dispatch) => {
    return {
        // corporateHandler: (data) => dispatch(corporate_actions.storeCorporateId(data)),
        handleSpinner: (data) => dispatch(spinner_actions.handlerSpinner(data)),
        handleNavigation: (data) => dispatch(navigation_actions.handlerNavigation(data)),
        handleProjectId: (data) => dispatch(project_actions.handleProjectId(data)),
        storeCurrentDoc: (data) => dispatch(document_actions.storeCurrentDocument(data)),
        storePokerRoom: (data) => dispatch(poker_actions.storePokerRoom(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectTeams));
