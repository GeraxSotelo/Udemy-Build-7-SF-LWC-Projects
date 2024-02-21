import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height='';
    weight='';
    bmiValue='';
    result='';

    inputHandler(event) {
        const {name, value} = event.target;

        if(name === "height") {
            this.height = value;
        }
        if(name === "weight") {
            this.weight = value;
        }

        // Optimized version
        // this[name] = value;
    }

    submitHandler(event) {
        event.preventDefault();
        console.log("Height: ", this.height);
        console.log("Weight: ", this.weight);
        this.calculate();
    }

    calculate() {
        let height = Number(this.height);
        let weight = Number(this.weight);
        let bmi = weight/(height*height)*703;
        this.bmiValue = Number(bmi.toFixed(2));

        if(this.bmiValue < 18.5) {
            this.result = "Possibly underweight";
        } else if(this.bmiValue >= 18.5 && this.bmiValue < 25) {
            this.result = "Healthy";
        } else if(this.bmiValue >= 25 && this.bmiValue < 40) {
            this.result = "Possibly overweight";
        } else {
            this.result = "Possibly reaching obesity";
        }

        console.log("BMI: ", this.bmiValue);
        console.log("Result: ", this.result);
    }

    recalculate() {
        this.height='';
        this.weight='';
        this.bmiValue='';
        this.result='';
    }
}