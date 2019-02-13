class Uczen{
    constructor(_cost, _perclick, _posiadani=0){
        this.cost=_cost;
        this.perclick=_perclick;
        this.posiadani=_posiadani;
    }
    static MPC(a, b, c, d, e) {
        let mpc=1+(a.perclick*a.posiadani+b.perclick*b.posiadani+c.perclick*c.posiadani+d.perclick*d.posiadani+e.perclick*e.posiadani);
        return mpc;
    }//oblicza mieczniki co kliknięcie
    
    canAfford(currentMieczniki){
        return this.cost<=currentMieczniki;
    }
};
//uczniowie
const zamojda= new Uczen(50, 1);
const maurycy= new Uczen(500,12);
const dominik= new Uczen(1500,45);
const giru= new Uczen(4000,150);
const poskrobko= new Uczen(10000, 450);
//==========
class Artefakt{
    constructor(_cost, _persecond, _posiadani=0){
        this.cost=_cost;
        this.persecond=_persecond;
        this.posiadani=_posiadani;
    }

    static MPS(a,b,c,d,e){
        let mps=a.persecond*a.posiadani+b.persecond*b.posiadani+c.persecond*c.posiadani+d.persecond*d.posiadani+e.persecond*e.posiadani;
        return mps;
    }//oblicza mieczniki co sekunde

    canAfford(currentMieczniki){
        return this.cost<=currentMieczniki;
    }

};
//artefakty
const pilot= new Artefakt(50,1);
const haslo=new Artefakt(500,12);
const wskazowka=new Artefakt(1500,45);
const sala=new Artefakt(4000,150);
const zaplecze=new Artefakt(10000,450);
const INTERVAL=1000;
//=========

//=====
let clicks=0;
let mieczniki=0;
let mieczniki_per_click=Uczen.MPC(zamojda,maurycy,dominik,giru,poskrobko); //mieczniki co klikniecie
let mieczniki_per_second=Artefakt.MPS(pilot,haslo,wskazowka,sala,zaplecze); //mieczniki na sekunde
//======

//boxy z wartosciami
const farmed=document.querySelector("#allMiecznik");
const mPerClick_box=document.querySelector("#mPerClick");
const mPerSecond_box=document.querySelector("#mPerSecond");
//==================
//posiadani uczniowie
const zamojda_box=document.getElementById("zamojda");
const maurycy_box=document.getElementById("maurycy");
const dominik_box=document.getElementById("dominik");
const giru_box=document.getElementById("giru");
const poskrobko_box=document.getElementById("poskrobko");
//==================
//posiadane artefakty
const pilot_box=document.getElementById("pilot");
const haslo_box=document.getElementById("haslo");
const wskazowka_box=document.getElementById("wskazowka");
const sala_box=document.getElementById("sala");
const zaplecze_box=document.getElementById("zaplecze");
//==================
//przyciski uczniow
const zamojda_but=document.querySelector("#zamojda_but");
const maurycy_but= document.querySelector("#maurycy_but");
const dominik_but= document.querySelector("#dominik_but");
const giru_but= document.querySelector("#giru_but");
const poskrobko_but= document.querySelector("#poskrobko_but");
//==================
//przyciski artefaktow
const pilot_but=document.querySelector("#pilot_but");
const haslo_but=document.querySelector("#haslo_but");
const wskazowka_but=document.querySelector("#wskazowka_but");
const sala_but=document.querySelector("#sala_but");
const zaplecze_but=document.querySelector("#zaplecze_but");
//==================

//==================
farmed.innerHTML=mieczniki;
mPerClick_box.innerHTML=mieczniki_per_click;
mPerSecond_box.innerHTML=mieczniki_per_second;
//==================
const MainMiecznik=document.querySelector("#mainMiecznik");

let x=mieczniki_per_second/30;
let interval=setInterval(()=>{
    mieczniki+=x;
    updateMieczniki();
},1000/30);
//funkcje gry
function AddPerSec(){
    x=mieczniki_per_second/30;
    clearInterval(interval);
    interval=setInterval(()=>{
        mieczniki+=x;
        updateMieczniki();
    },1000/30);
}



function Reset(){
    mieczniki=0;
    updateMieczniki();
    mieczniki_per_click=0;
    updateMPC();
    mieczniki_per_second=0;
    updateMPS();
    zamojda.posiadani=0;
    updateUczen(zamojda,zamojda_box);
    maurycy.posiadani=0;
    updateUczen(maurycy, maurycy_box);
    giru.posiadani=0;
    updateUczen(giru, giru_box);
    dominik.posiadani=0;
    updateUczen(dominik, dominik_box);
    poskrobko.posiadani=0;
    updateUczen(poskrobko, poskrobko_box);
    pilot.posiadani=0;
    updateArtifact(pilot,pilot_box);
    haslo.posiadani=0;
    updateArtifact(haslo,haslo_box);
    wskazowka.posiadani=0;
    updateArtifact(wskazowka,wskazowka_box);
    sala.posiadani=0;
    updateArtifact(sala,sala_box);
    zaplecze.posiadani=0;
    updateArtifact(zaplecze,zaplecze_box);
    AddPerSec();
}

function AntiAutoClicker(){
    setInterval(()=>{
        if (clicks>11){
            Reset();
            clicks=0;
        }
        else{
            console.log(clicks);
            clicks=0;
        }
    },1000)
}
//============
//eventy===================================================
MainMiecznik.addEventListener('click',(event)=>{
    clicks++;
    mieczniki+=mieczniki_per_click;
    updateMieczniki();
});
//uczniowie
zamojda_but.addEventListener('click',(event)=>{
    if(zamojda.canAfford(mieczniki)){
        zamojda.posiadani++;
        updateUczen(zamojda,zamojda_box);
        updateMPC();
        mieczniki-=zamojda.cost;
        updateMieczniki();
    }
})
maurycy_but.addEventListener('click',(event)=>{
    if(maurycy.canAfford(mieczniki)){
        maurycy.posiadani++;
        updateUczen(maurycy,maurycy_box);
        updateMPC();
        mieczniki-=maurycy.cost;
        updateMieczniki();
    }
})
dominik_but.addEventListener('click',(event)=>{
    if(dominik.canAfford(mieczniki)){
        dominik.posiadani++;
        updateUczen(dominik,dominik_box);
        updateMPC();
        mieczniki-=dominik.cost;
        updateMieczniki();
    }
})
giru_but.addEventListener('click',(event)=>{
    if(giru.canAfford(mieczniki)){
        giru.posiadani++;
        updateUczen(giru,giru_box);
        updateMPC();
        mieczniki-=giru.cost;
        updateMieczniki();
    }
})
poskrobko_but.addEventListener('click',(event)=>{
     if(poskrobko.canAfford(mieczniki)){
        poskrobko.posiadani++;
        updateUczen(poskrobko,poskrobko_box);
        updateMPC();
        mieczniki-=poskrobko.cost;
        updateMieczniki();
    }
})
//koniec uczniow
//artefakty
pilot_but.addEventListener('click',(event)=>{
    if(pilot.canAfford(mieczniki)){
        pilot.posiadani++;
        updateArtifact(pilot,pilot_box);
        updateMPS();
        mieczniki-=pilot.cost;
        updateMieczniki();
        AddPerSec();
    }
})
haslo_but.addEventListener('click',(event)=>{
    if(haslo.canAfford(mieczniki)){
        haslo.posiadani++;
        updateArtifact(haslo,haslo_box);
        updateMPS();
        mieczniki-=haslo.cost;
        updateMieczniki();
        AddPerSec();
    }
})
wskazowka_but.addEventListener('click',(event)=>{
    if(wskazowka.canAfford(mieczniki)){
        wskazowka.posiadani++;
        updateArtifact(wskazowka,wskazowka_box);
        updateMPS();
        mieczniki-=wskazowka.cost;
        updateMieczniki();
        AddPerSec();
    }
})
sala_but.addEventListener('click',(event)=>{
    if(sala.canAfford(mieczniki)){
        sala.posiadani++;
        updateArtifact(sala,sala_box);
        updateMPS();
        mieczniki-=sala.cost;
        updateMieczniki();
        AddPerSec();
    }
})
zaplecze_but.addEventListener('click',(event)=>{
    if(zaplecze.canAfford(mieczniki)){
        zaplecze.posiadani++;
        updateArtifact(zaplecze,zaplecze_box);
        updateMPS();
        mieczniki-=zaplecze.cost;
        updateMieczniki();
        AddPerSec();
    }
})
//koniec artefaktow
//konieceventow================================================
//update'ujące funkcje
function updateMieczniki(){
    farmed.innerHTML=parseInt(mieczniki);
}
function updateMPC(){
    mieczniki_per_click=Uczen.MPC(zamojda,maurycy,dominik,giru,poskrobko);
    mPerClick_box.innerHTML=mieczniki_per_click;
}
function updateMPS(){
    mieczniki_per_second=Artefakt.MPS(pilot,haslo,wskazowka,sala,zaplecze);
    mPerSecond_box.innerHTML=mieczniki_per_second;
}
function updateUczen(uczen, uczen_box){
    uczen_box.innerHTML="Posiadani: " +uczen.posiadani;
}
function updateArtifact(art, art_box){
    art_box.innerHTML="Posiadane: " +art.posiadani;
}
AntiAutoClicker();
//koniec funkcji