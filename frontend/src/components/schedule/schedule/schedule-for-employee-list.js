import React from "react";
import SingleScheduledTask from './single-scheduled-task';
import CustomButton from '../../../shared/elements/button/custom-button.component';

const ScheduleForEmployeeList = props => {
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
                    <SingleScheduledTask
                        objectives={props.objectives}
                        scheduledTask={scheduledTask}
                        employeeId="X"
                        year={props.year}
                        month={props.month}
                        day={props.day}
                        className='sized30' />
                    <div className="grid50-colapse inner-border-right">
                        dropdown
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ScheduleForEmployeeList;