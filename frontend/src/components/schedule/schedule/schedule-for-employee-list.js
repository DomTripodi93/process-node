import React, { useState } from "react";
import SingleScheduledTask from './single-scheduled-task';
import CustomButton from '../../../shared/elements/button/custom-button.component';

const ScheduleForEmployeeList = props => {
    const [detailsShown, setDetailsShown] = useState({})
    
    const detailsVisible = (id) => {
        let detailHold = {...detailsShown};
        detailHold[id] = !detailHold[id];
        setDetailsShown(detailHold);
    }

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
                        {detailsShown[scheduledTask._id] ?
                            <CustomButton
                                action={()=> detailsVisible(scheduledTask._id)}
                                label="&#x25B3;"
                                buttonStyle="mini"
                            />
                            :
                            <CustomButton
                                action={()=> detailsVisible(scheduledTask._id)}
                                label="&#x25BD;"
                                buttonStyle="mini"
                            />
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ScheduleForEmployeeList;