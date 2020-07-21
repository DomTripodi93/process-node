import rootHttp from '../../root-http';
import ScheduleActionTypes from './schedule.types';


const http = new rootHttp();

export function fetchSchedulesByDate(month, day, year) {
    return dispatch => {
        http.fetchAll("schedule/byUser/" + month + "&" + year + "&" + day)
            .then((schedules) => {
                dispatch(setSchedules(schedules, year + "/" + month + "/" + day));
            });
    }
}
//Gets all schedules for a specific day

export function fetchSchedulesByEmployee(employeeId, month, day, year) {
    return dispatch => {
        http.fetchAll("schedule/byEmployee/" + employeeId + "&" + month + "&" + year + "&" + day)
            .then((schedules) => {
                dispatch(setSchedules(schedules, employeeId + "/" + year + "/" + month + "/" + day));
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
        http.updateItemById("schedule", schedule, schedule.id)
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
    return {
        type: ScheduleActionTypes.UPDATE_SCHEDULES,
        payload: schedule,
        date,
        employeeId
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