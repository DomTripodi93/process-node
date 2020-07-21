import rootHttp from '../../root-http';
import EmployeeActionTypes from './employee.types';
import helpers from '../../../shared/helpers';


const http = new rootHttp();
const helper = new helpers();


export function fetchEmployees() {
    return dispatch => {
        http.fetchAll("employee/byUser")
            .then((employees) => {
                dispatch(setEmployees(employees));
            });
    }
}
//Gets all employees

export function fetchEmployeesByDepartment(department) {
    return dispatch => {
        http.fetchAll("employee/byDepartment/" + department)
            .then((employees) => {
                dispatch(setEmployees(employees));
            });
    }
}
//Gets all employees for a department

export function addEmployee(employee, callback) {
    employee = prepEmployeeValues(employee);
    return dispatch => {
        http.addItem("employee", employee)
            .then(addedEmployee => {
                dispatch(addEmployeeToState(addedEmployee.data));
                callback();
            });
    }
}
//Posts new employee to API

export function updateEmployee(employee, callback) {
    employee = prepEmployeeValues(employee);
    return dispatch => {
        http.updateItemById("employee", employee, employee.employeeId)
            .then(() => {
                dispatch(updateEmployeeInState(employee));
                callback();
            });
    }
}
//Updates employee in database

export function deleteEmployee(id) {
    return dispatch => {
        http.deleteItemById("employee", id)
            .then(() => {
                dispatch(deleteEmployeeFromState(id));
            });
    }
}
//Deletes selected employee

export function addEmployeeToState(employee) {
    return {
        type: EmployeeActionTypes.ADD_EMPLOYEE,
        payload: employee
    }
}
//Adds new employee from post to state

export function setEmployees(employees) {
    return {
        type: EmployeeActionTypes.SET_EMPLOYEES,
        payload: employees
    }
}
//Sets all employees in state

export function setSingleEmployee(employee) {
    return {
        type: EmployeeActionTypes.SET_SINGLE_EMPLOYEE,
        payload: employee
    }
}
//Sets selected employee in state

export function updateEmployeeInState(employee) {
    return {
        type: EmployeeActionTypes.UPDATE_EMPLOYEE,
        payload: employee
    }
}
//Updates function for employee

export function deleteEmployeeFromState(id) {
    return {
        type: EmployeeActionTypes.DELETE_EMPLOYEE,
        payload: id
    }
}
//Deletes selected employee

function prepEmployeeValues(employee) {
    employee.name = helper.capitalizeAll(employee.name);
    if (employee.title) {
        employee.title = helper.capitalizeAll(employee.title);
    }

    return employee;
}