import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import DepartmentForm from './department-form';
import { deleteDepartment } from '../../../reducers/process/department/department.actions';
import { connect } from 'react-redux';
import ObjectiveContainer from '../../../containers/process/objective-container';



const SingleDepartment = props => {
    const [editMode, updateEditMode] = useState(false);

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
            "Are you sure you want to delete this department: " + props.department.deptName + "?"
        )) {
            props.deleteDepartment(props.department.deptName);
        }
    }

    return (
        <div>
            <div className='border centered'>
                {!editMode ?
                    <div>
                        <h3>{props.department.deptName}</h3>
                        {props.department.funcName ?
                            <h4>Function: {props.department.funcName}</h4>
                            :
                            null
                        }
                        <div className="grid50">
                            <CustomButton action={setEditMode} buttonStyle="blue" label="Edit" />
                            <CustomButton action={handleDelete} buttonStyle="red" label="Delete" />
                        </div>
                    </div>
                    :
                    <DepartmentForm editMode={true} departmentInput={props.department} callback={setEditMode} />
                }
            </div>
            <br />
            <ObjectiveContainer deptName={props.department.deptName} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteDepartment: (id) => dispatch(deleteDepartment(id))
    }
}

export default connect(null, mapDispatchToProps)(SingleDepartment);