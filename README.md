# Coderhouse - Curso JS - Entrega Final
> Para visualizar los detalles de las Pre-Entregas anteriores debe desplazarse hacia abajo.

------------
## Bienvenidos a Pizza Art!
![](https://claumasita.github.io/js-preentrega3-masa/img/pizza-cool-ch.png)
### Una forma divertida de comer pizza
- Hay varios motivos para que elijas la caja de la pizza que más te guste
- Se agregan las pizzas a elección al Carrito de Compras, al cual podes acceder desde la parte superior de la pantalla.
- Una vez en el Carrito, se pueden eliminar items, limpiar todo el Carrito o confirmar la compra.
- Dependiendo de las operaciones de agregar o quitar artículos del Carrito, se actualiza el monto a pagar y calcula el descuento (si corrresponde).

### Detalles corregidos en base a la devolución recibida de la última pre-entrega:
- Se corrigieron los errores en el carrito de compras.
- Se agregaron notificaciones en pantalla que hicieron que sea más amigable para el usuario.
- Se implementó el uso de SessionStorage para la lista de articulos disponibles.
- Se utiliza FECTH para cargar archivos JSON locales, generando de esta forma funciones asincrónicas.
- Se agregó la librería SweetAlert para facilitar la creación de mensajes.
- Al momento de confirmar la compra, se solicita al usuario un mail simulando el proceso final.

------------

# Pre-Entrega N°3
> Para visualizar los detalles de las Pre-Entregas anteriores debe desplazarse hacia abajo.

------------
## Bienvenidos a Pizza Art!
![](https://claumasita.github.io/proyecto-px/img/pizza-cool-ch.png)
### Una forma divertida de comer pizza
- Hay varios motivos para que elijas la caja de la pizza que más te guste
- Se agregan las pizzas a elección al Carrito de Compras, al cual podes acceder desde la parte superior de la pantalla.
- Una vez en el Carrito, se pueden eliminar items, limpiar todo el Carrito o confirmar la compra.
- Dependiendo de las operaciones de agregar o quitar artículos del Carrito, se actualiza el monto a pagar y calcula el descuento (si corrresponde).

#### Detalles técnicos:
- Se agregaron funcionalidades que utilizan el DOM y eventos.
- El Carrito se almacena en LocalStorage mediante JSON. De esta forma, permanece con los mismo valores hasta que el usuario no Confirme o Cancele la compra.

### Detalles a implementar en la próxima entrega:
- Corregir todos los errores encontrados.
- Mejorar la interface con el usuario.
- Solicitar una identificación del usuario (seguramente sea nombre y e-mail), para permitir confirmar la compra.

------------

# Pre-Entrega N°2
> Para visualizar los detalles de la Pre-Entrega n°1 debe desplazarse hacia abajo.

------------
### Se agregaron las siguientes características al proyecto existente:
- Clases
- Objetos
- Métodos en los objetos
- Métodos de búsqueda sobre Arrays
- Se agregó un menú para que le sea más fácil al usuario utilizar el programa
- Dentro del menú, además de la opción de agregar artículos, se le permite al usuario ir verificando los elementos disponibles para la compra. También puede visualizar el carrito con los items y cantidades seleccionados, como así también modificar cantidad o hasta eliminar un item

------------

------------

# Pre-Entrega N°1

- Crear un algoritmo con un condicional.
- Crear un algoritmo utilizando un ciclo.
- Armar un simulador interactivo, la estructura final de tu proyecto integrador.


## Simulador Interactivo
### Consigna:
Con los conocimientos vistos hasta el momento, 
empezarás a armar la estructura inicial de tu 
proyecto integrador. A partir de los ejemplos 
mostrados la primera clase, deberás:
- Pensar el alcance de tu proyecto: ¿usarás un cotizador de seguros? ¿un simulador de créditos? ¿un simulador personalizado?
- Armar la estructura HTML del proyecto.
- Incorporar lo ejercitado en las clases anteriores, algoritmo condicional y algoritmo con ciclo.
- Utilizar funciones para realizar esas operaciones.

### Aspectos a incluir:
- Archivo HTML y Archivo JS, referenciado en el HTML por etiqueta <script src="js/miarchivo.js"></script>,  que incluya la definición de un algoritmo en JavaScript que emplee funciones para resolver el procesamiento principal del simulador.

## Funcionamiento del Proceso:
- Se muestra la lista de artículos disponibles, junto a su Descripción y precio.
- El proceso irá informando por consola los articulos ingresados en el Carrito y su respectivo importe.
- Si el monto total supera un determinado valor ($15.000), se aplicará un descuento del porcentaje especificado (10%)
- Al finalizar, además de mostrarse por consola, se visualizará mediante un Alerta el total del contenido de la compra.

## Lista de Artículos


| Código | Descripción | Precio |
| --- | --- | --- |
| 1 | Producto A | $ 233.50 |
| 2 | Producto B | $ 431.99 |
| 3 | Producto C | $ 157.20 |
| 4 | Producto D | $ 510.50 |
| 5 | Producto E | $ 619.99 |