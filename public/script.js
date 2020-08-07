$(function() {
  class Calculator {
    constructor() {
      $("#result").val("0");
      this.numbers = [];
      this.operation;
      this.operationPressed = false;
      this.numberPressed = false;
      this.pastNumAndOperation = [];
      this.solution;
    }

    clear() {
      $("#result").val("0");
      this.numbers = [];
      this.operation = undefined;
      this.operationPressed = false;
      this.numberPressed = false;
      if (this.numbers[1] == undefined) {
        this.numbers.push(Number($("#result").val()));
      }
      if (this.pastNumAndOperation[0] != undefined) {
        this.numbers = [this.numbers[0], this.pastNumAndOperation[0]];
        this.pastNumAndOperation = this.pastNumAndOperation[1];
      }
    }

    appendNumber(value) {
      this.pastNumAndOperation = [];
      if (this.operationPressed) {
        $("#result").val(0);
      }
      this.operationPressed = false;
      this.numberPressed = true;

      if ($("#result").val() == "0" && value != ".") {
        $("#result").val(value)
      } else {
        $("#result").val($("#result").val() + value);
      }

    }

    chooseOperation(op) {
      this.pastNumAndOperation = [];
      this.operationPressed = true;
      this.numberPressed = false;

      if (this.operationPressed && !this.numberPressed) {
        if (this.operation != undefined && this.numbers[0] != undefined) {
          this.numbers.push(Number($("#result").val()));
          this.solve();
        } else {
          this.numbers = [];
          this.operation = undefined;
        }
      }

      if (op == "+" && this.operation == undefined) {
        if (Number($("#result").val()) == this.numbers[0] && !this.numberPressed) {
          this.operation = op;
          return;
        } else {
          this.numbers.push(Number($("#result").val()));
          this.operation = op;
        }
      } else if (op == "+" && this.operation != undefined) {
        this.numbers.push(Number($("#result").val()));
        this.solve();
        this.operation = op;
      } else if (op == "-" && this.operation == undefined) {
        if (Number($("#result").val()) == this.numbers[0] && !this.numberPressed) {
          this.operation = op;
          return;
        } else {
          this.numbers.push(Number($("#result").val()));
          this.operation = op
        }
      } else if (op == "-" && this.operation != undefined) {
        this.numbers.push(Number($("#result").val()));
        this.solve();
        this.operation = op;
      } else if (op == "*" && this.operation == undefined) {
        if (Number($("#result").val()) == this.numbers[0] && !this.numberPressed) {
          this.operation = op;
          return;
        } else {
          this.numbers.push(Number($("#result").val()));
          this.operation = op;
        }
      } else if (op == "*" && this.operation != undefined) {
        this.numbers.push(Number($("#result").val()));
        this.solve();
        this.operation = op;
      } else if (op == "/" && this.operation == undefined) {
        if (Number($("#result").val()) == this.numbers[0] && !this.numberPressed) {
          this.operation = op;
          return;
        } else {
          this.numbers.push(Number($("#result").val()));
          this.operation = op;
        }
      } else if (op == "/" && this.operation != undefined) {
        this.numbers.push(Number($("#result").val()));
        this.solve();
        this.operation = op;
      }
    }

    solve() {
      if (this.numberPressed && this.numbers[1] == undefined) {
        this.numbers.push(Number($("#result").val()));
        solve(this.numbers, this.operation);
      }

      this.solution = eval(`${this.numbers[0]} ${this.operation} ${this.numbers[1]}`);
      if (this.solution % 1 === 0) {
        this.solution = Math.floor(this.solution);
      }
      $("#result").val(this.solution);
      this.pastNumAndOperation.push(this.numbers[1]);
      this.pastNumAndOperation.push(this.operation);
      this.numbers = [];
      this.numbers.push(this.solution);
      this.operation = undefined;
    }
  }

  const calculator = new Calculator();

  $("[data-clear]").click(function() {
    calculator.clear()
  });

  $("[data-number]").click(function() {
    calculator.appendNumber($(this).val());
  });

  $("[data-operation]").click(function() {
    calculator.chooseOperation($(this).val());
  });

  $("[data-solve]").click(function() {
    if (calculator.numbers[1] == undefined) {
      calculator.numbers.push(Number($("#result").val()));
    }
    if (calculator.pastNumAndOperation[0] != undefined) {
      calculator.numbers = [calculator.numbers[0], calculator.pastNumAndOperation[0]];
      calculator.operation = calculator.pastNumAndOperation[1];
    }
    calculator.solve();
  });

})
