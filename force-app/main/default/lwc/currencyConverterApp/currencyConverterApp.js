import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverterApp extends LightningElement {
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
    countryList = countryCodeList;
    countryFrom = "USD";
    countryTo = "AUD";
    amount = '';
    result;
    error;

    handleChange(event) {
        const {name, value} = event.target;
        this[name] = value;
        this.result = '';
        this.error = '';
    }

    submitHandler(event) {
        event.preventDefault();
        this.convert();
    }

    async convert() {
        const API_KEY = '0f0197a69685751944d10da8';
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}/${this.amount}`;
        try {
            const data = await fetch(API_URL);
            const jsonData = await data.json();
            console.log('JSON Data: ', jsonData);
            this.result = jsonData.conversion_result.toFixed(2);
        } catch(error) {
            console.log('Error: ', error);
            this.error = error;
        }
    }
}