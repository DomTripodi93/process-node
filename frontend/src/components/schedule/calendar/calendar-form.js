import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';


const CalendarForm = props => {

    const initializeMonth = () => {
        let monthHold = props.month + 1
        if (monthHold < 10) {
            monthHold = "0" + monthHold;
        }
        monthHold = props.year + "-" + monthHold;

        return monthHold
    }
    //Holds default values for current month and year, for styling of current day

    const [selectedMonth, setSelectedMonth] = useState(initializeMonth());

    const handleSubmit = async event => {
        event.preventDefault();
        props.callback(selectedMonth)
    }

    const handleChange = event => {
        setSelectedMonth(event.target.value)
    }

    return (
        <div>
            <form className='grid100' onSubmit={handleSubmit}>
                <input
                    className="month-input centered"
                    onChange={handleChange}
                    defaultValue={selectedMonth}
                    id="month"
                    name="month"
                    type="month" />
                <CustomButton buttonStyle="blue" label="Change Month" />
            </form>
        </div>
    )
}

export default CalendarForm;