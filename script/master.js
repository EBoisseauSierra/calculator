// global variables
let currentNumber = undefined;
let storedNumber = undefined;
let nthDigitAfterColon = 0;
let pendingOperation = '';

// functions
let add = (a, b) => a+b;
let substract = (a, b) => a-b;
let multiply = (a, b) => Math.floor(a*b*10000)/10000;
let divide = (a, b) => b === 0 ? NaN : Math.floor(a*10000/b)/10000;
let operations = {add, substract, multiply, divide};
let operate = (operator, a, b) => operations[operator](a,b);

function clickDigit(digit) {
    if (isThereError()) return;
    if (currentNumber === 'ERROR') return;

    if (nthDigitAfterColon > 0) {
        currentNumber += digit * Math.pow(10, -nthDigitAfterColon);
        currentNumber = parseFloat(currentNumber.toFixed(nthDigitAfterColon));
        nthDigitAfterColon++;
    } else {
        currentNumber = currentNumber ? currentNumber * 10 + digit : digit;
    }
    console.log(storedNumber + ' | ' + currentNumber);
}

function clickColon() {
    if (isThereError()) return;
    // if the currentNumber is already a float
    if(nthDigitAfterColon > 0) return;
    // in the case one starts by colon
    if(currentNumber === undefined) currentNumber = 0;
    nthDigitAfterColon = 1;
    console.log(storedNumber + ' | ' + currentNumber+'.');
}

function clickClear() {
    currentNumber = undefined;
    storedNumber = undefined;
    nthDigitAfterColon = 0;
    console.log('CLEAR');
    console.log(storedNumber + ' | ' + currentNumber);
}

function clickSign() {
    if (isThereError()) return;
    currentNumber *= -1;
    console.log(storedNumber + ' | ' + currentNumber);
}

function clickOperation(operation) {
    // error
    if (isThereError()) return;
    // if an operation is fired without previous action
    if(storedNumber === undefined && currentNumber === undefined) {
        storedNumber = 0;
        currentNumber = 0;
    } else if (storedNumber === undefined) {
        storedNumber = 0;
    } else if (currentNumber === undefined) {
        pendingOperation = operation;
        return;
    }
    storedNumber = (pendingOperation !== '') ? operate(pendingOperation, storedNumber, currentNumber) : currentNumber;
    currentNumber = isNaN(storedNumber) ? 'ERROR' : undefined;
    nthDigitAfterColon = 0;
    pendingOperation = operation;
    console.log(storedNumber + ' | ' + currentNumber);
}

function isThereError() {
    return currentNumber === 'ERROR';
}
