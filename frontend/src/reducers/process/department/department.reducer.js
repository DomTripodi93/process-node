import DepartmentActionTypes from './department.types';

const INITIAL_STATE = {
    departments: [],
    called: false
}

const departmentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DepartmentActionTypes.SET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload.data,
                called: true
            };
        case DepartmentActionTypes.ADD_DEPARTMENT:
            return {
                ...state,
                departments: [...state.departments, action.payload]
            };
        case DepartmentActionTypes.UPDATE_DEPARTMENT:
            return {
                ...state,
                departments: [
                    action.payload,
                    ...state.departments
                        .filter((value) => {
                            return value.deptName !== action.payload.deptName
                        })]
                    .sort((first, second) => {
                        if (first.deptName > second.deptName) {
                            return 1
                        } else {
                            return -1
                        }
                    })
            };
        case DepartmentActionTypes.DELETE_DEPARTMENT:
            return {
                ...state,
                departments: [...state.departments
                    .filter((value) => {
                        return value.deptName !== action.payload
                    })]
            };
        case DepartmentActionTypes.SIGNOUT_USER:
            return {
                departments: [],
                called: false
            };
        default:
            return state;
    }
}

export default departmentReducer;