const calculator = document.getElementById('calculator');
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

startTime();
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
const maxLengthNum = 16;
const historyArr = [];

calculator.addEventListener('click', function (e) {
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
    const conditionA = validBtns.includes(value) && !endCalculation && !operatorClicked && a.length < maxLengthNum;
    const conditionB = validBtns.includes(value) && !endCalculation && operatorClicked && b.length < maxLengthNum;
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
        continueCalc(value);
    }
    else if (value === 'clear') {
        clearCalculation();
    }
    else if (conditionForDelete) {
        backspace();
    }
}
function printTable() {
    for (let i in divNumbers) {
        let div = divNumbers[i];
        const h3 = document.createElement('h3')

        for (let j of divNumbers) {
            const num = Number(i) + 1;
            const p = document.createElement('p');
            div = divNumbers[i];
            p.textContent = `${num} x ${divNumbers.indexOf(j) + 1} = ${Number(num) * Number(divNumbers.indexOf(j) + 1)}`;
            div.appendChild(p);
        }
    }
}
function continueCalc(value) {
    a = result;
    b = '';
    operator = value;
    showInfo();
    result2.textContent = '';
    endCalculation = false;
    operatorClicked = true;
}
function backspace() {
    if (b != '') {
        b = b.substring(0, b.length - 1)
    }
    else if (operator !== '') {
        operator = '';
        operatorClicked = false;
    }
    else if (a !== '') {
        a = a.substring(0, a.length - 1)
    }
    showInfo()
}
function clearCalculation() {
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
    history.innerHTML = '<h3></h3>';
    historyArr.forEach(element => {
        const h3 = document.createElement('h3');
        h3.innerHTML = element;
        history.appendChild(h3);
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
function startTime() {
    const today = new Date();

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    dd = checkTime(dd);
    mm = checkTime(mm);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = `${h}:${m}:${s} ${dd}.${mm}.${yyyy} `;
    var t = setTimeout(startTime, 500);
    function checkTime(i) {
        i = Number(i);
      if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
    }
  }
