import React from "react";

const ScheduleNone = props => {
    return(
        <div className="border centered">
            {props.employeeId ?
                <h4 className="spaced">
                    You currently don't have any scheduled tasks
                    for {props.employeeMap[props.employeeId]} on {props.month}
                    -{props.day}-{props.year}!
                </h4>
                :
                <h4 className="spaced">
                    You currently don't have any scheduled tasks
                    for {props.month}-{props.day}-{props.year}!
                </h4>
            }
            <h4 className="spaced">
                Add some scheduled tasks using the button above to
                see them here.
            </h4>
        </div>
    )
}

export default ScheduleNone;