import React from 'react';
import helpers from '../../../shared/helpers';


const SingleScheduleBlock = props => {
    const helper = new helpers();
    const time = helper.timeForDisplay(helper.timeFromDate(props.scheduledTask.date));
    return (
        <div className="border">
            <h5>
                Employee: {props.scheduledTask.employeeId.substring(19)}<br/>
                {props.scheduledTask.employeeName}
            </h5>
            <h5>
                Scheduled Time: {time}
            </h5>
            <h5>
                Department: {props.scheduledTask.deptName}
            </h5>
            <h5>
                Objective: {props.scheduledTask.objectiveName}
            </h5>
            <h5>
                Status: {props.scheduledTask.status}
            </h5>
        </div>
    )
}

export default SingleScheduleBlock;