//get the values the user input
function getValues(){
    
    //get loan amount value
    loanAmount = document.getElementById("loanAmount").value;

    //get monthly payment value
    monthlyPayments = document.getElementById("monthlyPayments").value;

    //get percent rate value
    percentRate = document.getElementById("rate").value;

    //call calculation functions
    calculateTotals(loanAmount, monthlyPayments, percentRate)
    calculateNumbers(loanAmount, monthlyPayments, percentRate);
}

function calculateNumbers(loanAmount, monthlyPayments, percentRate){

    let moneyArray = [];
    let totalMonthlyPayment = loanAmount * (percentRate/1200) / (1-(1+percentRate/1200)**(-monthlyPayments));

    //money array
    for (let i = 1; i <= 60; i++) {

        //add month number
        monthNumber = i;
        moneyArray.push(monthNumber);

        //add monthly payment
        moneyArray.push(totalMonthlyPayment);

        //prep for principal payment
        //calculate remaining balance
        if (i < 2) {
            remainingBalance = loanAmount;
            currentBalance = remainingBalance;
        } else {

        }

        //calculate interest
        if (i < 2){
            interestPayment = loanAmount * (percentRate/1200);
            lastInterestPayment = interestPayment;
            newInterestPayment = 0;
        } else {
            currentBalance = remainingBalance;
            lastInterestPayment = interestPayment;
            newInterestPayment = currentBalance * (percentRate/1200);
            interestPayment = newInterestPayment;
        }

        //total interest payments
        totalInterestPayment = lastInterestPayment + newInterestPayment;

        //add principal payment
        principalPayment = totalMonthlyPayment - interestPayment;
        moneyArray.push(principalPayment);
        
        //add interest payment
        if (i < 2){
            moneyArray.push(interestPayment); 
        } else {
            moneyArray.push(interestPayment); 
            //add total interest payment
            totalInterestPayment = lastInterestPayment + newInterestPayment;
            moneyArray.push(totalInterestPayment);
        }

        //find balance left
        remainingBalance = remainingBalance - principalPayment;
        moneyArray.push(remainingBalance);

        currentBalance = remainingBalance;

    }
    displayData(moneyArray);
    return moneyArray;
}

function calculateTotals(loanAmount, monthlyPayments, percentRate){

    totalMonthlyPayment = loanAmount * (percentRate/1200) / (1-(1+percentRate/1200)**(-monthlyPayments));
    totalPrincipal = loanAmount;
    totalInterest = loanAmount * (percentRate/100) * (monthlyPayments/12);
    totalCost = loanAmount + totalInterest;


    displayTotals(totalMonthlyPayment, totalPrincipal, totalInterest, totalCost);
}

function displayTotals(totalMonthlyPayment, totalPrincipal, totalInterest, totalCost){

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });

    document.getElementById("totalMonthly").innerHTML = formatter.format(totalMonthlyPayment);
    document.getElementById("pResult").innerHTML = formatter.format(totalPrincipal);
    document.getElementById("iResult").innerHTML = formatter.format(totalInterest);
    document.getElementById("cResult").innerHTML = formatter.format(totalCost);

}

function displayData(moneyArray) {

    //get the table body element from the page
    let tableBody = document.getElementById("results");

    //get the template itself
    let templateRow = document.getElementById("mlTemplate");

    //clear the table
    tableBody.innerHTML = "";

    for (let index = 0; index < moneyArray.length; index+= 6) {
        let tableRow = document.importNode(templateRow.content, true);

        //grab the td to put into array
        let rowCols = tableRow.querySelectorAll("td");
        rowCols[0].textContent = moneyArray[index];

        rowCols[1].textContent = moneyArray[index+1];

        rowCols[2].textContent = moneyArray[index+2];

        rowCols[3].textContent = moneyArray[index+3];

        rowCols[4].textContent = moneyArray[index+4];

        rowCols[4].textContent = moneyArray[index+4];

        rowCols[5].textContent = moneyArray[index+5];

        tableBody.appendChild(tableRow);
    }

    //add all the rows to the table
}