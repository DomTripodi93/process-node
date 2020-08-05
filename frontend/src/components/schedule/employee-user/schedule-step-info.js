import React from "react";

const ScheduleStepInfo = props => {
    return(
        <div className="inner-border-left-header">
            <div className="grid50">
                <h5>
                    Step# {props.step.stepNumber} - {props.step.name}
                </h5>
                <h5>
                    Goal: {props.step.goal}
                </h5>
            </div>
            <div className="grid50 top-border">
                <div className="right-inner-border">
                    <h5 className="closed-in">
                        Best Practices
                        <div className="grid50">
                            <h4 className="bottom-border">
                                Practice
                            </h4>
                            <h4 className="bottom-border">
                                Purpose
                            </h4>
                        </div>
                        {props.bestPractices.map(practice => (
                            <div key={practice._id} className="grid50">
                                <h5 className="bottom-border">
                                    {practice.practice}
                                </h5>
                                <h5 className="bottom-border">
                                    {practice.purpose}
                                </h5>
                            </div>
                        ))}
                    </h5>
                </div>
                <div className="left-inner-border">
                    <h5 className="closed-in">
                        Common Difficulties
                        <div className="grid50">
                            <h4 className="bottom-border">
                                Difficulty
                            </h4>
                            <h4 className="bottom-border">
                                Solution
                            </h4>
                        </div>
                        {props.commonDifficulties.map(difficulty => (
                            <div key={difficulty._id} className="grid50">
                                <h5 className="bottom-border">
                                    {difficulty.difficulty}
                                </h5>
                                <h5 className="bottom-border">
                                    {difficulty.solution}
                                </h5>
                            </div>
                        ))}
                    </h5>
                </div>
            </div>        
        </div>
    )
}

export default ScheduleStepInfo;