import {cuota} from "./operaciones.js";

const botonCalcular = document.getElementById("calcular");
const botonVerHistorial = document.getElementById("recordar");
let laSalida = document.getElementById("resultadoPrestamo");


botonCalcular.addEventListener("click", calcularCuota);
botonVerHistorial.addEventListener("click", verHistorial);






function calcularCuota(){
   
    let nombre = document.getElementById("elNombre").value;   
    let prestamo = parseFloat(document.getElementById("elPrestamo").value);
    let meses = parseInt(document.getElementById("losMeses").value);
    let interes = parseFloat(document.getElementById("losInteres").value);
    let info

   
    info = "La cuota es de $ " + cuota(prestamo, meses, interes)
        
    laSalida.textContent = info;
    

}

function verHistorial(){
    laSalida.textContent = "Estas en historial"
    
}