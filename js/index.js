// Clase para los nuevos diseños disponibles
class Caja{
    constructor(codigo, descrip, imagen){
        this.codigo   = codigo;
        this.descrip  = descrip;
        this.imagen   = imagen
    }
}

const nuevasCajas  = []; // Array con los nuevos diseños (Novedades)
const cajas        = []; // Array con los nuevos diseños (Novedades)
const divNuevas    = document.querySelector("#nuevas");
const divProductos = document.querySelector("#productos");

//////////////////////////////////////////////////////////////
//                        FUNCIONES                         //
//////////////////////////////////////////////////////////////

// Función para cargar los items existentes al inicializar el programa
const agregarNuevaCaja =(codigo, descrip, imagen)=>{
    nuevasCajas.push(new Caja(parseInt(codigo), descrip, imagen));
}

const agregarCaja =(codigo, descrip, imagen)=>{
    cajas.push(new Caja(parseInt(codigo), descrip, imagen));
}

// Agrega los objetos de los nuevos diseños al Array correspondiente
const cargaInicial=()=>{
    agregarNuevaCaja(1, "Caja Copa del Mundo", "caja-copa.png");
    agregarNuevaCaja(2, "Caja Dibu Final", "caja-dibu.png");
    agregarNuevaCaja(3, "Caja Messi", "caja-messi-01.png");
    agregarNuevaCaja(4, "Caja Messi Campeon", "caja-messi-02.png");
}

// Agrega los objetos de los nuevos diseños al Array correspondiente
const cargaProductos=()=>{
    agregarCaja(1,  "Copa del Mundo", "caja-copa.png");
    agregarCaja(2,  "Dibu Final"    , "caja-dibu.png");
    agregarCaja(3,  "Messi"         , "caja-messi-01.png");
    agregarCaja(4,  "Messi Campeon" , "caja-messi-02.png");
    agregarCaja(5,  "Bomberman"     , "caja-bomberman.png");
    agregarCaja(6,  "Bowser"        , "caja-bowser.png");
    agregarCaja(7,  "GhostBusters"  , "caja-busters.png");
    agregarCaja(8,  "Ghost"         , "caja-ghost.png");
    agregarCaja(9,  "Donkey Kong"   , "caja-kong.png");
    agregarCaja(10, "Link"          , "caja-link.png");
    agregarCaja(11, "Super Mario"   , "caja-mario.png");
    agregarCaja(12, "Peach"         , "caja-peach.png");
    agregarCaja(13, "Perro"         , "caja-perro.png");
    agregarCaja(14, "Sonic"         , "caja-sonic.png");
    agregarCaja(15, "Spider-man"    , "caja-spiderman.png");
}

// Agrega los nuevos diseños al Contenedor correspondiente en INDEX.HTML
const agregarCardsNuevas=(cajaNueva)=>{
    const cardNueva = document.createElement("div");
    cardNueva.className = "container-fluid card-cajas";
    cardNueva.innerHTML = `
                            <div class="caja" style="background-image: url('./img/${cajaNueva.imagen}')"></div>
                            <a class="nes-btn is-warning" href="./pages/productos.html">Ver todos</a>
                            `;
    divNuevas.append(cardNueva);
}

// Agrega todos los diseños al Contenedor correspondiente en PRODUCTOS.HTML
const agregarCardsProductos=(caja)=>{
    const cardCaja = document.createElement("div");
    cardCaja.className = "container-fluid card-cajas";
    cardCaja.innerHTML = `
                            <div class="caja" style="background-image: url('../img/${caja.imagen}')"></div>
                            <div class="nes-container is-centered cajaDescrip">${caja.descrip}</div>
                            `;
    divProductos.append(cardCaja);
}

// Verifica si el ID enviado por parámetro existe en la página actual
const verificarPagina=(idDiv)=>{
    const page = document.getElementById(idDiv);
    console.log(page);
    return(page ?? false);
}

//////////////////////////////////////////////////////////////
//                   INICIO DEL PROGRAMA                    //
//////////////////////////////////////////////////////////////
let idTag;

// INDEX
idTag = "nuevas";
if (verificarPagina(idTag) != false){
    cargaInicial();
    nuevasCajas.forEach((nuevaCaja)=>{
        agregarCardsNuevas(nuevaCaja);
    });
}

// PRODUCTOS
idTag = "productos";
if (verificarPagina(idTag) != false){
    cargaProductos();
    cajas.forEach((caja)=>{
        agregarCardsProductos(caja);
    });
}