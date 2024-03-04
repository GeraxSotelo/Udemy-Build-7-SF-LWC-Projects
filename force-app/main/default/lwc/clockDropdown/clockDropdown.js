import { LightningElement, api } from 'lwc';

export default class ClockDropdown extends LightningElement {
    //public reactive properties
    @api label = '';
    @api options = [];
    @api uniqueId = '';

    changeHandler(event) {
        console.log('Send: ', this.label);
        console.log('Send: ', event.target.value);
        this.callParent(event.target.value);
    }

    callParent(value) {
        this.dispatchEvent(new CustomEvent('optionhandler', {  // Custom event name: optionHandler
            detail: {  // object with a property named 'detail'
                label: this.label,
                value: value  // value of 'detail' is an object
            }
        }))
    }

    @api
    reset(value) {
        this.template.querySelector('select').value = value;
        this.callParent(value);
    }
}