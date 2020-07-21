import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import { dropDownReducer } from './drop-down/drop-down.reducer'
import employeeReducer from './schedule/employee/employee.reducer';
import departmentReducer from './process/department/department.reducer';
import objectiveReducer from './process/objective/objective.reducer';
import stepReducer from './process/step/step.reducer';
import commonDifficultyReducer from './process/common-difficulty/common-difficulty.reducer';
import bestPracticeReducer from './process/best-practice/best-practice.reducer';
import scheduleReducer from './schedule/schedule/schedule.reducer';


export default combineReducers({
    user: userReducer,
    dropDown: dropDownReducer,
    employee: employeeReducer,
    schedule: scheduleReducer,
    department: departmentReducer,
    objective: objectiveReducer,
    step: stepReducer,
    commonDifficulty: commonDifficultyReducer,
    bestPractice: bestPracticeReducer
})