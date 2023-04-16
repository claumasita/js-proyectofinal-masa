// Clase para los nuevos diseños disponibles
class NuevaCaja{
    constructor(codigo, descrip, imagen){
        this.codigo   = codigo;
        this.descrip  = descrip;
        this.imagen   = imagen
    }
}

const nuevasCajas = []; // Array con los nuevos diseños (Novedades)
const divNuevas = document.querySelector("#nuevas");

//////////////////////////////////////////////////////////////
//                        FUNCIONES                         //
//////////////////////////////////////////////////////////////

// Función para cargar los items existentes al inicializar el programa
const agregarNuevaCaja =(codigo, descrip, imagen)=>{
    nuevasCajas.push(new NuevaCaja(parseInt(codigo), descrip, imagen));
}

// Agrega los objetos de los nuevos diseños al Array correspondiente
const cargaInicial=()=>{
    agregarNuevaCaja(1, "Caja Copa del Mundo", "caja-copa.png");
    agregarNuevaCaja(2, "Caja Dibu Final", "caja-dibu.png");
    agregarNuevaCaja(3, "Caja Messi", "caja-messi-01.png");
    agregarNuevaCaja(4, "Caja Messi Campeon", "caja-messi-02.png");
}

// Agrega los nuevos diseños al Contenedor correspondiente en INDEX.HTML
const agregarCardsNuevas=(cajaNueva)=>{
    // const nuevas = document.querySelector("#nuevas");
    const cardNueva = document.createElement("div");
    cardNueva.className = "container-fluid card-nuevas";
    cardNueva.innerHTML = `
                            <div class="caja" style="background-image: url('./img/${cajaNueva.imagen}')"></div>
                            <button class="nes-btn is-warning">ver todas</button>
                            `;
    divNuevas.append(cardNueva);
}

//////////////////////////////////////////////////////////////
//                   INICIO DEL PROGRAMA                    //
//////////////////////////////////////////////////////////////
cargaInicial();
nuevasCajas.forEach((nuevaCaja)=>{
    agregarCardsNuevas(nuevaCaja);
});