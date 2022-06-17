class calcController {
    constructor() {
        this._locale = 'pt-BR';

        this._displayOperation = document.querySelector('#operation');
        this._displayCalc = document.querySelector('#display');
        this._dateDisplay = document.querySelector('#date');
        this._timeDisplay = document.querySelector('#time');
        this._currentDate;
        this._operations = [];
        this._ArrayAux = [];

        this.initialize();
        this.initButtons();
    }

    teste(value){
        console.log(value);
    }

    initButtons(){
        let buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn =>{
            btn.addEventListener('click', e => {
                let txtbtn = btn.textContent;
                this.execButton(txtbtn);
            })
        });
    }

    pushOperation(value){
        this._operations.push(value);
    }
    concatOperation(value){
        this._operations[this._operations.length - 1] = this._operations[this._operations.length - 1] + value;
    }

    returnLastOperation(){
        return this._operations[this._operations.length - 1];
    }
    changeOperation(value) {
        this._operations[this._operations.length - 1] = value;
    }

    setError(){
        this.displayCalc = 'ERROR';
    }
    addOperation(value){

        if(this._operations.length == 0){
            if(!isNaN(value)){
                this.pushOperation(value);
                this.displayCalc = this._operations[this._operations.length - 1];
            }
                
        } else {
            if(!isNaN(value) && !isNaN(this.returnLastOperation())){
                this.concatOperation(value);
                this.displayCalc = this._operations[this._operations.length - 1];
            }
            else {
                if(!isNaN(value)){
                    this.pushOperation(value);
                    this.displayCalc = this._operations[this._operations.length - 1];
                } else if(this.isOperation(this.returnLastOperation())){
                    this.changeOperation(value)
                    this.displayOperation = this._operations[0] + " " + this._operations[1];
                } else if(this.isOperation(value)){
                    this.pushOperation(value);
                    this.displayOperation = this._operations[0] + " " + this._operations[1];
                }
            }   
        }

        try{
            if(this._operations.length > 3) {
                let lastOperation = this._operations[3];
                let result = eval(this._operations[0] + this._operations[1] + this._operations[2]);
                this._operations = [result, lastOperation];
                this.displayOperation = this._operations[0] + " " + this._operations[1];
                this.displayCalc = this._operations[0];
            }
        } catch (e){
            this.setError();
        }
        
        // this.displayCalc = '';
        // this._operations.forEach(e => {
        //     this.displayCalc += e;
        // })
        console.log(this._operations);
    }

    result() {
        try{
            if(this._operations.length == 3) {
                let result = eval(this._operations[0] + this._operations[1] + this._operations[2]);
                this.displayOperation = this._operations[0] + " " + this._operations[1] + " " + this._operations[2] + " =";
                this._operations = [result];
                
                this.displayCalc = this._operations[0];
                console.log(this._operations);
            }
        } catch (e){
            this.setError();
        }
    }

    clearEntry(){
        try{
            this._operations.pop();
            this.displayCalc = "0";
        }
        catch (e) {
            this.setError();
        }
        
    }

    clear() {
        this._operations = [];
        this.displayCalc = "0";
        this.displayOperation = "";

    }

    lastIndex(){
        return this._operations.length - 1;
    }

    delete() {
        if(this._operations != null && !isNaN(this._operations[this._operations.length - 1])){
            console.log(this._operations[this._operations.length - 1]);
            this._ArrayAux = this._operations[this._operations.length - 1].toString().split('');
            console.log(this._ArrayAux);
            this._ArrayAux.pop();
            if(this._ArrayAux.length == 0){
                this._operations[this._operations.length - 1] = "";
                this.displayCalc =  "0";
            }else{
                let aa = this._ArrayAux.toString().replace(/,/g, "");
                console.log(aa);
                this._operations.pop();
                this._operations.push(aa);
                this.displayCalc = aa;
            }
        }
        
        
    }

    execButton(value){
        if(!isNaN(value) || this.isOperation(value)){
            this.addOperation(value);
        }
        else
        {
            switch (value){
                case 'CE':
                    this.clearEntry();
                    break;
                case 'C':
                    this.clear();
                    break;
                case '←':
                    this.delete();
                    break;
                case ',':
                    break;
                case '%':
                    break;
                case '√':
                    break;
                case 'x²':
                    break;
                case '¹/x':
                    break;
                case '=':
                    this.result();
                    break;
                case '±':
                    break;
            }
        }
        
    }

    isOperation(value){
        return (['÷', 'X','-', '+'].indexOf(value) != -1)
    }

    initialize() {
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000)
    }

    setDisplayDateTime() {
        this.dateDisplay = this.currentDate.toLocaleDateString(this._locale);
        this.timeDisplay = this.currentDate.toLocaleTimeString(this._locale);
    }

    set dateDisplay(value) {
        this._dateDisplay.innerHTML = value;
    }

    get dateDisplay() {
        return this._dateDisplay.innerHTML;
    }

    set timeDisplay(value) {
        this._timeDisplay.innerHTML = value;
    }

    get timeDisplay() {
        return this._timeDisplay.innerHTML;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

    set displayCalc(value){
        this._displayCalc.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalc.innerHTML;
    }

    set displayOperation(value){
        this._displayOperation.innerHTML = value;
    }

    get displayOperation(){
        return this._displayOperation.innerHTML;
    }

}