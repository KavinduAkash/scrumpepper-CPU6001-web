import React from "react";
import {Avatar, Button, Card, Col, Row, Table, Tooltip} from "antd";
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as corporate_actions from "../../../../redux/actions/Corporate";
import '../../../../assets/less/custom-styles/common.scss'
import './corporatae-manage.scss'
import Flex from 'components/shared-components/Flex'
const { Meta } = Card;

const dataSource = [
    // {
    //     key: '1',
    //     name: 'Mike',
    //     age: 32,
    //     address: '10 Downing Street',
    // },
    // {
    //     key: '2',
    //     name: 'John',
    //     age: 42,
    //     address: '10 Downing Street',
    // },
];

const columns = [
    {
        title: 'Project Name',
        dataIndex: 'name',
        key: 'name',
        width: '50%',
    },
    {
        title: 'Team',
        dataIndex: 'team',
        key: 'team',
        width: '30%',
    },
    {
        title: 'Created Date',
        dataIndex: 'date',
        key: 'date',
        width: '20%',
    }
];

class CorporateManagementView extends React.Component {

    render() {

        return (
         <>
             <div className={'page-margin-handler'}>
                <Row>
                    <Col sm={24} md={24} lg={24} xl={24}>
                        <h4>Corporate</h4>
                    </Col>
                   <Col sm={24} md={24} lg={24} xl={24}>
                       <Card
                           style={{ width: '100%' }}
                       >
                           <Row>
                               <Col sm={24} md={24} lg={4} xl={4} className={'text-center w-100'}>
                                   <Avatar size={100} icon={<UserOutlined />} />
                               </Col>
                               <Col sm={24} md={24} lg={20} xl={20}>
                                   <Row className={'ww'}>
                                       <Col sm={24} md={24} lg={24} xl={24}>
                                           <Flex alignItems="center"
                                                 mobileFlex={true}
                                                 className="mb-3 text-center"
                                           >
                                               <h2>
                                                   WSO2
                                               </h2>
                                               <Button size="small" className="ml-2">Edit</Button>
                                           </Flex>
                                       </Col>
                                   </Row>
                                   <Row>
                                       <Col sm={24} md={24} lg={12} xl={12}>
                                           <table className={'info-tbl'}>
                                               <tr>
                                                   <td className={'topic'}>Email</td>
                                                   <td className={'value-gap'}>business@wso2.com</td>
                                               </tr>
                                               <tr>
                                                   <td className={'topic'}>Address</td>
                                                   <td className={'value-gap'}>20 Palm Grove, Colombo 3</td>
                                               </tr>
                                           </table>
                                       </Col>
                                       <Col sm={24} md={24} lg={12} xl={12}>
                                           <table className={'info-tbl'}>
                                               <tr>
                                                   <td className={'topic'}>Contact 1</td>
                                                   <td className={'value-gap'}>0117 435 800</td>
                                               </tr>
                                               <tr>
                                                   <td className={'topic'}>Contact 2</td>
                                                   <td className={'value-gap'}>0117 435 800</td>
                                               </tr>
                                           </table>
                                       </Col>
                                   </Row>
                               </Col>
                           </Row>
                       </Card>
                   </Col>
                    <Col sm={24} md={24} lg={24} xl={24}>
                        <h4>Members</h4>
                    </Col>
                     <Col sm={24} md={24} lg={24} xl={24}>
                         <Card
                             style={{ width: '100%' }}
                         >
                             <Avatar.Group maxCount={5} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                 <Avatar src="https://joeschmoe.io/api/v1/random" />
                                 <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                 <Avatar style={{ backgroundColor: '#f56a00' }}>P</Avatar>
                                 <Avatar style={{ backgroundColor: '#f56a00' }}>J</Avatar>
                                 <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                 <Avatar style={{ backgroundColor: '#f56a00' }}>L</Avatar>
                                 <Tooltip title="Ant User" placement="top">
                                     <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                 </Tooltip>
                                 <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
                             </Avatar.Group>
                         </Card>
                     </Col>

                    <Col sm={24} md={24} lg={24} xl={24}>
                        <h4>You Assigned Projects</h4>
                    </Col>
                    <Col sm={24} md={24} lg={24} xl={24}>
                        <Card
                            style={{ width: '100%' }}
                        >
                            <Row>
                                <Col sm={24} md={24} lg={24} xl={24} className={'text-center w-100'}>
                                    <Table dataSource={dataSource} columns={columns}/>;
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                 </Row>
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
        // corporateHandler: (data) => dispatch(corporate_actions.storeCorporateId(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CorporateManagementView));
