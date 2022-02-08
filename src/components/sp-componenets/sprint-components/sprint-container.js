import React from "react";
import {Button, Col, Dropdown, Menu, Row, Tag} from "antd";
import './sprint-container.scss'
import { CaretDownOutlined, EditOutlined, EllipsisOutlined, CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const menu = (
    <Menu>
        <Menu.ItemGroup title="Group title">
            <Menu.Item>1st menu item</Menu.Item>
            <Menu.Item>2nd menu item</Menu.Item>
        </Menu.ItemGroup>
        <SubMenu title="sub menu">
            <Menu.Item>3rd menu item</Menu.Item>
            <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
        <SubMenu title="disabled sub menu" disabled>
            <Menu.Item>5d menu item</Menu.Item>
            <Menu.Item>6th menu item</Menu.Item>
        </SubMenu>
    </Menu>
);

class SprintContainer extends React.Component {

    render() {
        return (
            <div className={'sprint-container'}>
                {/*header*/}
                <div className={'header'}>
                    <Row>
                       <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'section1'}>
                               <span className={'drop-arrow'}>{ <CaretDownOutlined /> }</span>
                               <span className={'title'}>{`Sprint Name`}</span>
                               <span className={'edit'}><Button type={'text'}><EditOutlined />Edit</Button></span>
                       </Col>
                       <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'section2'}>
                           <span><Tag icon={<ClockCircleOutlined />} color="default">{`${0}`}</Tag></span>
                           <span><Tag icon={<SyncOutlined />} color="processing">{`${0}`}</Tag></span>
                           <span><Tag icon={<CheckCircleOutlined />} color="success">{`${0}`}</Tag></span>
                           <span className={'action-1'}><Button type="primary" size={'small'}>Start Sprint</Button></span>
                           <span className={'action-1'}>
                               <Dropdown overlay={menu}>
                                   <Button type={'text'} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        <EllipsisOutlined />
                                   </Button>
                               </Dropdown>
                           </span>
                       </Col>
                    </Row>
                </div>

                {/*body*/}
                <div></div>
            </div>
        );
    }

}

export default SprintContainer;
