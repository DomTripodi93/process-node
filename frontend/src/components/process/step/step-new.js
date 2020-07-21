import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import StepForm from './step-form';

const StepNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div>
                    <div className='border'>
                        <StepForm
                            deptName={props.deptName}
                            objectiveName={props.objectiveName}
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
                            label="Add Step"
                            action={props.action}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default StepNew;