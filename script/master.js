// global variables
let currentNumber = NaN;
let storedNumber = NaN;
let nthDigitAfterColon = 0;

// functions
let add = (a, b) => a+b;
let substract = (a, b) => a-b;
let multiply = (a, b) => Math.floor(a*b*10000)/10000;
let divide = (a, b) => b === 0 ? NaN : Math.floor(a*10000/b)/10000;
let operations = {add, substract, multiply, divide};
let operate = (operator, a, b) => operations[operator](a,b);

function clickDigit(digit) {
    if (nthDigitAfterColon > 0) {
        currentNumber += digit * Math.pow(10, -nthDigitAfterColon);
        currentNumber = parseFloat(currentNumber.toFixed(nthDigitAfterColon));
        nthDigitAfterColon++;
    } else {
        currentNumber = currentNumber ? currentNumber * 10 + digit : digit;
    }
    console.log(currentNumber);
}

function clickColon() {
    // if the currentNumber is already a float
    if(nthDigitAfterColon > 0) return;
    // in the case one starts by colon
    if(isNaN(currentNumber)) currentNumber = 0;
    nthDigitAfterColon = 1;
    console.log(currentNumber+'.');
}

function clickClear() {
    currentNumber = NaN;
    currentNumber = NaN;
    nthDigitAfterColon = 0;
    console.log('clear');
}
