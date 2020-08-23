var nettoBruttoInputs = document.querySelectorAll(".nettoBruttoActive");

nettoBruttoInputs.forEach(function(elemencik){
    elemencik.setAttribute("onmouseover", `showNetto(this)`);
    elemencik.setAttribute("onmouseout", `showBrutto(this)`);
})

function calculateBrutto(netto){
    return String((netto + netto*0.23).toFixed(2));
}

function showBrutto(element)
{
    var toSend = Number(element.innerText.substring(0, element.innerText.indexOf(' ')+1));
    element.innerText = calculateBrutto(toSend) + ' zł';
}
function showNetto(element){
    var toSend = Number(element.innerText.substring(0, element.innerText.indexOf(' ')+1));
    element.innerText = calculateNetto(toSend) + " zł";
}
function calculateNetto(brutto){
    return String((brutto/1.23).toFixed(2));
}



