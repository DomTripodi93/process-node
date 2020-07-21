import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addStep, updateStep, updateSingleStep } from '../../../reducers/process/step/step.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';


const StepForm = props => {
    const [stepInfo, setStepInfo] = useState({
        deptName: props.deptName,
        objectiveName: props.objectiveName,
        stepNumber: '',
        name: '',
        goal: ''
    });

    const { stepNumber, name, goal } = stepInfo;

    useEffect(() => {
        if (props.editMode) {
            Object.keys(props.stepInput).forEach(key => {
                if (props.stepInput[key] !== null) {
                    setStepInfo({ [key]: props.stepInput[key] });
                }
            })
            setStepInfo(props.stepInput);
        }
    }, [props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode && stepInfo !== props.stepInput) {
            if (props.inDept) {
                props.updateStep(stepInfo, props.callback);
            } else {
                props.updateSingleStep(stepInfo, props.callback);
            }
        } else if (!props.editMode) {
            props.addStep(stepInfo, props.callback);
        } else {
            props.callback();
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setStepInfo({ ...stepInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a Step
                </h3>
                :
                <h3 className='centered'>
                    {props.stepInput.stepNumber}: {props.stepInput.name}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                {!props.editMode ?
                    <FormInput
                        label='Step Number'
                        type='text'
                        name='stepNumber'
                        value={stepNumber}
                        onChange={handleChange}
                    />
                    :
                    null
                }
                <FormInput
                    label='Name'
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Goal'
                    type='text'
                    name='goal'
                    value={goal}
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
    addStep: (step, callback) => {
        dispatch(addStep(step, callback))
    },
    updateStep: (step, callback) => {
        dispatch(updateStep(step, callback))
    },
    updateSingleStep: (step, callback) => {
        dispatch(updateSingleStep(step, callback))
    }
});

export default connect(null, mapDispatchToProps)(StepForm);