let pole = [];
let objekt;
let bunkaRadku;
let hracNaTahu = true;
const board = document.querySelector(".board");
const pocetSloupcu = 10, pocetRadku = 10;
let _x, _y;
let vyhra = false;

//vytvoreni pole
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

//kliknutí na board
board.onclick = e => {
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
        kontrolaVyhry()
    }
}



function kontrolaVyhry() {
    let znak = pole[_x][_y];
    let kolikratX=1;
    let kolikratO=1;
    //let vyhra = false;
   
    pole.forEach((element, poziceSloupce) => {
        element.forEach((element, poziceRadku) => {
            //console.log(`pozice ${element} je ${poziceSloupce},${poziceRadku}`);
            if(element=="X"){
                
                kontrolaOkolnichBunek(poziceSloupce,poziceRadku,znak,kolikratX);

            }
            else if(element=="O"){
                
                kontrolaOkolnichBunek(poziceSloupce,poziceRadku,znak,kolikratO);
                
              
            }
        });
    });
}



function kontrolaOkolnichBunek(_poziceSloupce,_poziceRadku,_znak,_kolikrat){
    
    while(!vyhra){
        console.log(_znak);
        //diagonála do prava dolů +1 +1
        if(pole[_poziceSloupce+_kolikrat][_poziceRadku+_kolikrat]==_znak){
            _kolikrat++;
            console.log("dalši "+ _znak+ _kolikrat);
        }
        //diagonála do leva dolů -1 -1
        //NEFUNGUJE !!!!!!!!!!
        else if(pole[_poziceSloupce-_kolikrat][_poziceRadku-_kolikrat]==_znak){
            
        }
        else{
            break;
        }
        //TODO Výhra na řádku (poziceSloupce se nemění jen radek + 1), na sloupci (poziceSloupce +1 radek nemeni), diagonála do leva (poziceSloupce -1 a poziceRadku-1) !


        //jestli našlo daný počet Znaků výhra = True
        if(_kolikrat>=5){
            alert("vyhra pro "+_znak);
            vyhra=true;
        }
         }
}
