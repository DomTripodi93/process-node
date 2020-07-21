
class helpers {

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    capitalizeAll(string) {
        let words = string.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = this.capitalize(words[i]);
        }
        return words.join(" ");
    }

    slashToDash(string) {
        return string.split("/").join("-");
    }

    dashToSlash(string) {
        return string.split("-").join("/");
    }

    gapToDash(string) {
        return string.split(" ").join("-");
    }

    dashToGap(string) {
        return string.split("-").join(" ");
    }

    async removeSpaceAtEnd(string) {
        if (string.charAt(string.length - 1) === " ") {
            string = string.substring(0, string.length - 1);
            string = await this.removeSpaceAtEnd(string);
        }
        return string;
    }

    getCurrentTimeAndDate() {
        let date = new Date().toISOString().slice(0, 11);
        let hour = "" + new Date().getHours();
        let minute = "" + new Date().getMinutes();
        if (+minute < 10) {
            minute = "0" + minute;
        }
        if (+hour < 10) {
            hour = "0" + hour;
        }
        return date + hour + ":" + minute;
    }

    setDateForIso(year, month, day) {
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }

    timeFromDate(date) {
        return date.split("T")[1].substring(0, 5);
    }

    timeForDisplay(time) {
        if (+time[0] > 0) {
            if (+time[0] > 1) {
                let hour = +time.substring(0, 2) - 12;
                time = hour + time.substring(2, 5) + " PM"
            } else if (+time[1] > 2) {
                let hour = +time.substring(0, 2) - 12;
                time = hour + time.substring(2, 5) + " PM"
            } else {
                time = time + " AM"
            }
        } else {
            time = time + " AM"
        }
        return time;
    }

}

export default helpers;