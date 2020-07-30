import React, { useState } from "react";
import CustomButton from '../../../shared/elements/button/custom-button.component';


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
                <div className="border grid-user-button">
                    {detailsShown[step._id] ?
                        <div>
                        </div>
                        :
                        <div key={step._id} className="grid50">
                            <h5>
                                Step# {step.stepNumber} - {step.name}
                            </h5>
                            <h5>
                                Goal: {step.goal}
                            </h5>
                        </div>
                    }
                    <div className="grid100">
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