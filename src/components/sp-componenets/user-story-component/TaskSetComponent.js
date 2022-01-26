import React from "react";
import Task from "./TaskComponent";
import {Progress} from "antd";
import './task-set.scss'

class TaskSetComponent extends React.Component{
    render() {
        return(
            <div className={'sp-task-set'}>
                <div className={'sp-task-set-progress'}>
                    <div className={'title'}>
                        Progress
                    </div>
                    <Progress
                        strokeColor={{
                            '0%': '#AB47BC',
                            '100%': '#304FFE',
                        }}
                        percent={59.9}
                    />
                </div>
                <br/>
                <div className={'sp-task-set-tasks'}>
                    <div className={'title'}>
                        Tasks
                    </div>
                    <Task/>
                    <Task/>
                    <Task/>
                    <Task/>
                </div>
            </div>
        )
    }
}

export default TaskSetComponent
