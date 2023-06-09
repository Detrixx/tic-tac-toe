let pole = [];
let bunkaRadku;
const board = document.querySelector(".board");
let pocetSloupcu , pocetRadku ;
let naKolikViteznych;
const menu = document.querySelector(".menu");
const inputy = document.querySelector(".inputy");
let _x, _y, znak;
let vyhra = false;
let kolikrat;
let pocetHracu =2;
let kontrolaPoctuHracu =1;
let remiza=0;
const BtReset = document.getElementById("reset");
const TextWin = document.querySelector(".win");

BtReset.className = "Hide";
board.className = "Hide";


function zacatekHry(){
    pocetSloupcu = document.querySelector("#range1").value, pocetRadku = pocetSloupcu;
    naKolikViteznych = document.querySelector("#range2").value;
    menu.className = "Hide";
    BtReset.className = "button";
    board.className = "board";
    TextWin.className = "win";
    vytvoreniPole();

}
function pridaniHrace(){
    let hrac = document.createElement("input");
    let brElement = document.createElement("br");
    let brElement1 = document.createElement("br");
    pocetHracu++;
    hrac.className = "hrac"+pocetHracu;
    hrac.setAttribute("maxlength", "1");
    inputy.appendChild(brElement);
    inputy.appendChild(brElement1);
    inputy.appendChild(hrac);
}
function kontrolaPridaniHrace(){
    for(let i=1;i<=pocetHracu;i++){
        let hrac = document.querySelector(".hrac"+i);
        if(hrac.value===""){
            alert("Fill in symbols for all players.");
            return false;
        }
    }
    zacatekHry();
    return true;
}
//vytvoreni pole
function vytvoreniPole() {
    for (let x = 0; x < pocetSloupcu; x++) {
        pole[x] = [];
        //vytvoří DIV pod board
        bunkaRadku = document.createElement("div");
        bunkaRadku.classList.add("sloupec" + x);
        board.appendChild(bunkaRadku);
        for (let y = 0; y < pocetRadku; y++) {
            //vytvoří DIV pod bunkaRadku
            let bunka = document.createElement("div");
            bunka.classList.add("radek" + y);
            bunkaRadku.appendChild(bunka);
            //vloží na pozice X a Y string
            pole[x][y] = [" "];
            bunka.textContent = pole[x][y];
        }
    }
    let BoardHeight = board.clientHeight + 20;
    BtReset.style.top = BoardHeight+"px";
}


//kliknutí na board
board.onclick = e => {
    if (!vyhra) {
        let kliknutaBunkaSloupec = document.querySelector('.' + e.target.parentElement.className);
        let kliknutaBunka = kliknutaBunkaSloupec.querySelector('.' + e.target.className);
        let kliknutyZnak = document.querySelector('.hrac'+kontrolaPoctuHracu).value.toUpperCase();
        _x = e.target.parentElement.className;
        _y = e.target.className;
        _x = _x.replace('sloupec', '');
        _y = _y.replace('radek', '');
        //pokud je bunka prázdná tak se vloží znak a zavolá se kontrolaVyhry
        if (kliknutaBunka.textContent == " ") {
                kliknutaBunka.textContent = kliknutyZnak;
                pole[_x][_y] = kliknutyZnak;
                if(kontrolaPoctuHracu===pocetHracu){kontrolaPoctuHracu=1;}
                else{kontrolaPoctuHracu++;}
            kontrolaVyhry();
        }
    }
}

function kontrolaVyhry() {
    let znak = pole[_x][_y];
    kolikrat = 1;

    
    pole.forEach((element, poziceSloupce) => {
        element.forEach((element, poziceRadku) => {
            if(JSON.stringify(element)===JSON.stringify([" "])){
                remiza++;
            }
            //console.log(`pozice ${element} je ${poziceSloupce},${poziceRadku}`);
            if (element == znak&& kolikrat!=naKolikViteznych) {
                //diagonála
                if(!vyhra){          
                kontrolaOkolnichBunek(poziceSloupce, poziceRadku, znak, kolikrat, 1, 1);
            }
            if(!vyhra){  
                kontrolaOkolnichBunek(poziceSloupce, poziceRadku, znak, kolikrat, -1, 1);
            }
                //sloupec
                if(!vyhra){  
                kontrolaOkolnichBunek(poziceSloupce, poziceRadku, znak, kolikrat, 0, 1);
            }
                //řádek
                if(!vyhra){  
                kontrolaOkolnichBunek(poziceSloupce, poziceRadku, znak, kolikrat, 1, 0);
            }
            }
        });
    });
    if(remiza===0){
        TextWin.textContent = "Draw!";
    }
    remiza=0;
    
    if (vyhra) {
        TextWin.textContent = znak+" won!";
    }
    
}

function kontrolaOkolnichBunek(_poziceSloupce, _poziceRadku, _znak, _kolikrat, smerX, smerY) {
    while (_poziceSloupce + _kolikrat * smerX >= 0 && _poziceSloupce + _kolikrat * smerX < pocetSloupcu && _poziceRadku + _kolikrat * smerY >= 0 && _poziceRadku + _kolikrat * smerY < pocetRadku) {
        if (pole[_poziceSloupce + _kolikrat * smerX][_poziceRadku + _kolikrat * smerY] == _znak) {
            pridaniVyhra(_poziceSloupce, _poziceRadku, _znak, _kolikrat, smerX, smerY);
            _kolikrat++;
        }
        else {
            break;
        }
        //jestli našlo daný počet Znaků výhra = True
        if (_kolikrat >= naKolikViteznych) {
            vyhra = true;
            kolikrat = naKolikViteznych;
            break;
            
        }
    }
    if(!vyhra){
        odstraniVyhru();
    }
}

//přidá classu "vyhra"
function pridaniVyhra(_poziceSloupce, _poziceRadku, _znak, _kolikrat, smerX, smerY){
    const parent1 = document.querySelector('.sloupec' + (_poziceSloupce));
    const element1 = parent1.querySelector('.radek' + (_poziceRadku));
    element1.classList.add('vyhra');
    const parent = document.querySelector('.sloupec' + (_poziceSloupce + _kolikrat * smerX));
    const element = parent.querySelector('.radek' + (_poziceRadku + _kolikrat * smerY));
    element.classList.add('vyhra');
}

//odstraní všechny classy "vyhra"
function odstraniVyhru(){
    const elements = document.getElementsByClassName('vyhra');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('vyhra');
    }
}