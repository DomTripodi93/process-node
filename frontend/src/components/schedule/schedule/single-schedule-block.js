import React from 'react';
import helpers from '../../../shared/helpers';
import { Link } from 'react-router-dom';


const SingleScheduleBlock = props => {
    const helper = new helpers();
    const time = helper.timeForDisplay(helper.timeFromDate(props.scheduledTask.date));
    return (
        <div className="border">
            <h5>
                {props.scheduledTask.employeeId.substring(19)} - {props.scheduledTask.employeeName}
            </h5>
            <div className="inner-border-left">
                <h5 className="grid-text">
                    {time}
                </h5>
            </div>
            <div className="inner-border-left">
                <h5 className="grid-text">
                    {props.scheduledTask.deptName}
                </h5>
            </div>
            <h5 className="grid-text">
                {props.scheduledTask.objectiveName}
            </h5>
        </div>
    )
}

export default SingleScheduleBlock;