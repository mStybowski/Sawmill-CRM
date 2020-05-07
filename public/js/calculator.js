var i = 0;
var allHebels = [];
var isLata, isKontrlata, isOpal, isTransport;

var DrewnoPrice = document.getElementById("DrewnoPrice").value;
var HebelPrice = document.getElementById("HebelPrice").value;
var CalowkaPrice = document.getElementById("CalowkaPrice").value;
var LataPrice = document.getElementById("LataPrice").value;
var KontrlataPrice = document.getElementById("KontrlataPrice").value;
var OpalPrice = document.getElementById("OpalPrice").value;
var TransportPrice = document.getElementById("TransportPrice").value;

function updatePricesOnPage(){
    DrewnoPrice = document.getElementById("DrewnoPrice").value;
    HebelPrice = document.getElementById("HebelPrice").value;
    CalowkaPrice = document.getElementById("CalowkaPrice").value;
    LataPrice = document.getElementById("LataPrice").value;
    KontrlataPrice = document.getElementById("KontrlataPrice").value;
    OpalPrice = document.getElementById("OpalPrice").value;
    TransportPrice = document.getElementById("TransportPrice").value;
}

function updateDisabled(elmntID){
    document.getElementById(elmntID).disabled = true;
}

function zmienionoValue(elmnt){

    elmntID = elmnt.getAttribute("counter");
    wartoscOstatecznaBrutto = elmnt.value;
    updateNicePrice(elmntID, calculateNetto(wartoscOstatecznaBrutto), wartoscOstatecznaBrutto);

}

function calculateDrewnoKonstrukcyjnePrice(idToCount){

    var x = document.getElementById(`[${idToCount}][x]`).value;
    var y = document.getElementById(`[${idToCount}][y]`).value;
    var length = document.getElementById(`[${idToCount}][length]`).value;
    var ilosc = document.getElementById(`[${idToCount}][ilosc]`).value;
    var cena = document.getElementById(`[${idToCount}][cena]`).value;

    var cenaPozycji = x * y * length * ilosc * cena;
    document.getElementById(`Wartosc[${idToCount}]`).value = calculateBrutto(cenaPozycji);

    updateNicePrice(idToCount, cenaPozycji.toFixed(2), calculateBrutto(cenaPozycji));
}

function updateNicePrice(id, netto, brutto){
    document.getElementById(`nicePrice[${id}]`).innerHTML = `${netto} zł Netto / <strong>${brutto} zł Brutto</strong>`;
}
function calculateBrutto(netto){
    return (netto + netto*0.23).toFixed(2);
}
function calculateNetto(brutto){
    return (brutto/1.23).toFixed(2);
}


function calculateDeskaCalowkaPrice(idToCount){

    var v = document.getElementById(`[${idToCount}][v]`).value;
    var x = document.getElementById(`[${idToCount}][x]`).value;
    var length = document.getElementById(`[${idToCount}][length]`).value;
    var ilosc = document.getElementById(`[${idToCount}][ilosc]`).value;
    //TODO funkcja do zwracania ilosci pobranej z formularza
    var cena = document.getElementById(`[${idToCount}][cena]`).value;
    var cenaPozycji = 0;

    if(v > 0){
        cenaPozycji = v*cena;
    }
    else if(v <= 0){

        cenaPozycji = x*length*ilosc*cena;

    }
    //TODO funkcja do zwracania ceny pozycji
    document.getElementById(`Wartosc[${idToCount}]`).value = calculateBrutto(cenaPozycji);
    updateNicePrice(idToCount, cenaPozycji, calculateBrutto(cenaPozycji));

}

function calculatePrice(idToCount){
    var metrBiezacy = document.getElementById(`[${idToCount}][x]`).value;
    var cena = document.getElementById(`[${idToCount}][cena]`).value;
    document.getElementById(`Wartosc[${idToCount}]`).value = calculateBrutto(metrBiezacy * cena);
    updateNicePrice(idToCount, (metrBiezacy * cena).toFixed(2), calculateBrutto(metrBiezacy * cena));
}


function updateColor(counter, pos){
    var identifier = `[${pos}]${counter}`;
    var elmnt = document.querySelector(`div[identifier="${identifier}"`);

    if (allHebels[counter][pos]) {
        elmnt.classList.remove("turnedOff");
        elmnt.classList.add("turnedOn");
    }
    else{
        elmnt.classList.remove("turnedOn");
        elmnt.classList.add("turnedOff");
    }
}

function handleHebel(elmnt){

    let idToCount = elmnt.getAttribute("counter");
    var rodzaj = elmnt.getAttribute("rodzaj");
    let position = elmnt.getAttribute("pos");
    console.log("Counter:" + idToCount + ". Element: " + position);
    allHebels[idToCount][position] = !allHebels[idToCount][position];
    var cenaHebla = document.getElementById("HebelPrice").value;
    var defaultPrice=0;

    if(rodzaj === "calowka") {
        defaultPrice = document.getElementById(`CalowkaPrice`).value;
    }
    else {
        defaultPrice = document.getElementById(`DrewnoPrice`).value;
    }
    var iloscHebli = 0;
    allHebels[idToCount].forEach(function(elmnt){
        if(elmnt)
        iloscHebli += 1;
    });

    document.getElementById(`[${idToCount}][cena]`).value = Number(Number(defaultPrice) + iloscHebli*cenaHebla);

    document.getElementById(`[${idToCount}][${position}]`).checked = !document.getElementById(`[${idToCount}][${position}]`).checked;
    updateColor(idToCount, position);

    if(rodzaj === "calowka") {
        calculateDeskaCalowkaPrice(idToCount);
    }
    else {
        calculateDrewnoKonstrukcyjnePrice(idToCount);
    }
}

function disableDimensions(elmnt){
    let idToCount = elmnt.getAttribute("counter");
    if(elmnt.value){
        document.getElementById(`[${idToCount}][x]`).disabled = true;
        document.getElementById(`[${idToCount}][length]`).disabled = true;
        document.getElementById(`[${idToCount}][ilosc]`).disabled = true;
    }
    //TODO - Create an infobar when clicked X or length input to inform user that he had already entered the volume
    else if(!elmnt.value){
        document.getElementById(`[${idToCount}][x]`).disabled = false;
        document.getElementById(`[${idToCount}][length]`).disabled = false;
        document.getElementById(`[${idToCount}][ilosc]`).disabled = false;

    }
}
function checkIfNoDimensions(id){
    var x = document.getElementById(`[${id}][x]`).value;
    var length = document.getElementById(`[${id}][length]`).value;
    var ilosc = document.getElementById(`[${id}][ilosc]`).value;
    return x.length <= 0 && length.length <= 0 && ilosc.length <= 0;
}

function disableVolume(elmnt){
    let idToCount = elmnt.getAttribute("counter");
    if(elmnt.value){
        document.getElementById(`[${idToCount}][v]`).disabled = true;
    }
    //TODO - Create an infobar when clicked X or length input to inform user that he had already entered the volume
    else if(checkIfNoDimensions(idToCount)){
        document.getElementById(`[${idToCount}][v]`).disabled = false;
    }
}

document.getElementById('drewnoKonstrukcyjne-button').onclick = function () {

    let template = `
<div class="item">
<div class="item-name">
<h4>DrewnoKonstrukcyjne</h4>
<span id="nicePrice[${i}]" >
--- zł Netto / <strong>--- zł Brutto</strong>
</span>
</div>
<div class="item-properties">
        <div class="itemInput"
            <span>Wymiar X</span>
            <input name="drewno[${i}][x]" id="[${i}][x]"  >
        </div>

        <div class="itemInput"
            <label>Wymiar Y</label>
            <input name="drewno[${i}][y]" id="[${i}][y]" > 
        </div>

        <div class="itemInput"
            <label>dlugosc</label>
            <input name="drewno[${i}][length]" id="[${i}][length]" >
        </div>
        <div class="itemInput"
            <label>Ilosc</label>
            <input name="drewno[${i}][amount]" id="[${i}][ilosc]" >
        </div>

        <div class="itemInput"
            <label>Cena</label>
            <input name="drewno[${i}][price]" id="[${i}][cena]" value=${DrewnoPrice}>
        </div>
   
        
        <div class="hebelWrapper">
            <div class="wrapper-top" >
                <div class="top" pos="0" counter="${i}" rodzaj="drewno" identifier= "[0]${i}" onclick="handleHebel(this)" >
        
                </div>
            </div>
            
            <div class="wrapper-mid"">
                <div class="mid" pos="3" counter="${i}" rodzaj="drewno" identifier= "[3]${i}" onclick="handleHebel(this)" >

                </div>
                <div class="mid centerly">

                </div>
                <div class="mid" pos="1" counter="${i}" rodzaj="drewno" identifier= "[1]${i}" onclick="handleHebel(this)" >

                </div>
            </div>
    
            <div class="wrapper-bot">
                <div class="bot" pos="2" counter="${i}" rodzaj="drewno" identifier= "[2]${i}" onclick="handleHebel(this)">
                </div>
            </div>
        </div>
</div>
        <div class="itemInput">
            <input name="drewno[${i}][value]" id="Wartosc[${i}]" counter="${i}" oninput="zmienionoValue(this)">
            <button type="button" onclick="calculateDrewnoKonstrukcyjnePrice(id)" id="${i}">Oblicz koszt</button>
        </div>
        </div>
        <div style="display:none">
<!--            TODO-->
                <input type="checkbox" name="drewno[${i}][hebel][1]" id="[${i}][0]">
                <input type="checkbox" name="drewno[${i}][hebel][2]" id="[${i}][1]">
                <input type="checkbox" name="drewno[${i}][hebel][3]" id="[${i}][2]">
                <input type="checkbox" name="drewno[${i}][hebel][4]" id="[${i}][3]">
         </div>

`;

    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);

i++;
};

document.getElementById('calowka-button').onclick = function () {

    let template = `
<div class="item">
<div class="item-name">
<h4>Deska Calowka</h4>
<span id="nicePrice[${i}]" >
--- zł Netto / <strong>--- zł Brutto</strong>
</span>
</div>
<div class="item-properties">
        <div class="itemInput">
            <span>Objętość</span><br>
            <input name="calowka[${i}][v]" oninput="disableDimensions(this)" counter="${i}" id="[${i}][v]" >
        </div>
        <div class="itemInput">
            <span>Szerokość</span><br>
            <input name="calowka[${i}][x]" counter="${i}" id="[${i}][x]" oninput="disableVolume(this)">
        </div>
        <div class="itemInput">
            <span>Długość</span><br>
            <input name="calowka[${i}][length]" counter="${i}" id="[${i}][length]" oninput="disableVolume(this)" >
        </div>
        <div class="itemInput">
            <span>Ilość</span><br>
            <input name="calowka[${i}][amount]" counter="${i}" id="[${i}][ilosc]" oninput="disableVolume(this)" >
        </div>

        <div class="itemInput">
            <span>zł/m<sup>3</sup></span><br>
            <input name="calowka[${i}][price]" id="[${i}][cena]" value=${CalowkaPrice} >
        </div>
        

        <div class="hebelWrapper">
            <div class="wrapper-top" >
                <div class="top" pos="0" counter="${i}" identifier= "[0]${i}" rodzaj="calowka" onclick="handleHebel(this)" >
        
                </div>
            </div>
            
            <div class="wrapper-mid"">

                <div class="mid centerly">

                </div>

            </div>
    
            <div class="wrapper-bot">
                <div class="bot" pos="2" counter="${i}" rodzaj="calowka" identifier= "[2]${i}"onclick="handleHebel(this)">
                </div>
            </div>
        </div>
</div>
        <div>
        <span>Wartość</span>
            <input name="calowka[${i}][value]"id="Wartosc[${i}]" counter="${i}" oninput="zmienionoValue(this)" >
            <button type="button" onclick="calculateDeskaCalowkaPrice(id)" id="${i}">Oblicz koszt</button>
        </div>
                <div style="display:none">
<!--            TODO-->
                <input type="checkbox" name="calowka[${i}][hebel][1]" id="[${i}][0]">
                <input type="checkbox" name="calowka[${i}][hebel][2]" id="[${i}][1]">
                <input type="checkbox" name="calowka[${i}][hebel][3]" id="[${i}][2]">
                <input type="checkbox" name="calowka[${i}][hebel][4]" id="[${i}][3]">
         </div>
`;

    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);
    i++;

};
document.getElementById('lata-button').onclick = function () {


    let template = `
<div class="item">
<div class="item-name">
<h4>Łata</h4>
<span id="nicePrice[${i}]" >
--- zł Netto / <strong>--- zł Brutto</strong>
</span>
</div>
<div class="item-properties">
        <p>
            <label>Metrow bierzacych</label><br>
            <input name="lata[metryBiezace]" id="[${i}][x]">
        </p>

        <p>
            <label>Cena</label><br>
            <input name="lata[price]" id="[${i}][cena]"  value=${LataPrice}>
<!--            TODO mozna tu jebnac oninput ale wtedy trzeba podac counter i zmienic funkcje-->
        </p>
        
    
        <p>
            <input name="lata[value]" id="Wartosc[${i}]" counter="${i}" oninput="zmienionoValue(this)" >
            <button type="button" onclick="calculatePrice(id)" id="${i}">Oblicz cene</button>
        </p>
        </div>
        </div>
`;

    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);
    i++;
    isLata = true;
    updateDisabled("lata-button");
};
document.getElementById('kontrlata-button').onclick = function () {

    let template = `
<div class="item">
<div class="item-name">
<h4>Kontrłata</h4>
<span id="nicePrice[${i}]" >
--- zł Netto / <strong>--- zł Brutto</strong>
</span>
</div>
<div class="item-properties">
        <p>
            <label>Metrow bierzacych</label><br>
            <input name="kontrlata[metryBiezace]" id="[${i}][x]">
        </p>

        <p>
            <label>Cena</label><br>
            <input name="kontrlata[price]" id="[${i}][cena]" value=${KontrlataPrice}>
        </p>
        <p>
            <input name="kontrlata[value]" id="Wartosc[${i}]" counter="${i}" oninput="zmienionoValue(this)" >
            <button type="button" onclick="calculatePrice(id)"  id="${i}">Oblicz cene</button>
        </p>
        </div>
        </div>
`;

    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);
    i++;
    isKontrlata = true;
    updateDisabled("kontrlata-button");
};
document.getElementById('opal-button').onclick = function () {

    let template =
        `<div class="item">
<div class="item-name">
<h4>Opał</h4>
<span id="nicePrice[${i}]" >
--- zł Netto / <strong>--- zł Brutto</strong>
</span>
</div>
<div class="item-properties">
        <p>
            <label>Ilosc paczek</label><br>
            <input name="opal[amount]" id="[${i}][x]">
        </p>

        <p>
            <label>Cena</label><br>
            <input name="opal[price]" id="[${i}][cena]" value=${OpalPrice}>
        </p>
        <p>
            <input name="opal[value]" id="Wartosc[${i}]" counter="${i}" oninput="zmienionoValue(this)" >
            <button type="button" onclick="calculatePrice(id)" counter="${i}"  id="${i}" >Oblicz cene</button>
        </p>
</div>
</div>`;

    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);
    i++;
    isOpal = true;
    updateDisabled("opal-button");
};

document.getElementById('transport-button').onclick = function () {


    let template =
        `
<div class="item">
<div class="item-name">
<h4>Transport</h4>
<span id="nicePrice[${i}]" >
--- zł Netto / <strong>--- zł Brutto</strong>
</span>
</div>
<div class="item-properties">
        <p>
            <label>Dystans [km]</label>
            <input name="transport[kilometers]" id="[${i}][x]" counter="${i}" oninput="calculatePrice(${i})" >
        </p>
        <p>
            <label>Stawka za km</label>
            <input name="transport[value]" id="[${i}][cena]" counter="${i}" oninput="calculatePrice(${i})" >
        </p>
        <p>
            <label>Cena</label>
            <input name="transport[value]" id="Wartosc[${i}]" counter="${i}" value=${TransportPrice} oninput="zmienionoValue(this)" >
        </p>
        </div>
        </div>
`;

    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);
    i++;
    isOpal = true;
    updateDisabled("transport-button");
};
