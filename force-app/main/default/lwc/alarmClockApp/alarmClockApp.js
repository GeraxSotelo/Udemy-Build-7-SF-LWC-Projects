import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClockApp extends LightningElement {
    clockImage = AlarmClockAssets+'/AlarmClockAssets/clock.png';
    currentTime = '';
    hours = [];
    minutes = [];
    seconds = [];
    meridiems = ['AM', 'PM'];
    hourSelected = '';
    minutesSelected = '';
    meridiemSelected = '';
    intervalId = '';

    connectedCallback() {
        this.createHoursOptions();
        this.createMinutesOptions();
        this.createSecondsOptions();
        this.currentTimeHandler();
    }

    currentTimeHandler() {
        this.intervalId = setInterval(() => { // run logic every second
            let dateTime = new Date();
            let hour = dateTime.getHours();
            let min = dateTime.getMinutes();
            let sec = dateTime.getSeconds();
            let ampm = "AM";
    
            if(hour == 0) {
                hour = 12;
            } else if (hour > 12) {
                hour -= 12;
                ampm = "PM";
            }
    
            hour = hour<10 ? "0"+hour : hour;
            min = min<10 ? "0"+min : min;
            sec = sec<10 ? "0"+sec : sec;
    
            this.currentTime = `${hour}:${min}:${sec} ${ampm}`;
        }, 1000);
    }

    createHoursOptions() {
        for(let i = 1; i <= 12; i++) {
            let val = i<10 ? "0"+i : i;
            this.hours.push(val);
        }
    }

    createMinutesOptions() {
        for(let i = 0; i <= 59; i++) {
            let val = i<10 ? `0${i}` : i;
            this.minutes.push(val);
        }
    }

    createSecondsOptions() {
        for(let i = 0; i <= 59; i++) {
            let val = i<10 ? `0${i}` : i;
            this.seconds.push(val);
        }
    }

    // for c-clock-dropdown child component
    optionHandlerListener() {
        const {label, value} = event.details;
        if(label === "Hour") {
            this.hourSelected = value;
        } else if (label == "Minutes") {
            this.minutesSelected = value;
        } else if (label == "AM/PM") {
            this.meridiemSelected = value;
        }
        console.log('Hour Received: ', this.hourSelected);
        console.log('Minutes Received: ', this.minutesSelected);
        console.log('Meridiem Received: ', this.meridiemSelected);
    }

    stopClock() {
        clearInterval(this.intervalId);
    }
}