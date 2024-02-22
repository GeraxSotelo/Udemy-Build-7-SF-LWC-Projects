import { LightningElement, api } from 'lwc';

export default class ClockDropdown extends LightningElement {
    //public reactive properties
    @api label = '';
    @api options = [];
    @api uniqueId = '';
}