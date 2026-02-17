import {cuota} from "./operaciones.js";

const botonCalcular = document.getElementById("calcular");
const botonVerHistorial = document.getElementById("recordar");
const botonReporte = document.getElementById("reporte");
let laSalida = document.getElementById("resultadoPrestamo");

botonReporte.addEventListener("click", realizarReporte)
botonCalcular.addEventListener("click", calcularCuota);
botonVerHistorial.addEventListener("click", verHistorial);


let historial = [];

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
    let valorCuota = cuota(prestamo, meses, interes)
    info = nombre +", debe pagar $" 
        + valorCuota + " cada mes por el prestamo de $" 
        + prestamo + " a " +meses+ " meses con el interes del " 
        + interes + "%";
    
    let registro = {
            nombre,
            prestamo,
            meses,
            interes,
            cuota: valorCuota
        };

    historial.push(registro);
    laSalida.textContent = info;
    
    
    }
}

function verHistorial(){

   if(historial.length === 0){
        laSalida.textContent = "No hay registros en el historial";
        return;
    }

    let texto = "";

    historial.forEach(registro => {
        texto += `Cliente: ${registro.nombre} | Préstamo: $${registro.prestamo} | Meses: ${registro.meses} | Interés: ${registro.interes}% | Cuota: $${registro.cuota}\n`;
    });

    laSalida.textContent = texto;
    
}

function realizarReporte(){

    let tipo = document.getElementById("tipos").value;

    switch(tipo){
        case "sumatoriaCuotas":
            sumatoriaCuotas();
            break;

        case "cuotasMayores300":
            cuotasMayores300();
            break;

        case "prestamosMenorUnAno":
            prestamosMenorUnAno();
            break;

        case "primerPrestamoMayor5M":
            primerPrestamoMayor5M();
            break;

        case "ultimoInteresMenor2":
            ultimoInteresMenor2();
            break;

        case "incrementarCuotas":
            incrementarCuotas();
            break;

        case "decrementarPrestamos":
            decrementarPrestamos();
            break;

        case "soloCuotas":
            soloCuotas();
            break;
    }
}


function sumatoriaCuotas(){

    if(historial.length === 0){
        laSalida.textContent = "No hay datos en el historial";
        return;
    }

    let suma = 0;

    historial.forEach(registro => {
        suma += registro.cuota;
    });

    laSalida.textContent = "La sumatoria total de las cuotas es: $" + suma;
}

function cuotasMayores300(){

    let filtrados = historial.filter(registro => registro.cuota > 300000);

    if(filtrados.length === 0){
        laSalida.textContent = "No hay cuotas mayores a $300000";
        return;
    }

    let texto = filtrados
        .map(r => `Cliente: ${r.nombre} | Cuota: $${r.cuota}`)
        .join("\n");

    laSalida.textContent = texto;
}

function prestamosMenorUnAno(){

    let filtrados = historial.filter(registro => registro.meses < 12);

    if(filtrados.length === 0){
        laSalida.textContent = "No hay préstamos menores a un año";
        return;
    }

    let texto = filtrados
        .map(r => `Cliente: ${r.nombre} | Meses: ${r.meses}`)
        .join("\n");

    laSalida.textContent = texto;
}

function primerPrestamoMayor5M(){

    let encontrado = historial.find(registro => registro.prestamo > 5000000);

    if(!encontrado){
        laSalida.textContent = "No existe préstamo mayor a $5.000.000";
        return;
    }

    laSalida.textContent =
        `Cliente: ${encontrado.nombre} | Préstamo: $${encontrado.prestamo}`;
}

function ultimoInteresMenor2(){

    let encontrado = historial.findLast(registro => registro.interes < 2);

    if(!encontrado){
        laSalida.textContent = "No existe interés menor a 2%";
        return;
    }

    laSalida.textContent =
        `Último cliente con interés <2%: ${encontrado.nombre}`;
}

function incrementarCuotas(){

    let nuevasCuotas = historial.map(registro => {
        return {
            ...registro,
            cuota: registro.cuota + 90000
        };
    });

    let texto = nuevasCuotas
        .map(r => `Cliente: ${r.nombre} | Nueva cuota: $${r.cuota}`)
        .join("\n");

    laSalida.textContent = texto;
}

function decrementarPrestamos(){

    let nuevosPrestamos = historial.map(registro => {
        return {
            ...registro,
            prestamo: registro.prestamo - 90000
        };
    });

    let texto = nuevosPrestamos
        .map(r => `Cliente: ${r.nombre} | Nuevo préstamo: $${r.prestamo}`)
        .join("\n");

    laSalida.textContent = texto;
}

function soloCuotas(){

    let cuotas = historial.map(registro => registro.cuota);

    laSalida.textContent = cuotas.join(", ");
}
