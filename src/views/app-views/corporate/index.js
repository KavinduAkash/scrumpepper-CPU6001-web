import React from "react";
import {
    Skeleton,
    Switch,
    Card,
    Avatar,
    Row,
    Col,
    Button,
    Modal,
    Input,
    Form,
    message,
    Upload,
    notification, Tag, Empty
} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import '../../../assets/less/custom-styles/sp-button.scss'
import axios from "axios";
import Cookies from "js-cookie";
import * as corporate_actions from '../../../redux/actions/Corporate';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as BaseUrl from "../../../server/base_urls";

const { Meta } = Card;

const size = 'small'
const rules = {
    corporate_name: [
        {
            required: true,
            message: 'Please input corporate name'
        }
    ],
    address: [
        {
            required: true,
            message: 'Please input address'
        }
    ],
    contact_number_1: [
        {
            required: true,
            message: 'Please input contact number 1'
        }
    ],
    email: [
        {
            required: true,
            message: 'Please input corporate email address'
        },
        {
            type: 'email',
            message: 'Please enter a validate email!'
        }
    ],
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class Corporate extends React.Component{

    state = {
        visible: false,

        loading: false,
        imageUrl: '',
        loading_button: false,

        // create a corporate
        name: '',
        address: '',
        contactNumber1: '',
        contactNumber2: '',
        email: '',
        corporate_long: null,

        // my corporates
        my_corporates: []
    };

    componentDidMount() {
        console.log("Corporates")
        this.loadMyCorporates();
    }

    loadMyCorporates = () => {

        if(Cookies.get('68e78905f4c')=="" ||
            Cookies.get('68e78905f4c')==null ||
            Cookies.get('68e78905f4c')==undefined) {
            this.props.history.push("/auth/login");
        }

        let headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + Cookies.get('68e78905f4c')
        };

        axios.get(`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}corporate/my-corporates`, {headers})
            .then(res => {
                console.log(res.data);
                this.setState({my_corporates: res.data.body});
            })
            .catch(err => {
                console.log(err)
            });

    };



    setVisible = e => {
        this.setState({visible: false})
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl: imageUrl,
                    loading: false,
                }),
            );
            console.log("OK");
        }
    };

    openCorporateCreateModal = () => {
        this.setState({
            visible: true
        });
    }

    avatarUpload = file => {
        // const userId = this.props.userdetail.data.data.id;
        const data = new FormData();
        data.append('file', file.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
            },
        };

        axios.post(`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}corporate/A2b4-8a486269971ed2326920`, data, config)
            .then(res => {
                console.log(res.data.url);
                console.log(res)
                this.setState({
                    imageUrl: res.data.url,
                    loading: false,
                });
            })
            .catch(err => console.log(err));
    };

    handleSubmitCreateCorporate = values => {
        this.setState({
            loading_button: true
        });

        let request_body = {
            name: values.corporate_name,
            address: values.address,
            contactNumber1: values.contact_number_1,
            contactNumber2: values.contact_number_2==undefined?null:values.contact_number_2,
            email: values.email,
            corporateLogo: this.state.imageUrl
        };
        console.log("request_body: ", request_body)

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

        axios[method](`${BaseUrl.SCRUM_PEPPER_API_URL(BaseUrl.URL_TYPE)}corporate/create`, request_body, {headers: headers})
            .then(async response => {

                if(response.data.success) {
                    const args = {
                        message: response.data.msg,
                        // description: 'Please login to the PM tool for access. \nyou will redirect to the login page in next 3 seconds.',
                        // duration: 1000
                    };
                    notification.open(args);
                    console.log(response);
                    this.resetCorporateInputs();
                    this.setState({visible: false, loading_button: false})
                    this.loadMyCorporates();
                }

            }).catch(async error => {
            this.setState({loading: false});

            this.setState({showMessage:1});
            setTimeout(() => {
                this.setState({showMessage:0});
            }, 2000);

        });


    }

    // create new corporate
    onChangeCorporateName = e => {this.setState({name: e.target.value})};
    onChangeCorporateAddress = e => {this.setState({address: e.target.value})};
    onChangeCorporateEmail = e => {this.setState({email: e.target.value})};
    onChangeCorporateContact1 = e => {this.setState({contactNumber1: e.target.value})};
    onChangeCorporateContact2 = e => {this.setState({contactNumber1: e.target.value})};
    //reset
    resetCorporateInputs = () => {
        this.setState({name: '', address: '', email: '', contactNumber1: '', contactNumber2: '', imageUrl: ''})
    };


    onClickCorporateCard = value => {
        let corporateHandler = this.props.corporateHandler(value);
        this.moveToCorporateMange();
    };

    moveToCorporateMange = () => {
        this.props.history.push("/app/corporate/manage");
    };

    render() {
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload Logo</div>
            </div>
        );

        let show_skeleton = true;
        let skeleton = <Row>
                <Col sm={24} md={12} lg = {6} xl={6}>
                    <Card
                        style={{ width: 300, marginTop: 16 }}
                    >
                        <Skeleton loading={true} avatar active>
                            <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col>
                <Col sm={24} md={12} lg = {6} xl={6}>
                    <Card
                        style={{ width: 600, marginTop: 16 }}
                    >
                        <Skeleton loading={true} avatar active>
                            <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col>
                <Col sm={24} md={12} lg = {6} xl={6}>
                    <Card
                        style={{ width: 300, marginTop: 16 }}
                    >
                        <Skeleton loading={true} avatar active>
                            <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col>
            </Row>;

        let my_corporate_list = [];
        if(this.state.my_corporates!==null && this.state.my_corporates!=='' && this.state.my_corporates!==undefined) {
            if(this.state.my_corporates.length!=0) {
                show_skeleton = false;
               this.state.my_corporates.map(val => {
                   let x = <div>
                       <div><Tag color={'geekblue'} key={val.corporate.id}>{val.corporateAccessType}</Tag><Tag icon={<CheckCircleOutlined />} color="success">{val.corporate.statusType}</Tag></div>
                   </div>

                    let data = <Col sm={24} md={8} lg = {8} xl={8}>
                        <Card
                            hoverable
                            style={{ width: 350, marginTop: 16, minHeight:100, border: '1px solid black', cursor: 'pointer' }}
                            onClick={()=>this.onClickCorporateCard(val.corporate.id)}
                        >
                            <Meta
                                title={val.corporate.name}
                                description={x}
                            />

                        </Card>
                    </Col>;
                   my_corporate_list.push(data);
                })
            }
        }

        return (
            <>

                {/*=============================== create a corporate =================================*/}
                <Modal
                    title="Create a corporate"
                    centered
                    visible={this.state.visible}
                    // onOk={() => this.setVisible(false)}
                    onCancel={() => this.setVisible(false)}
                    width={1000}
                    footer={null}
                >

                    <div>
                        <Form layout="vertical" onFinish={this.handleSubmitCreateCorporate}>

                            <Row>
                                <Col sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item
                                        name="corporate_name"
                                        label="Corporate Name"
                                        rules={rules.corporate_name}
                                        hasFeedback
                                    >
                                        <Input placeholder={'Corporate Name'} value={this.state.name} onChange={this.onChangeCorporateName} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item
                                        name="address"
                                        label="Corporate Address"
                                        rules={rules.address}
                                        hasFeedback
                                    >
                                        <Input.TextArea placeholder={'Corporate Address'} value={this.state.address} onChange={this.onChangeCorporateAddress} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item
                                        name="email"
                                        label="Corporate Email"
                                        rules={rules.email}
                                        hasFeedback
                                    >
                                        <Input placeholder={'Corporate Email'} value={this.state.email} onChange={this.onChangeCorporateEmail} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={24} md={11} lg={11} xl={11}>
                                    <Form.Item
                                        name="contact_number_1"
                                        label="Contact Number 1"
                                        rules={rules.contact_number_1}
                                        hasFeedback
                                    >
                                        <Input placeholder={'Corporate Contact Number 1'} value={this.state.contactNumber1} onChange={this.onChangeCorporateContact1} />
                                    </Form.Item>
                                </Col>
                                <Col md={1} lg={1} xl={1}></Col>
                                <Col sm={24} md={11} lg={11} xl={11}>
                                    <Form.Item
                                        name="contact_number_2"
                                        label="Contact Number 2"
                                        // rules={rules.contact_number_2}
                                        hasFeedback
                                    >
                                        <Input placeholder={'Corporate Contact Number 2'} value={this.state.contactNumber2} onChange={this.onChangeCorporateContact2} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item>
                                        <Col sm={24} md={24} lg = {24} xl={24} className={'text-right'}>
                                            <Button
                                                type="primary"
                                                size={size}
                                                className={'sp-main-btn'}
                                                loading={this.state.loading_button}
                                                // onClick={this.handleSubmitCreateCorporate}
                                                htmlType={"submit"}
                                            >
                                                Create the corporate
                                            </Button>
                                        </Col>
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Form>
                    </div>





                </Modal>

                {/*=============================== corporates =================================*/}

                            <div>

                                <Row>
                                    <Col sm={24} md={24} lg = {24} xl={24} className={'text-right'}>
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            size={size}
                                            className={'sp-main-btn'}
                                            onClick={this.openCorporateCreateModal}
                                        >
                                            Create a corporate
                                        </Button>
                                    </Col>
                                </Row>
                                {
                                    (this.state.my_corporates != null & this.state.my_corporates != "" & this.state.my_corporates != undefined) ?
                                        (this.state.my_corporates.length > 0) ?
                                            <div>
                                                {
                                                    show_skeleton ?
                                                        skeleton :
                                                        <Row>{my_corporate_list}</Row>

                                                }
                                            </div>
                                            :
                                            <Empty
                                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                imageStyle={{
                                                    height: 60,
                                                }}
                                                description={
                                                    <span>
                                    No <a href="#API">Corporates</a> yet.
                                </span>
                                                }
                                            >
                                            </Empty>
                                        :
                                        <Empty
                                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                            imageStyle={{
                                                height: 60,
                                            }}
                                            description={
                                                <span>
                                    No <a href="#API">Corporates</a> yet.
                                </span>
                                            }
                                        >
                                        </Empty>

                                }
                            </div>
            </>
        )
    }

}

const mapStateToProps = (state) => ({
    corporateReducer: state.corporateReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        corporateHandler: (data) => dispatch(corporate_actions.storeCorporateId(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Corporate))
