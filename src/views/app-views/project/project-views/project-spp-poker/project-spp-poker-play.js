import React from "react";
import './poker-styles.scss'
import {Button, Col, Row, Table} from "antd";
import { UnorderedListOutlined } from '@ant-design/icons';

const fib = [
    [
        0,1,2,3,5,8,13,21,34,55,89,"?"
    ]
]

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        vote: 5
    },
    {
        key: '2',
        name: 'John',
        vote: 5
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Vote',
        dataIndex: 'vote',
        key: 'vote',
    },
];

class ProjectSppPokerPlay extends React.Component {

    render() {
        return(
            <div>
                <div><span>All Poker Rooms</span><span>{`${" > "}`}</span><span style={{fontWeight: 'bold'}}>New Poker Room</span></div>
                <br/>
                <div></div>
                <br/>
                <div>
                    <div>
                        {/*<div className={'user-story-display'}>*/}
                        {/*    <div className={'btn-panel'}>*/}
                        {/*        <Button type={'text'}><UnorderedListOutlined /></Button>*/}
                        {/*    </div>*/}
                        {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi corporis, eius expedita in minima quasi reprehenderit. Eligendi et praesentium saepe sed sunt. Aut beatae, commodi ex hic laborum molestias!*/}
                        {/*</div>*/}
                        <div className={'user-story-display'}>
                            <div className={'btn-panel'}>
                                <Button type={'text'}><UnorderedListOutlined /></Button>
                            </div>
                            <div className={'btn-panel-2'}>
                                <Button type={'primary'}>Start</Button>
                            </div>
                        </div>
                    </div>
                    <div className={'poker-card-panel'}>
                        <span className={"poker-card"}>1</span>
                        <span className={"poker-card select-poker-card"}>2</span>
                        <span className={"poker-card"}>3</span>
                        <span className={"poker-card"}>5</span>
                        <span className={"poker-card"}>8</span>
                    </div>
                    <div className={'vote-display'}>
                        <div className={'vote-display-row'}>
                            <span className={'item'}>
                                <span className={'card'}>1</span>
                                <span>-</span>
                                <span>2</span>
                            </span>
                            <span className={'item'}>
                                <span className={'card'}>1</span>
                                <span>-</span>
                                <span>2</span>
                            </span>
                            <span className={'item'}>
                                <span className={'card'}>1</span>
                                <span>-</span>
                                <span>2</span>
                            </span>
                            <span className={'item'}>
                                <span className={'card'}>1</span>
                                <span>-</span>
                                <span>2</span>
                            </span>
                            <span className={'item'}>
                                <span className={'card'}>1</span>
                                <span>-</span>
                                <span>2</span>
                            </span>
                            <span className={'item-2'}>
                                <Button type={'primary'}>Save</Button>
                            </span>
                            <span className={'item-2'}>
                                <Button type={'primary'}>Retry</Button>
                            </span>
                        </div>
                        <div className={'vote-display-tbl'}>
                            <Table dataSource={dataSource} columns={columns} />
                        </div>
m
                    </div>
                </div>
            </div>
        );
    }

}

export default ProjectSppPokerPlay;
