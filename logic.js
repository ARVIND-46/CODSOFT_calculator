const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');

let currentInput = '';
const operators = ['+', '-', '*', '/', '**'];

// Clear
clearButton.addEventListener('click', () => {
  currentInput = '';
  display.value = '';
});

// Backspace
backspaceButton.addEventListener('click', () => {
  if (currentInput === 'Error') {
    currentInput = '';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  display.value = currentInput;
});

// Button click logic
buttons.forEach(button => {
  const value = button.textContent;

  button.addEventListener('click', () => {
    if (value === '=') {
      try {
        currentInput = eval(currentInput).toString();
      } catch {
        currentInput = 'Error';
      }
    } else if (value === 'AC' || value === 'X') {
      return; // handled separately
    } else {
      if (currentInput === 'Error') currentInput = '';

      if (operators.includes(value)) {
        if (currentInput === '' || operators.includes(currentInput.slice(-1))) {
          return;
        }
      }

      currentInput += value;
    }

    display.value = currentInput;
  });
});

// Keyboard input
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if ((key >= '0' && key <= '9') || key === '.') {
    if (currentInput === 'Error') currentInput = '';
    currentInput += key;
  } else if (['+', '-', '*', '/', '**'].includes(key)) {
    if (currentInput === '' || operators.includes(currentInput.slice(-1))) return;
    currentInput += key;
  } else if (key === 'Enter') {
    event.preventDefault();
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = '';
    }
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (key === 'Escape') {
    currentInput = '';
  }

  display.value = currentInput;
});
