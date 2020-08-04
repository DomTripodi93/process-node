import React, { useState } from "react";
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ScheduleStepInfo from './schedule-step-info';


const ScheduleSteps = props => {
    const [detailsShown, setDetailsShown] = useState({})

    const detailsVisible = (id) => {
        let detailHold = { ...detailsShown };
        detailHold[id] = !detailHold[id];
        setDetailsShown(detailHold);
    }

    return (
        <div>
            {props.steps.map(step => (
                <div key={step._id} className="grid-user-button size-holder middle">
                    {detailsShown[step._id] ?
                        <ScheduleStepInfo 
                            bestPractices={props.bestPractices[step.deptName + "&" + step.objectiveName + "&" + step.stepNumber]}
                            commonDifficulties={props.commonDifficulties[step.deptName + "&" + step.objectiveName + "&" + step.stepNumber]}
                            step={step} />
                        :
                        <div className="grid50 inner-border-left-header border-back">
                            <h5 className="border-back">
                                Step# {step.stepNumber} - {step.name}
                            </h5>
                            <h5>
                                Goal: {step.goal}
                            </h5>
                        </div>
                    }
                    <div className="grid100 inner-border-right">
                        {detailsShown[step._id] ?
                            <CustomButton
                                action={() => detailsVisible(step._id)}
                                label="&#x25B3;"
                                buttonStyle="mini"
                            />
                            :
                            <CustomButton
                                action={() => detailsVisible(step._id)}
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

export default ScheduleSteps;