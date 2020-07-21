import React from 'react';
import SingleStep from './single-step';

const Steps = props => {
    return (
        <div>
            {props.steps.length > 0 ?
                <div>
                    <div className='grid50'>
                        {props.steps.map(step => (
                            <div
                                key={step.stepNumber}
                            >
                                <SingleStep
                                    step={step}
                                    deptName={props.deptName}
                                    objectiveName={props.objectiveName}
                                    inDept={true} />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any steps!
                    </h4>
                    <h4 className="spaced">
                        Add some steps using the button above to see them here.
                    </h4>
                </div>
            }
        </div>
    )
}


export default Steps;