import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import CommonDifficultyForm from './common-difficulty-form';
import { deleteCommonDifficulty } from '../../../reducers/process/common-difficulty/common-difficulty.actions';
import { connect } from 'react-redux';

const SingleCommonDifficulty = props => {
    const [editMode, updateEditMode] = useState(false);

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
            "Are you sure you want to delete this commonDifficulty: " +
            props.commonDifficulty.difficulty + ": " +
            props.commonDifficulty.name + "?"
        )) {
            props.deleteCommonDifficulty(
                props.commonDifficulty.id
            );
        }
    }

    return (
        <div>
            <div className='border-difficulty centered'>
                {!editMode ?
                    <div>
                        <h3>{props.commonDifficulty.difficulty}</h3>
                        {props.commonDifficulty.cause ?
                            <h4>Cause: <br /> {props.commonDifficulty.cause}</h4>
                            :
                            null
                        }
                        {props.commonDifficulty.solution ?
                            <h4>Solution: <br /> {props.commonDifficulty.solution}</h4>
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
                    <CommonDifficultyForm
                        editMode={true}
                        inDept={props.inDept}
                        commonDifficultyInput={props.commonDifficulty}
                        callback={setEditMode} />
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCommonDifficulty: (difficulty, objectiveName, deptName) => dispatch(deleteCommonDifficulty(difficulty, objectiveName, deptName))
    }
}

export default connect(null, mapDispatchToProps)(SingleCommonDifficulty);