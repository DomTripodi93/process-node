import React, { useState } from 'react';
import Calendar from '../../components/schedule/calendar/calendar';
import CalendarNew from '../../components/schedule/calendar/calendar-new';

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

    return (
        <div>
            <CalendarNew
                callback={updateMonth}
                month={month}
                year={year} />
            <Calendar
                employeeId={props.match.params.employeeId}
                date={date}
                month={month}
                thisMonth={thisMonth}
                year={year} />
        </div>
    )
}

export default ScheduleContainer;