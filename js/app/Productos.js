import {pintarCards} from "./utils.js"

//Clase para agregar todos los productos al DOM, con opciones de filtro según tipo de producto y marca.
class ElementosProducto {
    
    //el objeto recibe un array de productos al ser creado
    constructor() {
        
    };

    //agrego al DOM los productos en forma de catálogo
    agregarAlDom() {

        $("#productos").children().remove();

        if (localStorage.getItem('codigoCategoriaElegida') != null) {
            //cargo los productos segun la categoría elegida en la lista desplegable de mi nav
            let indiceCategoria = localStorage.getItem('codigoCategoriaElegida');
            
            const PATH_JSON = "data/productos.json";
            $.getJSON(PATH_JSON, (respuesta, estado) => {  

                if(estado === "success"){
                    let arrayProductos = respuesta.productos[indiceCategoria].array;
                    console.log(arrayProductos);
                    pintarCards(arrayProductos);            
                } 
            });
        } else {
            //cargo todos los productos, ya que el usuario no seleccionó una categoría
            const PATH_JSON = "data/productos.json";
            $.getJSON(PATH_JSON, (respuesta, estado) => {  

                if(estado === "success"){
                    let arrayCategorias = respuesta.productos;
                    
                    for (let e = 0 ; e < arrayCategorias.length ; e++ ) {               
                        let arrayProductos = arrayCategorias[e].array;      
                        pintarCards(arrayProductos);                   
                    }   
                }
            });
        }
    };

    //evento de boton mostrar marcas
    addEventMostrarOcultar() {
        $('#btnMarcas').click( () => {
            $('#nav-marcas').toggle(2000, () => {this.cambiarTextoBtn()}); 
        });   
    };

    cambiarTextoBtn() {
        if ( $('#nav-marcas').css("display") !== 'none') {
            $('#btnMarcas').empty();
            $('#btnMarcas').append('Ocultar marcas');
        } else {
            $('#btnMarcas').empty();
            $('#btnMarcas').append('Mostrar marcas');
        }
    }

};


export default ElementosProducto;