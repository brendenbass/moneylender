//get the values the user input
function getValues(){
    
    //get loan amount value
    loanAmount = document.getElementById("loanAmount").value;

    //get monthly payment value
    monthlyPayments = document.getElementById("monthlyPayments").value;

    //get percent rate value
    percentRate = document.getElementById("rate").value;

    //call calculation functions
    calculateNumbers(loanAmount, monthlyPayments, percentRate);
}

/////////////////////////////
//calculate numbers for table
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

        //add principal payment
        principalPayment = totalMonthlyPayment - interestPayment;
        moneyArray.push(principalPayment);
        
        //add interest payment & total interest
        if (i < 2){
            moneyArray.push(interestPayment);
            totalInterestPayment = lastInterestPayment + newInterestPayment;
            moneyArray.push(totalInterestPayment);
        } else {
            moneyArray.push(interestPayment); 
            //add total interest payment
            totalInterestPayment = totalInterestPayment + newInterestPayment;
            moneyArray.push(totalInterestPayment);
        }

        //find balance left
        remainingBalance = remainingBalance - principalPayment;
        moneyArray.push(remainingBalance);

        currentBalance = remainingBalance;

    }
    displayData(moneyArray);
    calculateTotals(loanAmount, monthlyPayments, percentRate, totalInterestPayment)
    return moneyArray;
}
//////////////////////////////
//Display Totals for Top Right
function calculateTotals(loanAmount, monthlyPayments, percentRate){

    totalMonthlyPayment = loanAmount * (percentRate/1200) / (1-(1+percentRate/1200)**(-monthlyPayments));
    totalPrincipal = loanAmount * 1;
    totalInterest = totalInterestPayment * 1;
    totalCost = totalPrincipal + totalInterest;


    displayTotals(totalMonthlyPayment, totalPrincipal, totalInterest, totalCost);
}

//////////////////////////
//Display Totals for Table
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

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });

    for (let index = 0; index < moneyArray.length; index+= 6) {
        let tableRow = document.importNode(templateRow.content, true);

        //grab the td to put into array
        let rowCols = tableRow.querySelectorAll("td");
        rowCols[0].textContent = moneyArray[index];

        rowCols[1].textContent = formatter.format(moneyArray[index+1]);

        rowCols[2].textContent = formatter.format(moneyArray[index+2]);

        rowCols[3].textContent = formatter.format(moneyArray[index+3]);

        rowCols[4].textContent = formatter.format(moneyArray[index+4]);

        rowCols[4].textContent = formatter.format(moneyArray[index+4]);

        rowCols[5].textContent = formatter.format(moneyArray[index+5]);

        tableBody.appendChild(tableRow);
    }

    //add all the rows to the table
}