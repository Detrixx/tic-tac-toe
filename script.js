let pole = [];
let bunkaRadku;
let hracNaTahu = true;
const board = document.querySelector(".board");
const pocetSloupcu = 8, pocetRadku = 8;
const naKolikViteznych=5;
let _x, _y,znak;
let vyhra = false;

vytvoreniPole();

//vytvoreni pole
function vytvoreniPole(){
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
}

//kliknutí na board
board.onclick = e => {
    if(!vyhra){
    let kliknutaBunkaSloupec = document.querySelector('.' + e.target.parentElement.className);
    let kliknutaBunka = kliknutaBunkaSloupec.querySelector('.' + e.target.className);
    _x = e.target.parentElement.className;
    _y = e.target.className;
    _x = _x.replace('sloupec', '');
    _y = _y.replace('radek', '');
    if (kliknutaBunka.textContent == " ") {
        if (hracNaTahu) {
            kliknutaBunka.innerHTML = "X";
            pole[_x][_y] = "X";
            hracNaTahu = false;
        }
        else {
            kliknutaBunka.innerHTML = "O";
            pole[_x][_y] = "O";
            hracNaTahu = true;
        }
        kontrolaVyhry();  
    }
}
}

function kontrolaVyhry() {
    let znak = pole[_x][_y];
    let kolikrat=1;

    pole.forEach((element, poziceSloupce) => {
        element.forEach((element, poziceRadku) => {
            //console.log(`pozice ${element} je ${poziceSloupce},${poziceRadku}`);
            if(element==znak){   
                //diagonála          
                kontrolaOkolnichBunek(poziceSloupce,poziceRadku,znak,kolikrat,1,1);
                kontrolaOkolnichBunek(poziceSloupce,poziceRadku,znak,kolikrat,-1,1);
                //sloupec
                kontrolaOkolnichBunek(poziceSloupce,poziceRadku,znak,kolikrat,0,1);
                //řádek
                kontrolaOkolnichBunek(poziceSloupce,poziceRadku,znak,kolikrat,1,0);
            }
        });
    });
    if(vyhra){
        alert("Vyhra pro "+znak);
    }
}

function kontrolaOkolnichBunek(_poziceSloupce,_poziceRadku,_znak,_kolikrat,smerX,smerY){

    while(_poziceSloupce + _kolikrat * smerX >= 0 && _poziceSloupce + _kolikrat * smerX < pocetSloupcu && _poziceRadku + _kolikrat * smerY >= 0 && _poziceRadku + _kolikrat * smerY < pocetRadku){
       if(pole[_poziceSloupce+_kolikrat*smerX][_poziceRadku+_kolikrat*smerY]==_znak){
            _kolikrat++;
        }
        else{
            break;
        }
        //jestli našlo daný počet Znaků výhra = True
        if(_kolikrat>=naKolikViteznych){    
            vyhra=true;
            break;
        }
         }
}