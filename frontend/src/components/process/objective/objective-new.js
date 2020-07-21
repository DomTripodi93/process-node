import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ObjectiveForm from './objective-form';

const ObjectiveNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div>
                    <div className='border'>
                        <ObjectiveForm
                            deptName={props.deptName}
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
                            label="Add Objective"
                            action={props.action}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default ObjectiveNew;