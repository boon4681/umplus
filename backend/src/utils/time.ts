const a_second = 1000
const a_minute = 60 * a_second
const a_hour = 60 * a_minute
const a_day = 24 * a_hour

class btime {

    private time;

    constructor(time: number) {
        this.time = time
    }

    toSecond() {
        return (this.time / a_second).toFixed(0)
    }

    toMinute() {
        return (this.time / a_minute).toFixed(0)
    }

    toHour() {
        return (this.time / a_hour).toFixed(0)
    }

    toDay() {
        return (this.time / a_day).toFixed(0)
    }
}

export {
    a_second,
    a_minute,
    a_hour,
    a_day,
    btime
}