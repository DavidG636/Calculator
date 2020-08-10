$(function() {
  class Calculator {
    constructor(element) {
      this.resultElement = element;
      $(this.resultElement).val("0");
      this.numbers = [];
      this.operation;
      this.operationPressed = false;
      this.numberPressed = false;
      this.decimalPressed = false;
      this.solved = false;
      this.pastNumAndOperation = [];
      this.solution;
    }

    clear() {
      $(this.resultElement).val("0");
      this.numbers = [];
      this.operation = undefined;
      this.operationPressed = false;
      this.numberPressed = false;
      this.decimalPressed = false;
      this.solved = false;
      if (this.numbers[1] == undefined) {
        this.numbers.push(Number($(this.resultElement).val()));
      }
      if (this.pastNumAndOperation[0] != undefined) {
        this.numbers = [this.numbers[0], this.pastNumAndOperation[0]];
        this.pastNumAndOperation = this.pastNumAndOperation[1];
      }
    }

    appendNumber(value) {
      let resultValue = $(this.resultElement).val();
      this.pastNumAndOperation = [];
      if (this.operationPressed || this.solved) {
        $(this.resultElement).val(0);
        this.decimalPressed = false;
        if (this.solved) {
          this.solved = false;
        }
      }
      this.operationPressed = false;
      this.numberPressed = true;

      if (this.decimalPressed && value == ".") {
        return;
      }
      else if (value == "π") {
        $(this.resultElement).val(Math.PI);
      }
      else if (value == "e") {
        $(this.resultElement).val(Math.E);
      }
      else if ($(this.resultElement).val() == "0" && value != ".") {
        $(this.resultElement).val(value)
      }
      else {
        if (value == ".") {
          this.decimalPressed = true;
        }

        $(this.resultElement).val($(this.resultElement).val() + value);
      }

    }

    chooseOperation(op) {
      this.solved = false;
      this.pastNumAndOperation = [];
      this.operationPressed = true;
      this.numberPressed = false;
      this.decimalPressed = false;

      if (this.operationPressed && !this.numberPressed) {
        if (this.operation != undefined && this.numbers[0] != undefined) {
          this.numbers.push(Number($(this.resultElement).val()));
          this.solve();
        } else if (this.operation != "±"){
          this.numbers = [];
          this.operation = undefined;
        }
      }

      if (this.operation == undefined) {
        if (Number($(this.resultElement).val()) == this.numbers[0] && !this.numberPressed) {
          this.operation = op;
          if (this.operation == "√" || this.operation == "x<sup>2</sup>" || this.operation == "±") {
            this.solve();
          }
          return;
        } else {
          this.operation = op;
          if (this.operation == "√" || this.operation == "x<sup>2</sup>" || this.operation == "±") {
            this.solve();
          }
          this.numbers.push(Number($(this.resultElement).val()));

        }
      }

      if(this.operation == "X") {
        this.operation = "*";
      }

    }

    solve() {

      if (this.operation == "√") {
        this.solution = Math.sqrt(`${$(this.resultElement).val()}`);
      }
      else if (this.operation == "x<sup>2</sup>") {
        this.solution = Math.pow(`${$(this.resultElement).val()}`, 2)
      }
      else if (this.operation == "±") {
        this.solution = eval($(this.resultElement).val() * (-1));
      }
      else if (this.numbers[1] == undefined && this.operation != "√" && this.operation != "x<sup>2</sup>" && this.operation != "±") {
        this.numbers.push(Number($(this.resultElement).val()));
      }
      if (this.pastNumAndOperation[0] != undefined && this.operation != "√" && this.operation != "x<sup>2</sup>" && this.operation != "±") {
        this.numbers = [this.numbers[0], this.pastNumAndOperation[0]];
        this.operation = this.pastNumAndOperation[1];
      }

      if (this.numberPressed && this.numbers[1] == undefined) {
        this.numbers.push(Number($(this.resultElement).val()));
        this.solve(this.numbers, this.operation);
      }
      if (this.operation != "√" && this.operation != "x<sup>2</sup>" && this.operation != "±") {
        this.solution = eval(`${this.numbers[0]} ${this.operation} ${this.numbers[1]}`);
      }

      if (this.solution % 1 === 0) {
        this.solution = Math.floor(this.solution);
      }
      $(this.resultElement).val(this.solution);
      if (this.operation != "±") {
        console.log("Hh")
        this.pastNumAndOperation.push(this.numbers[1]);
        this.pastNumAndOperation.push(this.operation);
      }
      else {
        this.pastNumAndOperation.push($(this.resultElement).val());
        this.pastNumAndOperation.push("±");
      }
      console.log(this.operation)
      this.numbers = [];
      this.numbers.push(this.solution);
      this.operation = undefined;
      this.solved = true;
    }
  }

  const calculator = new Calculator($("#result"));

  $("[data-clear]").click(function() {
    calculator.clear()
  });

  $("[data-number]").click(function() {
    calculator.appendNumber($(this).html());
  });

  $("[data-operation]").click(function() {
    calculator.chooseOperation($(this).html());
  });

  $("[data-solve]").click(function() {
    calculator.solve();
  });

})
