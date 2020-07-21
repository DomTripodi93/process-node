import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addCommonDifficulty, updateCommonDifficulty } from '../../../reducers/process/common-difficulty/common-difficulty.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';


const CommonDifficultyForm = props => {
    const [commonDifficultyInfo, setCommonDifficultyInfo] = useState({
        deptName: props.deptName,
        objectiveName: props.objectiveName,
        stepNumber: props.stepNumber,
        difficulty: '',
        cause: '',
        solution: ''
    });

    const { difficulty, cause, solution } = commonDifficultyInfo;

    useEffect(() => {
        if (props.editMode) {
            Object.keys(props.commonDifficultyInput).forEach(key => {
                if (props.commonDifficultyInput[key] !== null) {
                    setCommonDifficultyInfo({ [key]: props.commonDifficultyInput[key] });
                }
            })
            setCommonDifficultyInfo(props.commonDifficultyInput);
        }
    }, [props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode) {
            if (commonDifficultyInfo !== props.commonDifficultyInput) {
                props.updateCommonDifficulty(commonDifficultyInfo, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addCommonDifficulty(commonDifficultyInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setCommonDifficultyInfo({ ...commonDifficultyInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a CommonDifficulty
                </h3>
                :
                <h3 className='centered'>
                    {props.commonDifficultyInput.difficulty}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Difficulty'
                    type='text'
                    name='difficulty'
                    value={difficulty}
                    onChange={handleChange}
                />
                <FormInput
                    label='Cause'
                    type='text'
                    name='cause'
                    value={cause}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Solution'
                    type='text'
                    name='solution'
                    value={solution}
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
    addCommonDifficulty: (commonDifficulty, callback) => {
        dispatch(addCommonDifficulty(commonDifficulty, callback))
    },
    updateCommonDifficulty: (commonDifficulty, callback) => {
        dispatch(updateCommonDifficulty(commonDifficulty, callback))
    }
});

export default connect(null, mapDispatchToProps)(CommonDifficultyForm);