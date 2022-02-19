import React from "react";
import {withRouter} from "react-router-dom";
import * as innerRoutes from './docs-inner-routers';
import {Form, Input, message, Tag} from "antd";
import * as spinner_actions from "../../../../../redux/actions/Spinner";
import * as navigation_actions from "../../../../../redux/actions/Navigation";
import * as project_actions from "../../../../../redux/actions/Project";
import * as document_actions from "../../../../../redux/actions/Documents";
import {connect} from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './docs-styles.scss';
import {
    SyncOutlined,
} from '@ant-design/icons';
import Cookies from "js-cookie";
import axios from "axios";
import * as BaseUrl from "../../../../../server/base_urls";

const toolbarOptions = {toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        ['link', 'image'],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ]
};

class ProjectDocsEditor extends React.Component {

    state = {
        title: "",
        value: "",
        saving: false
    }

    componentDidMount() {
        this.setState({
            title: this.props.documentReducer.document.name,
            value: this.props.documentReducer.document.doc
        })
    }

    componentWillMount() {
        setInterval(this.onSave, 10000);
    }

    onChangeTitle = e => {
        this.setState({title: e.target.value});
    }

    setValue = e => {
        this.setState({value: e});
    }

    onSave = () => {
        this.setState({saving: true});
        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        let method = "patch";

        let body = {
            id: this.props.documentReducer.document.id,
            name: this.state.name,
            doc: this.state.value
        }

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}docs/update`, body, {headers: headers})
            .then(async response => {

                if(response.data.success) {
                    this.setState({saving: false});
                }

            }).catch(async error => {
            this.setState({saving: false});
            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });
    }

    offEditor = () => {
        this.props.history.push(innerRoutes.inner_route_home);
    }

    render() {
        let {title, value, saving} = this.state;
        return(
            <div>
                <div>
                    <div><span onClick={this.offEditor}>All Project Docs</span><span>{`${" > "}`}</span><span style={{fontWeight: 'bold'}}>New Doc Editor</span></div>
                </div>
                <br/>
                <h3>Editor</h3>
                <br/>
                <div>
                    <Form
                        layout="vertical"
                    >
                        <Form.Item>
                            <Input placeholder="Document Title..." value={title} onChange={this.onChangeTitle} />
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    {
                        saving?
                        <Tag icon={<SyncOutlined spin />} color="processing">
                            processing
                        </Tag>
                        :
                        null
                    }
                    <ReactQuill modules={toolbarOptions} theme="snow" value={value} onChange={this.setValue}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectDocsEditor));
