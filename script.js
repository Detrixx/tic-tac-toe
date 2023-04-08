let pole = [];
let objekt;
const bunka = document.querySelectorAll(".sloupec");

//vytvoreni pole
//
for(let x=0;x<5;x++){
    pole[x]=[];
    for(let y=0;y<5;y++){
        pole[x][y]= ["O"];
        let bunkaSloupce = document.getElementsByClassName('radek'+x)[0];
        let bunka = bunkaSloupce.querySelector(".sloupec"+y);
        bunka.textContent = pole[x][y];
    }
}
zacatekHry();

function zacatekHry(){

    bunka.forEach(bunka => bunka.addEventListener("click"),kliknutiNaBunku());
        
}
function kliknutiNaBunku(){

}


console.log(pole);