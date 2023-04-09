let pole = [];
let objekt;
let bunkaRadku;
let hracNaTahu = true;
const board = document.querySelector(".board");
const pocetSloupcu = 6, pocetRadku = 6;
let _x, _y;

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
    let xTmp=_x, yTmp=_y;
    let vsechnyMoznosti = false;
    let znak = pole[_x][_y];
    console.log(znak);
    console.log(pole);
    console.log(find("X",pole));

}
