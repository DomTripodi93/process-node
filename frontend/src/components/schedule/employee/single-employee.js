import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import { Link } from 'react-router-dom';
import EmployeeForm from './employee-form';
import { deleteEmployee } from '../../../reducers/schedule/employee/employee.actions';
import { connect } from 'react-redux';
import EmployeePasswordUpdate from './employee-password-update';


const SingleEmployee = props => {
    const [editMode, updateEditMode] = useState(false);
    const [editPassword, updateEditPassword] = useState(false);

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const setEditPassword = () => {
        updateEditMode(!editMode)
        updateEditPassword(!editMode)
    }

    const handleDelete = () => {
        if (props.employee.id !== 1) {
            if (window.confirm(
                "Are you sure you want to delete this employee: " + props.employee.name + "?"
            )) {
                props.deleteEmployee(props.employee.id);
            }
        } else {
            window.alert(
                "Cannot delete account owner, to replace account owner, " +
                "change name of employee with id of 1"
            )
        }
    }

    return (
        <div>
            <div className='border centered'>
                {!editMode ?
                    <div>
                        <h3>{props.employee.id.substring(19)}: {props.employee.name}</h3>
                        <hr/>
                        {props.employee.email ?
                            <h4>Email: {props.employee.email}</h4>
                            :
                            null
                        }
                        {props.employee.title ?
                            <h4>Title: {props.employee.title}</h4>
                            :
                            null
                        }
                        {props.employee.deptName ?
                            <h4>Department: {props.employee.deptName}</h4>
                            :
                            null
                        }
                        {props.employee.id !== props.rootId ?
                            <div className="grid50">
                                <CustomButton action={setEditMode} buttonStyle="blue" label="Edit" />
                                <CustomButton action={handleDelete} buttonStyle="red" label="Delete" />
                            </div>
                            :
                            <div className="grid100">
                                <CustomButton action={setEditMode} buttonStyle="blue" label="Edit" />
                            </div>
                        }
                    </div>
                    :
                    <div>
                        {editPassword ?
                            <EmployeePasswordUpdate
                                email={props.employee.email}
                                callback={setEditPassword} />
                            :
                            <EmployeeForm
                                deptOptions={props.deptOptions}
                                editMode={true}
                                employeeInput={props.employee}
                                callback={setEditMode} />
                        }
                    </div>
                }
            </div>
            {!props.inFull ?
                <div className="grid100 spaced">
                    <Link to={'schedule/' + props.employee.id} className='grid100'>
                        <CustomButton
                            buttonStyle='green'
                            label="View Schedule" />
                    </Link>
                    <br />
                    <CustomButton
                        buttonStyle='orange'
                        label="Update Password"
                        action={setEditPassword} />
                </div>
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteEmployee: (id) => dispatch(deleteEmployee(id))
    }
}


export default connect(null, mapDispatchToProps)(SingleEmployee);