import React from "react";

const ScheduleDetail = props => {
    return(
        <div className="inner-border-left">
            <h4>{props.scheduledTask.deptName} - {props.scheduledTask.objectiveName}</h4>
        </div>
    )
}

export default ScheduleDetail;