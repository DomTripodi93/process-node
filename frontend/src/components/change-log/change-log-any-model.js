import React, { useState, useEffect } from 'react';
import SingleDepartment from '../process/department/single-department';
import SingleObjective from '../process/objective/single-objective';
import SingleStep from '../process/step/single-step';
import SingleBestPractice from '../process/best-practice/single-best-practice';
import SingleCommonDifficulty from '../process/common-difficulty/single-common-difficulty';
import SingleScheduleBlock from '../schedule/schedule/single-schedule-block';


const ChangeLogAnyModel = props => {
    const [values, setValues] = useState([]);

    useEffect(()=>{
        let oldVal = JSON.parse(props.data[0]);
        let newVal = "Deleted";
        if (props.data[1] !== newVal){
            newVal = JSON.parse(props.data[1]);
        }
        setValues([oldVal, newVal])
    },[props])

    const displayModels = {
        department: (value) => {return(<SingleDepartment department={value} change={true}/>)},
        objective: (value) => {return(<SingleObjective objective={value} change={true}/>)},
        step: (value) => {return(<SingleStep step={value} change={true}/>)},
        bestPractice: (value) => {return(<SingleBestPractice bestPractice={value} change={true}/>)},
        commonDifficulty: (value) => {return(<SingleCommonDifficulty commonDifficulty={value} change={true}/>)},
        schedule: (value) => {return(<SingleScheduleBlock scheduledTask={value}/>)},
    }

    return(
        <div className="grid50">
            {values.length > 0 ?
                <div className="centered">
                    From:
                    {displayModels[props.model](values[0])}
                </div>
                :
                null
            }
            {values.length > 0 ?
                <div className="centered">
                    To:
                    {values[1] === "Deleted" ?
                        <h3>
                            Deleted
                        </h3>
                        :
                        <div>
                            {displayModels[props.model](values[1])}
                        </div>
                    }
                </div>
                :
                null
            }
        </div>
    )
}

export default ChangeLogAnyModel;