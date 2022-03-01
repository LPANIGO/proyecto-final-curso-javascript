//archivo con funciones utiles para varias clases

import NavMarcas from "./Marcas.js"

export function fileName(){
    var rutaAbsoluta = self.location.href;   
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var rutaRelativa = rutaAbsoluta.slice(posicionUltimaBarra + 1);
    return rutaRelativa;  
};


export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export const guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor)};

export function cargarInfoNav() {
    const PATH_JSON = "data/categoriasProductos.json";
    $.getJSON(PATH_JSON, (respuesta, estado) => {  

        if(estado === "success"){
            let info = respuesta.categorias;
            
            for (let j of info) { 
                //cargo los items de la lista deslegable de mi nav
                $("#menu").append(
                    `<li><button id="cat${j.i}" type="button" class="dropdown-item">${j.name}</button></li>`);

                //agrego un evento para limpiar las marcas y agregar nuevamente segun la categoria de producto elegida
                $(`#cat${j.i}`).click(  () => {
                    
                    localStorage.setItem('codigoCategoriaElegida', `${j.i}`);
                    $('#nav-marcas ul').children().remove();
                        const cargador =  new NavMarcas();
                        cargador.procesarMarcasSegunCategoriaProducto();
                    
                    
                });
            }
        } 
    });
};

function limpiarCodigoLocalStorage() {
    if (localStorage.getItem('codigoCategoriaElegida') != null) {
        localStorage.removeItem('codigoCategoriaElegida');
    }
};

export function evtClickLogo() {
    $('#logo').click( (e) => {
        e.preventDefault();
        limpiarCodigoLocalStorage();
        if (fileName() != 'index.html') {
            window.location = 'index.html';
        }
        $('#nav-marcas ul').children().remove();
        const cargador =  new NavMarcas();
        cargador.procesarMarcasSegunCategoriaProducto();
        
    })
};

//función reutilizable que recibe un array de productos 
export function pintarCards(a) {
    for (let p of a) {
        $("#productos").append(
        `<div class="col d-flex justify-content-center pt-4 pb-2">
            <button class="card product-box p-4" type="button" style="width: 18rem;" id="prod${p.id}">
                <img class="card-img-top" src="./img/${p.imagen}" alt="${p.nombre}">
                <div class="card-body fw-bold">
                    <p class="card-text">$${p.precio}</p>
                    <p class="card-text">${p.nombre}</p>
                </div>
            </button>
        </div>`);  
                
        //evento click para cada tarjeta de producto
        $(`#prod${p.id}`).click(  () => {
            almacenarProductoParaPaginaNueva(p);
            window.open('producto-individual.html');
        });
    };
};

//almaceno el producto clickeado en sessionStorage para ser usado al cargar la pagina producto-individual.html
function almacenarProductoParaPaginaNueva(productoAux) {
    const jsonProducto = JSON.stringify(productoAux);
    sessionStorage.setItem('unProducto', jsonProducto); 
};

//funciones a agregar:
//asigno un id de forma dinámica al json productos
    // asignarIdACadaProducto() {
    //     let contador = 1;
    //     for (const j of this.productos) {
    //         j.id = contador;
    //         contador++;
    //     };
    // };

    //valido que sea un int el input value
    // export function validarStringDeNumeros (cadenaAnalizar) {
    //     for (var i = 0; i < cadenaAnalizar.length; i++) {
    //         var caracter = cadenaAnalizar.charAt(i);
            
    //         let aux = parseInt(caracter);
    //         console.log(aux)
    //         if( isNaN(aux) ) {
    //             return false;
    //         }  
    //     };
    // };

    // export function resetCantidadAComprarValue() { 
    //     $("cantidadIngresada").val(1);
    // };