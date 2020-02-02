const body = document.getElementById('body');
const result1 = document.getElementById('result1');
const result2 = document.getElementById('result2');

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', 'x', '/'];

let operatorClicked = false;
let end = false;
let operator = '';
let num = '';
let a = 0;
let b = 0;

body.addEventListener('click', function (ctx) {
    const value = ctx.target.value;
    console.log(value)
    if (nums.includes(value) && !end) {
        result1.textContent += value;
        num += value;
    }
    else if (operators.includes(value) && !operatorClicked && num != '' && !end) {
        operator = value;
        result1.textContent += value;
        a = Number(num);
        num = '';
        operatorClicked = true;
    }
    else if (value === '=' && num != '' && operatorClicked && !end) {
        end = true;
        b = Number(num);
        printResult(a, b, operator);
    }
    else if(value === 'clear'){
        result1.textContent = '';
        result2.textContent = '';
        a = 0;
        b = 0;
        operator = '';
        operatorClicked = false;
        num = '';
        end = false;
    }
});
function printResult(a, b, operator) {
    console.log(a, b, operator)
    if(operator == '+'){
        result2.textContent += ` = ${a + b}`;
    }
    else if(operator == '-'){
        result2.textContent += `= ${a - b}`;
    }
    else if(operator == 'x'){
        result2.textContent += `= ${a * b}`;
    }
    else if(operator == '/'){
        result2.textContent += `= ${a / b}`;
    }
}
