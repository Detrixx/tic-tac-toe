let pole = [];
let objekt;
let bunkaRadku;
const board = document.querySelector(".board");
const pocetSloupcu=5, pocetRadku=5;

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
board.onclick = e => {
    console.log(e.target);  // to get the element
    console.log(e.target.parentElement);
    if(e.target.parentElement == "sloupec3"){
        console.log("tady");

    }

} 

zacatekHry();

function zacatekHry(){

    
        
}
function kliknutiNaBunku(){

}


console.log(pole);