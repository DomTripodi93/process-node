import React, { useState, useEffect } from 'react';
import CalendarHelper from '../../shared/calendar-helper';
import {
    fetchSchedulesByEmployee,
    fetchSchedulesByDate,
    selectSchedulesInState,
    extractScheduledTasksForEmployee
} from '../../reducers/schedule/schedule/schedule.actions';
import { connect } from 'react-redux';
import ScheduleDay from '../../components/schedule/schedule/schedule-day';
import ScheduleNew from '../../components/schedule/schedule/schedule-new';
import { fetchDepartments } from '../../reducers/process/department/department.actions';
import { fetchObjectivesByDepartment } from '../../reducers/process/objective/objective.actions';
import { fetchEmployees } from '../../reducers/schedule/employee/employee.actions';

import './schedule.styles.scss';


const ScheduleDayContainer = props => {
    const [hasNeededData, setNeededDataState] = useState(true);
    const [addMode, setAddMode] = useState(false);
    const helper = new CalendarHelper();
    const employeeId = props.match.params.employeeId;
    const month = +props.match.params.month;
    const day = +props.match.params.day;
    const year = +props.match.params.year;
    const lastDay = helper.checkDays(year, month);

    const departments = props.departments;
    const deptCalled = props.deptCalled;
    const objCalled = props.objCalled;
    const fetchAllDepartments = props.fetchDepartments;
    const fetchObjectivesForDepartment = props.fetchObjectivesByDepartment;

    const setObjectivesToPass = (allObjectives) => {
        let objectivesHold = {}
        Object.keys(allObjectives).forEach(key => {
            if (allObjectives[key].length > 0) {
                objectivesHold[key] = allObjectives[key];
            }
        })
        return objectivesHold
    }
    const objectivesToPass = setObjectivesToPass(props.objectives);

    useEffect(() => {
        if (!deptCalled) {
            fetchAllDepartments();
        } else if (!objCalled && departments.length > 0) {
            departments.forEach(dept => {
                fetchObjectivesForDepartment(dept.deptName);
            })
        } else if (departments.length === 0) {
            setNeededDataState(false);
        }
    }, [
        departments,
        fetchAllDepartments,
        fetchObjectivesForDepartment,
        deptCalled,
        objCalled
    ])


    const scheduledTasks = props.scheduledTasks;
    const fetchSchedulesForDate = props.fetchSchedulesByDate;
    const fetchSchedulesForEmployee = props.fetchSchedulesByEmployee;
    const selectSchedules = props.selectSchedulesInState;
    const extractSchedules = props.extractScheduledTasksForEmployee;

    useEffect(() => {
        let setFor = year + "/" + month + "/" + day;
        if (employeeId) {
            let setForId = employeeId + "/" + setFor;
            if (!scheduledTasks[setForId]) {
                if (scheduledTasks[setFor]) {
                    extractSchedules(setFor, employeeId);
                } else {
                    fetchSchedulesForEmployee(employeeId, month, day, year);
                }
            } else {
                selectSchedules(setForId);
            }
        } else if (!scheduledTasks[setFor]) {
            fetchSchedulesForDate(month, day, year);
        } else {
            selectSchedules(setFor);
        }
    }, [
        scheduledTasks,
        fetchSchedulesForEmployee,
        fetchSchedulesForDate,
        selectSchedules,
        extractSchedules,
        employeeId,
        month,
        day,
        year
    ])

    const employeeMap = props.employeeMap;
    const employeeCalled = props.employeeCalled;
    const fetchEmployees = props.fetchEmployees;


    useEffect(() => {
        if (!employeeCalled) {
            fetchEmployees();
        } else if (Object.keys(employeeMap).length === 0) {
            setNeededDataState(false);
        }
    }, [
        fetchEmployees,
        employeeMap,
        employeeCalled
    ]);


    const changeDay = (movement) => {
        let route = ""
        if (movement === 'next') {
            if (day < lastDay) {
                route = month + "/" + (day + 1) + "/" + year;
            } else {
                if (month < 12) {
                    route = (month + 1) + "/1/" + year;
                } else {
                    route = "1/1/" + (year + 1);
                }
            }
        } else if (movement === 'last') {
            if (day > 1) {
                route = month + "/" + (day - 1) + "/" + year;
            } else {
                if (month > 1) {
                    let newDay = helper.checkDays(year, month - 1);
                    route = (month - 1) + "/" + newDay + "/" + year;
                } else {
                    route = "12/31/" + (year - 1);
                }
            }
        }
        if (movement === "back") {
            route = "/schedule";
        } else {
            if (employeeId) {
                route = employeeId + "/" + route;
            }
            route = "/day/" + route;
        }

        props.history.push(route);
    }


    const showScheduleForm = () => {
        setAddMode(!addMode);
    }


    return (
        <div>
            <ScheduleNew
                addMode={addMode}
                action={showScheduleForm}
                objectives={objectivesToPass}
                employeeId={employeeId}
                year={year}
                month={month}
                day={day}
                employeeMap={employeeMap}
                hasNeededData={hasNeededData} />

            {employeeMap[employeeId] ?
                <h3 className="centered">{employeeMap[employeeId]}'s Schedule for {month}-{day}-{year}</h3>
                :
                <h3 className="centered">Schedule for {month}-{day}-{year}</h3>
            }
            <ScheduleDay
                scheduledTasks={props.selectedScheduledTasks}
                action={changeDay}
                employeeId={employeeId}
                objectives={objectivesToPass}
                year={year}
                month={month}
                day={day}
                employeeMap={employeeMap}
                hasNeededData={hasNeededData} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSchedulesByEmployee: (employeeId, month, day, year) => dispatch(fetchSchedulesByEmployee(employeeId, month, day, year)),
        fetchSchedulesByDate: (month, day, year) => dispatch(fetchSchedulesByDate(month, day, year)),
        fetchDepartments: () => dispatch(fetchDepartments()),
        fetchObjectivesByDepartment: (deptName) => dispatch(fetchObjectivesByDepartment(deptName)),
        fetchEmployees: () => dispatch(fetchEmployees()),
        selectSchedulesInState: (date) => dispatch(selectSchedulesInState(date)),
        extractScheduledTasksForEmployee: (date, employeeId) => dispatch(extractScheduledTasksForEmployee(date, employeeId))
    }
}

const mapStateToProps = state => ({
    scheduledTasks: state.schedule.scheduledTasks,
    selectedScheduledTasks: state.schedule.selectedScheduledTasks,
    departments: state.department.departments,
    deptCalled: state.department.called,
    objectives: state.objective.objectives,
    objCalled: state.objective.called,
    employeeMap: state.employee.employeeMap,
    employeeCalled: state.employee.called
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDayContainer);