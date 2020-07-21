import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import BestPracticeForm from './best-practice-form';

const BestPracticeNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div>
                    <div className='border'>
                        <BestPracticeForm
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
                            label="Add Best Practice"
                            action={props.action}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default BestPracticeNew;