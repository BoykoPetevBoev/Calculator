startTime();

const calculator = document.getElementById('calculator');
calculator.addEventListener('click', function (e) {
    const value = e.target.value;
    eventHandler(value);
});
document.addEventListener('keyup', function (e) {
    let value = e.key;
    if (value == 'Enter') {
        value = '=';
    }
    else if (value == '*') {
        value = 'x';
    }
    else if (value == 'Backspace') {
        value = 'CE'
    }
    else if (value == 'Delete') {
        value = 'clear'
    }
    eventHandler(value);
});
const validBtns = ['00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let result = 0;
const resultCalculations = {
    '+': () => result = Number(a) + Number(b),
    '-': () => result = Number(a) - Number(b),
    'x': () => result = Number(a) * Number(b),
    '/': () => result = Number(a) / Number(b),
    '%': () => result = Number(a) / 100 * Number(b)
}
let end = false;
let operator = '';
let a = '';
let b = '';
const maxLengthNum = 16;

function eventHandler(value) {
    console.log(value)
    const conditionFractionalExpression = end == false && a !== '' && operator == '' && (value == '½' || value == '⅓' || value == '⅔' || value == '¾' || value == '⅞');
    if (validBtns.includes(value) || resultCalculations.hasOwnProperty(value)) {
        createExpression(value);
    }
    else if (value === '=') {
        endCalculation();
    }
    else if (value === 'clear') {
        clearCalculation();
        printInfo(0, 0);
    }
    else if (value === 'CE' && end === false) {
        backspace();
        printInfo(a, b);
    }
    else if (value === '±' && end === false) {
        changeSign();
        printInfo(a, b);
    }
    else if (conditionFractionalExpression) {
        calculateFractionalExpression(value);
    }
    else if(value == 'π' && end === false){
        if(a == ''){
            a = Math.PI;
            showExpression(a);
        }
        else if(a !== '' && operator !== '' && b === ''){
            b = Math.PI;
            showExpression(`${a} ${operator} ${b}`);
        }
        printInfo(a, b);
    }
}
function createExpression(value) {
    const conditionA = end === false && validBtns.includes(value) && operator === '' && a.length < maxLengthNum;
    const conditionB = end === false && validBtns.includes(value) && operator !== '' && b.length < maxLengthNum;
    const conditionOperator = end === false && resultCalculations.hasOwnProperty(value) && a != '' && b == '';
    const conditionContinue = end === true && resultCalculations.hasOwnProperty(value);
    if (conditionA) {
        a = createVariable(a, value);
        printInfo(a, 0);
        showExpression(a);
    }
    else if (conditionB) {
        b = createVariable(b, value);
        printInfo(a, b);
        showExpression(`${a} ${operator} ${b}`);
    }
    else if (conditionOperator) {
        operator = value;
        a = checkEnd(a);
        showExpression(`${a} ${operator}`);
    }
    else if (conditionContinue) {
        continueCalc(value);
    }
}
function checkEnd(num) {
    if (num.toString().endsWith('.')) {
        num = num.replace('.', '');
    }
    return num;
}
function showExpression(expression) {
    const result1 = document.getElementById('result1');
    result1.textContent = expression;
}
function endCalculation() {
    const conditionEnd = b != '' && operator !== '' && end === false;
    if (conditionEnd) {
        b = checkEnd(b);
        end = true;
        resultCalculations[operator]();
        showExpression(`${a} ${operator} ${b}`);
        printResult(`= ${result}`);
    }
}
function continueCalc(value) {
    a = result.toString();
    b = '';
    operator = value;
    end = false;
    showExpression(`${a} ${operator}`);
    printResult('');
}
function backspace() {
    if (b != '') {
        b = b.toString();
        b = b.substring(0, b.length - 1);
    }
    else if (operator !== '') {
        operator = '';
    }
    else if (a !== '') {
        a = a.toString();
        a = a.substring(0, a.length - 1);
    }
    showExpression(`${a} ${operator} ${b}`);
}
function clearCalculation() {
    if (a !== '' && operator !== '' && b !== '' && end == true) {
        const line = `${a} ${operator} ${b} = ${result}`;
        printHistory(line);
    }
    result1.textContent = '';
    result2.textContent = '';
    a = '';
    b = '';
    result = 0;
    operator = '';
    end = false;
}
function createVariable(x, value) {
    if (value === '.' && !x.includes(value) && x === '') {
        x += `0${value}`;
    }
    else if (value === '.' && !x.includes(value) && x !== '') {
        x += value;
    }
    else if (value != '.') {
        x += value;
    }
    return x;
}
function changeSign() {
    if (a !== '' && operator === '') {
        a = Number(a) * (-1)
        showExpression(a);
    }
    else if (operator === '+') {
        operator = '-';
        showExpression(`${a} ${operator} ${b}`);
    }
    else if (operator === '-') {
        operator = '+';
        showExpression(`${a} ${operator} ${b}`);
    }
}
function calculateFractionalExpression(FE) {
    const expression = {
        '½': () => result = Number(a) / 2,
        '⅓': () => result = Number(a) / 3,
        '⅔': () => result = (Number(a) * 2) / 3,
        '¾': () => result = (Number(a) * 3) / 4,
        '⅞': () => result = (Number(a) * 7) / 8
    }
    operator = '';
    b = FE;
    expression[FE]();
    end = true;
    showExpression(`${a} ${operator} ${b}`);
    printResult(`= ${result}`);
}
function printResult(result) {
    const result2 = document.getElementById('result2');
    result2.textContent = result;
}
function printHistory(line) {
    const history = document.getElementById('historyDiv');
    const p = document.createElement('p');
    p.innerHTML = line;
    history.appendChild(p);
}
function printInfo(infoA, infoB){
    if(infoA == ''){
        infoA = 0;
    }
    if(infoB == ''){
        infoB = 0;
    }
    if(operator == '-'){
        infoB = '-' + infoB;
    }
    const div = document.getElementById('infoAB');
    div.innerHTML = `<p>A = ${infoA}</p><p>B = ${infoB}</p>`;
}


