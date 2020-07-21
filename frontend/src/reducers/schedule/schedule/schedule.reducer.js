import ScheduleActionTypes from './schedule.types';

const INITIAL_STATE = {
    scheduledTasks: {},
    selectedScheduledTasks: []
}

const scheduleReducer = (state = INITIAL_STATE, action) => {
    let taskHold = state.scheduledTasks;
    let selectedHold = state.selectedScheduledTasks;
    let dateWithEmployee = action.employeeId + "/" + action.date;
    const filterTasks = (taskArray, id) => {
        return taskArray.filter((value) => {
            return value.id !== id;
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
                return value.employeeId === +action.employeeId;
            });
            selectedHold = taskHold[dateWithEmployee];
            return {
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.ADD_SCHEDULE:
            if (taskHold[action.date]) {
                taskHold[action.date].push(action.payload);
                taskHold[action.date] = sortTasks(taskHold[action.date]);
            }
            if (taskHold[dateWithEmployee]) {
                taskHold[dateWithEmployee].push(dateWithEmployee);
                taskHold[dateWithEmployee] = sortTasks(taskHold[dateWithEmployee]);
            }
            selectedHold.push(action.payload);
            selectedHold = sortTasks(selectedHold);

            return {
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.UPDATE_SCHEDULES:
            if (taskHold[action.date]) {
                taskHold[action.date].push(action.payload);
                taskHold[action.date] = sortTasks([
                    action.payload,
                    ...filterTasks(taskHold[action.date], action.payload.id)
                ]);
            }
            if (taskHold[dateWithEmployee]) {
                taskHold[dateWithEmployee].push(dateWithEmployee);
                taskHold[dateWithEmployee] = sortTasks([
                    action.payload,
                    ...filterTasks(taskHold[dateWithEmployee], action.payload.id)
                ]);
            }
            selectedHold = sortTasks([
                action.payload,
                ...filterTasks(selectedHold, action.payload.id)
            ]);
            return {
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.DELETE_SCHEDULE:
            if (taskHold[action.date]) {
                taskHold[action.date] = filterTasks(taskHold[action.date], action.payload.id);
            }
            if (taskHold[dateWithEmployee]) {
                taskHold[dateWithEmployee] = filterTasks(taskHold[dateWithEmployee], action.payload.id);
            }
            selectedHold = filterTasks(selectedHold, action.payload.id);
            return {
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.SIGNOUT_USER:
            return {
                scheduledTasks: {},
                selectedScheduledTasks: []
            }
        default:
            return state;
    }
}

export default scheduleReducer;