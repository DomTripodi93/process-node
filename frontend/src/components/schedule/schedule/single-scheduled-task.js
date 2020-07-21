import React from 'react';
import helpers from '../../../shared/helpers';
import { Link } from 'react-router-dom';


const SingleScheduledTask = props => {
    const helper = new helpers();
    const time = helper.timeForDisplay(helper.timeFromDate(props.scheduledTask.date));
    return (
        <div>
            {props.employeeId ?
                <div className="grid-one-employee">
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
                    <Link
                        to={
                            "/objective/" +
                            props.scheduledTask.deptName + "/" +
                            props.scheduledTask.objectiveName
                        }
                        className="inner-border-left">
                        <h5 className="grid-text">
                            {props.scheduledTask.objectiveName}
                        </h5>
                    </Link>
                </div>
                :
                <div className="grid-all-employees">
                    <Link
                        to={
                            "/day/" +
                            props.scheduledTask.employeeId + "/" +
                            props.month + "/" +
                            props.day + "/" +
                            props.year
                        }
                        className="inner-border-left">
                        <h5 className="grid-text">
                            {props.scheduledTask.employeeId} - {props.scheduledTask.employeeName}
                        </h5>
                    </Link>
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
                    <Link
                        to={
                            "/objective/" +
                            props.scheduledTask.deptName + "/" +
                            props.scheduledTask.objectiveName
                        }
                        className="inner-border-left">
                        <h5 className="grid-text">
                            {props.scheduledTask.objectiveName}
                        </h5>
                    </Link>
                </div>
            }
        </div>
    )
}

export default SingleScheduledTask;