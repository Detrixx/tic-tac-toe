let pole = [];
let bunkaRadku;
let hracNaTahu = true;
const board = document.querySelector(".board");
const pocetSloupcu = 8, pocetRadku = 8;
const naKolikViteznych = 5;
let _x, _y, znak;
let vyhra = false;
let kolikrat;

const BtReset = document.getElementById("reset");

vytvoreniPole();

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
        _x = e.target.parentElement.className;
        _y = e.target.className;
        _x = _x.replace('sloupec', '');
        _y = _y.replace('radek', '');
        if (kliknutaBunka.textContent == " ") {
            if (hracNaTahu) {
                kliknutaBunka.textContent = "X";
                pole[_x][_y] = "X";
                hracNaTahu = false;
            }
            else {
                kliknutaBunka.textContent = "O";
                pole[_x][_y] = "O";
                hracNaTahu = true;
            }
            kontrolaVyhry();
        }
    }
}

function kontrolaVyhry() {
    let znak = pole[_x][_y];
    kolikrat = 1;

    pole.forEach((element, poziceSloupce) => {
        element.forEach((element, poziceRadku) => {
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
    if (vyhra) {
        alert("Vyhra pro " + znak);
    }
}

function kontrolaOkolnichBunek(_poziceSloupce, _poziceRadku, _znak, _kolikrat, smerX, smerY) {
    while (_poziceSloupce + _kolikrat * smerX >= 0 && _poziceSloupce + _kolikrat * smerX < pocetSloupcu && _poziceRadku + _kolikrat * smerY >= 0 && _poziceRadku + _kolikrat * smerY < pocetRadku) {
        if (pole[_poziceSloupce + _kolikrat * smerX][_poziceRadku + _kolikrat * smerY] == _znak) {
            //Nefunguje pro diagonalu ! ???
            const parent1 = document.querySelector('.sloupec' + (_poziceSloupce));
            const element1 = parent1.querySelector('.radek' + (_poziceRadku));
            element1.classList.add('vyhra');
            const parent = document.querySelector('.sloupec' + (_poziceSloupce + _kolikrat * smerX));
            const element = parent.querySelector('.radek' + (_poziceRadku + _kolikrat * smerY));
            console.log(element);
            element.classList.add('vyhra');
            console.log(element);
           
            _kolikrat++;

        }
        else {
            //odstraní všechny classy "vyhra"
            const elements = document.getElementsByClassName('vyhra');
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('vyhra');
            }
            break;
        }
        //jestli našlo daný počet Znaků výhra = True
        if (_kolikrat >= naKolikViteznych) {
            vyhra = true;
            kolikrat = naKolikViteznych;
            break;
            
        }
    }
}
