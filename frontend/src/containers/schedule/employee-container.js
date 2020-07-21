import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../reducers/schedule/employee/employee.actions';
import EmployeeNew from '../../components/schedule/employee/employee-new';
import Employees from '../../components/schedule/employee/employees';
import { fetchDepartments } from '../../reducers/process/department/department.actions';

import './schedule.styles.scss';


const EmployeeContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const deptOptions = [{ value: 'None', label: 'None' }];

    props.departments.forEach(department => {
        deptOptions.push({
            value: department.deptName,
            label: department.deptName
        });
    })

    useEffect(() => {
        if (!props.employeesCalled) {
            props.fetchEmployees();
            if (!props.deptCalled) {
                props.fetchDepartments();
            }
        }
    }, [props]);

    const showEmployeeForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <EmployeeNew
                deptOptions={deptOptions}
                addMode={addMode}
                action={showEmployeeForm} />
            <h2 className='centered'>Employees</h2>
            <Employees
                deptOptions={deptOptions}
                employees={props.employees} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchEmployees: () => dispatch(fetchEmployees()),
        fetchDepartments: () => dispatch(fetchDepartments())
    }
}

const mapStateToProps = state => ({
    employees: state.employee.employees,
    employeesCalled: state.employee.called,
    departments: state.department.departments,
    deptCalled: state.department.called
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);