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
        operationPressed = true;
        numberPressed = false;
        processValue(buttonText);
        break;
      case "=":
        if (numbers[1] == undefined) {
          numbers.push(Number($("#result").val()));
        }
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
        operationPressed = false;
        numberPressed = true;
        processValue(buttonText);
        break;
      default:
        break;
    }
  });

  function processValue(value) {
    if ((value == "+" || value == "-" || value == "*" || value == "/") && (operationPressed && !numberPressed)) {
      if (action != undefined && numbers[0] != undefined) {
        numbers.push(Number($("#result").val()));
        solve(numbers, action);
      }
      else {
        numbers = [];
        action = undefined;
      }
    }

    if (value == "+" && action == undefined) {
      if (Number($("#result").val()) == numbers[0] && !numberPressed) {
        action = value;
        return;
      }
      else {
        numbers.push(Number($("#result").val()));
        action = value;
      }
    } else if (value == "+" && action != undefined) {
      numbers.push(Number($("#result").val()));
      solve(numbers, action);
      action = value;
    }
    else if (value == "-" && action == undefined) {
      if (Number($("#result").val()) == numbers[0] && !numberPressed) {
        action = value;
        return;
      }
      else {
        numbers.push(Number($("#result").val()));
        action = value
      }
    } else if (value == "-" && action != undefined) {
      numbers.push(Number($("#result").val()));
      solve(numbers, action);
      action = value;
    }
    else if (value == "*" && action == undefined) {
      if (Number($("#result").val()) == numbers[0] && !numberPressed) {
        action = value;
        return;
      }
      else {
        numbers.push(Number($("#result").val()));
        action = value
      }
    } else if (value == "*" && action != undefined) {
      numbers.push(Number($("#result").val()));
      solve(numbers, action);
      action = value;
    }
    else if (value == "/" && action == undefined) {
      if (Number($("#result").val()) == numbers[0] && !numberPressed) {
        action = value;
        return;
      }
      else {
        numbers.push(Number($("#result").val()));
        action = value
      }
    } else if (value == "/" && action != undefined) {
      numbers.push(Number($("#result").val()));
      solve(numbers, action);
      action = value;
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
    }

    switch (operation) {
      case "+":
        let sum = numArray[0] + numArray[1];
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
      case "-":
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
      case "*":
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
      case "/":
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
