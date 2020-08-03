import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateEmployeePassword } from '../../../reducers/schedule/employee/employee.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';


const EmployeePasswordUpdate = props => {
    const [employeeInfo, setEmployeeInfo] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const { email, newPassword, confirmPassword } = employeeInfo;

    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (props.email) {
            setEmployeeInfo(employeeInfo => {
                return { ...employeeInfo, email: props.email }
            });
        }
    }, [props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (employeeInfo.newPassword === employeeInfo.confirmPassword) {
            props.updateEmployeePassword(employeeInfo, props.callback);
        } else {
            setErrorMessage("Passwords must match!")
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setEmployeeInfo({ ...employeeInfo, [name]: value });
    };

    return (
        <div className='middle'>
            <h3 className='centered'>
                Fill out the form below to update password for {props.email}:
            </h3>
            {errorMessage.length > 0 ?
                <h3 className="error spaced">
                    {errorMessage}
                </h3>
                :
                null
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='New Password'
                    type='password'
                    name='newPassword'
                    value={newPassword}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Confirm New Password'
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                />
                <div className="grid50">
                    <CustomButton
                        buttonStyle="blue"
                        type="submit"
                        label="Update"
                    />
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
    updateEmployeePassword: (employee, callback) => {
        dispatch(updateEmployeePassword(employee, callback))
    }
});


export default connect(null, mapDispatchToProps)(EmployeePasswordUpdate);