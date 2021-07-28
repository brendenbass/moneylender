//get the values the user input
function getValues(){
    
    //get loan amount value
    loanAmount = document.getElementById("loanAmount").value;

    //get monthly payment value
    monthlyPayments = document.getElementById("monthlyPayments").value;

    //get percent rate value
    percentRate = document.getElementById("rate").value;

    //call calculation function
    calculateNumbers(loanAmount, monthlyPayments, percentRate);
}

function calculateNumbers(loanAmount, monthlyPayments, percentRate){

    let moneyArray = [];

    //money array
    for (let i = 1; i <= 60; i++) {

        //add month number
        monthNumber = i;
        moneyArray.push(monthNumber);

        //add monthly payment
        totalMonthlyPayment = loanAmount * (percentRate/1200) / (1-(1+percentRate/1200)**(-monthlyPayments));
        moneyArray.push(totalMonthlyPayment);

        //add principal payment

        
        //add interest payment


        //add total interest payment


        //find balance left

        
    }

}



























function calculateTotals(loanAmount, monthlyPayments, percentRate){

    totalMonthlyPayment = loanAmount * (percentRate/1200) / (1-(1+percentRate/1200)**(-monthlyPayments));
    totalPrincipal = loanAmount;
    totalInterest = loanAmount * (percentRate/100);
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