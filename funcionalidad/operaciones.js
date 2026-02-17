function cuota(prestamo, i, n){
    i = 1/100
    let aux = Math.pow((1+i),n)
    let oper = prestamo * ((aux*i)/(aux-1))
    return oper;

}

export{cuota};