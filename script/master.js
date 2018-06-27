// global functions
let add = (a, b) => a+b;
let substract = (a, b) => a-b;
let multiply = (a, b) => Math.floor(a*b*10000)/10000;
let divide = (a, b) => b === 0 ? NaN : Math.floor(a*10000/b)/10000;
let operate = (operator, a, b) => operations[operator](a,b);

// global variables
let currentNumber;
let storedNumber;
let result;
let nthDigitAfterColon;
let pendingOperation;
const screenBottom = document.querySelector('#screen-bottom');
const screenTop = document.querySelector('#screen-top');
const operations = {add, substract, multiply, divide};
const operationToSymbol = {
    add: '+',
    substract: '−',
    multiply: '×',
    divide: '÷'
};

// at beginning
window.onload = clickClear();

// when a new digit is triggered
function clickDigit(digit) {
    if (isThereError()) return;
    // if a result is currently displayed, remove it (i.e. starting a fresh operation after a result)
    if (screenTop.textContent.slice(-1) === '=') {
        clickClear();
    }

    // we consider whether the digit is an integer or a float
    if (nthDigitAfterColon > 0) {
        currentNumber += digit * Math.pow(10, -nthDigitAfterColon);
        currentNumber = parseFloat(currentNumber.toFixed(nthDigitAfterColon));
        nthDigitAfterColon++;
    } else {
        currentNumber = currentNumber ? currentNumber * 10 + digit : digit;
    }
    displayCurrentNumber();
}

// when '.' is triggered
function clickColon() {
    if (isThereError()) return;
    // if a result is currently displayed, remove it (i.e. starting a fresh operation after a result)
    if (screenTop.textContent.slice(-1) === '=') {
        clickClear();
    }
    // if already a float, a new colon does nothing
    if(nthDigitAfterColon > 0) return;
    // if colon is the first key pressed, assume 0
    if(currentNumber === undefined) currentNumber = 0;
    nthDigitAfterColon = 1;
    displayCurrentNumber(currentNumber+'.');
}

// when 'clear' is triggered
function clickClear() {
    currentNumber = undefined;
    storedNumber = undefined;
    result = undefined;
    pendingOperation = '';
    nthDigitAfterColon = 0;
    displayStoredContent('');
    displayCurrentNumber('');
}

// when ± is triggered
function clickSign() {
    if (isThereError()) return;
    currentNumber *= -1;
    displayCurrentNumber();
}

// when = is triggered
function clickEqual() {
    if (isThereError()) return;
    // if no previous action
    if(storedNumber === undefined && currentNumber === undefined) return;
    // if no currentNumber
    if(currentNumber === undefined || isNaN(currentNumber)) {
        pendingOperation = '';
        displayStoredContent(`${storedNumber} =`);
        displayCurrentNumber(storedNumber);
        return;
    }
    // if no pendingOperation
    if(pendingOperation === '') {
        storedNumber = currentNumber;
        currentNumber = undefined;
        nthDigitAfterColon = 0;
        return;
    }
    displayStoredContent(`${screenTop.textContent} ${currentNumber} =`);
    result =  operate(pendingOperation, storedNumber, currentNumber);
    displayCurrentNumber(result);
    storedNumber = result;
    currentNumber = undefined;
    result = undefined;
    nthDigitAfterColon = 0;
    pendingOperation = '';
}

// when +-*/ is triggered
function clickOperation(operation) {
    // error
    if (isThereError()) return;
    // if no currentNumber, just remember operation
    if (currentNumber === undefined) {
        // TODO: cas où la première opération est - (voir +)
        displayStoredContent(`${storedNumber} ${operationToSymbol[operation]}`);
        displayCurrentNumber('')
        pendingOperation = operation;
        return;
    }
    // if no stored number, assume 0
    storedNumber = storedNumber === undefined ? 0 : storedNumber;
    // perform pendingOperation if any
    if (pendingOperation !== ''){
        result = operate(pendingOperation, storedNumber, currentNumber);
        storedNumber = result;
        result = undefined;
        currentNumber = undefined;
        nthDigitAfterColon = 0;
    } else {
        // test if a result is currently displayed
        storedNumber = currentNumber === undefined ? storedNumber : currentNumber;
        currentNumber = undefined;
        nthDigitAfterColon = 0;
    }
    pendingOperation = operation;
    displayStoredContent(`${storedNumber} ${operationToSymbol[operation]}`);
    displayCurrentNumber('');
}

function isThereError() {
    if(Number.isNaN(currentNumber) || Number.isNaN(storedNumber)) {
        displayCurrentNumber('ERROR');
        return true;
    }
    return false;
}

function displayCurrentNumber(text = currentNumber.toFixed(nthDigitAfterColon ? nthDigitAfterColon-1 : 0)) {
    screenBottom.textContent = text;
}

function displayStoredContent(text = storedNumber) {
    screenTop.textContent = text;
}

document.addEventListener('keydown', function(event) {
    if (event.repeat) return;
    switch (event.key) {
        case '0':
            clickDigit(Number(event.key));
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
            clickEqual();
            break;
        case 'Enter':
            clickEqual();
            break;
        case 'Delete':
            clickClear();
            break;
        case 'Backspace':
            clickClear();
            break;
        default:
            return;
    }
});
