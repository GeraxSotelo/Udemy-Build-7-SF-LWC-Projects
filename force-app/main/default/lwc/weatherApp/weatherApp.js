import { LightningElement, wire } from 'lwc';
import getGeneralApiKey from '@salesforce/apex/OpenWeatherMapAPIController.getWeatherMapGeneralApiKey';

export default class WeatherApp extends LightningElement {
    API_KEY;
    cityName = '';

    @wire(getGeneralApiKey)
    wiredApiKey(value) {
        const {data, error} = value;
        if(data) {
            this.API_KEY = data;
            console.log('key: ', this.API_KEY);
            this.error = undefined;
        } else if(error) {
            this.error = error;
            this.API_KEY = undefined;
        }
    }

    searchHandler(event) {
        this.cityName = event.target.value;
    }

    submitHandler(event) {
        event.preventDefault();
        this.fetchData();
    }

    fetchData() {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.API_KEY}`;

        fetch(API_URL).then(res => res.json()).then(result => {
            console.log(JSON.stringify(result))
        }).catch(() => {
            console.log("Error");
        })
    }
}