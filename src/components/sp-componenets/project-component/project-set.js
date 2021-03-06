import React from "react";
import {Avatar, Button, Card, Table, Tag, Tooltip} from "antd";
import { EyeOutlined  } from '@ant-design/icons';

import './project-set.scss'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as spinner_actions from "../../../redux/actions/Spinner";
import * as navigation_actions from '../../../redux/actions/Navigation';
import * as project_actions from '../../../redux/actions/Project';
import * as corporate_actions from '../../../redux/actions/Corporate';

const columns = [
    {
        title: 'Project Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%'
    },
    {
        title: 'Your Scrum Role',
        dataIndex: 'scrum_role',
        key: 'scrum_role',
        width: '10%'
    },
    {
        title: 'Created Date',
        dataIndex: 'created_date',
        key: 'created_date',
        width: '20%'
    },
    {
        title: 'Modified Date',
        dataIndex: 'modified_date',
        key: 'modified_date',
        width: '20%'
    },
    {
        title: 'View',
        dataIndex: 'view',
        key: 'view',
        width: '10%'
    },
];

class ProjectSet extends React.Component {

     move_to_project_view = (project, corporate_id) => {
         this.props.handleProjectId(project);
         this.props.handleCorporate(corporate_id);
         this.props.handleNavigation(2);
         this.navigate_to_project_view(project.uuid);
    }

    navigate_to_project_view = (ref) => {
        this.props.history.push(`/app/project/backlog`);
    }

    render() {

        let logo = this.props.val.corporate.corporateLogo;
        let name = this.props.val.corporate.name;
        let accessType = this.props.val.accessType;
        let projects = this.props.val.projects;

        let project_list = [];
        if(projects!=null && projects!="" && projects!=undefined) {
            projects.map(val => {

                let created = val.project.createdDate;
                let splitCreated = created.split("T");
                let splitCreatedTime = splitCreated[1].split(".");
                created = `${splitCreated[0]} ${splitCreatedTime[0]}`;

                let modified = val.project.modifiedDate;
                let splitModified = modified.split("T");
                let splitModifiedTime = splitCreated[1].split(".");
                modified = `${splitModified[0]} ${splitModifiedTime[0]}`;

                let obj = {
                    name:val.project.projectName,
                    created_date:`Created on ${created}`,
                    modified_date:`Modified on ${modified}`,
                    scrum_role:<Tag color={'geekblue'} key={val.project.id}>
                    {val.role}
                    </Tag>,
                    view: <Tooltip title="View">
                        <Button type={"text"} style={{color:'#3e79f7'}} onClick={()=>this.move_to_project_view(val.project, this.props.val.corporate.id)}><EyeOutlined /></Button>
                    </Tooltip>
                }

                project_list.push(obj);
            });
        }

        return(
                <Card style={{border: "1px solid black"}}>
                    <div className="mt-3">
                        <div className={'project-corporate-header'}>
                            <div className={'project-corporate-header-logo'}>
                                {
                                    (logo!=null && logo!="" && logo!= undefined)?
                                        <img src={logo} alt="" width={20}/>:
                                        <Avatar size={30} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{name.slice(0,1)}</Avatar>
                                }
                            </div>
                            <h4 className={'corporate-header'}>{name}</h4>
                        </div>
                        <div>
                            <Table header={false} dataSource={project_list} columns={columns} className={'project-set-tbl'} />
                        </div>
                    </div>
                </Card>
        );
    }
}

const mapStateToProps = (state) => ({

    corporateReducer: state.corporateReducer,

});

const mapDispatchToProps = (dispatch) => {
    return {
        handleCorporate: (data) => dispatch(corporate_actions.storeCorporateId(data)),
        handleSpinner: (data) => dispatch(spinner_actions.handlerSpinner(data)),
        handleNavigation: (data) => dispatch(navigation_actions.handlerNavigation(data)),
        handleProjectId: (data) => dispatch(project_actions.handleProjectId(data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectSet));
