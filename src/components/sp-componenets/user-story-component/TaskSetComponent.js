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

    updateTaskStatus = (taskId, status) => {
        this.props.updateTaskStatus(taskId, status);
    }

    render() {

        let { tasks } = this.props;

        // task progress calculation
        let tasksCount = tasks.length;
        let doneTasksCount = 0;
        tasks.map((result, index)=>{
            if(result.statusType=="COMPLETED") {
                doneTasksCount = doneTasksCount + 1;
            }
        });
        let donePercentage = ((doneTasksCount/tasksCount)*100);

        console.log("Prasentage: ", donePercentage);

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
                        percent={ donePercentage }
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
                            <Task task={r} createTask={this.createTask} updateTask={this.updateTask} memberModal={this.memberModal} updateTaskStatus={this.updateTaskStatus} />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default TaskSetComponent
