const billAmt = document.querySelector('#billAmount');
const cashGiven = document.querySelector("#cashGiven");
const nextBtn = document.querySelector("#nextButton");
const checkBtn = document.querySelector('#checkButton');

const errorMsg = document.querySelector('.errorMsg');

const cashGivenDiv = document.querySelector('.cashGivenInput');
const returnChangeDiv = document.querySelector(".returnChange");

const output = document.querySelector('.output');
const noOfNotes = document.querySelectorAll(".noOfNotes");

const noteArr = [2000, 500, 100, 50, 20, 10, 5, 1];

//Functions

function hideError(){
    errorMsg.style.display = "none";
}

function showError(text){
    errorMsg.style.display = 'block';
    errorMsg.innerText = text;
    returnChangeDiv.style.display = 'none';
}

function clearNoOfNotes(){
    for(let notes of noOfNotes){
        notes.innerText = "";
    }
}

function calculateNotes(bill, cash){
    let returnAmt = cash-bill;
    if(returnAmt<1){
        showError("No amount should be returned");
        return;
    }
    returnChangeDiv.style.display = 'block';

    for (let i=0; i<noteArr.length; i++){
        returnAmt = compare(returnAmt, noteArr[i], i);
    }
}

//compare with the note value and update the no. og notes on screen
function compare( remainder, noteAmt, index){
    if (remainder >= noteAmt){
        let notes = Math.floor(remainder/noteAmt);
        remainder = remainder - notes*noteAmt;
        noOfNotes[index].innerText = `${notes}`;
    }
    return remainder
}

//if Bill Amount filled, Display cash given input 
nextBtn.addEventListener('click', ()=>{
    hideError();
    if(Number(billAmt.value)>0){

        nextBtn.style.display ="none";
        cashGivenDiv.style.display = "block";
    }else{
        showError("Enter Valid Bill Amount");
    }
})

// Check button process
checkBtn.addEventListener('click', ()=>{
    clearNoOfNotes();
    hideError();
    
    let billAmtValue = Number(billAmt.value);
    let cashGivenValue = Number(cashGiven.value);

    if (billAmtValue>0 && cashGivenValue>0 ){
        if (!Number.isInteger(cashGivenValue)){
            showError("Enter valid amount in cash given field");
             return;
        }
        if(billAmtValue > cashGivenValue){
            showError('Cash given is lesser than the actual bill amount, please enter the right amount');
            return;
        }
        //if the input is valid, calculate the no. of notes
        calculateNotes(billAmtValue, cashGivenValue);
    } else{
        showError("Enter Valid Bill Amount and Cash Given to Continue")
    }
})