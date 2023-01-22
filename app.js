class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }
    // clear the display whenever you click on all Clear AC
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.calculated = false;

    }
    // to delete the current operand whenever we click del
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    // this is to add number to the display from clicking the numbers
    appendNumber(number){
        // return stops the function of append number
        if(this.calculated === true)this.clear();
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }
    // for us to select the operation(+,-,* or +)
    chooseOperation(operation){

        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand + operation;
        this.currentOperand = '';

    }
    // do the mathematicallogic logic operation
    compute(){
        let computation 
        const prev = parseFloat(this.previousOperand) // converts this.previousOperand back to number
        const current = parseFloat(this.currentOperand) 
        // untill the person fills in a current operand/number compute function should not run
        if(isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current  
                break;
            case '-':
                computation = prev - current
                break;    
            case '÷':
                computation = prev / current
                break;    
            case '*':
                computation = prev * current
                break;    
        
            default:
                return;
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.calculated = true;
    }

    // show the display on calculator
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;

    }
}




// we are collecting these elements and assigning them to a variable
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//instantiating the class on a new object

const calculator = new Calculator(previousOperandTextElement, 
currentOperandTextElement);

numberButtons.forEach(
                button => {
                    button.addEventListener(
                        //type
                        'click', 
                        // function
                        () => {
                            calculator.appendNumber(button.innerText)
                            calculator.updateDisplay()

                        }
                    )
                }
            )
//to enable us show operation
operationButtons.forEach(
            button => {
                button.addEventListener(
                    //type
                    'click', 
                    // function
                    () => {
                        calculator.chooseOperation(button.innerText)
                        calculator.updateDisplay()

                    }
                )
            }
            )

equalsButton.addEventListener(
                        //type
                        'click', 
                        // function
                        button => {
                            calculator.compute()
                            calculator.updateDisplay()

                        }
                    )
allClearButtons.addEventListener(
                            'click',
                            button => {
                                calculator.clear()
                                calculator.updateDisplay()
                            }

)               
deleteButton.addEventListener(
                            'click',
                            button => {
                                calculator.delete()
                                calculator.updateDisplay()
                            }

                        )               