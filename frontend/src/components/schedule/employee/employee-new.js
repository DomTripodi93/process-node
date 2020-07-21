import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import EmployeeForm from './employee-form';

const EmployeeNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div className='border'>
                    <EmployeeForm
                        deptOptions={props.deptOptions}
                        callback={props.action}
                        editMode={false} />
                </div>
                :
                <div className='top'>
                    <CustomButton
                        buttonStyle="blue"
                        label="Add Employee"
                        action={props.action}
                    />
                </div>
            }
        </div>
    )
}

export default EmployeeNew;