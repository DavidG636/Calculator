$(function() {
  $("#result").val("0");
  var numbers = [];
  var action;
  var operationPressed = false;
  var numberPressed = false;
  var pastNumAndOperation = [];

  $("input[type=button]").click(function() {
    var buttonText = $(this).val();
    switch (buttonText) {
      case "C":
        $("#result").val("0");
        numbers = [];
        action = undefined;
        operationPressed = false;
        numberPressed = false;
        break;
      case ".":
        processValue(".");
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        pastNumAndOperation = [];
        processValue(buttonText);
        operationPressed = true;
        numberPressed = false;
        break;
      case "=":
        if (pastNumAndOperation[0] != undefined) {
          numbers = [numbers[0], pastNumAndOperation[0]];
          action = pastNumAndOperation[1];
        }
        solve(numbers, action);
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        pastNumAndOperation = [];
        if (operationPressed) {
          $("#result").val(0);
        }
        processValue(buttonText);
        operationPressed = false;
        numberPressed = true;
        break;
      default:
        break;
    }
  });

  function processValue(value) {
    if ((value == "+" || value == "-" || value == "*" || value == "/") && (operationPressed && !numberPressed)) {
      numbers = [];
      action = undefined;
    }

    if (value == "+" && action == undefined) {
      numbers.push(Number($("#result").val()));
      action = "addition"
    } else if (value == "+" && action != undefined) {
      numbers.push(Number($("#result").val()));
      console.log(numbers);
      solve(numbers, action);
      action = "addition"
    }
    else if (value == "-" && action == undefined) {
      numbers.push(Number($("#result").val()));
      action = "subtraction"
    } else if (value == "-" && action != undefined) {
      numbers.push(Number($("#result").val()));
      solve(numbers, action);
      action = "subtraction"
    }
    else if (value == "*" && action == undefined) {
      numbers.push(Number($("#result").val()));
      action = "multiplication"
    } else if (value == "*" && action != undefined) {
      numbers.push(Number($("#result").val()));
      solve(numbers, action);
      action = "multiplication"
    }
    else if (value == "/" && action == undefined) {
      numbers.push(Number($("#result").val()));
      action = "divsion"
    } else if (value == "/" && action != undefined) {
      numbers.push(Number($("#result").val()));
      solve(numbers, action);
      action = "division"
    }else if ($("#result").val() == "0" && value != ".") {
      $("#result").val(value)
    } else {
      $("#result").val($("#result").val() + value);
    }
  }

  function solve(numArray, operation) {
    if (numberPressed && numArray[1] == undefined) {
      numbers.push(Number($("#result").val()));
      solve(numbers, operation);
      return;
    }

    switch (operation) {
      case "addition":
      console.log(numArray[0], numArray[1]);
        let sum = numArray[0] + numArray[1];
        console.log(typeof sum, sum);
        if (sum % 1 === 0) {
          sum = Math.floor(sum);
        }
        $("#result").val(sum);
        pastNumAndOperation.push(numArray[1]);
        pastNumAndOperation.push(operation);
        numbers = [];
        numbers.push(sum);
        action = undefined;
        break;
      case "subtraction":
        let difference = numArray[0] - numArray[1];
        if (difference % 1 === 0) {
          difference = Math.floor(difference);
        }
        $("#result").val(difference);
        pastNumAndOperation.push(numArray[1]);
        pastNumAndOperation.push(operation);
        numbers = [];
        numbers.push(difference);
        action = undefined;
        break;
      case "multiplication":
        let product = numArray[0] * numArray[1];
        if (product % 1 === 0) {
          product = Math.floor(product);
        }
        $("#result").val(product);
        pastNumAndOperation.push(numArray[1]);
        pastNumAndOperation.push(operation);
        numbers = [];
        numbers.push(product);
        action = undefined;
        break;
      case "division":
        let quotient = numArray[0] / numArray[1];
        if (quotient % 1 === 0) {
          quotient = Math.floor(quotient);
        }
        $("#result").val(quotient);
        pastNumAndOperation.push(numArray[1]);
        pastNumAndOperation.push(operation);
        numbers = [];
        numbers.push(quotient);
        action = undefined;
        break;
      default:
        break;
    }
  }
})
