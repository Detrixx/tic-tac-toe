let pole = [];
let objekt;
let bunkaRadku;
let hracNaTahu=true;
const board = document.querySelector(".board");
const pocetSloupcu=6, pocetRadku=6;

//vytvoreni pole
for(let x=0;x<pocetSloupcu;x++){
    pole[x]=[];
    //vytvoří DIV pod board
        bunkaRadku = document.createElement("div");
        bunkaRadku.classList.add("sloupec"+x);
        board.appendChild(bunkaRadku);
    for(let y=0;y<pocetRadku;y++){ 
    //vytvoří DIV pod bunkaRadku
        let bunka = document.createElement("div");
        bunka.classList.add("radek"+y);
        bunkaRadku.appendChild(bunka);
    //vloží na pozice X a Y string
        pole[x][y]= ["O"];
        bunka.textContent = pole[x][y];
    }
}
//kliknutí na board
board.onclick = e => {
    let kliknutaBunkaSloupec = document.querySelector('.'+e.target.parentElement.className);
    let kliknutaBunka = kliknutaBunkaSloupec.querySelector('.'+e.target.className);
    if(kliknutaBunka.textContent=="O"){
    if(hracNaTahu){
    kliknutaBunka.innerHTML = "X";
    hracNaTahu=false;
    }
    else{
        kliknutaBunka.innerHTML = "T";
        hracNaTahu=true;
    }
}
} 