import rootHttp from '../../root-http';
import ScheduleActionTypes from './schedule.types';
import store from "../../store";


const http = new rootHttp();

export function fetchSchedulesByDate(date) {
    return dispatch => {
        http.fetchAll("schedule/byUser/" + date)
            .then((schedules) => {
                dispatch(setSchedules(schedules, date));
            });
    }
}
//Gets all schedules for a specific day

export function fetchSchedulesByEmployee(employeeId, date) {
    return dispatch => {
        http.fetchAll("schedule/byEmployee/" + employeeId + "&" + date)
            .then((schedules) => {
                dispatch(setSchedules(schedules, employeeId + "-" + date));
            });
    }
}
//Gets all schedules for a specific day

export function addScheduledTask(schedule, callback, date, employeeId) {
    return dispatch => {
        http.addItem("schedule", schedule)
            .then(addedSchedule => {
                dispatch(addScheduleToState(addedSchedule.data, date, employeeId));
                callback();
            });
    }
}
//Posts new schedule to API

export function updateScheduledTask(schedule, callback, date, employeeId) {
    return dispatch => {
        http.updateItemById("schedule", schedule, schedule._id)
            .then(() => {
                dispatch(updateSchedulesInState(schedule, date, employeeId));
                callback();
            });
    }
}
//Updates schedule in database

export function deleteSchedule(id, date, employeeId) {
    return dispatch => {
        http.deleteItemById("schedule", id)
            .then(() => {
                dispatch(deleteScheduleFromState(id, date, employeeId));
            });
    }
}
//Deletes selected schedule


//Below functions are for managing local state


export function addScheduleToState(schedule, date, employeeId) {
    return {
        type: ScheduleActionTypes.ADD_SCHEDULE,
        payload: schedule,
        date,
        employeeId
    }
}
//Adds new schedule from post to state

export function setSchedules(schedules, date) {
    return {
        type: ScheduleActionTypes.SET_SCHEDULES,
        payload: schedules,
        date
    }
}
//Sets all schedules in state

export function updateSchedulesInState(schedule, date, employeeId) {
    let employeeUserId = store.getState().user.userId;
    return {
        type: ScheduleActionTypes.UPDATE_SCHEDULES,
        payload: schedule,
        date,
        employeeId,
        employeeUserId
    }
}
//Updates function for schedule

export function deleteScheduleFromState(id, date, employeeId) {
    return {
        type: ScheduleActionTypes.DELETE_SCHEDULE,
        payload: id,
        date,
        employeeId
    }
}
//Deletes selected schedule

export function resetSchedules() {
    return {
        type: ScheduleActionTypes.RESET_SCHEDULES
    }
}
//Resets values for scheduled tasks

export function selectSchedulesInState(date) {
    return {
        type: ScheduleActionTypes.SELECT_SCHEDULES,
        payload: date
    }
}
//selects scheduled tasks for display from cached data

export function extractScheduledTasksForEmployee(date, employeeId) {
    return {
        type: ScheduleActionTypes.EXTRACT_SCHEDULES,
        date,
        employeeId
    }
}


//Below functions are for Employee User


export function fetchSchedulesByMonth(date) {
    return dispatch => {
        http.fetchAll("schedule/employeeMonth/" + date)
            .then((schedules) => {
                dispatch(setSchedulesForEmployee(schedules, date.split("-")[1]));
            });
    }
}
//Gets all schedules for a specific day

export function fetchSchedulesByEmployeeDay(date) {
    return dispatch => {
        http.fetchAll("schedule/employeeDay/" + date)
            .then((schedules) => {
                dispatch(setSchedulesForEmployee(schedules, date));
            });
    }
}
//Gets all schedules for a specific day

export function updateScheduledTaskStatus(schedule, status, date, callback) {
    return dispatch => {
        http.updateItem("schedule/employeeStatus", schedule, schedule._id + "&" + status)
            .then(() => {
                dispatch(updateSchedulesInState(schedule, date));
                dispatch(updateSchedulesInState(schedule, date.split("-")[1]));
                callback();
            });
    }
}
//Updates schedule in database

export function setIsRoot(isRoot) {
    return {
        type: ScheduleActionTypes.SET_IS_ROOT,
        isRoot
    };
};
//changes isRoot value



export function setSchedulesForEmployee(schedules, date) {
    return {
        type: ScheduleActionTypes.SET_SCHEDULES_FOR_EMPLOYEE,
        payload: schedules,
        date
    }
}
//Sets all schedules in state

export function selectSchedulesInStateForEmployee(date) {
    return {
        type: ScheduleActionTypes.SELECT_SCHEDULES_FOR_EMPLOYEE,
        payload: date
    }
}
//selects scheduled tasks for display from cached data