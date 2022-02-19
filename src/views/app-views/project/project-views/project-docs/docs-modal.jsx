import React from "react";
import {Button, Form, Input, message, Modal, Select} from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../../../server/base_urls";
import * as spinner_actions from "../../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../../redux/actions/Navigation";
import * as project_actions from "../../../../../redux/actions/Project";
import * as document_actions from "../../../../../redux/actions/Documents";
import {connect} from "react-redux";

class DocsModal extends React.Component {

    state = {
        name: "",
        loading: false
    }

    onChangeName = e => {
        this.setState({name: e.target.value})
    }

    onCreate = () => {
        if(this.state.name==null || this.state.name=="" || this.state.name==undefined) {
            message.error("Please enter document name");
        } else {
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

            let method = "post";

            let body = {
                projectId: this.props.projectReducer.project.id,
                name: this.state.name
            }

            axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}docs/create`, body, {headers: headers})
                .then(async response => {

                    if(response.data.success) {
                        this.setState({loading: false});
                        message.success(response.data.msg);
                        this.props.navigateToEdit(response.data.body);
                    }

                }).catch(async error => {
                this.setState({loading: false});
                this.setState({showMessage:1});
                setTimeout(() => {
                    this.setState({showMessage:0});
                }, 2000);

            });
        }
    }

    render() {
        return(
            <Modal
                title="New Document"
                visible={this.props.isEditVisible}
                onCancel={()=>this.props.openEdit(false)}
                footer={false}
                className={'sprint-edit-modal'}
            >
                <div>
                    <Form
                        layout="vertical"
                    >
                        <Form.Item
                            label="Document Name"
                        >
                            <Input placeholder="Document Name..." value={this.state.name} onChange={this.onChangeName} />
                        </Form.Item>

                        <Form.Item className={'text-right'}>
                            <Button type="primary" onClick={this.onCreate}>Create</Button>
                        </Form.Item>
                    </Form>
                </div>
                {
                    this.state.loading?
                        <div className="loading-overlay-2">
                            <div className="bounce-loader">
                                <img src={'/img/preloader.gif'} alt=""/>
                            </div>
                        </div>
                        :null
                }

            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(DocsModal);
