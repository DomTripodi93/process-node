import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import CommonDifficultyForm from './common-difficulty-form';

const CommonDifficultyNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div>
                    <div className='border'>
                        <CommonDifficultyForm
                            deptName={props.deptName}
                            objectiveName={props.objectiveName}
                            stepNumber={props.stepNumber}
                            callback={props.action}
                            editMode={false} />
                    </div>
                    <br />
                </div>
                :
                <div className='full-button'>
                    <div className='grid100'>
                        <CustomButton
                            buttonStyle="blue round"
                            label="Add Common Difficulty"
                            action={props.action}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default CommonDifficultyNew;