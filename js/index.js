// Clase para los nuevos diseños disponibles
class Caja{
    constructor(codigo, descrip, imagen, novedad){
        this.codigo   = codigo;
        this.descrip  = descrip;
        this.imagen   = imagen;
        this.novedad  = novedad
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
    constructor(id, codigoPizza, nombrePizza, tamano, precioPizza, codigoCaja, nombreCaja, precioCaja, subTotal, cantidad){
        this.id          = id;
        this.codigoPizza = codigoPizza;
        this.nombrePizza = nombrePizza,
        this.tamano      = tamano;
        this.precioPizza = precioPizza;
        this.codigoCaja  = codigoCaja;
        this.nombreCaja  = nombreCaja;
        this.precioCaja  = precioCaja;
        this.subTotal    = subTotal;
        this.cantidad    = cantidad;
    }
}

const compra ={
    extraCaja: 250,      // Costo extra para cajas Pizza Art
    porcentajePromo: 7,  // Porcentaje de Descuento
    montoPromo: 15000,   // Monto mínimo para promoción

    subtotal:  0,
    descuento: 0,
    total:     0,

    limpiar(){
        this.subtotal  = 0;
        this.descuento = 0;
        this.total     = 0;
    },

    actualizarTotales({subTotal}){
        this.subtotal = this.subtotal + subTotal;
        this.calcularDescuento();
    },

    restarValor({subTotal}){
        this.subtotal = this.subtotal - subTotal;
        this.calcularDescuento();
    },

    calcularDescuento(){
        if(parseFloat(this.subtotal) >= this.montoPromo){
            this.descuento = parseFloat(( this.porcentajePromo * this.subtotal ) /100).toFixed(2);
            this.total = this.subtotal - this.descuento;
        }else{
            this.descuento = 0;
            this.total     = this.subtotal;
        }
    },

};

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
// Agrega los objetos de los nuevos diseños al Array correspondiente
//******************************************************************//
const mostrarNuevas = () =>{
    const cajas = getSessionStorageToArray("productos");
    const nuevas = cajas.filter((el) => el.novedad);
    nuevas.forEach((caja)=>{
        agregarCardsNuevas(caja);
    });
}

//******************************************************************//
// Agrega los objetos de todos los diseños al Array correspondiente
//******************************************************************//
const cargarDisenos = async () =>{
    try {
        const resp      = await fetch("../json/productos.json");
        const productos = await resp.json();
        guardarProductosStorage(JSON.stringify(productos));
    } catch (error) {
        console.log(error);
    }
}

//******************************************************************//
// Agrega los objetos de las pizzas al Array correspondiente
//******************************************************************//
const cargarPizzas = async () =>{
    try {
        const resp   = await fetch("../json/pizzas.json");
        const pizzas = await resp.json();
        guardarPizzasStorage(JSON.stringify(pizzas));
    } catch (error) {
        console.log(error);
    }
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
    const pizzas = getSessionStorageToArray("pizzas");
    return (pizzas.find((el)=> el.codigo == parseInt(codigo)));
}

//******************************************************************//
// Retorna una caja según el código enviado:
//******************************************************************//
const getCaja =(codigo)=>{
    const cajas = getSessionStorageToArray("productos");
    return (cajas.find((el)=> el.codigo == parseInt(codigo)));
}

//******************************************************************//
// Retorna un item del Carrito según el ID enviado:
//******************************************************************//
const getItemCarrito =(id, items)=>{
    return (items.find((el)=> el.id == id));
}

//******************************************************************//
// Actualiza precio total mostrado en Modal
//******************************************************************//
const actualizarTotalModal =( { precioPizza, precioCaja } )=>{
    const subTotal = precioPizza + precioCaja;
    document.querySelector("#p-total").innerHTML = `total: $${subTotal}`;
};

//******************************************************************//
// Genera de forma dinámica un mensaje Toast en un contenedor
// con clase "mensaje-toast" y lo muestra en pantalla
//******************************************************************//
const generarMostrarToast=(tituloMensaje, subTituloMensaje, mensaje)=>{

    document.querySelector(".mensaje-toast").innerHTML = `
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">${tituloMensaje}</strong>
                <small>${subTituloMensaje}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">${mensaje}</div>
        </div>
    </div>
    `;

    // Visualiza el Mensaje Toast por pantalla:
    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
}

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
    item.cantidad    = 1;

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
    const cajas = getSessionStorageToArray("productos");
    cajas.forEach((caja)=>{
        selectCaja.innerHTML = selectCaja.innerHTML + "\n<option value='" + caja.codigo + "'>" + caja.descrip + "</option>";
    });
}

//******************************************************************//
// Elimina todos los elementos del Local Storage Indicado
//******************************************************************//
const vaciarLocalStorage=(clave)=>{localStorage.removeItem(clave);}

//******************************************************************//
// Elimina todos los elementos del Sesion Storage Indicado
//******************************************************************//
const vaciarSessionStorage=(clave)=>{sessionStorage.removeItem(clave);}

//******************************************************************//
// Recupera JSON desde LocalStorage
//******************************************************************//
const getJsonStorage=(clave)=>{
    return localStorage.getItem(clave);
};

//******************************************************************//
// Recupera JSON desde SessionStorage
//******************************************************************//
const getJsonSessionStorage=(clave)=>{
    return sessionStorage.getItem(clave);
};

//******************************************************************//
// Recibe JSON para almacenar en el LocalStorage
//******************************************************************//
const agregarJsonStorage=(clave, json)=>{
    localStorage.setItem(clave, json);
};

//******************************************************************//
// Recibe JSON para almacenar en el SessionStorage
//******************************************************************//
const agregarJsonSessionStorage=(clave, json)=>{
    sessionStorage.setItem(clave, json);
};

//******************************************************************//
// Convierte Carrito a JSON y lo almacena en el LocalStorage
//******************************************************************//
const guardarCarritoStorage=(items)=>{

    const enJSON = JSON.stringify(items);
    vaciarLocalStorage("carrito");
    agregarJsonStorage("carrito", enJSON);

};

//******************************************************************//
// Convierte JSON (desde Storage) a Carrito
//******************************************************************//
const getCarritoStorage=()=>{

    const carrito = JSON.parse(getJsonStorage("carrito"));
    if (carrito != null){
        return carrito;
    }else{
        return [];
    }
};

//******************************************************************//
// Convierte JSON (desde SessionStorage) a Array de Objetos
//******************************************************************//
const getSessionStorageToArray=(clave)=>{

    const coleccion = JSON.parse(getJsonSessionStorage(clave));
    if (coleccion != null){
        return coleccion;
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
    item.id         = "id-carrito-" + (items.length + 1);
    item.subTotal   = item.precioPizza + item.precioCaja;
    const { descrip } = getCaja(item.codigoCaja);
    item.nombreCaja = descrip;

    items.push(new Item(
        item.id,
        item.codigoPizza,
        item.nombrePizza,
        item.tamano,
        item.precioPizza,
        item.codigoCaja,
        item.nombreCaja,
        item.precioCaja,
        item.subTotal,
        item.cantidad
        ));

    // Actualiza Carrito en Local Storage
    guardarCarritoStorage(items);

    // Mensaje informando que se agregó el elemento al Carrito:
    generarMostrarToast("Carrito", "Pizza Art", "Item agregado.");
}

//******************************************************************//
// JSON de Productos => almacenar en el SessionStorage
//******************************************************************//
const guardarProductosStorage=(enJson)=>{
    vaciarSessionStorage("productos");
    agregarJsonSessionStorage("productos", enJson);
};

//******************************************************************//
// JSON de Pizzas => almacenar en el SessionStorage
//******************************************************************//
const guardarPizzasStorage=(enJson)=>{
    vaciarSessionStorage("pizzas");
    agregarJsonSessionStorage("pizzas", enJson);
};

//******************************************************************//
// Rutinas para pagina INDEX
//******************************************************************//
const rutinasHome=()=>{

    const idTag = "pag-home";
    if (existeID(idTag) != false){
        mostrarNuevas();

        // Establece el monto a superar para adquirir la promoción
        document.querySelector("#monto-promo").innerHTML = compra.montoPromo;

        // Establece el porcentaje para descuento en la promoción
        document.querySelector("#porcen-promo").innerHTML = compra.porcentajePromo;
    }
}

//******************************************************************//
// Rutinas para pagina PRODUCTOS (Cajas)
//******************************************************************//
const rutinasProductos=()=>{

    const idTag = "pag-productos";
    if (existeID(idTag) != false){

        const cajas = getSessionStorageToArray("productos");
        cajas.forEach((caja)=>{
            agregarCardsProductos(caja);
        });
    
        // Establece el valor para el costo extra de Cajas Pizza Art:
        document.querySelector("#extra-caja").innerHTML = compra.extraCaja;
    }
}

//******************************************************************//
// Rutinas para Ventana Modal
//******************************************************************//
const rutinasModal=()=>{
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
                item.precioCaja = compra.extraCaja;
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
        const pizzas = getSessionStorageToArray("pizzas");
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
    const btnResta = "resta_"+ item.id; //ID Boton Carrito -
    const btnSuma  = "suma_" + item.id; //ID Boton Carrito +
    const lblCant  = "cant_" + item.id; //ID Cantidad Carrito
    const lblTotal = "total_"+ item.id; //ID Total Item
    cardCarrito.id = "card-" + item.id; //ID Card Carrito
    cardCarrito.innerHTML = `
                            <div class="nes-container is-centered pizza-carrito">${item.nombrePizza}</div>
                            <div class="nes-container is-centered descrip-carrito">${item.tamano}</div>
                            <div class="nes-container is-centered descrip-carrito">Caja: ${item.nombreCaja}</div>
                            <div class="nes-container is-centered subtotal-carrito" id="${lblTotal}">total $${item.subTotal}</div>
                            <div class="nes-container is-centered descrip-carrito">
                                <button class ="nes-btn btn-cant" id = "${btnResta}">-</button>
                                    <div class = "d-flex justify-content-center align-items-center cantidad-carrito" id="${lblCant}">${item.cantidad}</div>
                                <button class ="nes-btn btn-cant" id = "${btnSuma}">+</button>
                            </div>
                            <button class="nes-btn is-error btn-eliminar-item" id="${item.id}">eliminar</button>
                            `;
    document.querySelector("#carrito").append(cardCarrito);
}

//******************************************************************//
// Agregar texto CARRITO VACIO
//******************************************************************//
const agregarTextoCarritoVacio=()=>{
    document.querySelector("#carrito").innerHTML =  `
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <p class="text-center fs-4">El carrito está vacío</p>
                                                        <img class = "img-fluid img-carrito-vacio" src="../img/caja-vacia.png" alt="..." >
                                                    </div>
                                                    `
}

//******************************************************************//
// Elimina todas las Cards del Carrito
//******************************************************************//
const eliminarTodasCardsCarrito=()=>{
    document.querySelectorAll(".card-item").forEach((card)=>{
        card.remove();
    });
}

//******************************************************************//
// Elimina Item seleccionado del Carrito
//******************************************************************//
const eliminaItemCarrito=(idCard)=>{

    // Recupera Carrito del Storage
    const items = getCarritoStorage();

    if (items.length > 0 ){

        const index = items.findIndex((item)=>item.id==idCard);
        if (index >= 0){

            // Recupera Item para luego descontarlo del Total del Carrito
            item = getItemCarrito(idCard, items);
            items.splice(index, 1);

            //Id de Card Carrito
            const cardItem = document.querySelector("#" + "card-" + idCard );
            if (cardItem != null){
                cardItem.remove();
                guardarCarritoStorage(items);

                // Mensaje informando que se eliminó el elemento:
                generarMostrarToast("Carrito", "Pizza Art", "Item eliminado.");

                // Actualiza Tabla de Totales:
                compra.restarValor(item);
                actualizaTablaCarrito();
            }
        }
    }

}

//******************************************************************//
// Actualiza Tabla Totales Carrito
//******************************************************************//
const actualizaTablaCarrito=()=>{
    document.querySelector("#carrito-subtotal").innerHTML  = "$" + parseFloat(compra.subtotal).toFixed(2);
    document.querySelector("#carrito-descuento").innerHTML = "$" + parseFloat(compra.descuento).toFixed(2);
    document.querySelector("#carrito-total").innerHTML     = "$" + parseFloat(compra.total).toFixed(2);
    if(compra.total == 0){
        agregarTextoCarritoVacio();
    }
}

//******************************************************************//
// Confirma Compra
//******************************************************************//
const confirmarCompra=async ()=>{
    const { value: email } = await Swal.fire({
        title: 'Confirmar Compra',
        input: 'email',
        inputLabel: 'Ingrese su correo',
        inputPlaceholder: 'Enter your email address',
        showCancelButton:  true,
        allowOutsideClick: false,
        allowEnterKey: false,
        })

    if (email) {
        Swal.fire({
            title: "Carrito",
            text: "Aguarde uno instantes mientras se confirma la operación.",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            willClose: () => {
                eliminarTodasCardsCarrito();
                vaciarLocalStorage("carrito");
                compra.limpiar();
                actualizaTablaCarrito();
                Swal.fire("Su compra ha sido confirmada. Muchas gracias!")
            }
        });
    }
}

//******************************************************************//
// Confirma Vaciar Carrito
//******************************************************************//
const confirmarVaciarCarrito=()=>{
    Swal.fire({
        title:"Carrito",
        text:"Confirma que desea eliminar todos los items?",
        showConfirmButton: true,
        showCancelButton:  true,
        confirmButtonText: "Confirmar",
        confirmButtonColor: "Red",
        cancelButtonText:  "Cancelar",
        cancelButtonColor: "Gray",
        allowOutsideClick: false,
        allowEnterKey: false,
        focusCancel: true,
        position: 'center',
    
    }).then((resultado)=>{
        if(resultado.isConfirmed){
            eliminarTodasCardsCarrito();
            vaciarLocalStorage("carrito");
            compra.limpiar();
            actualizaTablaCarrito();
            generarMostrarToast("Carrito", "Pizza Art", "Items eliminados.")
        }
        if(resultado.isDismissed){
            generarMostrarToast("Carrito", "Pizza Art", "Acción cancelada.")
        }
    });
}

//******************************************************************//
// Sumar ; Restar Cantidad Item Carrito
//******************************************************************//
const cantidadItemCarrito=(id)=>{
    const ids        = id.split("_");
    const idCarrito  = ids[1];
    const idCant     = "#cant_" + idCarrito;
    const idSubTotal = "#total_" + idCarrito;
    const lblCant      = document.querySelector(idCant);
    const lblSubTotal  = document.querySelector(idSubTotal);
    let cantidad = parseInt(lblCant.innerHTML);

    const items = getCarritoStorage();
    item = getItemCarrito(idCarrito, items);

    if(ids[0]=="suma"){
        if (cantidad <= 9){
            cantidad++;
        }
    }else{
        if (cantidad > 1){
            cantidad--;
        }
    }
    // Actualiza Valores en pantalla
    compra.restarValor(item);
    item.cantidad = cantidad;
    item.subTotal = item.cantidad * (item.precioCaja + item.precioPizza);
    lblCant.innerHTML     = cantidad;
    lblSubTotal.innerHTML = `\ total $${item.subTotal}`;
    compra.actualizarTotales(item);
    actualizaTablaCarrito();

    // Actualiza Array Carrito
    const index = items.findIndex((item)=>item.id==idCarrito);
    if (index >= 0){
        items.splice(index, 1, item);
        guardarCarritoStorage(items);
    }
}

//******************************************************************//
// Eventos CARRITO
//******************************************************************//
const crearEventosCarrito=()=>{
    
    // Boton eliminar item
    document.querySelectorAll(".btn-eliminar-item").forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            eliminaItemCarrito(e.target.id);
        });
    });

    // Boton Sumar Cantidad
    document.querySelectorAll(".btn-cant").forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            cantidadItemCarrito(e.target.id);
        });
    });

    // Boton Limpiar el Carrito
    document.querySelector("#btn-limpiar-carrito").addEventListener("click",()=>{
        // Elimina TODAS Cards de Item
        if(compra.total != 0){
            confirmarVaciarCarrito();
        }else{
            generarMostrarToast("Carrito","Pizza Art","El carrito está vacío.")
        }
    });

    // Boton Confirma la compra
    document.querySelector("#btn-confirmar-compra").addEventListener("click",()=>{
        if(compra.total != 0){
            confirmarCompra();
        }else{
            generarMostrarToast("Carrito","Pizza Art","El carrito está vacío.")
        }
        
    });
}

//******************************************************************//
// Rutinas para pagina CARRITO
//******************************************************************//
const rutinasCarrito=()=>{

    const idTag = "pag-carrito";
    if (existeID(idTag) != false){

        const items = getCarritoStorage();
        if(items.length > 0){

            // Limpia Totales del Carrito
            compra.limpiar()

            // Agregar Cards del Carrito
            items.forEach((item)=>{
                agregarCardCarrito(item);
                compra.actualizarTotales(item);
            });
            // Actualiza Tabla de Totales:
            actualizaTablaCarrito();
        }else{
            agregarTextoCarritoVacio()
        }
        // Agregar Listener para los Botones ELIMINAR de las Card
        // del Carrito
        crearEventosCarrito();
    }
}

//******************************************************************//
// Función Principal
//******************************************************************//
const inicio = async () =>{
    // Carga de Productos
    await cargarDisenos();
    await cargarPizzas();
    
    // Procesos para Cada Página
    rutinasHome();
    rutinasProductos();
    rutinasMenu();
    rutinasCarrito();
}

//******************************************************************//
//                      INICIO DEL PROGRAMA                         //
//******************************************************************//
//******************************************************************//
inicio();