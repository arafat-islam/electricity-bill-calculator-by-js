const unitInput = document.querySelector("#unit");
const taxInput = document.querySelector("#taxInput");
const demandInput = document.querySelector("#demandInput");
const submit = document.querySelector("#submit");
const bill = document.querySelector("#bill");
const tax = document.querySelector("#tax");
const demand = document.querySelector("#demand");
const noteText = document.querySelector("#note");
const negTax = document.querySelector("#negTax");
const negDemand = document.querySelector("#negDemand");
const indexTable = document.querySelector("#indexTable");



var event = new Event('input', {
    bubbles: true,
    cancelable: true
});

unitInput.addEventListener('input', unitValue);
taxInput.addEventListener('input', TaxValue);
demandInput.addEventListener('input', demandInputValue);


function unitValue() {
    let unit = Number(unitInput.value);

    if (unit < 0) {
        unitInput.style.border = "1px solid red";
        indexTable.style.boxShadow = "red 3px 6px 13px";
    } else {
        unitInput.style.border = "1px solid #ced4da";
        indexTable.style.boxShadow = "#ddd 3px 6px 13px";
    }
    calculateBill(unit);
    note(unit);
}

function TaxValue() {
    let taxValue = Number(taxInput.value);
    if (taxValue < 0) {
        taxInput.style.border  = "1px solid #f00";
        tax.style.color = "red";
        tax.innerHTML = taxValue;
        negTax.innerHTML = "Please Enter Positive Integer!";
    } else {
        taxInput.style.border  = "1px solid #ced4da";
        tax.style.color = "initial";
        tax.style.color = "initial";
        tax.innerHTML = taxValue;
        negTax.innerHTML = "";
    }

    unitInput.dispatchEvent(event);
}

function demandInputValue() {
    let demandValue = Number(demandInput.value);
    if (demandValue < 0) {
        demandInput.style.border  = "1px solid #f00";
        demand.style.color = "red";
        demand.innerHTML = demandValue;
        negDemand.innerHTML = "Please Enter Positive Integer!";
    } else {
        demandInput.style.border  = "1px solid #ced4da";
        demand.style.color = "initial";
        demand.style.color = "initial";
        demand.innerHTML = demandValue;
        negDemand.innerHTML = "";
    }
    unitInput.dispatchEvent(event);
}


function note (unit) {
    let note = '0';
    if(unit > 100) {
        note =  `(50*1.5)+(30*2)+(20*2.5)+(${unit-100}*3)`;
    } 
    if (unit > 80 && unit <= 100) {
        note =  `(50*1.5)+(30*2)+(${unit-80}*2.5)`;
    }
    if (unit > 50 && unit <= 80) {
        note =  `(50*1.5)+(${unit-50}*2)`;
    }
    if (unit <= 50) {
        note =  `${unit}*1.5`;
    }

    noteText.innerHTML = note + " = " + calculateBill(unit).toFixed(2);
}

function calculateBill (unit) {
    let totalBillText;
    if (unit < 0) {
        bill.innerHTML = "<small style='color: red;';>Please Enter Any Positive Integer!</small>";
    } else {
        let totalBill = 0;
        if (unit > 100) {
            totalBill = totalBill + (unit - 100) * 3;
            unit = 100;
        }
        if (unit > 80 && unit <= 100) {
            totalBill = totalBill + (unit - 80) * 2.5;
            unit = 80;
        }
        if (unit > 50 && unit <= 80) {
            totalBill = totalBill + (unit - 50) * 2;
            unit = 50;
        }
        if (unit <= 50) {
            totalBill = totalBill + unit * 1.5;
        }
        
        if (taxInput.value < 0 || demandInput.value < 0) {
            totalBillText = totalBill;
        } else {
            totalBillText = totalBill + Number(taxInput.value) + Number(demandInput.value);
        }

        bill.innerHTML = totalBillText.toFixed(2);
        return totalBill;
    }
    
}
