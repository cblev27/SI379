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
      if (isNaN(parseFloat(value))) {
        handleOperator(value);
      } else {
        handleNumber(value);
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
  
    function clearCalculator() {
      currentInput = "";
      operator = "";
      firstOperand = null;
      waitingForSecondOperand = false;
    }
  
    function updateDisplay() {
      display.value = currentInput || "0";
    }
  });
  
  
  
  