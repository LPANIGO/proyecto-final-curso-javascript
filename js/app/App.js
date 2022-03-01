import ElementosProducto from "./Productos.js";
import Producto from "./UnProducto.js";
import Carrito from "./Cart.js";
import NavMarcas from "./Marcas.js"
import {cargarInfoNav, fileName, evtClickLogo} from "./utils.js";



//clase para ejecutar los casos de uso de mi aplicación
class App {
    constructor() {
        cargarInfoNav();
        evtClickLogo();

        switch (fileName()) {
            case 'index.html':
                const productos = new ElementosProducto();
                const navMarcas = new NavMarcas();
                navMarcas.procesarMarcasSegunCategoriaProducto();
                productos.agregarAlDom();
                productos.addEventMostrarOcultar();
                break;
            case 'producto-individual.html':
                const unProducto = new Producto();
                unProducto.cargarUnProducto();
                unProducto.agregarBtnSpinner(); //btn lib input spinner  
                unProducto.agregarEventoABtnComprar();  

                break;
            case 'cart.html':
                const carrito = new Carrito();
                carrito.listarCarrito();
                carrito.eventoBtnFinalizaCompra();
                carrito.evtBtnEliminarProductos();
                carrito.evtBtnActualizarLista();
                break;
            default:
                console.log('none');
        };
        
    };

}


export default App;