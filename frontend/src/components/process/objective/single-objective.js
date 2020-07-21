import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ObjectiveForm from './objective-form';
import { deleteObjective } from '../../../reducers/process/objective/objective.actions';
import { connect } from 'react-redux';
import StepContainer from '../../../containers/process/step-container';
import { Link } from 'react-router-dom';



const SingleObjective = props => {
    const [editMode, updateEditMode] = useState(false);

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
            "Are you sure you want to delete this objective: " + props.objective.objectiveName + "?"
        )) {
            props.deleteObjective(props.objective.objectiveName, props.deptName);
        }
    }

    return (
        <div>
            <div className='border centered'>
                {!editMode ?
                    <div>
                        {!props.inDept ?
                            <h3>{props.deptName} - {props.objective.objectiveName}</h3>
                            :
                            <h3>{props.objective.objectiveName}</h3>
                        }
                        {props.objective.goal ?
                            <h4>Goal: {props.objective.goal}</h4>
                            :
                            null
                        }
                        {props.objective.time ?
                            <h4>Time: {props.objective.time} Hours</h4>
                            :
                            null
                        }
                        <div className="grid50">
                            <CustomButton
                                action={setEditMode}
                                buttonStyle="blue"
                                label="Edit" />
                            <CustomButton
                                action={handleDelete}
                                buttonStyle="red"
                                label="Delete" />
                        </div>
                    </div>
                    :
                    <ObjectiveForm
                        deptName={props.deptName}
                        editMode={true}
                        inDept={props.inDept}
                        objectiveInput={props.objective}
                        callback={setEditMode} />
                }
            </div>
            {!props.inDept ?
                <div className='size-holder middle'>
                    <StepContainer objectiveName={props.objective.objectiveName} deptName={props.deptName} />
                </div>
                :
                <Link to={'objective/' + props.deptName + '/' + props.objective.objectiveName} className='grid100 spaced'>
                    <CustomButton
                        buttonStyle='green'
                        label="View Objective" />
                </Link>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteObjective: (objectiveName, deptName) => dispatch(deleteObjective(objectiveName, deptName))
    }
}

export default connect(null, mapDispatchToProps)(SingleObjective);