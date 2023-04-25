// Constantes
const extraCaja  = 250; // Costo extra para cajas Pizza Art
const porcentajePromo = 7;
const montoPromo = 20000;

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

// Clase para Items del Carrito
class Item{
    constructor(codigoPizza, nombrePizza, tamano, precioPizza, codigoCaja, nombreCaja, precioCaja, subTotal){
        this.codigoPizza = codigoPizza;
        this.nombrePizza = nombrePizza,
        this.tamano      = tamano;
        this.precioPizza = precioPizza;
        this.codigoCaja  = codigoCaja;
        this.nombreCaja  = nombreCaja;
        this.precioCaja  = precioCaja;
        this.subTotal    = subTotal;
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
let pizzaSelec;            // Pizza Seleccionada para agregar
let item             = new Item();

//////////////////////////////////////////////////////////////
//                        FUNCIONES                         //
//////////////////////////////////////////////////////////////

//******************************************************************//
// Función para cargar los items existentes al inicializar el programa
//******************************************************************//
const agregarNuevaCaja =(codigo, descrip, imagen)=>{
    nuevasCajas.push(new Caja(parseInt(codigo), descrip, imagen));
}

//******************************************************************//
// Cajas
//******************************************************************//
const agregarCaja =(codigo, descrip, imagen)=>{
    cajas.push(new Caja(parseInt(codigo), descrip, imagen));
}

//******************************************************************//
// Pizzas
//******************************************************************//
const agregarPizza =(codigo, nombre, precioCh, precioGr, tipo)=>{
    pizzas.push(new Pizza(parseInt(codigo), nombre, parseFloat(precioCh), parseFloat(precioGr), tipo));
}

//******************************************************************//
// Agrega los objetos de los nuevos diseños al Array correspondiente
//******************************************************************//
const cargaInicial=()=>{
    agregarNuevaCaja(1, "Caja Copa del Mundo", "caja-copa.png");
    agregarNuevaCaja(2, "Caja Dibu Final", "caja-dibu.png");
    agregarNuevaCaja(3, "Caja Messi", "caja-messi-01.png");
    agregarNuevaCaja(4, "Caja Messi Campeon", "caja-messi-02.png");
}

//******************************************************************//
// Agrega los objetos de todos los diseños al Array correspondiente
//******************************************************************//
const cargaProductos=()=>{
    agregarCaja(0,  "Standard"      , "caja-standard.png");
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

//******************************************************************//
// Agrega los objetos de las pizzas al Array correspondiente
//******************************************************************//
const cargaPizzas=()=>{
    // Clasicas (c)
    agregarPizza(1,  "muzzarella"                 , "2500" , "2900" , "c");
    agregarPizza(2,  "jamon y morrones"           , "2900" , "3800" , "c");
    agregarPizza(3,  "napolitana"                 , "3400" , "4200" , "c");
    agregarPizza(4,  "fugazzeta con jamon"        , "4300" , "5000" , "c");

    // Especiales (s)
    agregarPizza(5,  "palmitos"                   , "3600" , "4300" , "s");
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

//******************************************************************//
// Agrega los nuevos diseños al Contenedor correspondiente en INDEX
//******************************************************************//
const agregarCardsNuevas=(cajaNueva)=>{
    const cardNueva = document.createElement("div");
    cardNueva.className = "container-fluid card-cajas";
    cardNueva.innerHTML = `
                            <div class="caja" style="background-image: url('./img/${cajaNueva.imagen}')"></div>
                            <a class="nes-btn is-warning" href="./pages/productos.html">ver todos</a>
                            `;
    divNuevas.append(cardNueva);
}

//*********************************************************************//
// Agrega todos los diseños al Contenedor correspondiente en PRODUCTOS
//*********************************************************************//
const agregarCardsProductos=(caja)=>{
    const cardCaja = document.createElement("div");
    cardCaja.className = "container-fluid card-cajas";
    cardCaja.innerHTML = `
                            <div class="caja" style="background-image: url('../img/${caja.imagen}')"></div>
                            <div class="nes-container is-centered is-rounded cajaDescrip">${caja.descrip}</div>
                            `;
    divProductos.append(cardCaja);
}

//******************************************************************//
// Agrega todos los diseños al Contenedor correspondiente en MENU
//******************************************************************//
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

//******************************************************************//
// Verifica si el ID enviado por parámetro existe en la página actual
//******************************************************************//
const existeID=(idDiv)=>{
    const page = document.getElementById(idDiv);
    return(page ?? false);
}

//******************************************************************//
// Seleccionar elemento para el carrito:
//******************************************************************//
const getPizza =(codigo)=>{
    return (pizzas.find((el)=> el.codigo == parseInt(codigo)));
}

//******************************************************************//
// Retorna un caja según el código enviado:
//******************************************************************//
const getCaja =(codigo)=>{
    return (cajas.find((el)=> el.codigo == parseInt(codigo)));
}

//******************************************************************//
// Actualiza precio total mostrado en Modal
//******************************************************************//
const actualizarTotalModal =( { precioPizza, precioCaja } )=>{
    const subTotal = precioPizza + precioCaja;
    document.querySelector("#p-total").innerHTML = `total: $${subTotal}`;
};

//******************************************************************//
// Muestra el detalle previo a agregar al Carrito
//******************************************************************//
const mostrarDetallesPizza=(codigo)=>{
    pizzaSelec = getPizza(codigo);
    item = new Item();

    // Valores por Default para el Item
    item.codigoPizza = pizzaSelec.codigo;
    item.nombrePizza = pizzaSelec.nombre;
    item.precioPizza = pizzaSelec.precioGr;
    item.tamano      = "Grande";
    item.precioCaja  = 0;
    item.codigoCaja  = 0;

    // Muestra el nombre de la Pizza Seleccionada
    const contenedorNombrePizza = document.querySelector(".p-pizza");
    contenedorNombrePizza.innerHTML = pizzaSelec.nombre;

    // Muestra los precios de las opciones (grande/chica)
    document.querySelector("#span-gr").innerHTML = `gr ($${pizzaSelec.precioGr})`;
    document.querySelector("#span-ch").innerHTML = `ch ($${pizzaSelec.precioCh})`;
    document.querySelectorAll(".nes-radio")[0].checked = true;

    // Caja por Default: Standard (sin costo extra)
    document.querySelector("#select-caja").selectedIndex = 0;

    // Precio y tamaño por Default: Grande
    actualizarTotalModal(item);

};

//******************************************************************//
// Llena la lista de Cajas Disponibles (ventana modal)
//******************************************************************//
const llenarListaCajas=()=>{
    const selectCaja = document.querySelector("#select-caja");
    selectCaja.innerHTML = "";
    cajas.forEach((caja)=>{
        selectCaja.innerHTML = selectCaja.innerHTML + "\n<option value='" + caja.codigo + "'>" + caja.descrip + "</option>";
    });
}

//******************************************************************//
// Elimina todos los elementos del Carrito
//******************************************************************//
const vaciarCarrito=()=>{localStorage.removeItem("carrito");}

//******************************************************************//
// Recupera JSON desde LocalStorage
//******************************************************************//
const getJsonStorage=(clave)=>{
    return localStorage.getItem(clave);
};

//******************************************************************//
// Recibe JSON para almacenar en el LocalStorage
//******************************************************************//
const agregarJsonStorage=(clave, json)=>{
    localStorage.setItem(clave, json);
};

//******************************************************************//
// Convierte Carrito a JSON y lo almacena en el LocalStorage
//******************************************************************//
const guardarCarritoStorage=(items)=>{

    const enJSON = JSON.stringify(items);
    vaciarCarrito();
    agregarJsonStorage("carrito", enJSON);

};

//******************************************************************//
// Convierte JSON (desde Storage) a Carrito
//******************************************************************//
const getCarritoStorage=()=>{

    const carrito = JSON.parse(getJsonStorage("carrito"));
    // carrito == null ? return [] : return carrito;
    if (carrito != null){
        return carrito;
    }else{
        return [];
    }
};

//******************************************************************//
// Agrega el Item al Carrito
//******************************************************************//
const agregarItemCarrito=(item)=>{

    // Baja los items previos en el Carrito:
    const items = getCarritoStorage();

    // Actualiza valores antes de agregar al Carrito:
    item.subTotal   = item.precioPizza + item.precioCaja;
    const { descrip } = getCaja(item.codigoCaja);
    item.nombreCaja = descrip;

    items.push(new Item(
        item.codigoPizza,
        item.nombrePizza,
        item.tamano,
        item.precioPizza,
        item.codigoCaja,
        item.nombreCaja,
        item.precioCaja,
        item.subTotal
        ));

    // Almacena Carrito con items, en Local Storage
    guardarCarritoStorage(items);

}

//******************************************************************//
// Rutinas para pagina INDEX
//******************************************************************//
const rutinasHome=()=>{

    const idTag = "pag-home";
    if (existeID(idTag) != false){
        vaciarCarrito(); // TEMPORAL
        cargaInicial();
        nuevasCajas.forEach((nuevaCaja)=>{
            agregarCardsNuevas(nuevaCaja);
        });

        // Establece el monto a superar para adquirir la promoción
        document.querySelector("#monto-promo").innerHTML = montoPromo;

        // Establece el porcentaje para descuento en la promoción
        document.querySelector("#porcen-promo").innerHTML = porcentajePromo;
    }
}

//******************************************************************//
// Rutinas para pagina PRODUCTOS (Cajas)
//******************************************************************//
const rutinasProductos=()=>{

    const idTag = "pag-productos";
    if (existeID(idTag) != false){
        cargaProductos();
        cajas.forEach((caja)=>{
            agregarCardsProductos(caja);
        });
    
        // Establece el valor para el costo extra de Cajas Pizza Art:
        document.querySelector("#extra-caja").innerHTML = extraCaja;
    }
}

//******************************************************************//
// Rutinas para Ventana Modal
//******************************************************************//
const rutinasModal=()=>{
    cargaProductos();
    llenarListaCajas();

    // Listener para RadioButton de Tamaño
    let idTag = "select-tamano";
    if (existeID(idTag) != false){

        document.querySelectorAll("input[type=radio][name='answer']").forEach((radio) => {
            radio.addEventListener('change', (e)=>{
                if (e.target.id == "precio-gr"){
                    item.precioPizza = pizzaSelec.precioGr;
                    item.tamano      = "Grande";
                    actualizarTotalModal(item);
                }else{
                    item.precioPizza = pizzaSelec.precioCh;
                    item.tamano      = "Chica";
                    actualizarTotalModal(item);
                };
            });
        });
    }

    // Listener para Select de Tipo de Caja
    idTag = "select-caja";
    if (existeID(idTag) != false){
        document.querySelector("#select-caja").addEventListener('change' , (e)=>{
            // Actualiza el precio depende la caja seleccionada
            if (e.target.value=='0'){
                item.precioCaja = 0;
                item.codigoCaja = 0;
                actualizarTotalModal(item);
            }else{
                item.precioCaja = extraCaja;
                item.codigoCaja = parseInt(e.target.value);
                actualizarTotalModal(item);
            }
        });
    }

    // Listener Boton Aceptar
    const ventanaModal = document.querySelector("#ventanaModal");
    document.querySelector(".btn-agregar").addEventListener("click" , () => {
        agregarItemCarrito(item);
        ventanaModal.style.display = "none";
    });

    // Listener Boton Cerrar
    document.querySelector(".btn-cerrar").addEventListener("click" , () => {
        ventanaModal.style.display = "none";
    });
}

//******************************************************************//
// Rutinas para pagina MENU
//******************************************************************//
const rutinasMenu=()=>{

    const idTag = "pag-menu";
    if (existeID(idTag) != false){

        // MENÚ: Clásicas
        cargaPizzas();
        const pizzasC = pizzas.filter((pz)=> pz.tipo == "c" );
        pizzasC.forEach((pizza)=>{
            agregarCardsPizzas(pizza, divClasicas);
        });

        // MENÚ: Especiales
        const pizzasS = pizzas.filter((pz)=> pz.tipo == "s" );
        pizzasS.forEach((pizza)=>{
            agregarCardsPizzas(pizza, divEspeciales);
        });

        // MENÚ: Exclusivas
        const pizzasX = pizzas.filter((pz)=> pz.tipo == "x" );
        pizzasX.forEach((pizza)=>{
            agregarCardsPizzas(pizza, divExclusivas);
        });

        // Botones AGREGAR (invoca a ventana Modal)
        const botonesPizza = document.querySelectorAll(".btn-pizza");
        for (let i = 0; i < botonesPizza.length; i++){
            botonesPizza[i].addEventListener("click", (e) => {

                    // Ventana modal con detalle del item a agregar
                    mostrarDetallesPizza(parseInt(e.target.id));
                    ventanaModal.style.display = "block";
                });
        }

        // MENÚ: Lista de Pizzas en ventana modal (Agrega Listeners)
        rutinasModal();
    }
}

//******************************************************************//
// Agregar Card CARRITO
//******************************************************************//
const agregarCardCarrito=(item)=>{

    const cardCarrito = document.createElement("div");
    cardCarrito.className = "container-fluid card-item";
    cardCarrito.innerHTML = `
                            <div class="nes-container is-centered pizza-carrito">${item.nombrePizza}</div>
                            <div class="nes-container is-centered descrip-carrito">${item.tamano}</div>
                            <div class="nes-container is-centered descrip-carrito">Caja: ${item.nombreCaja}</div>
                            <div class="nes-container is-centered subtotal-carrito">total $${item.subTotal}</div>
                            <button class="nes-btn is-error">eliminar</button>
                            `;
    document.querySelector("#carrito").append(cardCarrito);
}

//******************************************************************//
// Rutinas para pagina CARRITO
//******************************************************************//
const rutinasCarrito=()=>{

    const idTag = "pag-carrito";
    if (existeID(idTag) != false){

        const items = getCarritoStorage();
        if(items.length > 0){
            // Agregar Cards del Carrito
            items.forEach((item)=>{
                agregarCardCarrito(item);
            });

            // Agregar Listener para los Botones ELIMINAR de las Card
            // del Carrito

        }
    }
}

//******************************************************************//
//                      INICIO DEL PROGRAMA                         //
//******************************************************************//
//******************************************************************//

// Procesos para Cada Página
rutinasHome();
rutinasProductos();
rutinasMenu();
rutinasCarrito();