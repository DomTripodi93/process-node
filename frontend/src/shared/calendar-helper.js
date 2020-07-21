import _ from 'lodash';


class CalendarHelper {
    setDays = (inputYear, indexMonth) => {
        let monthDaysHold = _.range(
            1, this.checkDays(inputYear, indexMonth + 1) + 1
        );
        return monthDaysHold
    }
    //Returns array of numbers from 1 to last day of month

    checkDays = (inputYear, indexOfNextMonth) => {
        return new Date(inputYear, indexOfNextMonth, 0).getDate()
    }
    //Returns date of last day of month before input index of month

    setFirstDays = (inputYear, indexMonth) => {
        return _.range(0, new Date(inputYear, indexMonth, 1).getDay());
    }
    //Returns array with length of days of week before the first of month

    setBaseRoute = (inputMonth, employeeId) => {
        let baseRouteHold = ""
        if (employeeId) {
            baseRouteHold = "/day/" + employeeId + "/" + (inputMonth + 1);
        } else {
            baseRouteHold = "/day/" + (inputMonth + 1);
        }
        return baseRouteHold
    }
    //Sets base route for linking to day of month scheduled tasks
}

export default CalendarHelper;