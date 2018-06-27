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

document.addEventListener('keydown', function(event) {
    if (event.repeat) return;
    switch (event.key) {
        case '0':
            clickDigit(0);
            break;
        case '1':
            clickDigit(1);
            break;
        case '2':
            clickDigit(2);
            break;
        case '3':
            clickDigit(3);
            break;
        case '4':
            clickDigit(4);
            break;
        case '5':
            clickDigit(5);
            break;
        case '6':
            clickDigit(6);
            break;
        case '7':
            clickDigit(7);
            break;
        case '8':
            clickDigit(8);
            break;
        case '9':
            clickDigit(9);
            break;
        case '.':
            clickColon();
            break;
        case ',':
            clickColon();
            break;
        case '+':
            clickOperation('add');
            break;
        case '-':
            clickOperation('substract');
            break;
        case '*':
            clickOperation('multiply');
            break;
        case '/':
            clickOperation('divide');
            break;
        case '=':
            clickOperation('');
            break;
        case 'Enter':
            clickOperation('');
            break;
        case 'Delete':
            clickClear();
            break;
        case 'Backspace':
            clickClear();
            break;
        default:
            console.log(event.key);
            return;
    }
});
