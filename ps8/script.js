document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");
  
    let currentInput = "";
    let operator = "";
    let firstOperand = null;
    let waitingForSecondOperand = false;
  
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        handleButtonClick(button.textContent);
        updateDisplay();
      });
    });
  
    function handleButtonClick(value) {
      if (value === ".") {
        handleDecimalPoint();
      } else if (isNaN(parseFloat(value))) {
        handleOperator(value);
      } else {
        handleNumber(value);
      }
    }
  
    function handleDecimalPoint() {
      if (!currentInput.includes(".")) {
        currentInput += ".";
      }
    }
  
    function handleOperator(value) {
      switch (value) {
        case "C":
          clearCalculator();
          break;
        case "=":
          calculate();
          break;
        default:
          setOperator(value);
          break;
      }
    }
  
    function handleNumber(value) {
        if (waitingForSecondOperand) {
          currentInput = value;
          waitingForSecondOperand = false;
        } else {
          currentInput += value;
        }
      }
      
      function toggleSign() {
        currentInput = currentInput.startsWith("-") ? currentInput.slice(1) : `-${currentInput}`;
      }
    
  
    function setOperator(value) {
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
        operator = value;
        waitingForSecondOperand = true;
      } else {
        calculate();
        operator = value;
        waitingForSecondOperand = true;
      }
    }
  
    function calculate() {
      const secondOperand = parseFloat(currentInput);
      if (!isNaN(secondOperand)) {
        switch (operator) {
          case "+":
            firstOperand += secondOperand;
            break;
          case "-":
            firstOperand -= secondOperand;
            break;
          case "*":
            firstOperand *= secondOperand;
            break;
          case "/":
            if (secondOperand !== 0) {
              firstOperand /= secondOperand;
            } else {
              alert("Cannot divide by zero!");
              clearCalculator();
              return;
            }
            break;
          default:
            break;
        }
        currentInput = firstOperand.toString();
        operator = "";
        waitingForSecondOperand = false;
      }
    }
  
    function clearCalculator() {
      currentInput = "";
      operator = "";
      firstOperand = null;
      waitingForSecondOperand = false;
    }
  
    function updateDisplay() {
      display.value = currentInput || "0";
    }
    document.getElementById("toggle-sign").addEventListener("click", function () {
        toggleSign();
        updateDisplay();
  });
});
  
  
  