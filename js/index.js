// Clase para los nuevos diseños disponibles
class Caja{
    constructor(codigo, descrip, imagen){
        this.codigo   = codigo;
        this.descrip  = descrip;
        this.imagen   = imagen
    }
}

// Clase para las pizzas disponibles
class Pizza{
    constructor(codigo, nombre, precioCh, precioGr, tipo){
        this.codigo    = codigo;
        this.nombre    = nombre;
        this.precioCh  = precioCh;
        this.precioGr  = precioGr;
        this.tipo      = tipo;
    }
}

const nuevasCajas    = []; // Array con los nuevos diseños (Novedades)
const cajas          = []; // Array con todos los nuevos diseños
const pizzas         = []; // Array con las pizzas
const divNuevas      = document.querySelector("#nuevas");
const divProductos   = document.querySelector("#productos");
const divClasicas    = document.querySelector("#clasicas");
const divEspeciales  = document.querySelector("#especiales");
const divExclusivas  = document.querySelector("#exclusivas");

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

const agregarPizza =(codigo, nombre, precioCh, precioGr, tipo)=>{
    pizzas.push(new Pizza(parseInt(codigo), nombre, parseFloat(precioCh), parseFloat(precioGr), tipo));
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
    agregarCaja(16, "Castlevania"   , "caja-simon.png");
}

// Agrega los objetos de las pizzas al Array correspondiente
const cargaPizzas=()=>{
    // Clasicas (c)
    agregarPizza(1,  "muzzarella"                 , "2500" , "2900" , "c");
    agregarPizza(2,  "jamon y morrones"           , "2900" , "3800" , "c");
    agregarPizza(3,  "napolitana"                 , "3400" , "4200" , "c");
    agregarPizza(4,  "fugazzeta con jamon"        , "4300" , "5000" , "c");

    // Especiales (s)
    agregarPizza(5,  "palmtios"                   , "3600" , "4300" , "s");
    agregarPizza(6,  "calabresa"                  , "3800" , "4600" , "s");
    agregarPizza(7,  "cuatro quesos"              , "3800" , "4600" , "s");
    agregarPizza(8,  "provolone"                  , "3700" , "4500" , "s");

    // Exclusivas (x)
    agregarPizza(9,  "donkey kong (con banana)"   , "3800" , "4600" , "x");
    agregarPizza(10, "tetris (cuadrada)"          , "2600" , "3000" , "x");
    agregarPizza(11, "sonic (aros de cebolla)"    , "3600" , "4300" , "x");
    agregarPizza(12, "bomberman"                  , "3700" , "4500" , "x");
    agregarPizza(13, "super mario (champignones)" , "3900" , "4800" , "x");
}

// Agrega los nuevos diseños al Contenedor correspondiente en INDEX.HTML
const agregarCardsNuevas=(cajaNueva)=>{
    const cardNueva = document.createElement("div");
    cardNueva.className = "container-fluid card-cajas";
    cardNueva.innerHTML = `
                            <div class="caja" style="background-image: url('./img/${cajaNueva.imagen}')"></div>
                            <a class="nes-btn is-warning" href="./pages/productos.html">ver todos</a>
                            `;
    divNuevas.append(cardNueva);
}

// Agrega todos los diseños al Contenedor correspondiente en PRODUCTOS.HTML
const agregarCardsProductos=(caja)=>{
    const cardCaja = document.createElement("div");
    cardCaja.className = "container-fluid card-cajas";
    cardCaja.innerHTML = `
                            <div class="caja" style="background-image: url('../img/${caja.imagen}')"></div>
                            <div class="nes-container is-centered is-rounded cajaDescrip">${caja.descrip}</div>
                            `;
    divProductos.append(cardCaja);
}

// Agrega todos los diseños al Contenedor correspondiente en MENU.HTML
const agregarCardsPizzas=(pizza, contenedor)=>{
    const cardPizza = document.createElement("div");
    cardPizza.className = "container-fluid card-cajas card-pizza";
    cardPizza.innerHTML = `
                            <div class="pizzaNombre">${pizza.nombre}</div>
                            <div class="pizzaCh">ch $${pizza.precioCh}</div>
                            <div class="pizzaGr">gr $${pizza.precioGr}</div>
                            <button class="nes-btn is-success btn-pizza" id="${pizza.codigo}">agregar</button>
                            `;
    contenedor.append(cardPizza);
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

// HOME
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

// MENÚ: Clásicas
idTag = "clasicas";
if (verificarPagina(idTag) != false){
    cargaPizzas();
    const pizzasC = pizzas.filter((pz)=> pz.tipo == "c" );
    pizzasC.forEach((pizza)=>{
        // agregarCardsClasicas(pizza);
        agregarCardsPizzas(pizza, divClasicas);
    });
}

// MENÚ: Especiales
idTag = "especiales";
if (verificarPagina(idTag) != false){
    const pizzasS = pizzas.filter((pz)=> pz.tipo == "s" );
    pizzasS.forEach((pizza)=>{
        // agregarCardsClasicas(pizza);
        agregarCardsPizzas(pizza, divEspeciales);
    });
}

// MENÚ: Exclusivas
idTag = "exclusivas";
if (verificarPagina(idTag) != false){
    const pizzasX = pizzas.filter((pz)=> pz.tipo == "x" );
    pizzasX.forEach((pizza)=>{
        // agregarCardsClasicas(pizza);
        agregarCardsPizzas(pizza, divExclusivas);
    });
}

///////////////////////////////////////////////////////////////

// Ventana Agregar Pizza
var modal = document.getElementById("ventanaModal");

// Boton Cerrar
let btnCerrar = document.querySelector(".btn-cerrar");
btnCerrar.addEventListener("click" , () => {
    modal.style.display = "none";
});

// Botones AGREGAR
let botonesPizza = document.querySelectorAll(".btn-pizza");
for (let i = 0; i < botonesPizza.length; i++){
    botonesPizza[i].addEventListener("click", (e) => {
            modal.style.display = "block";
        });
}
