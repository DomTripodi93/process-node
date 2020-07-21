import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import BestPracticeForm from './best-practice-form';
import { deleteBestPractice } from '../../../reducers/process/best-practice/best-practice.actions';
import { connect } from 'react-redux';

const SingleBestPractice = props => {
    const [editMode, updateEditMode] = useState(false);

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
            "Are you sure you want to delete this bestPractice: " +
            props.bestPractice.practice + ": " +
            props.bestPractice.name + "?"
        )) {
            props.deleteBestPractice(
                props.bestPractice.id
            );
        }
    }

    return (
        <div>
            <div className='border-practice centered'>
                {!editMode ?
                    <div>
                        <h3>{props.bestPractice.practice}</h3>
                        {props.bestPractice.method ?
                            <h4>Method: <br /> {props.bestPractice.method}</h4>
                            :
                            null
                        }
                        {props.bestPractice.purpose ?
                            <h4>Purpose: <br /> {props.bestPractice.purpose}</h4>
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
                    <BestPracticeForm
                        editMode={true}
                        inDept={props.inDept}
                        bestPracticeInput={props.bestPractice}
                        callback={setEditMode} />
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBestPractice: (practice, objectiveName, deptName) => dispatch(deleteBestPractice(practice, objectiveName, deptName))
    }
}

export default connect(null, mapDispatchToProps)(SingleBestPractice);