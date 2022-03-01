import { getRandomArbitrary, guardarLocal } from "./utils.js";

//clase para mostrar los productos del carrito almacenados en localStorage
class Carrito {
    constructor() {
        this.productosEnCarrito = [];
        this.totalFinal = 0;
        this.totalProductos = 0;
    };

    //se muestran los productos agregados al carrito por el cliente
    listarCarrito() {
        //reset totalFianl y totalProductos, es un valor global y pude ser mal modificado al re llamar este metodo con "actualizarLista"
        this.totalFinal = 0;
        this.totalProductos = 0;

        $("#mi-carrito").children().remove();
        if (localStorage.getItem('listaProductos') != null) {
            this.productosEnCarrito = JSON.parse(localStorage.getItem('listaProductos'));
            let contador = 1;
            for (const producto of this.productosEnCarrito) {
                const precioPorCantidad = parseInt(producto.precio) * parseInt(producto.cantidad);
                $("#mi-carrito").append(
                    `<tr id="tr${producto.id}" class="table-secondary"> 
                        <th scope="row">${contador}</th> 
                        <td><img class="w-10vw" src="./img/${producto.imagen}" alt="${producto.nombre}"></td> 
                        <td>${producto.nombre}</td> 
                        <td>$ ${producto.precio}</td> 
                        <td>${producto.cantidad}</td> 
                        <td>$ ${precioPorCantidad}</td>
                        <td>
                            <button id="dlt${producto.id}" class="btn btn-outline-dark fs-4 " type="button"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </button>
                        </td>  
                    </tr>`);
                    this.totalFinal += precioPorCantidad;
                    this.totalProductos += parseInt(producto.cantidad);
                contador++;

                $(`#dlt${producto.id}`).click( () => {
                    $(`#tr${producto.id}`).children().fadeOut(2000, () => {
                        $(`#tr${producto.id}`).remove();
                        this.eliminarDelCarrito(producto.id);
                    });
                    
                });
            };
        }
        else {
            $("#mi-carrito").append(`<tr> <th class="text-center py-4" scope="row" colspan="7">Tu carrito de productos está vacío</th></tr>`);
        }

        $("#mi-carrito").append(`<tr class="table-dark"> 
                                    <th scope="row" colspan="3"></th> 
                                    <td class="fs-4" colspan="2">Total carrito</td> 
                                    <td id="totalFinal" class="fs-4 text-center" colspan="2">$ ${this.totalFinal}</td> 
                                </tr>`);
    };

    
    eventoBtnFinalizaCompra() {
        $('#btnFinalizarCompra').click( () => {
            if (localStorage.getItem('listaProductos') != null) {
                let ordenNum = parseInt(getRandomArbitrary(1000, 9999));
                $('#mensaje').append("<p class='p-4 mb-2 bg-success text-white'> Compra exitosa! </p>");
                $("#mensaje").children().hide();
                $("#mensaje").children().fadeIn(2000);

                $('#ordenDeCompra').append(`<thead>
                                            <tr class="table-secondary">
                                                <th scope="col">Orden de compra n°</th>
                                                <th scope="col">Cantidad de productos</th>
                                                <th scope="col">Total final</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="table-success"> 
                                                <th scope="row" class="text-center">${ordenNum}</th> 
                                                <td class="text-center">${this.totalProductos}</td>
                                                <td class="text-center">$${this.totalFinal}</td>
                                            </tr>
                                        </tbody>`);
                $("#ordenDeCompra").children().hide();
                $("#ordenDeCompra").children().fadeIn(2000);

                $("#mi-carrito").children().remove();
                $("#mi-carrito").append(`<tr> <th class="text-center py-4" scope="row" colspan="7">Tu carrito de productos está vacío</th></tr>
                                        <tr class="table-dark"> 
                                            <th scope="row" colspan="3"></th> 
                                            <td class="fs-4" colspan="2">Total carrito</td> 
                                            <td class="fs-4 text-center" colspan="2">$0</td> 
                                        </tr>`);
                
                localStorage.removeItem('listaProductos');
            } else {
                $('#ordenDeCompra').append("<div class='p-3 mb-2 bg-primary bg-gradient text-white'><p>No se agregaron productos aún.</p><a id='link-cart' href='index.html'>Ver catálogo</a></div>");
            }
        });  
    };

    evtBtnEliminarProductos() {
        
        $('#btnEliminarProductos').click( () => {
            if (localStorage.getItem('listaProductos') != null) {
            var opcion = confirm("¿Desea eliminar todos los produtos de su carrito?");
                if (opcion == true) {
                    $("#mi-carrito tr th, td").fadeOut(2000, () => {
                        $("#mi-carrito").children().remove();
                        $("#mi-carrito").append(`<tr> <th class="text-center py-4" scope="row" colspan="7">Tu carrito de productos está vacío</th></tr>
                        <tr class="table-dark"> 
                            <th scope="row" colspan="3"></th> 
                            <td class="fs-4" colspan="2">Total carrito</td> 
                            <td class="fs-4 text-center" colspan="2">$0</td> 
                        </tr>`);
                        $("#mi-carrito").children().hide();
                        $("#mi-carrito").children().fadeIn(1000);
                    });
                    localStorage.removeItem('listaProductos');
                } 
            }
        });
    }

    evtBtnActualizarLista() {
        $('#actualizarLista').click( () => {
            this.listarCarrito();
        });
    }

    eliminarDelCarrito(idRecibido) {
        let arrayActualizado = [];
        let almacenados = JSON.parse(localStorage.getItem('listaProductos'));
        //creo nuevo array filtrando el objeto por id
        arrayActualizado = almacenados.filter(elemento => elemento.id != idRecibido);
        
        for (let i of almacenados) {
            if(i.id == idRecibido) {
                this.totalProductos -= parseInt(i.cantidad);
                this.totalFinal -=  (parseInt(i.cantidad) * parseInt(i.precio))
            }
        }
        //modifico vista de totalFinal
        $('#totalFinal').empty();
        $('#totalFinal').text(`$${this.totalFinal}`);

        //actualizo lista en Storage
        guardarLocal("listaProductos", JSON.stringify(arrayActualizado));
        };
    

};

export default Carrito;