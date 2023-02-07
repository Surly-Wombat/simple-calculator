let numString = "0";
let buffer = 0;
let lastOperation = "";

const screen = document.querySelector(".screen");

function addNum(num) {
    if(numString != "0") {
        numString += num;
    }
    else if(num != "0") {
        numString = num;
    }
    screen.innerHTML = numString;
}

function special(char) {
    if(char == "C") {
        numString = "0";
    }
    else if(char == "←") {
        if(numString.length > 1) {
            numString = numString.substring(0,numString.length-1);
            if(numString.charAt(numString.length-1) == ".") {
                numString = numString.substring(0,numString.length-1);
            }
            if(numString == "-") {
                numString = "0";
            }
        }
        else {
            numString = "0"
        }
    }
    screen.innerHTML = numString;
}

function operation(char) {
    if(char != "=") {
        if(!(lastOperation == "" || buffer == 0)) {
            calculate()
        }
        lastOperation = char;
        buffer = parseInt(numString)
        numString = "0";
    }
    else {
        if(lastOperation == "") {
            return;
        }
        calculate();
        lastOperation = "";
        buffer = 0;
    }
}

function calculate() {
    let currentNum = parseInt(numString);
    switch(lastOperation) {
        case "+":
            currentNum = buffer + currentNum;
            break;
        case "−":
            currentNum = buffer - currentNum;
            break;
        case "×":
            currentNum = buffer * currentNum;
            break;
        case "÷":
            if(currentNum == 0) {
                currentNum = NaN;
                break;
            }
            currentNum = buffer / currentNum;
            break;
    }
    numString = currentNum.toString();
    buffer = 0;
    lastOperation = "";
    screen.innerHTML = numString;
}

const nums = document.querySelectorAll(".num");
nums.forEach(num => {
    num.addEventListener("click",function() {
        addNum(this.innerHTML);
    })
});

const specials = document.querySelectorAll(".special");
specials.forEach(specialElement => {
    specialElement.addEventListener("click",function() {
        special(this.innerHTML);
    })
});

const operations = document.querySelectorAll(".operation");
operations.forEach(operationElement => {
    operationElement.addEventListener("click",function() {
        operation(this.innerHTML);
    })
});
