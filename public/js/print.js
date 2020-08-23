var nettoBruttoInputs = document.querySelectorAll(".nettoToBrutto");

nettoBruttoInputs.forEach(function(elemencik){
    var netto = Number(elemencik.innerText.substring(0, elemencik.innerText.indexOf(' ')+1));
    elemencik.innerText = calculateBrutto(netto) + " zł";
})


function getCurrentDate(){
    var d = new Date();
    return d.getDate();
}
function getCurrentMonth(){
    var d = new Date();
    return d.getMonth()+1;
}
function getCurrentYear(){
    var d = new Date();
    return d.getFullYear();
}

function returnDate(){
    var day, month, year;
    year = getCurrentYear();
    day = getCurrentDate();
    if(Number(getCurrentMonth)<10){
        month = "0" + getCurrentDate();
    }
    else
        month = getCurrentMonth();

    return day + "." + month + "." + year;
}

function calculateBrutto(netto){
    return String((netto + netto*0.23).toFixed(2));
}

function calculateNetto(brutto){
    return String((brutto/1.23).toFixed(2));
}

document.getElementById("Date").innerHTML = returnDate();

