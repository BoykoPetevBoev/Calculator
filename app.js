const body = document.getElementById('body');
const result1 = document.getElementById('result1');
const result2 = document.getElementById('result2');

const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eigh = document.getElementById('eigh');
const nine = document.getElementById('nine');
const ten = document.getElementById('ten');
const divNumbers = [one, two, three, four, five, six, seven, eigh, nine, ten];
printTable();

const validBtns = ['00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const resultCalculations = {
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
    const conditionA = validBtns.includes(value) && !endCalculation && !operatorClicked;
    const conditionB = validBtns.includes(value) && !endCalculation && operatorClicked;
    const conditionOperator = resultCalculations.hasOwnProperty(value) && !operatorClicked && a != '' && !endCalculation;
    const conditionForEnd = value === '=' && b != '' && operatorClicked && !endCalculation;
    const conditionForDelete = value === 'CE' && endCalculation === false;
    const conditionForContinueCalc = resultCalculations.hasOwnProperty(value) && endCalculation;
    if (conditionA) {
        a = createVariable(a, value);
        showInfo();
    }
    else if (conditionB) {
        b = createVariable(b, value);
        showInfo();
    }
    else if (conditionOperator) {
        operator = value;
        operatorClicked = true;
        showInfo();
    }
    else if (conditionForEnd) {
        endCalculation = true;
        resultCalculations[operator]();
        printResult();
    }
    else if (conditionForContinueCalc) {
        continueCalc();
    }
    else if (value === 'clear') {
        clearCalculation();
    }
    else if (conditionForDelete) {
        backspace();
    }
}
function printTable(){
    for(let i in divNumbers){
        for(let j of divNumbers){
            const num = Number(i) + 1;
            console.log(j, num, divNumbers[i])
            const p = document.createElement('p');
            const div = divNumbers[i];
            p.textContent = `${num} x ${divNumbers.indexOf(j) + 1} = ${Number(num) * Number(divNumbers.indexOf(j) + 1)}`;
            div.appendChild(p);
        }
    }
}
function continueCalc(){
    a = result;
        b = '';
        operator = value;
        showInfo();
        result2.textContent = '';
        endCalculation = false;
        operatorClicked = true;
}
function backspace(){
    if (b != '') {
            b = b.substring(0, b.length - 1)
        }
        else if(operator !== ''){
            operator = '';
            operatorClicked = false;
        }
        else if(a !== ''){
            a = a.substring(0, a.length - 1)
        }
        showInfo()
}
function clearCalculation(){
    if (a !== '' && operator !== '' && b !== '' && result != 0) {
        historyArr.unshift(`${a} ${operator} ${b} = ${result}`);
        printHistory();
    }
    result1.textContent = '';
    result2.textContent = '';
    a = '';
    b = '';
    result = 0;
    operator = '';
    operatorClicked = false;
    endCalculation = false;
}
function printHistory() {
    const history = document.getElementById('historyDiv');
    history.innerHTML = '<h2></h2>';
    historyArr.forEach(element => {
        const h1 = document.createElement('h1');
        h1.innerHTML = element;
        history.appendChild(h1);
    });
}
function createVariable(x, value) {
    if (value === '.' && !x.includes(value) && x === '') {
        x += `0${value}`;
    }
    else if (value === '.' && !x.includes(value) && x != '') {
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
    result2.textContent = '= ' + result;
}
