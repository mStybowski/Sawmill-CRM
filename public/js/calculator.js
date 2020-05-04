var i = 0;
var allHebels = [];

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

function calculateDrewnoKonstrukcyjnePrice(elmnt){
    var idToCount = elmnt.getAttribute("id");
    var x = document.getElementById(`[${idToCount}][x]`).value;
    var y = document.getElementById(`[${idToCount}][y]`).value;
    var length = document.getElementById(`[${idToCount}][length]`).value;
    var ilosc = document.getElementById(`[${idToCount}][ilosc]`).value;
    var cena = document.getElementById(`[${idToCount}][cena]`).value;

    var cenaPozycji = x*y*length*ilosc*cena;
    document.getElementById(`Wartosc[${idToCount}]`).value = cenaPozycji;
}


function calculateDeskaCalowkaPrice(elmnt){
    var idToCount = elmnt.getAttribute("id");
    var x = document.getElementById(`[${idToCount}][x]`).value;
    var length = document.getElementById(`[${idToCount}][length]`).value;
    var ilosc = document.getElementById(`[${idToCount}][ilosc]`).value;
    //TODO funkcja do zwracania ilosci pobranej z formularza
    var cena = document.getElementById(`[${idToCount}][cena]`).value;

    var cenaPozycji = x*length*ilosc*cena;
    //TODO funkcja do zwracania ceny pozycji
    document.getElementById(`Wartosc[${idToCount}]`).value = cenaPozycji;
}

function calculateLataPrice(elmnt){
    var idToCount = elmnt.getAttribute("id");
    var metrBiezacy = document.getElementById(`[${idToCount}][x]`).value;
    var cena = document.getElementById(`[${idToCount}][cena]`).value;
    var cenaPozycjiLaty = metrBiezacy*cena;

    document.getElementById(`Wartosc[${idToCount}]`).value = cenaPozycjiLaty;
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

    let position = elmnt.getAttribute("pos");
    console.log("Counter:" + idToCount + ". Element: " + position);
    allHebels[idToCount][position] = !allHebels[idToCount][position];
    if(document.getElementById(`[${idToCount}][${position}]`).checked){
        document.getElementById(`[${idToCount}][${position}]`).checked = false;
    }
    else{
        document.getElementById(`[${idToCount}][${position}]`).checked = true;
    }
    updateColor(idToCount, position);

}

function disableDimensions(elmnt){
    let idToCount = elmnt.getAttribute("counter");
    if(document.getElementById(`[${idToCount}][v]`).value.length > 0){
        document.getElementById(`[${idToCount}][x]`).disabled = true;
        document.getElementById(`[${idToCount}][length]`).disabled = true;
    }
    //TODO - Create an infobar when clicked X or length input to inform user that he had already entered the volume
    else if(document.getElementById(`[${idToCount}][v]`).value === ""){
        document.getElementById(`[${idToCount}][x]`).disabled = false;
        document.getElementById(`[${idToCount}][length]`).disabled = false;
    }
}

document.getElementById('drewnoKonstrukcyjne-button').onclick = function () {

    let template = `
<div class="item">
<div class="item-name">
<h4>DrewnoKonstrukcyjne</h4>
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
                <div class="top" pos="0" counter="${i}" identifier= "[0]${i}"onclick="handleHebel(this)" >
        
                </div>
            </div>
            
            <div class="wrapper-mid"">
                <div class="mid" pos="3" counter="${i}" identifier= "[3]${i}" onclick="handleHebel(this)" >

                </div>
                <div class="mid centerly">

                </div>
                <div class="mid" pos="1" counter="${i}" identifier= "[1]${i}"onclick="handleHebel(this)" >

                </div>
            </div>
    
            <div class="wrapper-bot">
                <div class="bot" pos="2" counter="${i}" identifier= "[2]${i}"onclick="handleHebel(this)">
                </div>
            </div>
        </div>
</div>
        <div class="itemInput">
            <input name="drewno[${i}][value]" id="Wartosc[${i}]" value="----------------">
            <button type="button" onclick="calculateDrewnoKonstrukcyjnePrice(this)" id="${i}">Oblicz cene</button>
        </div>
        </div>
        <div style="display:none">
<!--            TODO-->
                <input type="checkbox" name="drewno[${i}][0]" id="[${i}][0]">
                <input type="checkbox" name="drewno[${i}][1]" id="[${i}][1]">
                <input type="checkbox" name="drewno[${i}][2]" id="[${i}][2]">
                <input type="checkbox" name="drewno[${i}][3]" id="[${i}][3]">
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
</div>
<div class="item-properties">
        <div class="itemInput">
            <span>Objetosc</span><br>
            <input name="calowka[${i}][v]" oninput="disableDimensions(this)" counter="${i}" id="[${i}][v]" >
        </div>
        <div class="itemInput">
            <span>Wymiar X</span><br>
            <input name="calowka[${i}][x]" id="[${i}][x]" >
        </div>
        <div class="itemInput">
            <span>dlugosc</span><br>
            <input name="calowka[${i}][length]" id="[${i}][length]">
        </div>
        <div class="itemInput">
            <span>Ilosc</span><br>
            <input name="calowka[${i}][amount]" id="[${i}][ilosc]" >
        </div>

        <div class="itemInput">
            <span>Cena</span><br>
            <input name="calowka[${i}][price]" id="[${i}][cena]" value=${CalowkaPrice} >
        </div>
        

        <div class="hebelWrapper">
            <div class="wrapper-top" >
                <div class="top" pos="0" counter="${i}" identifier= "[0]${i}" onclick="handleHebel(this)" >
        
                </div>
            </div>
            
            <div class="wrapper-mid"">

                <div class="mid centerly">

                </div>

            </div>
    
            <div class="wrapper-bot">
                <div class="bot" pos="2" counter="${i}" identifier= "[2]${i}"onclick="handleHebel(this)">
                </div>
            </div>
        </div>
</div>
        <div>
        <span>Wartość</span>
            <input name="calowka[${i}][value]"id="Wartosc[${i}]" >
            <button type="button" onclick="calculateDeskaCalowkaPrice(this)" id="${i}">Oblicz cene</button>
        </div>
                <div style="display:none">
<!--            TODO-->
                <input type="checkbox" name="drewno[${i}][0]" id="[${i}][0]">
                <input type="checkbox" name="drewno[${i}][1]" id="[${i}][1]">
                <input type="checkbox" name="drewno[${i}][2]" id="[${i}][2]">
                <input type="checkbox" name="drewno[${i}][3]" id="[${i}][3]">
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
<h3>Łata</h3>
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
            <input name="lata[value]" id="Wartosc[${i}]" >
            <button type="button" onclick="calculateLataPrice(this)" id="${i}">Oblicz cene</button>
        </p>
`;

    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);
    i++;
};
document.getElementById('kontrlata-button').onclick = function () {

    let template = `
<h3>Kontrłata</h3>
        <p>
            <label>Metrow bierzacych</label><br>
            <input name="kontrlata[metryBiezace]" id="[${i}][x]">
        </p>

        <p>
            <label>Cena</label><br>
            <input name="kontrlata[price]" id="[${i}][cena]" value=${KontrlataPrice}>
        </p>
        <p>
            <input name="kontrlata[value]" id="Wartosc[${i}]" >
            <button type="button" onclick="calculateLataPrice(this)" id="${i}">Oblicz cene</button>
        </p>
`;

    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);
    i++;
};
document.getElementById('opal-button').onclick = function () {

    let template =
        `<h3>Paczka opału</h3>
        <p>
            <label>Ilosc paczek</label><br>
            <input name="opal[amount]" id="[${i}][x]">
        </p>

        <p>
            <label>Cena</label><br>
            <input name="opal[price]" id="[${i}][cena]" value=${OpalPrice}>
        </p>
        <p>
            <input name="opal[value]" id="Wartosc[${i}]" >
            <button type="button" onclick="calculateLataPrice(this)" id="${i}">Oblicz cene</button>
        </p>`;

    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);
    i++;
};

document.getElementById('transport-button').onclick = function () {

    let template =
        `<h3>Transport</h3>
        <p>
            <label>Cena</label><br>
            <input name="transport[value]" id="[${i}][cena]" value=${TransportPrice}>
        </p>`;

    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);
    i++;
};
