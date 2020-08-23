import React, { useState, useEffect } from 'react';
import Calendar from '../../components/schedule/calendar/calendar';
import CalendarNew from '../../components/schedule/calendar/calendar-new';
import { fetchSchedulesByMonth, selectSchedulesInStateForEmployee } from '../../reducers/schedule/schedule/schedule.actions';
import { connect } from 'react-redux';

import './schedule.styles.scss';
import { setIsRoot } from '../../reducers/schedule/schedule/schedule.actions';
import MessageTopContainer from '../message/message-top';
import MessagePagedContainer from '../message/message-paged';


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
    const canEdit = props.canEdit;
    const location = window.location.pathname;
    const setIsRoot = props.setIsRoot;
    const rootId = props.rootId;
    const userId = props.userId;

    useEffect(() => {
        if (!isRoot && !scheduledTasks[thisMonth + 1]) {
            fetchSchedules(dayForCall);
        } else if (!isRoot && scheduledTasks[thisMonth + 1]) {
            selectSchedules(thisMonth + 1)
        }
        if (!isRoot && canEdit && location === "/schedule"){
            setIsRoot(true)
        } else if (rootId !== userId && location !== "/schedule"){
            setIsRoot(false)
        }
    }, [
        scheduledTasks,
        fetchSchedules,
        selectSchedules,
        dayForCall,
        thisMonth,
        isRoot,
        setIsRoot,
        canEdit,
        location,
        rootId,
        userId
    ])

    return (
        <div>
            <MessageTopContainer />
            <div className="space-top">
                <CalendarNew
                    callback={updateMonth}
                    month={month}
                    year={year} />
            </div>
            <Calendar
                employeeId={props.match.params.employeeId}
                scheduledTasks = {props.selectedTasks}
                date={date}
                month={month}
                thisMonth={thisMonth}
                year={year}
                isRoot={isRoot}
                canEdit={canEdit} />
            <MessagePagedContainer />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSchedulesByMonth: (date) => dispatch(fetchSchedulesByMonth(date)),
        selectSchedulesInState: (date) => dispatch(selectSchedulesInStateForEmployee(date)),
        setIsRoot: (isRoot) => dispatch(setIsRoot(isRoot))
    }
}


const mapStateToProps = state => ({
    scheduledTasks: state.schedule.scheduledTasks.employee,
    isRoot: state.schedule.isRoot,
    canEdit: state.user.canEdit,
    selectedTasks: state.schedule.selectedScheduledTasks,
    userId: state.user.userId,
    rootId: state.user.rootId
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);