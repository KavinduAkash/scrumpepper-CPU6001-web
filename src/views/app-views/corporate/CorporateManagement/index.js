import React from "react";
import {Avatar, Card, Col, Row} from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, LoadingOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as corporate_actions from "../../../../redux/actions/Corporate";
const { Meta } = Card;
class CorporateManagementView extends React.Component {

    render() {
        return (
         <>
            <Row>
               <Col sm={24} md={24} lg={24} xl={24}>
                   <Card
                       style={{ width: '100%' }}
                       actions={[
                           <EditOutlined key="edit" />,
                       ]}
                   >
                       <Meta
                           avatar={<Avatar
                               size={{
                                   xs: 24,
                                   sm: 32,
                                   md: 40,
                                   lg: 100,
                                   xl: 120,
                                   xxl: 140,
                               }}
                               src="https://joeschmoe.io/api/v1/random" />
                           }
                           title={this.props.corporate_id.corporate_id}
                           description="This is the description"
                       />
                   </Card>
               </Col>
            </Row>
         </>
        )
    }

}

const mapStateToProps = (state) => ({
    corporate_id: state.corporateReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        // corporateHandler: (data) => dispatch(corporate_actions.storeCorporateId(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CorporateManagementView));
