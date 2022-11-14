let currentNum = ''
let previousNum = ''
let operator = ''


const clear = document.querySelector("#clear")
const display = document.querySelector("#display")
const oldDisplay = document.querySelector("#oldDisplay")
const digits = document.querySelectorAll(".digit")
const operatorButton = document.querySelectorAll(".operator")
const equalsButton = document.querySelector(".equals")
const delButton = document.querySelector('#backspace')
const decimal = document.querySelector(".decimal")


  

digits.forEach(btn => {
    btn.addEventListener('click', (e) => {
        inputNumber(e.target.textContent);
    });
});

function inputNumber(number) {
    if(previousNum != ""&& currentNum !== "" && operator === "") {
        previousNum = ""
        display.text = currentNum;
    }
    if (currentNum.length <= 17) 
    currentNum += number;
    display.textContent = currentNum;
}
operatorButton.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    if (previousNum === "") {
    previousNum = currentNum;
    operatorCheck(op);
    } else if (currentNum === ""){
        operatorCheck(op);
    } else {
        calculate();
    }
    operator = op;
    display.textContent = ""
    oldDisplay.textContent = previousNum + " " + operator;
    
}

function operatorCheck(text) {
    operator = text;
    oldDisplay.textContent = previousNum + " " + operator;
    display.text = "";
    currentNum = " "; 
}

   
clear.addEventListener('click', ()=> {
    console.log("Clear has been clicked")
    display.textContent = ""
    oldDisplay.textContent = ""
    currentNum = ""
    previousNum = ""
    operator = ""
})


delButton.addEventListener('click', deleteNumber)
function deleteNumber() {
    currentNum = currentNum.toString().slice(0,-1)
    display.textContent = display.textContent
      .toString()
      .slice(0, -1)
  }



function calculate(){
    previousNum = Number(previousNum)
    currentNum = Number(currentNum)
    if (operator === "+") {
        previousNum = previousNum + currentNum
    } else if (operator === "-") {
        previousNum = previousNum - currentNum;
    } else if (operator === "*"){
        previousNum = previousNum*currentNum;
    } else if (operator === "/"){
        if (currentNum <= 0) {
            previousNum = "Error" ;
            oldDisplay.textContent = "";
            display.textContent = previousNum;
            operator = "";
            displayResult()
            return;
        }
        previousNum = previousNum/currentNum;
    }
previousNum = roundNumber(previousNum);
previousNum = previousNum.toString()
displayResult()
}
function roundNumber(num){
    return Math.round(num*100000)/100000;
}

function displayResult() {
    if (previousNum.length <= 14){
     display.textContent = previousNum
    } else {
        display.textContent = previousNum.slice(0,14) + " ..."
    }
    oldDisplay.textContent = ""
    operator = ""
    currentNum = ""
}
equalsButton.addEventListener('click',() => {
    if (previousNum != "" && currentNum != "") {
calculate()}
    })

decimal.addEventListener('click',()=> {
        addDecimal();
    
    })
function addDecimal(){
    if (!currentNum.includes('.')){
        currentNum += "."
        display.textContent = currentNum;
    }
}