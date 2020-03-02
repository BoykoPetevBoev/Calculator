startTime();

function calculateFractionalExpression(FE) {
    const expression = {
        '½': () => result = Number(a) / 2,
        '⅓': () => result = Number(a) / 3,
        '⅔': () => result = (Number(a) * 2) / 3,
        '¾': () => result = (Number(a) * 3) / 4,
        '⅞': () => result = (Number(a) * 7) / 8
    }
}
function printHistory(line) {
    const history = document.getElementById('rightSideDiv');
    const p = createDomElement('p');
    p.innerHTML = line;
    history.appendChild(p);
}
function printInfo(expression, result){
    const info = document.getElementById('infoAB');
    const e = createDomElement('p', 'expression', expression);
    const r = createDomElement('p', 'result', `= ${result}`);
    const line = createDomElement('div', false, false);
    line.appendChild(e);
    line.appendChild(r);
    info.appendChild(line);

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
export { printInfo } ;



