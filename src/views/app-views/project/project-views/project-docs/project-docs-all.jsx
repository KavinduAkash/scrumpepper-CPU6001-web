import React from "react";
import {Button, Table} from "antd";
import * as innerRouters from './docs-inner-routers';
import DocsModal from "./docs-modal";
import * as spinner_actions from "../../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../../redux/actions/Navigation";
import * as project_actions from "../../../../../redux/actions/Project";
import * as document_actions from "../../../../../redux/actions/Documents";
import {connect} from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../../../server/base_urls";

const columns = [
    {
        title: 'Document',
        dataIndex: 'document',
        key: 'document',
    },
    {
        title: 'Created',
        dataIndex: 'createdDate',
        key: 'createdDate',
    },
    {
        title: 'Last Modified',
        dataIndex: 'modifiedDate',
        key: 'address',
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
    },
];

class ProjectDocsAll extends React.Component {

    state = {
        isEdit: false,
        loading: false,
        documents: []
    }

    componentDidMount() {
        this.load_all_documents();
    }

    load_all_documents = () => {
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

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}docs/get?id=${this.props.projectReducer.project.id}`, {headers: headers})
            .then(async response => {
                if(response.data.success) {
                    this.setState({documents: response.data.body, loading: false});
                }
            }).catch(async error => {
            this.setState({loading: false});
            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    openCreateNewDoc = value => {
        this.setState({isEdit: value})
    }

    navigateToEdit = data => {
        this.props.storeCurrentDoc(data);
        this.setState({isEdit: false});
        this.openEditor();
    }

    openEditor = () => {
        this.props.history.push(innerRouters.inner_route_editor);
    }

    render() {
        let {documents} = this.state;
        let dataSource = [];
        documents.map((result, index)=>{

            let cd = result.createdDate;
            let cdSplit = cd.split('T');
            let cd1 = cdSplit[0];
            let cd2 = cdSplit[1].split('.')[0];

            let md = result.modifiedDate;
            let md1 = "";
            let md2 = "";
            if(md!=null) {
                let mdSplit = md.split('T');
                md1 = mdSplit[0];
                md2 = mdSplit[1].split('.')[0];
            }

            let obj = {
                document: result.name,
                createdDate: `${cd1} ${cd2}`,
                modifiedDate: md!=null?`${md1} ${md2}`:"-",
                actions: <Button type={'text'} onClick={()=>this.navigateToEdit(result)}>View</Button>
            }
            dataSource.push(obj);
        })

        return(
            <div>
                <DocsModal isEditVisible={this.state.isEdit} openEdit={this.openCreateNewDoc} navigateToEdit={this.navigateToEdit}  />
                <div></div>
                <br/>
                <div style={{textAlign: 'right'}}>
                    <Button type="primary" onClick={()=>this.openCreateNewDoc(true)}>New Document</Button>
                </div>
                <br/>
                <div>
                    <Table dataSource={dataSource} columns={columns} />
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
        storeCurrentDoc: (data) => dispatch(document_actions.storeCurrentDocument(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDocsAll);
