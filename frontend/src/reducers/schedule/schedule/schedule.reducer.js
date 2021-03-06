import ScheduleActionTypes from './schedule.types';

const INITIAL_STATE = {
    scheduledTasks: { employee: {} },
    selectedScheduledTasks: [],
    isRoot: false
}

const scheduleReducer = (state = INITIAL_STATE, action) => {
    let taskHold = state.scheduledTasks;
    let selectedHold = state.selectedScheduledTasks;
    let dateWithEmployee = action.employeeId + "-" + action.date;
    const filterTasks = (taskArray, id) => {
        return taskArray.filter((value) => {
            return value._id !== id;
        });
    }
    const sortTasks = (taskArray) => {
        return taskArray.sort((first, second) => {
            if (first.date < second.date) {
                return -1;
            } else {
                return 1;
            }
        });
    }

    switch (action.type) {
        case ScheduleActionTypes.SET_SCHEDULES:
            taskHold[action.date] = action.payload.data;
            selectedHold = taskHold[action.date];
            return {
                ...state,
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.SELECT_SCHEDULES:
            selectedHold = taskHold[action.payload];
            return {
                ...state,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.EXTRACT_SCHEDULES:
            taskHold[dateWithEmployee] = taskHold[action.date].filter((value) => {
                return value.employeeId === action.employeeId;
            });
            selectedHold = taskHold[dateWithEmployee];
            return {
                ...state,
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.ADD_SCHEDULE:
            if (taskHold[action.date]) {
                taskHold[action.date].push(action.payload);
                taskHold[action.date] = sortTasks(taskHold[action.date]);
            }
            if (taskHold[dateWithEmployee]) {
                taskHold[dateWithEmployee].push(action.payload);
                taskHold[dateWithEmployee] = sortTasks(taskHold[dateWithEmployee]);
            }

            return {
                ...state,
                scheduledTasks: taskHold
            };
        case ScheduleActionTypes.UPDATE_SCHEDULES:
            if (taskHold["employee"] && 
                taskHold["employee"][action.date] && 
                action.payload.userId === action.employeeUserId
            ) {
                taskHold["employee"][action.date].push(action.payload);
                taskHold["employee"][action.date] = sortTasks([
                    action.payload,
                    ...filterTasks(taskHold["employee"][action.date], action.payload._id)
                ]);
            }
            if (taskHold[action.date]) {
                taskHold[action.date].push(action.payload);
                taskHold[action.date] = sortTasks([
                    action.payload,
                    ...filterTasks(taskHold[action.date], action.payload._id)
                ]);
            }
            if (taskHold[dateWithEmployee]) {
                taskHold[dateWithEmployee].push(dateWithEmployee);
                taskHold[dateWithEmployee] = sortTasks([
                    action.payload,
                    ...filterTasks(taskHold[dateWithEmployee], action.payload._id)
                ]);
            }
            selectedHold = sortTasks([
                action.payload,
                ...filterTasks(selectedHold, action.payload._id)
            ]);
            return {
                ...state,
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.DELETE_SCHEDULE:
            if (taskHold[action.date]) {
                taskHold[action.date] = filterTasks(taskHold[action.date], action.payload);
            }
            if (taskHold[dateWithEmployee]) {
                taskHold[dateWithEmployee] = filterTasks(taskHold[dateWithEmployee], action.payload);
            }
            if (taskHold["employee"] && taskHold["employee"][action.date]){
                taskHold["employee"][action.date] = filterTasks(taskHold["employee"][action.date], action.payload);
            }
            selectedHold = filterTasks(selectedHold, action.payload);
            return {
                ...state,
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.SET_IS_ROOT:
            return {
                ...state,
                isRoot: action.isRoot
            };
        case ScheduleActionTypes.SET_SCHEDULES_FOR_EMPLOYEE:
            taskHold["employee"][action.date] = action.payload.data;
            selectedHold = taskHold["employee"][action.date];
            return {
                ...state,
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.SELECT_SCHEDULES_FOR_EMPLOYEE:
            selectedHold = taskHold.employee[action.payload];
            return {
                ...state,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.SIGNOUT_USER:
            return {
                scheduledTasks: { employee: {} },
                selectedScheduledTasks: [],
                isRoot: false
            }
        default:
            return state;
    }
}

export default scheduleReducer;