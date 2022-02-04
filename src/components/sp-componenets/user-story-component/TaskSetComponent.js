import React from "react";
import Task from "./TaskComponent";
import {Button, Progress} from "antd";
import './task-set.scss'

class TaskSetComponent extends React.Component{

    createTask = (lbl, title) => {
        this.props.createTask(lbl, title)
    }

    updateTask = (taskId, lbl, title) => {
        this.props.updateTask(taskId, lbl, title)
    }

    memberModal = (taskId) => {
        this.props.handleMembers(taskId);
    }

    render() {

        let { tasks } = this.props;

        console.log("TASK-LIST: ", tasks);

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
                    <Button
                        onClick={()=>{this.createTask(null, null)}}
                    >New Task</Button>
                    <div className={'title'}>
                        Tasks
                    </div>
                    {
                        tasks.map((r, i)=>
                            <Task task={r} createTask={this.createTask} updateTask={this.updateTask} memberModal={this.memberModal} />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default TaskSetComponent
