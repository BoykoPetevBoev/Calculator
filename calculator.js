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
        value = 'CE';
    }
    else if (value == 'Delete') {
        value = 'clear';
    }
    eventHandler(value);
});
const numButtons = ['00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const calculations = {
    '+': (a, b) => Number(a) + Number(b),
    '-': (a, b) => Number(a) - Number(b),
    'x': (a, b) => Number(a) * Number(b),
    '/': (a, b) => Number(a) / Number(b),
    '%': (a, b) => Number(a) / 100 * Number(b)
}
let expressionElements = [];
let resultElements = [];
let endCalculation = false;
let lockEqualButton = true;
const maxLengthNum = 16;

function eventHandler(value) {
    console.log(value)
    if (numButtons.includes(value) && !endCalculation) {
        createNum(value);
    }
    else if (calculations.hasOwnProperty(value) && expressionElements.length !== 0 && !endCalculation) {
        addOperation(value);
    }
    else if (value === '=' && expressionElements.length !== 0 && !endCalculation && !lockEqualButton) {
        showResult();
    }
    else if (value === 'clear' && expressionElements.length !== 0) {
        clearCalculation();
    }
    else if (value === 'CE' && expressionElements.length !== 0 && !endCalculation) {
        deleteLastChar(expressionElements, 0);
        expressionElements
    }
    // else if (value === '±' && end === false) {
    //     changeSign();
    //     printInfo(a, b);
    // }
    // else if (value == 'π' && end === false) {
    //     if (a == '') {
    //         a = Math.PI;
    //         showExpression(a);
    //     }
    //     else if (a !== '' && operator !== '' && b === '') {
    //         b = Math.PI;
    //         showExpression(`${a} ${operator} ${b}`);
    //     }
    //     printInfo(a, b);
    // }
    printExpression();
}
function createNum(sym) {
    const lastElementIsNum = !calculations.hasOwnProperty(expressionElements[0]);
    const lastElement = expressionElements[0];
    if (expressionElements.length == 0) {
        sym = fixDotBugs(sym === '.', 'addZero', sym);
        expressionElements.unshift(sym);
    }
    else if (lastElementIsNum) {
        sym = fixDotBugs(lastElement.includes('.') && sym === '.', 'doNotAddMultipleDots', sym);
        expressionElements[0] += sym;
    }
    else {
        sym = fixDotBugs(sym === '.', 'addZero', sym);
        expressionElements.unshift(sym);
    }
    if(expressionElements.length >= 3){
        lockEqualButton = false;
    }
}
function addOperation(operator) {
    const lastElementIsNum = !calculations.hasOwnProperty(expressionElements[0]);
    if (lastElementIsNum) {
        expressionElements[0] = fixDotBugs(expressionElements[0].endsWith('.'), 'removeEndDot', expressionElements[0])
        expressionElements.unshift(operator);
    }
}
function fixDotBugs(condition, command, sym) {
    const oprions = {
        'addZero': () => sym = '0.',
        'doNotAddMultipleDots': () => sym = '',
        'removeEndDot': () => sym = sym.replace('.', '')
    }
    if (condition) {
        oprions[command]();
    }
    return sym;
}
function createDomElement(element, className, text) {
    const result = document.createElement(element);
    if (className !== false) {
        result.className = className;
    }
    if (text !== false) {
        result.textContent = text;
    }
    return result;
}
function printExpression() {
    const expressionDiv = document.getElementById('expression');
    expressionDiv.innerHTML = '';
    resultElements = [];
    fillResultArray(resultElements);
    resultElements.forEach(element => {
        expressionDiv.appendChild(element);
    });
}
function fillResultArray(resultElements) {
    let domElement;
    expressionElements.forEach(element => {
        calculations.hasOwnProperty(element)
            ? domElement = createDomElement('p', 'sym', element)
            : domElement = createDomElement('p', 'num', element)
        resultElements.push(domElement);
    });
}
function clearCalculation() {
    const expressionDiv = document.getElementById('expression');
    const resultDiv = document.getElementById('resultDiv');
    expressionDiv.innerHTML = '';
    resultDiv.innerHTML = '';
    resultElements = [];
    expressionElements = [];
    endCalculation = false
    lockEqualButton = true;
}
function showResult() {
    const expression = expressionElements.slice(0);
    console.log(expression)
    const result = expressionHandler(expression);
    const resultDiv = document.getElementById('resultDiv');
    console.log(result)
    const domElement = createDomElement('p', false, result);
    console.log(expression)
    resultDiv.appendChild(domElement);
    endCalculation = true;
}
function expressionHandler(expression) {
    expression = calculationsInArray(expression, '/');
    expression = calculationsInArray(expression, 'x');
    expression = calculationsInArray(expression, '-');
    expression = calculationsInArray(expression, '+');
    return expression;
}
function calculationsInArray(expression, operator) {
    let index = expression.indexOf(operator);

    while (index !== -1) {
        const a = Number(expression[index + 1]);
        const b = Number(expression[index - 1]);
        if( isNaN(a) || isNaN(b)){
            break;
        }
        let result = calculations[operator](a, b);
        console.log(a, b)
        expression.splice(index - 1, 3, result);
        index = expression.indexOf(operator);
 
    }
    return expression;
}
function  deleteLastChar(array, index){
    const text = array[index].toString();
    if(text.length === 1){
        array.splice(index, 1);
    }
    else if(text.length > 1){
        array[index] = text.substring(0, text.length - 1);
    }
}
