import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import DepartmentForm from './department-form';

const DepartmentNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div className='border'>
                    <DepartmentForm
                        callback={props.action}
                        editMode={false} />
                </div>
                :
                <div className='top'>
                    <CustomButton
                        buttonStyle="blue"
                        label="Add Department"
                        action={props.action}
                    />
                </div>
            }
        </div>
    )
}

export default DepartmentNew;