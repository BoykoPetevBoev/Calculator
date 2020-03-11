# Calculator
Use for work, school or personal calculations. You can make not only simple math calculations and calculation of interest on the loan and bank lending rates, the calculation of the cost of works and utilities.

Commands for the online calculator you can enter not only the mouse, but with a digital computer keyboard. Detailed instructions for using the calculator, see below.

## Opportunities

[ 0 ], [ 1 ], [ 2 ], [ 3 ], [ 4 ], [ 5 ], [ 6 ], [ 7 ], [ 8 ], [ 9 ] - standard number keys.

[ 00 ] - key input 2 zeros.

[ . ] - floating point number.
```
const validBtns = ['00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
```

[ + ] - addition.

[ - ] - subtraction.

[ х ] - multiplication.

[ ÷ ] - division.

[ % ] - calculates percentages.

[ √ ] - calculate the square root.
```
const resultCalculations = {
    '+': () => result = Number(a) + Number(b),
    '-': () => result = Number(a) - Number(b),
    'x': () => result = Number(a) * Number(b),
    '/': () => result = Number(a) / Number(b),
    '%': () => result = Number(a) / 100 * Number(b)
}
```
[ +/- ] - change the mathematical sign of.

[ → ] - remove the last character on the display.

[ c ] - clear button.

[ π ] - 3.141592653589793

[ 1/2 ], [ 1/3 ], [ 2/3 ], [ 3/4 ], [ 7/8 ] - buttons.

### History div
```
<div id="historyDiv"> </div>
```

