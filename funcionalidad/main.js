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

    if(nombre === "" || isNaN(prestamo) || isNaN(meses) || isNaN(interes)){
        
        laSalida.textContent = "Debe llenar los campos"
    }else if(prestamo < 0 || prestamo == 0 || meses < 0 || meses == 0 || interes < 0 || interes == 0 ){
        laSalida.textContent = "Error: No pueden haber valores negativos o iguales a cero"

    }else{
    info = nombre +", debe pagar $" + cuota(prestamo, meses, interes) + " cada mes por el prestamo de $" + prestamo + " a " +meses+ " meses con el interes del " + interes + "%"
        
    laSalida.textContent = info;
    
    }
}

function verHistorial(){
    laSalida.textContent = "Estas en historial"
    
}