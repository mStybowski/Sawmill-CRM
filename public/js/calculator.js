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

//te dwie funkcje polaczyc dodajac jeszcze jeden argument - boolean
function disableElement(elmntID){

    document.getElementById(elmntID).disabled = true;
}

function enableElement(elmntID){

    document.getElementById(elmntID).disabled = false;
}

function zmienionoValue(elmnt){

    elmntID = elmnt.getAttribute("counter");
    wartoscOstatecznaBrutto = Number(elmnt.value);
    updateNicePrice(elmntID, calculateNetto(wartoscOstatecznaBrutto), wartoscOstatecznaBrutto.toFixed(2));

}

function usunPozycje(idToDelete, isSimple, idToSimple){
    var d = document.getElementById("zamowienie-container");
    var d_zagniezdzony = document.getElementById(`div[${idToDelete}]`);
    var usuwany_wezel = d.removeChild(d_zagniezdzony);

    if(isSimple){
        enableElement(idToSimple);
    }
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

function createNewObject(template){
    let container = document.getElementById('zamowienie-container');
    let div = document.createElement('div');
    div.id = `div[${i}]`;
    div.innerHTML = template;
    container.appendChild(div);

    let hebel = [false, false, false, false];
    allHebels.push(hebel);

    i++;
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
<div class="formItem">
    <div class="formItem-Header">
    
        <div class="formItem-Header-ProductName">
            <img src="/images/icons/nature.png">
            <span>Drewno Konstrukcyjne</span>
        </div>
        
        <div class="formItem-Header-Pricing">
            <span id="nicePrice[${i}]" >
                --- zł Netto / <strong>--- zł Brutto</strong>
            </span>
                    <button type="button" class="deleteButton" onclick="usunPozycje(${i})" counter="${i}">Usuń</button>

        </div>
    </div>
    <div class="formRow">
        <div class="formItem-Properties-Text">
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="drewno[${i}][x]" id="[${i}][x]" class="featureInput">
                    <div class="bi"></div>
                </div>
                <span>Szerokość</span>
            </div>
            
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="drewno[${i}][y]" id="[${i}][y]" class="featureInput"> 
                    <div class="bi"></div>
                </div>
                <span>Wysokość</span>
            </div>
            
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="drewno[${i}][length]" id="[${i}][length]" class="featureInput">
                    <div class="bi"></div>
                </div>
                <span>Długość</span>
            </div>
            
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="drewno[${i}][amount]" id="[${i}][ilosc]" class="featureInput">
                    <div class="bi"></div>
                </div>
            <span>Ilość</span>
            </div>
                
        </div>
        <div class="formItem-Properties-Checkboxes">
            <div class="formItem-Properties-Checkboxes-Element">
                <input type="checkbox" name="drewno[${i}][painted]" >
                <span>Impregnacja</span>
            </div>
            <div class="formItem-Properties-Checkboxes-Element">
                <input type="checkbox" name="drewno[${i}][heblowane]" >
                <span>Heblowanie</span>
            </div>
        </div>
        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="drewno[${i}][price]" id="[${i}][cena]" class="featureInput" value=${DrewnoPrice}>
                    <div class="bi"></div>
                </div>
            <span>zł/m<sup>3</sup></span>
            </div>
    </div>
    <div class="formRow">
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                        <div class="bi"></div>
                        <input name="drewno[${i}][description]" id="[${i}][opis]" class="featureInput longFeatureInput">
                        <div class="bi"></div>
                    </div>
                <span>Komentarz</span>
            </div>
            <div class="hebelWrapper">
            <div class="wrapper-top" >
                <div class="top" pos="0" counter="${i}" rodzaj="drewno" identifier="[0]${i}" onclick="handleHebel(this)" >
        
                </div>
            </div>
            
            <div class="wrapper-mid">
                <div class="mid" pos="3" counter="${i}" rodzaj="drewno" identifier="[3]${i}" onclick="handleHebel(this)" >

                </div>
                <div class="mid centerly">

                </div>
                <div class="mid" pos="1" counter="${i}" rodzaj="drewno" identifier="[1]${i}" onclick="handleHebel(this)" >

                </div>
            </div>
    
            <div class="wrapper-bot">
                <div class="bot" pos="2" counter="${i}" rodzaj="drewno" identifier= "[2]${i}" onclick="handleHebel(this)">
                </div>
            </div>
        </div>
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                        <input name="drewno[${i}][value]" id="Wartosc[${i}]" counter="${i}" oninput="zmienionoValue(this)" class="featureInput finalFeatureInput">
                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                    </div>
                <span><strong>BRUTTO</strong></span>
            </div>
    </div>
    <button type="button" onclick="calculateDrewnoKonstrukcyjnePrice(id)" class="calculatePriceButton" id="${i}">Oblicz</button>
</div>
        
        <div style="display:none">
                <input type="checkbox" name="drewno[${i}][htop]" id="[${i}][0]">
                <input type="checkbox" name="drewno[${i}][hright]" id="[${i}][1]">
                <input type="checkbox" name="drewno[${i}][hbottom]" id="[${i}][2]">
                <input type="checkbox" name="drewno[${i}][hleft]" id="[${i}][3]">
         </div>

`;

    createNewObject(template);

};

document.getElementById('calowka-button').onclick = function () {

    let template = `
<div class="formItem">
    <div class="formItem-Header">
        <div class="formItem-Header-ProductName">
            <img src="/images/icons/calowka.png">
            <span>Deska Calówka</span>
        </div>
        <div class="formItem-Header-Pricing">
            <span id="nicePrice[${i}]" >
                --- zł Netto / <strong>--- zł Brutto</strong>
            </span>
            <button type="button" class="deleteButton" onclick="usunPozycje(${i}, false)" counter="${i}">Usuń</button>
        </div>
    </div>
    <div class="formRow">
        <div class="formItem-Properties-Text">
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="calowka[${i}][v]" oninput="disableDimensions(this)" counter="${i}" id="[${i}][v]" class="featureInput">
                    <div class="bi"></div>
                </div>
                <span>Objętość</span>
            </div>
            
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="calowka[${i}][x]" counter="${i}" id="[${i}][x]" oninput="disableVolume(this)" class="featureInput">
                    <div class="bi"></div>
                </div>
                <span>Szerokość</span>
            </div>
            
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="calowka[${i}][length]" counter="${i}" id="[${i}][length]" oninput="disableVolume(this)" class="featureInput">
                    <div class="bi"></div>
                </div>
                <span>Długość</span>
            </div>
            
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="calowka[${i}][amount]" counter="${i}" id="[${i}][ilosc]" oninput="disableVolume(this)" class="featureInput">
                    <div class="bi"></div>
                </div>
            <span>Ilość</span>
            </div>
                
        </div>
        <div class="formItem-Properties-Checkboxes">
            <div class="formItem-Properties-Checkboxes-Element">
                <input type="checkbox" name="calowka[${i}][painted]" >
                <span>Impregnacja</span>
            </div>
            <div class="formItem-Properties-Checkboxes-Element">
                <input type="checkbox" name="calowka[${i}][heblowane]" >
                <span>Heblowanie</span>
            </div>
        </div>
        
        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="calowka[${i}][price]" id="[${i}][cena]" class="featureInput" value=${CalowkaPrice} class="featureInput">
                    <div class="bi"></div>
                </div>
            <span>zł/m<sup>3</sup></span>
        </div>
        
    </div>
    <div class="formRow">
    <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                        <div class="bi"></div>
                        <input name="calowka[${i}][description]" id="[${i}][opis]" class="featureInput longFeatureInput">
                        <div class="bi"></div>
                    </div>
                <span>Komentarz</span>
            </div>
        <div class="hebelWrapper">
            <div class="wrapper-top" >
                <div class="top" pos="0" counter="${i}" identifier= "[0]${i}" rodzaj="calowka" onclick="handleHebel(this)" >
        
                </div>
            </div>
            
            <div class="wrapper-mid">

                <div class="mid centerly">

                </div>

            </div>
    
            <div class="wrapper-bot">
                <div class="bot" pos="2" counter="${i}" rodzaj="calowka" identifier= "[2]${i}"onclick="handleHebel(this)">
                </div>
            </div>
        </div>
        
        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                        <input name="calowka[${i}][value]"id="Wartosc[${i}]" counter="${i}" oninput="zmienionoValue(this)" class="featureInput finalFeatureInput">
                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                    </div>
                <span><strong>BRUTTO</strong></span>
            </div>
        
    </div>
    <button type="button" onclick="calculateDeskaCalowkaPrice(id)" class="calculatePriceButton" id="${i}">Oblicz</button>


                <div style="display:none">
<!--            TODO-->

                <input type="checkbox" name="calowka[${i}][htop]" id="[${i}][0]">
                <input type="checkbox" name="calowka[${i}][hright]" id="[${i}][1]">
                <input type="checkbox" name="calowka[${i}][hbottom]" id="[${i}][2]">
                <input type="checkbox" name="calowka[${i}][hleft]" id="[${i}][3]">
         </div>
`;
    createNewObject(template);

};
document.getElementById('lata-button').onclick = function () {


    let template = `
<div class="formItem">
    <div class="formItem-Header">
        <div class="formItem-Header-ProductName">
            <img src="/images/icons/lata.png">
            <span>Łata</span>
        </div>
        <div class="formItem-Header-Pricing">
            <span id="nicePrice[${i}]" >
                --- zł Netto / <strong>--- zł Brutto</strong>
            </span>
                                <button type="button" class="deleteButton" onclick="usunPozycje(${i}, true, 'lata-button')" >Usuń</button>

        </div>
    </div>
    <div class="formRow">

        <div class="formItem-Properties-Text">
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="lata[metryBiezace]" id="[${i}][x]" oninput="calculatePrice(${i})" class="featureInput" >
                    <div class="bi"></div>
                </div>
                <span>Metry Bieżące</span>
                
         
            </div>
                              <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                        <div class="bi"></div>
                        <input name="lata[description]" class="featureInput mediumFeatureInput">
                        <div class="bi"></div>
                    </div>
                <span>Komentarz</span>
            </div>
        </div>
        <div class="formItem-Properties-Checkboxes">
            <div class="formItem-Properties-Checkboxes-Element">
                <input type="checkbox" name="lata[painted]" >
                <span>Impregnacja</span>
            </div>

        </div>

        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="lata[price]" id="[${i}][cena]" oninput="calculatePrice(${i})"  value=${LataPrice} class="featureInput" >
                    <div class="bi"></div>
                </div>
            <span>zł/m<sup>3</sup></span>
        </div>
        
    </div>
    <div class="formRow" style="justify-content: flex-end">
            <button class="calculatePriceButtonSmall" type="button" onclick="calculatePrice(id)" id="${i}">Oblicz cenę</button>
        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                        <input name="lata[value]" id="Wartosc[${i}]" counter="${i}" oninput="zmienionoValue(this)" class="featureInput finalFeatureInput">
                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                    </div>
                <span><strong>BRUTTO</strong></span>
            </div>
        
    </div>        
</div>
`;
    createNewObject(template);

    isLata = true;
    disableElement("lata-button");
};
document.getElementById('kontrlata-button').onclick = function () {

    let template = `
<div class="formItem">
    <div class="formItem-Header">
        <div class="formItem-Header-ProductName">
            <img src="/images/icons/kontrlata.png">
            <span>Kontrłata</span>
        </div>
        <div class="formItem-Header-Pricing">
            <span id="nicePrice[${i}]" >
                --- zł Netto / <strong>--- zł Brutto</strong>
            </span>
                                <button type="button" class="deleteButton" onclick="usunPozycje(${i}, true, 'kontrlata-button')" >Usuń</button>

        </div>
    </div>
    <div class="formRow">
        <div class="formItem-Properties-Text">
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="kontrlata[metryBiezace]" oninput="calculatePrice(${i})" id="[${i}][x]" class="featureInput">
                    <div class="bi"></div>
                </div>
                <span>Metry Bieżące</span>
                
         
            </div>
                              <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                        <div class="bi"></div>
                        <input name="kontrlata[description]" class="featureInput mediumFeatureInput">
                        <div class="bi"></div>
                    </div>
                <span>Komentarz</span>
            </div>
        </div>
        <div class="formItem-Properties-Checkboxes">
            <div class="formItem-Properties-Checkboxes-Element">
                <input type="checkbox" name="kontrlata[painted]">
                <span>Impregnacja</span>
            </div>

        </div>

        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="kontrlata[price]" id="[${i}][cena]" oninput="calculatePrice(${i})" value=${KontrlataPrice} class="featureInput"> 

                    <div class="bi"></div>
                </div>
            <span>zł/m<sup>3</sup></span>
        </div>
        
    </div>
    <div class="formRow" style="justify-content: flex-end">
    <button type="button" class="calculatePriceButtonSmall" onclick="calculatePrice(id)"  id="${i}">Oblicz cene</button>

        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                            <input name="kontrlata[value]" id="Wartosc[${i}]" counter="${i}" oninput="zmienionoValue(this)" class="featureInput finalFeatureInput">

                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                    </div>
                <span><strong>BRUTTO</strong></span>
            </div>
        
    </div>        
</div>`;
    createNewObject(template);

    isKontrlata = true;
    disableElement("kontrlata-button");
};
document.getElementById('opal-button').onclick = function () {

    let template =
        `<div class="formItem">
    <div class="formItem-Header">
        <div class="formItem-Header-ProductName">
            <img src="/images/icons/opal.png">
            <span>Opał</span>
        </div>
        <div class="formItem-Header-Pricing">
            <span id="nicePrice[${i}]" >
                --- zł Netto / <strong>--- zł Brutto</strong>
            </span>
                                <button type="button"class="deleteButton" onclick="usunPozycje(${i}, true, 'opal-button')" >Usuń</button>

        </div>
    </div>
  <div class="formRow">
        <div class="formItem-Properties-Text">
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="opal[amount]" id="[${i}][x]" oninput="calculatePrice(${i})" class="featureInput">
                    <div class="bi"></div>
                </div>
                <span>Ilość</span>
                
         
            </div>
                              <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                        <div class="bi"></div>
                        <input name="opal[description]" class="featureInput mediumFeatureInput center">
                        <div class="bi"></div>
                    </div>
                <span>Gatunek drzewa</span>
            </div>
        </div>
        <div class="formItem-Properties-Checkboxes">
            <div class="formItem-Properties-Checkboxes-Element">
                
                <span></span>
            </div>

        </div>

        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="opal[price]" id="[${i}][cena]" oninput="calculatePrice(${i})" value=${OpalPrice} class="featureInput">
                    <div class="bi"></div>
                </div>
            <span>zł/m<sup>3</sup></span>
        </div>
        
    </div>
    <div class="formRow" style="justify-content: flex-end">
    <button type="button" class="calculatePriceButtonSmall" onclick="calculatePrice(id)" counter="${i}"  id="${i}" >Oblicz cene</button>
        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                            <input name="opal[value]" id="Wartosc[${i}]" counter="${i}" oninput="zmienionoValue(this)" class="featureInput finalFeatureInput">

                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                    </div>
                <span><strong>BRUTTO</strong></span>
            </div>
        
    </div>        
</div>
`;
    createNewObject(template);

    isOpal = true;
    disableElement("opal-button");
};

document.getElementById('transport-button').onclick = function () {


    let template =
        `
<div class="formItem">
    <div class="formItem-Header">
        <div class="formItem-Header-ProductName">
            <img src="/images/icons/transport.png">
            <span>Transport</span>
        </div>
        <div class="formItem-Header-Pricing">
            <span id="nicePrice[${i}]" >
                --- zł Netto / <strong>--- zł Brutto</strong>
            </span>
                                <button type="button" class="deleteButton" onclick="usunPozycje(${i}, true, 'transport-button')" >Usuń</button>

        </div>
    </div>
    <div class="formRow">
        <div class="formItem-Properties-Text">
            <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="transport[kilometers]" id="[${i}][x]" counter="${i}" oninput="calculatePrice(${i})" class="featureInput">
                    <div class="bi"></div>
                </div>
                <span>Kilometry</span>
                
         
            </div>
                              <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                        <div class="bi"></div>
                        <input name="transport[description]" class="featureInput mediumFeatureInput">
                        <div class="bi"></div>
                    </div>
                <span>Komentarz</span>
            </div>
        </div>
        <div class="formItem-Properties-Checkboxes">
            <div class="formItem-Properties-Checkboxes-Element">
                
                <span></span>
            </div>

        </div>

        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                    <div class="bi"></div>
                    <input name="transport[price]" id="[${i}][cena]" counter="${i}" oninput="calculatePrice(${i})" value=${TransportPrice} class="featureInput">
                    <div class="bi"></div>
                </div>
            <span>zł/m<sup>3</sup></span>
        </div>
        
    </div>
    <div class="formRow" style="justify-content: flex-end">
    <button type="button" class="calculatePriceButtonSmall" onclick="calculatePrice(id)" counter="${i}"  id="${i}" >Oblicz cene</button>
        <div class="formItem-Properties-Text-Feature">
                <div class="formItem-Properties-Text-Feature-InputDiv">
                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                            <input name="transport[value]" id="Wartosc[${i}]" counter="${i}"  oninput="zmienionoValue(this)" class="featureInput finalFeatureInput">

                            <div class="di">
                                <div class="bi"></div>
                                <div class="bi"></div>
                            </div>
                    </div>
                <span><strong>BRUTTO</strong></span>
            </div>
          
        
    </div>  
    
</div>
`;
    createNewObject(template);

    isTransport = true;
    disableElement("transport-button");
};
