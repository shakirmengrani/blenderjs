import * as moment from 'moment'

export const dateCompCurrent = (date: any, compOpt: string = 'gte') => {
    let currentTime = new Date();
    let paramDate = new Date(date);
    switch (compOpt) {
        case 'gte':
            return paramDate.getTime() >= currentTime.getTime()
        case 'lte':
            return paramDate.getTime() <= currentTime.getTime()
        case 'gt':
            return paramDate.getTime() > currentTime.getTime()
        case 'lt':
            return paramDate.getTime() < currentTime.getTime()
        default:
            return paramDate.getTime() >= currentTime.getTime()
    }
}


export const dateComp = (date1: any, date2: any, compOpt: string = 'gte') => {
    let currentTime = new Date(date1);
    let paramDate = new Date(date2);
    switch (compOpt) {
        case 'gte':
            return paramDate.getTime() >= currentTime.getTime()
        case 'lte':
            return paramDate.getTime() <= currentTime.getTime()
        case 'gt':
            return paramDate.getTime() > currentTime.getTime()
        case 'lt':
            return paramDate.getTime() < currentTime.getTime()
        default:
            return paramDate.getTime() >= currentTime.getTime()
    }
}

export const getCurrentDay = (date: any = Date()) => {
    let paramDate = new Date(date);
    switch (paramDate.getDay()) {
        case 0:
            return "sunday";
        case 1:
            return "monday";
        case 2:
            return "tuesday";
        case 3:
            return "wednesday";
        case 4:
            return "thursday";
        case 5:
            return "friday";
        case 6:
            return "saturday";
        default:
            return;
    }
}

export const getCurrentMonth = (date: any = Date()) => {
    let paramDate = new Date(date);
    switch (paramDate.getMonth()) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            return;
    }
}



export const getInterval = (range: moment.unitOfTime.DurationConstructor = "week", lastPart: moment.DurationInputArg1 = 1) => {
    let currentTime = moment(),
        date = [],
        i = lastPart;

    for (let j = 0; j < i; j++) {
        let dates = {
            from: moment(currentTime).startOf(range),
            to: moment(currentTime).endOf(range)
        }
        currentTime = currentTime.subtract(range, 1);
        date.unshift(dates)
    }
    return date;
}

export const getTimePeriod = (range: moment.unitOfTime.DurationConstructor = 'week', lastPart: moment.DurationInputArg1 = 1) => {
    return {
        from: moment().subtract(lastPart, range).startOf('day'),
        to: moment().endOf('day')
    }

}

export const getDateLabel = (from: any, to: any, range: moment.unitOfTime.DurationConstructor) => {

    switch (range) {
        case 'day':
            return moment(from).format('DD/MMM');

        case 'week':
            return `${moment(from).format('DD/MMM')} - ${moment(to).format('DD/MMM')}`;

        case 'month':
            return moment(from).format('MMM/YYYY');

        case 'quarter':
            return `${moment(from).format('MMM/YYYY')} - ${moment(to).format('MMM/YYYY')}`;

        case 'year':
            return moment(from).format('YYYY')

        default:
            return moment(from).format('DD/MMM');
    }
}


export const addInterval = (date: any, qty: moment.DurationInputArg1, interval: moment.unitOfTime.DurationConstructor) => {
    return moment(date).add(qty, interval)
}