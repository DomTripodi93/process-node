import React from "react";
import SingleScheduledTask from './single-scheduled-task';
import CustomButton from '../../../shared/elements/button/custom-button.component';

const ScheduleList = props => {
    return(
        <div>
            <div className="grid-all-employees-button size-holder middle">
                <div className="grid-all-employees">
                    <div className="inner-border-left-header">
                        <h5 className="grid-header-text">Employee</h5>
                    </div>
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
                    className="grid-all-employees-button size-holder middle">
                    <SingleScheduledTask
                        objectives={props.objectives}
                        scheduledTask={scheduledTask}
                        employeeMap={props.employeeMap}
                        employeeId={props.employeeId}
                        year={props.year}
                        month={props.month}
                        day={props.day}
                        className='sized30' />
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
                </div>
            ))}
        </div>
    )
}

export default ScheduleList;