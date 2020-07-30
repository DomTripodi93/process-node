import React from "react";
import SingleScheduledTask from './single-scheduled-task';
import CustomButton from '../../../shared/elements/button/custom-button.component';

const ScheduleEmployeeList = props => {
    const listItem = (scheduledTask) => (
        <SingleScheduledTask
            objectives={props.objectives}
            scheduledTask={scheduledTask}
            employeeMap={props.employeeMap}
            employeeId={props.employeeId}
            year={props.year}
            month={props.month}
            day={props.day}
            isRoot={props.isRoot} />
    )

    return(
        <div>
            <div className="grid-one-employee-button size-holder middle">
                <div className="grid-one-employee">
                    <div className="inner-border-left-header">
                        <h5 className="grid-header-text">Time</h5>
                    </div>
                    <div className="inner-border-left-header">
                        <h5 className="grid-header-text">Department</h5>
                    </div>
                    <div className="inner-border-left-header">
                        <h5 className="grid-header-text">Objective</h5>
                    </div>
                </div>
                <div className="inner-border-right-header"></div>
            </div>
            {props.scheduledTasks.map(scheduledTask => (
                <div
                    key={scheduledTask._id}
                    className="grid-one-employee-button size-holder middle">
                    {scheduledTask.status === "Scheduled" ?
                        <div className="orange-back">
                            {listItem(scheduledTask)}
                        </div>
                        :
                        <div>
                            {scheduledTask.status === "Read" ?
                                <div className="blue-back">
                                    {listItem(scheduledTask)}
                                </div>
                                :
                                <div className="green-back">
                                    {listItem(scheduledTask)}
                                </div>
                            }
                        </div>
                    }
                    {scheduledTask.status === "Scheduled" ?
                        <div className="grid50-colapse inner-border-right">
                            <CustomButton
                                buttonStyle="blue small"
                                action={() => { props.handleEdit(scheduledTask) }}
                                label="Edit" />
                            <CustomButton
                                buttonStyle="red small"
                                action={() => { props.handleDelete(scheduledTask) }}
                                label="Delete" />
                        </div>
                        :
                        <div className="grid100 inner-border-right">
                            <CustomButton
                                buttonStyle="red small"
                                action={() => { props.handleDelete(scheduledTask) }}
                                label="Delete" />
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default ScheduleEmployeeList;