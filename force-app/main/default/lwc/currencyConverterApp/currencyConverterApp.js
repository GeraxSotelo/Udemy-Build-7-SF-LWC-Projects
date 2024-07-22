import { LightningElement, wire } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';
import getGeneralApiKey from '@salesforce/apex/ExchangeRateAPIController.getExchangeRateGeneralApiKey';

export default class CurrencyConverterApp extends LightningElement {
    API_KEY;
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
    countryList = countryCodeList;
    countryFrom = "USD";
    countryTo = "AUD";
    amount = '';
    result;
    error;

    @wire(getGeneralApiKey)
    wiredApiKey(value) {
        const {data, error} = value;
        if(data) {
            this.API_KEY = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }

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
        const API_URL = `https://v6.exchangerate-api.com/v6/${this.API_KEY}/pair/${this.countryFrom}/${this.countryTo}/${this.amount}`;
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