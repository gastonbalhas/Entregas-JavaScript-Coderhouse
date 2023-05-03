alert ("Bienvenidos a Equilatero Percusion");

let nombre = prompt ("ingrese su nombre");

let contraseña = prompt(`Ingrese su contraseña (recordatorio: su ultima contraseña registrada es "micontraseña")`);
while(contraseña != `micontraseña`){
    contraseña = prompt(`Ingrese la contraseña correcta (recuerde que su ultima contraseña registrada fue "micontraseña")`);
}
alert ("Usted ha ingresado con exito al sitio");



let totalCarrito = 10000;
alert (`Hola ${nombre}! El valor de su carrito de compras, por un cajon peruano es de un total de: $${totalCarrito}`);

let cantidadDeCuotas = prompt (`ingrese cantidad de cuotas en las que desea abonar (Maximo 12 Cuotas)`);
while (cantidadDeCuotas >= 13)
{
    cantidadDeCuotas = prompt (`Ingrese una cantidad menor de cuotas menor. (Maximo 12 cuotas)`);
}


function division (numero1,numero2){
    return numero1/numero2
}

const resultado = division (totalCarrito, cantidadDeCuotas);



alert (`Su compra quedaria en: ${cantidadDeCuotas} cuotas de $${resultado}. Si desea realizar la compra, por favor haga clic en "aceptar"`);
alert ("Muchas Gracias!")
