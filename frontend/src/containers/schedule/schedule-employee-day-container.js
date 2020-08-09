import React, { useEffect } from 'react';
import CalendarHelper from '../../shared/calendar-helper';
import {
    selectSchedulesInState,
    fetchSchedulesByEmployeeDay,
    selectSchedulesInStateForEmployee
} from '../../reducers/schedule/schedule/schedule.actions';
import { connect } from 'react-redux';
import ScheduleDay from '../../components/schedule/schedule/schedule-day';
import { fetchDepartments } from '../../reducers/process/department/department.actions';
import { fetchObjectivesByDepartment } from '../../reducers/process/objective/objective.actions';

import './schedule.styles.scss';
import ScheduleDayChanger from '../../components/schedule/schedule/schedule-day-changer';


const ScheduleEmployeeDayContainer = props => {
    const helper = new CalendarHelper();
    const month = +props.match.params.month;
    const day = +props.match.params.day;
    const year = +props.match.params.year;
    const lastDay = helper.checkDays(year, month);

    const departments = props.departments;
    const deptCalled = props.deptCalled;
    const objectives = props.objectives;
    const objCalled = props.objCalled;
    const fetchAllDepartments = props.fetchDepartments;
    const fetchObjectivesForDepartment = props.fetchObjectivesByDepartment;

    useEffect(() => {
        if (!deptCalled) {
            fetchAllDepartments();
        } else if (!objCalled && departments.length > 0) {
            departments.forEach(dept => {
                fetchObjectivesForDepartment(dept.deptName);
            })
        } 
    }, [
        departments,
        fetchAllDepartments,
        fetchObjectivesForDepartment,
        deptCalled,
        objCalled
    ])


    const selectSchedules = props.selectSchedulesInStateForEmployee;
    const scheduledTasks = props.scheduledTasks;
    const fetchSchedulesForDate = props.fetchSchedulesByEmployeeDay;

    useEffect(() => {
        let setFor = year + "-" + month + "-" + day;
        if (!scheduledTasks.employee[setFor]) {
            fetchSchedulesForDate(setFor);
        } else {
            selectSchedules(setFor);
        }
    }, [
        scheduledTasks,
        fetchSchedulesForDate,
        selectSchedules,
        month,
        day,
        year
    ])


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
            route = "/day/" + route;
        }

        props.history.push(route);
    }


    return (
        <div>
            <h3 className="centered">Schedule for {month}-{day}-{year}</h3>
            <ScheduleDay
                scheduledTasks={props.selectedScheduledTasks}
                year={year}
                month={month}
                day={day}
                isRoot={props.isRoot}
                departments={departments}
                objectives={objectives} />
            <br />
            <ScheduleDayChanger
                action={changeDay} />
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        fetchDepartments: () => dispatch(fetchDepartments()),
        fetchObjectivesByDepartment: (deptName) => dispatch(fetchObjectivesByDepartment(deptName)),
        fetchSchedulesByEmployeeDay: (date) => dispatch(fetchSchedulesByEmployeeDay(date)),
        selectSchedulesInStateForEmployee: (date) => dispatch(selectSchedulesInStateForEmployee(date))
    }
}

const mapStateToProps = state => ({
    scheduledTasks: state.schedule.scheduledTasks,
    selectedScheduledTasks: state.schedule.selectedScheduledTasks,
    departments: state.department.departments,
    deptCalled: state.department.called,
    objectives: state.objective.objectives,
    objCalled: state.objective.called,
    isRoot: state.user.isRoot
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleEmployeeDayContainer);