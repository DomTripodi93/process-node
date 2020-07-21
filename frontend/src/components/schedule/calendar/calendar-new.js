import React from 'react';
import CalendarForm from './calendar-form';


const CalendarNew = props => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    return (
        <div className="border grid50">
            <h1 className='centered'>{months[props.month]}</h1>
            <CalendarForm
                callback={props.callback}
                month={props.month}
                year={props.year} />
        </div>
    )
}

export default CalendarNew;