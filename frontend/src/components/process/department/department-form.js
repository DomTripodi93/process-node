import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addDepartment, updateDepartment } from '../../../reducers/process/department/department.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';


const DepartmentForm = props => {
    const [departmentInfo, setDepartmentInfo] = useState({
        deptName: '',
        funcName: '',
    });

    const { deptName, funcName } = departmentInfo;

    useEffect(() => {
        if (props.editMode) {
            Object.keys(props.departmentInput).forEach(key => {
                if (props.departmentInput[key] !== null) {
                    setDepartmentInfo({ [key]: props.departmentInput[key] });
                }
            })
            setDepartmentInfo(props.departmentInput);
        }
    }, [props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode) {
            if (departmentInfo !== props.departmentInput) {
                props.updateDepartment(departmentInfo, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addDepartment(departmentInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setDepartmentInfo({ ...departmentInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a Department
                </h3>
                :
                <h3 className='centered'>
                    {props.departmentInput.deptName}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                {!props.editMode ?
                    <FormInput
                        label='Department Name'
                        type='deptName'
                        name='deptName'
                        value={deptName}
                        onChange={handleChange}
                    />
                    :
                    null
                }
                <FormInput
                    label='Function'
                    type='funcName'
                    name='funcName'
                    value={funcName}
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
    addDepartment: (department, callback) => {
        dispatch(addDepartment(department, callback))
    },
    updateDepartment: (department, callback) => {
        dispatch(updateDepartment(department, callback))
    }
});


export default connect(null, mapDispatchToProps)(DepartmentForm);