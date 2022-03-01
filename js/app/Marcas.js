import {pintarCards} from "./utils.js";
import ElementosProducto from "./Productos.js"

//clase para mostrar marcas según categoría de producto seleccionada
class NavMarcas {
    constructor() {
        
    }

    procesarMarcasSegunCategoriaProducto() { 
        const PATH_MARCAS = 'data/marcas.json';

        if (localStorage.getItem('codigoCategoriaElegida') != null) {
            $.getJSON(PATH_MARCAS, (respuesta,estado) => {
                if(estado === "success"){
                    let indiceCategoria = localStorage.getItem('codigoCategoriaElegida');
                    let arrayMarcas = respuesta.productos[indiceCategoria].array;
                    this.cargarNavMarcas(arrayMarcas);
                }   
            });
            const cargadorProductos = new ElementosProducto();
            cargadorProductos.agregarAlDom(); 
        } else {
            $.getJSON(PATH_MARCAS, (respuesta,estado) => {
                if(estado === "success"){
                    let arrayProductos = respuesta.productos
                    for (let i = 0; i < arrayProductos.length; i++) {
                        this.cargarNavMarcas(arrayProductos[i].array); 
                    }
                } 
            });
            
            const cargadorProductos = new ElementosProducto();
            cargadorProductos.agregarAlDom(); 
            ; 
        }
    }

    cargarNavMarcas(arrayMarcas) {

        /*como este metodo es desencadenado cuando el cliente pide una categoria de producto,
        no solo actualiza las marcas disponibles sino tambien las tarjetas de productos disponibles segun la categoria*/
        

        for (let i=0; i < arrayMarcas.length; i++) {      
            let m =  arrayMarcas[i].marca;
            $('#nav-marcas ul').append(`<li class="py-2"><a id="${m}" href="cart.html">${m}</a></li>`);
            
            

            //asigna un evento click a cada marca para actualizar el catálogo en el DOM
            $(`#${m}`).click( (e) => {
                e.preventDefault();
                $('#productos').children().remove();
                $('#productos').append(pintarCards(arrayMarcas[i].array));
            });
        }
    };


};

export default NavMarcas;