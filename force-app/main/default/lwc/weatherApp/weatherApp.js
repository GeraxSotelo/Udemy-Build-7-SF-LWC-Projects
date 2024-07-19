import { LightningElement } from 'lwc';

export default class WeatherApp extends LightningElement {
    cityName = '';

    searchHandler(event) {
        this.cityName = event.target.value;
    }

    submitHandler(event) {
        event.preventDefault();
        this.fetchData();
    }

    fetchData() {
        // call api
        console.log('city name: ', this.cityName);
    }
}