document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputField');

    document.addEventListener('keydown', (event) => {
        handleKeyboardInput(event);
    });
});

function appendCharacter(char) {
    const inputField = document.getElementById('inputField');
    inputField.value += char;
}

function clearDisplay() {
    const inputField = document.getElementById('inputField');
    inputField.value = '';
}

function deleteLast() {
    const inputField = document.getElementById('inputField');
    inputField.value = inputField.value.slice(0, -1);
}

function calculate() {
    const inputField = document.getElementById('inputField');
    let expression = inputField.value;

    expression = expression.replace(/π/g, 'Math.PI');
    expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/log\(/g, 'Math.log10(');
    expression = expression.replace(/sin\(/g, 'Math.sin(');
    expression = expression.replace(/cos\(/g, 'Math.cos(');
    expression = expression.replace(/tan\(/g, 'Math.tan(');
    expression = expression.replace(/(\d+)!/g, (match, num) => factorial(num));

    try {
        const result = eval(expression);
        inputField.value = result;
    } catch (error) {
        inputField.value = 'Error';
    }
}

function factorial(n) {
    if (n < 0) return 'Error';
    return n ? n * factorial(n - 1) : 1;
}

function handleKeyboardInput(event) {
    const inputField = document.getElementById('inputField');
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/' || key === '.' || key === '(' || key === ')') {
        appendCharacter(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}
