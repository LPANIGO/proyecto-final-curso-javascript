//importo la clase principal de la aplicación
import App from "./app/App.js";//con esta sintaxis se le dice al intérprete que 
                                //"importe la clase App del archivo que se encuentra en app/App"


$( () => {
    console.log('El DOM está listo')
    const app = new App();
});
