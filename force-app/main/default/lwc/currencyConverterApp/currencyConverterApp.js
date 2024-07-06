import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverterApp extends LightningElement {
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
    countryList = countryCodeList;
    countryFrom = "USD";
    countryTo = "AUD";

    handleChange(event) {
        const {name, value} = event.target;
        console.log("name: ", this[name]);
        console.log("value: ", value);
        this[name] = value;
        console.log("name 2: ", this[name]);
        console.log("value 2: ", value);
    }
}