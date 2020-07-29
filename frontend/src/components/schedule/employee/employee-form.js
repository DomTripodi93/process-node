import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addEmployee, updateEmployee } from '../../../reducers/schedule/employee/employee.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';
import FormSelect from '../../../shared/elements/form-select/form-select.component';


const EmployeeForm = props => {
    const [employeeInfo, setEmployeeInfo] = useState({
        name: '',
        email: '',
        password: '',
        deptName: 'None',
        canEdit: false,
        title: '',
        rootId: props.rootId
    });
    const { name, email, password, deptName, canEdit, title } = employeeInfo;
    const deptOptions = props.deptOptions;
    const editOptions = [
        {
            value: true,
            label: "True"
        },
        {
            value: false,
            label: "False"
        }
    ];

    useEffect(() => {
        if (props.editMode) {
            let employeeInfoUpdate = {};
            Object.keys(props.employeeInput).forEach(key => {
                if (props.employeeInput[key]) {
                    employeeInfoUpdate[key] = props.employeeInput[key];
                    setEmployeeInfo(employeeInfo => {
                        return { ...employeeInfo, ...employeeInfoUpdate }
                    });
                }
            })
        }
    }, [props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode) {
            if (employeeInfo !== props.employeeInput) {
                props.updateEmployee(employeeInfo, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addEmployee(employeeInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setEmployeeInfo({ ...employeeInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add an Employee
                </h3>
                :
                <h3 className='centered'>
                    {props.employeeInput.id}: {props.employeeInput.name}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Name'
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Email'
                    type='text'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    required
                />
                {!props.editMode ?
                    <FormInput
                        label='Password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    :
                    null
                }
                <FormSelect
                    label="Department"
                    name='deptName'
                    value={deptName}
                    options={deptOptions}
                    onChange={handleChange}
                />
                <FormSelect
                    label="Admin"
                    name='canEdit'
                    value={canEdit}
                    options={editOptions}
                    onChange={handleChange}
                />
                <FormInput
                    label='Job Title'
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleChange}
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
    addEmployee: (employee, callback) => {
        dispatch(addEmployee(employee, callback))
    },
    updateEmployee: (employee, callback) => {
        dispatch(updateEmployee(employee, callback))
    }
});

const mapStateToProps = state => ({
    rootId: state.user.rootId
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);