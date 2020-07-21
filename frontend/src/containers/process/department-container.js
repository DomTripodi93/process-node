import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDepartments } from '../../reducers/process/department/department.actions';
import DepartmentNew from '../../components/process/department/department-new';
import Departments from '../../components/process/department/departments';

import './process.styles.scss';


const DepartmentContainer = (props) => {
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        if (!props.deptCalled) {
            props.fetchDepartments();
        }
    }, [props]);

    const showDepartmentForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <DepartmentNew
                addMode={addMode}
                action={showDepartmentForm} />
            <h2 className='centered'>Departments</h2>
            <br />
            <Departments
                departments={props.departments} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDepartments: () => dispatch(fetchDepartments())
    }
}

const mapStateToProps = state => ({
    departments: state.department.departments,
    deptCalled: state.department.called
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentContainer);