// Simulador cajero 

// let usuario = prompt("Ingrese su usuario:");
// let contrasenia = prompt("Ingrese su PIN:");

// alert("Bienvenido " + usuario);

let balancePesos = 287300; 
let balanceUsd = 238;
let extraccionPesos = 0;
let extraccionUsd = 0; 
let trasferencia = 0;

function gestionarOperacion(operacion) {

    if (operacion === "a") {
        let operacionA = prompt("A) Transferencia \nB) Deposito \nV) Volver al menú principal");
        operacionA = operacionA.toLowerCase();
        if (operacionA === "a") {
            prompt("Ingrese Alias o CBU");
            trasferencia =parseFloat(prompt("Ingrese monto a trasferir:"));
            balancePesos -= trasferencia;
            alert("¡Transferencia enviada!");
        } else if (operacionA === "b") {
            prompt("Ingrese numero de cuenta a depositar:");
            deposito = parseFloat(prompt("Ingrese monto a depositar:"));
            alert("!Depositado con éxito!");
        } else if (operacionA === "v") {}
    } else if (operacion === "b") {
        let extraccion = prompt("A) Extraccion en pesos \nB)Extraccion en dolares \nV) Volver al menú principal");
        extraccion = extraccion.toLowerCase();
        if (extraccion === "a") {
            extraccionPesos = parseFloat(prompt("¿Cuanto pesos queres extraer?"));
            alert("¡Extraccion de $" + extraccionPesos + " exitosa!");
        } else if (extraccion === "b") {
            extraccionUsd = prompt("¿Cuantos USD queres extraer?");
            alert("¡Extraccion exitosa!");
        } else if (operacion === "v") {}
    } else if (operacion === "c") {
        let operacionC = prompt("A) Cuenta ahorro en pesos \nB) Cuenta dolares \nV) Volver al menú principal");
        operacionC = operacionC.toLowerCase();
        if (operacionC === "a") {
            alert("Su saldo en pesos es de $" + (balancePesos - extraccionPesos));
        } else if (operacionC === "b") {
            alert("Su saldo en USD es de $" + (balanceUsd - extraccionUsd));
        } else if (operacionC === "v") {}
    }
}

let operacion = prompt("Seleccione el tipo de operación que desea operar \nA) Transferencia/Depósitos \nB) Extracciones/Adelantos \nC) Dinero en cuenta");
gestionarOperacion(operacion);

let continuar = true;

while (continuar) {
    let operacion = prompt("Seleccione el tipo de operación que desea operar \nA) Transferencia/Depósitos \nB) Extracciones/Adelantos \nC) Dinero en cuenta");
    gestionarOperacion(operacion);

    continuar = confirm("¿Desea realizar otra operación?");
}

alert("Gracias por usar nuestro servicio");