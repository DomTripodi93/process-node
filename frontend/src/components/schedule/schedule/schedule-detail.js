import React from "react";

const ScheduleDetail = props => {
    console.log(props.objectives)
    console.log(props.steps)
    console.log(props.commonDifficulties)
    console.log(props.bestPractices)
    return(
        <div className="inner-border-left">
            <h4>{props.scheduledTask.deptName} - {props.scheduledTask.objectiveName}</h4>
        </div>
    )
}

export default ScheduleDetail;