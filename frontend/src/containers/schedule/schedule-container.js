import React, { useState, useEffect } from 'react';
import Calendar from '../../components/schedule/calendar/calendar';
import CalendarNew from '../../components/schedule/calendar/calendar-new';
import { fetchSchedulesByMonth, selectSchedulesInState } from '../../reducers/schedule/schedule/schedule.actions';
import { connect } from 'react-redux';

import './schedule.styles.scss';


const ScheduleContainer = props => {
    const date = new Date();
    const thisMonth = date.getMonth();
    const [month, setMonth] = useState(thisMonth);
    const [year, setYear] = useState(date.getFullYear());

    const updateMonth = (selectedMonth) => {
        let monthSplit = selectedMonth.split("-");
        setYear(monthSplit[0]);
        setMonth(+monthSplit[1] - 1);
    }

    const dateForCall = new Date(date.getFullYear(), (date.getMonth() + 1), 0)
    const dayForCall = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + dateForCall.getDate();
    const scheduledTasks = props.scheduledTasks;
    const selectSchedules = props.selectSchedulesInState;
    const fetchSchedules = props.fetchSchedulesByMonth;
    const isRoot = props.isRoot;

    useEffect(() => {
        if (!isRoot && !scheduledTasks[thisMonth + 1]) {
            fetchSchedules(dayForCall);
        } else if (!isRoot && scheduledTasks[thisMonth + 1]) {
            selectSchedules(thisMonth + 1)
        }
    }, [
        scheduledTasks,
        fetchSchedules,
        selectSchedules,
        dayForCall,
        thisMonth,
        isRoot
    ])

    return (
        <div>
            <CalendarNew
                callback={updateMonth}
                month={month}
                year={year} />
            <Calendar
                employeeId={props.match.params.employeeId}
                scheduledTasks = {props.selectedTasks}
                date={date}
                month={month}
                thisMonth={thisMonth}
                year={year}
                isRoot={isRoot} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSchedulesByMonth: (date) => dispatch(fetchSchedulesByMonth(date)),
        selectSchedulesInState: (date) => dispatch(selectSchedulesInState(date))
    }
}


const mapStateToProps = state => ({
    scheduledTasks: state.schedule.scheduledTasks,
    isRoot: state.user.isRoot,
    selectedTasks: state.schedule.selectedScheduledTasks
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);