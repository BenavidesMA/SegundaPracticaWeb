function cuota(prestamo, meses, interes){
    interes = interes/100
    let res = prestamo * ((((1+interes)**meses)*interes)/(((1+interes)**meses)-1));
    return res;

}

export{cuota};