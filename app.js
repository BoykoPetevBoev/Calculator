const body = document.getElementById('body');
const result1 = document.getElementById('result1');
const result2 = document.getElementById('result2');

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operators = {
    '+': () => result = Number(a) + Number(b),
    '-': () => result = Number(a) - Number(b),
    'x': () => result = Number(a) * Number(b),
    '/': () => result = Number(a) / Number(b),
    '*': () => result = Number(a) * Number(b),
}

let operatorClicked = false;
let endCalculation = false;
let operator = '';
let a = '';
let b = '';
let result = 0;
const historyArr = [];

body.addEventListener('click', function (e) {
    const value = e.target.value;
    eventHandler(value);
});
document.addEventListener('keyup', function (e) {
    let value = e.key;
    if (value == 'Enter') {
        value = '=';
    }
    eventHandler(value);
});
function eventHandler(value) {
    if (nums.includes(value) && !endCalculation && !operatorClicked) {
        a = createVariable(a, value);
        showInfo();
    }
    if (nums.includes(value) && !endCalculation && operatorClicked) {
        b = createVariable(b, value);
        showInfo();
    }
    else if (operators.hasOwnProperty(value) && !operatorClicked && a != '' && !endCalculation) {
        operator = value;
        operatorClicked = true;
        showInfo();
    }
    else if (value === '=' && b != '' && operatorClicked && !endCalculation) {
        endCalculation = true;
        operators[operator]();
        printResult();
    }
    else if (operators.hasOwnProperty(value) && endCalculation) {
        a = result;
        b = '';
        operator = value;
        showInfo();
        result2.textContent = '';
        endCalculation = false;
        operatorClicked = true;
    }
    else if (value === 'clear') {
        historyArr.unshift(`${a} ${operator} ${b} = ${result}`);
        printHistory();
        result1.textContent = '';
        result2.textContent = '';
        a = '';
        b = '';
        result = 0;
        operator = '';
        operatorClicked = false;
        endCalculation = false;
    }
}
function printHistory(){
    const history = document.getElementById('historyDiv');
    history.innerHTML = '<h2>HISTORY 4.0</h2>';
    historyArr.forEach(element => {
        const h1 = document.createElement('h1');
        h1.innerHTML = element;
        history.appendChild(h1);
    });
}
function createVariable(x, value) {
    if (value === '.' && !x.includes(value) && x != '') {
        x += value;
    } else if (value != '.') {
        x += value;
    }
    return x;
}
function showInfo() {
    result1.textContent = `${a} ${operator} ${b}`;
}
function printResult() {
    result2.textContent = result;
}
