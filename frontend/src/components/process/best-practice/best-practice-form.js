import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addBestPractice, updateBestPractice } from '../../../reducers/process/best-practice/best-practice.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';


const BestPracticeForm = props => {
    const [bestPracticeInfo, setBestPracticeInfo] = useState({
        deptName: props.deptName,
        objectiveName: props.objectiveName,
        stepNumber: props.stepNumber,
        practice: '',
        method: '',
        purpose: ''
    });

    const { practice, method, purpose } = bestPracticeInfo;

    useEffect(() => {
        if (props.editMode) {
            Object.keys(props.bestPracticeInput).forEach(key => {
                if (props.bestPracticeInput[key] !== null) {
                    setBestPracticeInfo({ [key]: props.bestPracticeInput[key] });
                }
            })
            setBestPracticeInfo(props.bestPracticeInput);
        }
    }, [props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode) {
            if (bestPracticeInfo !== props.bestPracticeInput) {
                props.updateBestPractice(bestPracticeInfo, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addBestPractice(bestPracticeInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setBestPracticeInfo({ ...bestPracticeInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a Best Practice
                </h3>
                :
                <h3 className='centered'>
                    {props.bestPracticeInput.practice}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Practice'
                    type='text'
                    name='practice'
                    value={practice}
                    onChange={handleChange}
                />
                <FormInput
                    label='Method'
                    type='text'
                    name='method'
                    value={method}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Purpose'
                    type='text'
                    name='purpose'
                    value={purpose}
                    onChange={handleChange}
                    required
                />
                <div className="grid50">
                    {!props.editMode ?
                        <CustomButton
                            buttonStyle="blue"
                            type="submit"
                            label="Add"
                        />
                        :
                        <CustomButton
                            buttonStyle="blue"
                            type="submit"
                            label="Update"
                        />
                    }
                    <CustomButton
                        buttonStyle="red"
                        action={props.callback}
                        label="Cancel"
                    />
                </div>
            </form>
        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    addBestPractice: (bestPractice, callback) => {
        dispatch(addBestPractice(bestPractice, callback))
    },
    updateBestPractice: (bestPractice, callback) => {
        dispatch(updateBestPractice(bestPractice, callback))
    }
});

export default connect(null, mapDispatchToProps)(BestPracticeForm);