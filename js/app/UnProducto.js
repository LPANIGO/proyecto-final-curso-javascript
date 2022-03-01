import { guardarLocal} from "./utils.js";

//Clase para mostrar un producto seleccionado de la cartilla, con la opcion "comprar"=>(agregar al carrito).
class Producto {

    constructor() {
        //Obtengo el producto que el cliente pidió cargar desde el catálogo de productos
        this.productoRecibido = JSON.parse(sessionStorage.getItem('unProducto'));
        
    }

    //agrego al DOM el producto clickeado en el catálogo de la página principal
    cargarUnProducto() {
        let producto = this.productoRecibido;
        $('#producto').append(
        `<div class="col d-flex justify-content-center pt-5">
            <div class="card p-4" style="width: 22rem;">
                <img class="card-img-top" src="./img/${producto.imagen}" alt="${producto.nombre}">
                <div class="card-body fw-bold">
                    <p class="card-text">${producto.nombre}</p>
                </div>
            </div>       
        </div>`);
        
        $('#precio').append(`$${producto.precio}`);
    }

    //agrego el evento click al boton comprar, cuya función es validar la cantidad a comprar ingresada en el input
    agregarEventoABtnComprar() {
        $('#btnComprar').click( () => {this.validarCantidad();} );
    }

    //valido si el valor ingresado es un número entero entre 1 y 99. En caso de ser exitosa se ejecuta el método agregarAlCarrito
    validarCantidad() {
        let cantidad = $('#cantidadIngresada').val(); //string
        
        //si el valor ingresado no es valido muestro el siguiente mensaje y corto la ejecución de las siguientes funciones encadenadas
        if ( (cantidad <= 0) ||  (cantidad >= 100) ) { 
            $('#resultado').children().remove();
            $('#resultado').append("<div class='p-3 mb-2 bg-danger text-white'>Error: ingrese una cantidad entre 1 y 99</div>");
            window.scroll(0, 100);
            return false;
        }
        
        
        this.agregarAlCarrito(cantidad);
    }
    
    agregarAlCarrito(cantidadElegida) {
        
        const arrayCarrito = [];
        this.productoRecibido.cantidad = cantidadElegida;

        //Si NO existe 'listaProductos' en localStorage lo creo y le asigno el arrayCarrito con el producto-cantidad nuevo
        if (localStorage.getItem('listaProductos') == null) {
            arrayCarrito.push(this.productoRecibido);
            guardarLocal("listaProductos", JSON.stringify(arrayCarrito));

        }
        //Si ya existe 'listaProductos' en localStorage recupero su array, y le agrego el producto con su cantidad 
        else {
            let almacenados = JSON.parse(localStorage.getItem('listaProductos'));
            let productoYaExisteEnLocalStorage = false;
            
            //verifico si el producto ya existe en la listaProductos de localStorage
            for (const objeto of almacenados) {
                if (objeto.id == this.productoRecibido.id) {
                    //sumo y actualizo la cantidad pedida de un producto si existia previamente en el array
                    let cantidadAnterior = parseInt(objeto.cantidad);
                    let cantidadElegidaActual = parseInt(this.productoRecibido.cantidad);
                    let sumaCantidades = cantidadAnterior + cantidadElegidaActual;
                    objeto.cantidad = sumaCantidades;
                    productoYaExisteEnLocalStorage = true;
                }
                arrayCarrito.push(objeto);
            };

            //agrego el producto recibido con su cantidad, solo si no existia previamente en el array
            if (!productoYaExisteEnLocalStorage) {
                arrayCarrito.push(this.productoRecibido);
            }
            
            //guardo array carrito actulizado
            guardarLocal("listaProductos", JSON.stringify(arrayCarrito));
        }

        //mensaje de operación exitosa al cliente
        let parrafo = `<p>Se agregó a tu carrito con éxito!</p> <p>Cantidad: ${cantidadElegida}</p> <p>Producto: ${this.productoRecibido.nombre}</p><a id="link-cart" href="cart.html">Ir a mi carrito</a>`;
        $('#resultado').children().remove();
        $('#resultado').append(`<div class='msj p-4 mb-2 bg-success text-white'> ${parrafo} </div>`);
        $('#resultado').hide();
        $('#resultado').slideDown(1000);
        window.scroll(0, 100);
    }

    agregarBtnSpinner() {
        $(".buttons-only").inputSpinner({buttonsOnly: true})
    }
}



export default Producto;