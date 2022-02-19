import React from "react";
import {Button, Form, Input, Select} from "antd";

const { Option } = Select;

class ProjectSppPokerNew extends React.Component {

    state = {
        id: 0,
        projectId: 0,
        sprintId: 0,
        description: "",
        status: 1,
        edit: true,
        sprints: []
    }

    componentDidMount() {
        console.log("XX ")
    }

    onChangeSprint = e => {
        this.setState({
            sprintId: e
        })
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeStatus = e => {
        this.setState({
            status: e
        })
    }

    render() {

        let sprints = this.state.sprints;

        return(
            <div>
                <div><span>All Poker Rooms</span><span>{`${" > "}`}</span><span style={{fontWeight: 'bold'}}>New Poker Room</span></div>
                <br/>
                <h3>New Poker Room</h3>
                <div>
                    <Form
                        layout="vertical"
                    >
                        <Form.Item
                            label="Note"
                        >
                            <Input.TextArea placeholder="input placeholder" value={this.state.description} onChange={this.onChangeDescription} />
                        </Form.Item>

                        <Form.Item
                            label="Sprint"
                        >
                            <Select style={{ width: 120 }} onChange={this.onChangeSprint}>
                                {
                                    sprints.map((result, index)=><Option value={result.id}>{result.sprintName}</Option>)
                                }
                            </Select>
                        </Form.Item>

                        {
                            this.state.id!=0?
                                <Form.Item
                                    label="Status"
                                >
                                    <Select style={{ width: 120 }} onChange={this.onChangeStatus} disble={!this.state.edit}>
                                        <Option value={1}>Ongoing </Option>
                                        <Option value={1}>Stopped </Option>
                                    </Select>
                                </Form.Item>
                                :
                                null
                        }


                        <Form.Item className={'text-right'}>
                            {
                                this.state.id==0?
                                    <Button type="primary" onClick={()=>this.handle_room("START")}>Start</Button>
                                    :
                                    <Button type="primary" onClick={()=>this.handle_room("UPDATE")}>Update</Button>
                            }
                        </Form.Item>
                    </Form>
                </div>

            </div>
        );
    }

}

export default (ProjectSppPokerNew);
