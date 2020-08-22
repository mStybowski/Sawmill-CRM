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
    return (netto + netto*0.23).toFixed(2);
}

function calculateNetto(brutto){
    return (brutto/1.23).toFixed(2);
}

document.getElementById("Date").innerHTML = returnDate();