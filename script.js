//your code here
class OutOfRangeError extends Error {
    constructor(arg) {
        super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
        this.name = "OutOfRangeError";
    }
}

class InvalidExprError extends Error {
    constructor() {
        super("Expression should not have an invalid combination of expression");
        this.name = "InvalidExprError";
    }
}

function evalString(expression) {
    if (/[\+\-\*\/]{2,}/.test(expression)) {
        throw new InvalidExprError();
    }
    if (/^[\+\*\/]/.test(expression)) {
        throw new SyntaxError("Expression should not start with invalid operator");
    }
    if (/[\+\-\*\/]$/.test(expression)) {
        throw new SyntaxError("Expression should not end with invalid operator");
    }
    if (/[^0-9+\-*/\s]/.test(expression)) {
        let invalidChar = expression.match(/[^0-9+\-*/\s]/)[0];
        throw new OutOfRangeError(invalidChar);
    }
    return eval(expression);
}

function evaluateExpression() {
    const inputField = document.getElementById("expression");
    const resultField = document.getElementById("result");

    try {
        let result = evalString(inputField.value.trim());
        resultField.textContent = `Result: ${result}`;
        resultField.style.color = "green";
    } catch (error) {
        resultField.textContent = `${error.name}: ${error.message}`;
        resultField.style.color = "red";
    }
}
