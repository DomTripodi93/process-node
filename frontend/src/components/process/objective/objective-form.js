import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addObjective, updateObjective, updateSingleObjective } from '../../../reducers/process/objective/objective.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';


const ObjectiveForm = props => {
    const [objectiveInfo, setObjectiveInfo] = useState({
        objectiveName: '',
        deptName: props.deptName,
        goal: '',
        time: ''
    });

    const { objectiveName, goal, time } = objectiveInfo;

    useEffect(() => {
        if (props.editMode) {
            Object.keys(props.objectiveInput).forEach(key => {
                if (props.objectiveInput[key] !== null) {
                    setObjectiveInfo({ [key]: props.objectiveInput[key] });
                }
            })
            setObjectiveInfo(props.objectiveInput);
        }
    }, [props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode && objectiveInfo !== props.objectiveInput) {
            if (props.inDept) {
                props.updateObjective(objectiveInfo, props.callback);
            } else {
                props.updateSingleObjective(objectiveInfo, props.callback);
            }
        } else if (!props.editMode) {
            props.addObjective(objectiveInfo, props.callback);
        } else {
            props.callback();
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setObjectiveInfo({ ...objectiveInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a Objective
                </h3>
                :
                <h3 className='centered'>
                    {props.objectiveInput.objectiveName}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                {!props.editMode ?
                    <FormInput
                        label='Objective Name'
                        type='text'
                        name='objectiveName'
                        value={objectiveName}
                        onChange={handleChange}
                    />
                    :
                    null
                }
                <FormInput
                    label='Goal'
                    type='text'
                    name='goal'
                    value={goal}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Time (Hours)'
                    type='number'
                    name='time'
                    value={time}
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
    addObjective: (objective, callback) => {
        dispatch(addObjective(objective, callback))
    },
    updateObjective: (objective, callback) => {
        dispatch(updateObjective(objective, callback))
    },
    updateSingleObjective: (objective, callback) => {
        dispatch(updateSingleObjective(objective, callback))
    }
});

export default connect(null, mapDispatchToProps)(ObjectiveForm);