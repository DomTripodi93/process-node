import EmployeeActionTypes from './employee.types';

const INITIAL_STATE = {
    employees: [],
    employeeMap: {},
    called: false
}

const employeeReducer = (state = INITIAL_STATE, action) => {
    let mapHold = state.employeeMap;
    let employeeHold = state.employees;
    switch (action.type) {
        case EmployeeActionTypes.SET_EMPLOYEES:
            action.payload.data.forEach(employee => {
                mapHold[employee.id] = employee.name;
            });
            return {
                employees: action.payload.data,
                employeeMap: mapHold,
                called: true
            };
        case EmployeeActionTypes.ADD_EMPLOYEE:
            mapHold[action.payload.id] = action.payload;
            return {
                ...state,
                employees: [...state.employees, action.payload],
                employeeMap: mapHold
            };
        case EmployeeActionTypes.UPDATE_EMPLOYEE:
            mapHold[action.payload.id] = action.payload.name;
            employeeHold = employeeHold
                .filter((value) => {
                    return value.id !== action.payload.id
                })
            employeeHold.push(action.payload)
            employeeHold = employeeHold
                .sort((first, second) => {
                    if (first.id > second.id) {
                        return 1
                    } else {
                        return -1
                    }
                }
                )
            return {
                ...state,
                employeeMap: mapHold,
                employees: employeeHold
            };
        case EmployeeActionTypes.DELETE_EMPLOYEE:
            employeeHold = employeeHold
                .filter((value) => {
                    return value.id !== action.payload
                });
            delete mapHold[action.payload];
            return {
                ...state,
                employees: employeeHold,
                employeeMap: mapHold
            };
        case EmployeeActionTypes.SIGNOUT_USER:
            return {
                employees: [],
                employeeMap: {},
                called: false
            }
        default:
            return state;
    }
}

export default employeeReducer;