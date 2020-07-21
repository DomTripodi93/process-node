import React from 'react';
import SingleObjective from './single-objective';

const Objectives = props => {
    return (
        <div>
            {props.objectives.length > 0 ?
                <div>
                    <div className='grid50'>
                        {props.objectives.map(objective => (
                            <div
                                key={objective.objectiveName}
                            >
                                <SingleObjective
                                    objective={objective}
                                    deptName={props.deptName}
                                    inDept={true} />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any objectives!
                    </h4>
                    <h4 className="spaced">
                        Add some objectives using the button above to see them here.
                    </h4>
                </div>
            }
        </div>
    )
}


export default Objectives;