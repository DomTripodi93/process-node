import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CalendarHelper from '../../../shared/calendar-helper';

const Calendar = props => {
    const [month, setMonth] = useState(props.month);
    const [year, setYear] = useState(props.year);
    const helper = new CalendarHelper();
    const monthDays = helper.setDays(year, month)
    const firstDayOfMonth = helper.setFirstDays(year, month);
    const baseRoute = helper.setBaseRoute(month, props.employeeId)
    const today = props.date.getDate();
    const thisMonth = props.thisMonth;
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    useEffect(() => {
        setMonth(props.month);
        setYear(props.year);
        countTasksForDay(props.scheduledTasks);
    }, [props])

    const [tasksForDay, setTasksForDay] = useState({});

    function countTasksForDay (tasks) {
        if (tasks.length > 0){
            let tasksHold = {};
            tasks.forEach(task => {
                let day = task.date.substring(8,10);
                if (tasksHold[+day]){
                    tasksHold[+day] = tasksHold[+day] + 1;
                } else {
                    tasksHold[+day] = 1;
                }
            })
            setTasksForDay(tasksHold);
        }
    }


    return (
        <div>
            <div className="grid7split border">
                {days.map(day => (
                    <div key={day} className="day-label-border">
                        <h5 className="centered label-text">{day}</h5>
                    </div>
                ))}
                {firstDayOfMonth.map(date => (
                    <div key={date} className="day-border"></div>
                ))}
                {monthDays.map(date => (
                    <div key={date}>
                        {date !== today || (date === today && month !== thisMonth) ?
                            <Link to={baseRoute + '/' + date + '/' + year}>
                                <div className="day-border padded">
                                    {props.isRoot ?
                                        <div>
                                            <h5 className="label-text date">{date}</h5>
                                        </div>
                                        :
                                        <div>
                                            <h5 className="label-text date">{date}</h5>
                                            {tasksForDay[date] ?
                                                <div className="centered count">{tasksForDay[date]}</div>
                                                :
                                                <div className="centered count">0</div>
                                            }
                                        </div>
                                    }
                                </div>
                            </Link>
                            :
                            null
                        }
                        {date === today && month === thisMonth ?
                            <Link to={baseRoute + '/' + date + '/' + year}>
                                <div className="today-border padded" >
                                    {props.isRoot ?
                                        <div>
                                            <h5 className="label-text date">{date}</h5>
                                        </div>
                                        :
                                        <div>
                                            <h5 className="label-text date">{date}</h5>
                                            {tasksForDay[date] ?
                                                <div className="centered count">{tasksForDay[date]}</div>
                                                :
                                                <div className="centered count">0</div>
                                            }
                                        </div>
                                    }
                                </div>
                            </Link>
                            :
                            null
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar;