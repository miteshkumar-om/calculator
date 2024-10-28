let calculatorOn = false;

function toggleCalculator() {
    calculatorOn = !calculatorOn;
    const calculator = document.querySelector('.calculator');
    const screen = document.querySelector('.calculator-screen');
    const buttons = document.querySelectorAll('.calculator-keys button');

    let calculatorOn = false;

    function toggleCalculator() {
        calculatorOn = !calculatorOn;
        const calculator = document.querySelector('.calculator');
        const screen = document.querySelector('.calculator-screen');
        const buttons = document.querySelectorAll('.calculator-keys button');
    
        if (calculatorOn) {
            calculator.classList.remove('calculator-off');
            screen.value = '0'; // Ensure screen shows default '0' when turned on
            buttons.forEach(button => {
                button.disabled = false; // Enable buttons
            });
        } else if (!calculatorOn && screen.value !== 'OFF') {
            screen.value = 'OFF';
            buttons.forEach(button => {
                button.disabled = true; // Disable buttons
            });
        } else {
            calculator.classList.add('calculator-off');
            screen.value = 'OFF';
            buttons.forEach(button => {
                button.disabled = true; // Ensure buttons stay disabled
            });
        }
    }
}
// Existing calculator functionality
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
    } else if (target.classList.contains('all-clear')) {
        resetCalculator();
    } else {
        inputDigit(target.value);
    }

    updateDisplay();
});

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}