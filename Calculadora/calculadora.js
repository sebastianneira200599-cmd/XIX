let currentInput = '0';
let shouldResetScreen = false;
const display = document.getElementById('display');

function updateDisplay() {
  display.innerText = currentInput;
}

function appendNumber(number) {
  if (currentInput === '0' || shouldResetScreen || currentInput === 'Error') {
    currentInput = number;
    shouldResetScreen = false;
  } else {
    const parts = currentInput.split(/[+\-*/]/);
    const currentPart = parts[parts.length - 1];
    if (number === '.' && currentPart.includes('.')) return;
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === 'Error') return;
  const lastChar = currentInput.slice(-1);
  if (['+', '-', '*', '/'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  shouldResetScreen = false;
  updateDisplay();
}

function deleteLast() {
  if (currentInput === 'Error') {
    clearDisplay();
    return;
  }
  if (currentInput.length === 1) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  shouldResetScreen = false;
  updateDisplay();
}

function calculate() {
  if (currentInput === 'Error') return;
  try {
    const result = new Function('return ' + currentInput)();
    if (!isFinite(result) || isNaN(result)) {
      currentInput = 'Error';
    } else {
      currentInput = String(Math.round(result * 100000000) / 100000000);
    }
  } catch (error) {
    currentInput = 'Error';
  }
  shouldResetScreen = true;
  updateDisplay();
}

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/[0-9]/.test(key)) {
    appendNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault(); 
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape' || key.toLowerCase() === 'c') {
    clearDisplay();
  } else if (key === '.' || key === ',') {
    appendNumber('.');
  }
});