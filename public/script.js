$(function() {
  var path = window.location.pathname;
  path = new String(path);
  var compoundLists = []

  class CompoundList {
    constructor(dayNum, dateOfDay, earningsForDay, reinvestRate, pCashOut, totalP, totalC) {
      this.dayNumber = dayNum;
      this.date = dateOfDay;
      this.earnings = earningsForDay;
      this.reinvest = reinvestRate;
      this.principalCashOut = pCashOut;
      this.totalPrincipal = totalP;
      this.totalCash = totalC;
    }
  }

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
      } else if (value == "π") {
        $(this.resultElement).val(Math.PI);
      } else if (value == "e") {
        $(this.resultElement).val(Math.E);
      } else if ($(this.resultElement).val() == "0" && value != ".") {
        $(this.resultElement).val(value)
      } else {
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
        } else if (this.operation != "±") {
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

      if (this.operation == "X") {
        this.operation = "*";
      }

    }

    solve() {

      if (this.operation == "√") {
        this.solution = Math.sqrt(`${$(this.resultElement).val()}`);
      } else if (this.operation == "x<sup>2</sup>") {
        this.solution = Math.pow(`${$(this.resultElement).val()}`, 2)
      } else if (this.operation == "±") {
        this.solution = eval($(this.resultElement).val() * (-1));
      } else if (this.numbers[1] == undefined && this.operation != "√" && this.operation != "x<sup>2</sup>" && this.operation != "±") {
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
      } else {
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

  $("[data-reset]").click(function() {
    $("#startingAmount").val("$100");
    $("#interestRate").val("1");
    $("#numberOfDays").val("12");
    $("#reinvestRate").val("50");
    $("#includingWeekends").val("yes");
  });

  $(".compound-buttons").on("click", "[data-compound]", function() {
    $(".compound-info").css("display", "block");
    $("#compound-plan-body").empty();
    compoundLists = [];

    let tomorrow = new Date();

    let principal = $("#startingAmount").val();
    principal = principal.replace('$', '');
    let interestRate = $("#interestRate").val();
    interestRate = eval(`${interestRate} / 100`);
    let days = $("#numberOfDays").val();
    let reinvest = $("#reinvestRate").val();
    let reinvestPercentage = reinvest + "%";
    let weekendsBoolean = $("#includingWeekends").val();
    let totalNetProfit = 0;

    for (let i = 1; i <= days; i++) {
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (weekendsBoolean == "no") {
        if (tomorrow.getDay() == 6 || tomorrow.getDay() == 7) {
          while (tomorrow.getDay() != 1) {
            tomorrow.setDate(tomorrow.getDate() + 1);
          }
        }
      }

      let day = i;
      let dateOfDay = tomorrow.toDateString();
      let earnings;
      let totalPrincipalAmount;
      if (compoundLists[(compoundLists.length - 1)] == undefined) {
        earnings = eval(`${principal} * ${interestRate}`);
      } else {
        let tempList = compoundLists[(compoundLists.length - 1)];
        earnings = eval(`${tempList.totalPrincipal} * ${interestRate}`);
      }

      earnings = money_round(earnings);

      let principalFromEarnings = eval(Math.round(eval(`${earnings} * (${reinvest} / 100)`) * 100) / 100);
      let cashOutFromEarnings = eval(`${earnings} - ${principalFromEarnings}`);
      let totalCashAmount;

      if (compoundLists[(compoundLists.length - 1)] == undefined) {
        totalCashAmount = cashOutFromEarnings;
        totalCashAmount = money_round(totalCashAmount);
        totalPrincipalAmount = eval(`${principal} + ${principalFromEarnings}`);
        totalPrincipalAmount = money_round(totalPrincipalAmount);
      } else {
        let tempList = compoundLists[(compoundLists.length - 1)];
        totalCashAmount = eval(`${tempList.totalCash} + ${cashOutFromEarnings}`);
        totalCashAmount = money_round(totalCashAmount);
        totalPrincipalAmount = eval(`${tempList.totalPrincipal} + ${principalFromEarnings}`);
        totalPrincipalAmount = money_round(totalPrincipalAmount);
      }

      earnings = checkForDecimal(earnings);
      principalFromEarnings = checkForDecimal(principalFromEarnings);
      cashOutFromEarnings = checkForDecimal(cashOutFromEarnings);
      totalPrincipalAmount = checkForDecimal(totalPrincipalAmount);
      totalCashAmount = checkForDecimal(totalCashAmount);

      totalNetProfit += Number(earnings);


      let principalCashOutRelation = principalFromEarnings + "/" + cashOutFromEarnings;

      compoundLists.push(new CompoundList(day, dateOfDay, earnings, reinvestPercentage, principalCashOutRelation, totalPrincipalAmount, totalCashAmount));

    }

    totalNetProfit = money_round(totalNetProfit);
    totalNetProfit = checkForDecimal(totalNetProfit);


    let compoundedAmount = compoundLists[(compoundLists.length - 1)].totalPrincipal;
    let totalCashWithdrawls = compoundLists[(compoundLists.length - 1)].totalCash;
    let beginningAndEndDates = [compoundLists[0].date, compoundLists[(compoundLists.length - 1)].date];
    let dayPeriod = compoundLists[(compoundLists.length - 1)].dayNumber;

    principal = checkForDecimal(principal);

    $(".compound-summary-list").append(`
      <li>You started with an investment of: <span style="color: indianred; font-weight: bold;">$ ${principal}</span> on ${beginningAndEndDates[0]}</li>
      <li>Your principal amount grew to: <span style="color: olive; font-weight: bold;">$ ${compoundedAmount}</span> by ${beginningAndEndDates[1]}</li>
      <li>Your total cash withdrawls were: <span style="color: olive; font-weight: bold;">$ ${totalCashWithdrawls}</span> over the course of ${dayPeriod} days</li>
      <li>Your total net profit for the ${dayPeriod} day period was: <span style="color: olive; font-weight: bold;">$ ${totalNetProfit}</span></li>
      `);


    load(compoundLists);
  });


  var list = new Array();
  var pageList = new Array();
  var currentPage = 1;
  var numberPerPage = 20;
  var numberOfPages = 0;

  function money_round(num) {
    return Math.ceil(num * 100) / 100;
  }

  function checkForDecimal(number) {
    let numString = number.toString();
    if (numString.indexOf(".") == -1) {
      numString = numString + ".00"
      return checkForHundreths(numString);
    }
    else {
      return checkForHundreths(numString);
    }
  }

  function checkForHundreths (num) {
    let numberString = num;
    if (numberString.indexOf(".") == (numberString.length - 2)) {
      numberString = numberString + "0";
      return numberString;
    }
    else {
      return numberString;
    }
  }

  function makeList(theList) {
    for (let a = 0; a <= theList.length; a++)
      list.push(theList[a]);

    numberOfPages = getNumberOfPages();
  }

  function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
  }

  function nextPage() {
    currentPage += 1;
    loadList();
  }

  function previousPage() {
    currentPage -= 1;
    loadList();
  }

  function firstPage() {
    currentPage = 1;
    loadList();
  }

  function lastPage() {
    currentPage = numberOfPages;
    loadList();
  }

  function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    drawList();
    check();
  }

  function drawList() {
    $("#compound-plan-body").empty();
    for (let r = 0; r < pageList.length; r++) {

      if(pageList[r] == undefined) {
        return;
      }

      $(".compound-plan table tbody").append(`<tr>
      <th scope="row">${pageList[r].dayNumber}</th>
      <td>${pageList[r].date}</td>
      <td>${pageList[r].earnings}</td>
      <td>${pageList[r].reinvest}</td>
      <td>${pageList[r].principalCashOut}</td>
      <td>${pageList[r].totalPrincipal}</td>
      <td>${pageList[r].totalCash}</td>
    </tr>`)
    }
  }

  function check() {
    document.getElementById("nextButton").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previousButton").disabled = currentPage == 1 ? true : false;
    document.getElementById("firstButton").disabled = currentPage == 1 ? true : false;
    document.getElementById("lastButton").disabled = currentPage == numberOfPages ? true : false;
  }

  function load(theList) {
    list = [];
    currentPage = 1;
    makeList(theList);
    loadList();
  }

  $("#firstButton").click(function () {
    firstPage();
  });

  $("#nextButton").click(function () {
    nextPage();
  });

  $("#previousButton").click(function () {
    previousPage();
  });


  $("#lastButton").click(function () {
    lastPage();
  });

})
