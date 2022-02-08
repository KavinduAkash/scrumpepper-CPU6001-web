import React from "react";
import {Button, Form, Input, Modal} from "antd";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

class SprintEditModal extends React.Component {

    onClose = () => {
    }

    render() {
        return(
            <Modal
                title="Basic Modal" v
                // visible={this.props.isEditVisible}
                visible={true}
                onCancel={this.onClose}
                footer={false}
                className={'sprint-edit-modal'}
            >


                <Form
                    layout="vertical"
                >
                    <Form.Item
                        label="Sprint Name"
                        required
                        // tooltip="This is a required field"
                    >
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                        label="Sprint Goal"
                        // tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
                    >
                        <Input.TextArea placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                        label="Sprint Duration"
                        // tooltip="This is a required field"
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item className={'text-right'}>
                        <Button type="primary">Submit</Button>
                    </Form.Item>
                </Form>


            </Modal>
        )
    }

}

export default SprintEditModal;
