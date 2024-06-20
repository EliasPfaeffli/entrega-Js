// Simulador cajero

const Cajero = {
    usuario: "",
    contrasenia: "",
    balancePesos: 287300,
    balanceUsd: 238,
    extraccionPesos: 0,
    extraccionUsd: 0,
    transferencia: 0,
    historialTransacciones: [],

    iniciarSesion: function() {
        this.usuario = prompt("Ingrese su usuario:");
        this.contrasenia = prompt("Ingrese su PIN:");
        alert("Bienvenido " + this.usuario);
    },

    gestionarOperacion: function(operacion) {
        switch (operacion) {
            case "a":
                this.gestionarTransferenciaDeposito();
                break;
            case "b":
                this.gestionarExtraccion();
                break;
            case "c":
                this.consultarSaldo();
                break;
            case "d":
                this.verHistorialTransacciones();
                break;
            default:
                alert("Opción no válida");
        }
    },

    gestionarTransferenciaDeposito: function() {
        let operacionA = prompt("A) Transferencia \nB) Depósito \nV) Volver al menú principal").toLowerCase();
        switch (operacionA) {
            case "a":
                prompt("Ingrese Alias o CBU");
                this.transferencia = parseFloat(prompt("Ingrese monto a transferir:"));
                this.balancePesos -= this.transferencia;
                this.historialTransacciones.push(`Transferencia de $${this.transferencia}`);
                alert("¡Transferencia enviada!");
                break;
            case "b":
                prompt("Ingrese número de cuenta a depositar:");
                let deposito = parseFloat(prompt("Ingrese monto a depositar:"));
                this.historialTransacciones.push(`Depósito de $${deposito}`);
                alert("¡Depositado con éxito!");
                break;
            case "v":
                break;
            default:
                alert("Opción no válida");
        }
    },

    gestionarExtraccion: function() {
        let extraccion = prompt("A) Extracción en pesos \nB) Extracción en dólares \nV) Volver al menú principal").toLowerCase();
        switch (extraccion) {
            case "a":
                this.extraccionPesos = parseFloat(prompt("¿Cuánto pesos querés extraer?"));
                this.balancePesos -= this.extraccionPesos;
                this.historialTransacciones.push(`Extracción de $${this.extraccionPesos} en pesos`);
                alert("¡Extracción de $" + this.extraccionPesos + " exitosa!");
                break;
            case "b":
                this.extraccionUsd = parseFloat(prompt("¿Cuántos USD querés extraer?"));
                this.balanceUsd -= this.extraccionUsd;
                this.historialTransacciones.push(`Extracción de $${this.extraccionUsd} en USD`);
                alert("¡Extracción exitosa!");
                break;
            case "v":
                break;
            default:
                alert("Opción no válida");
        }
    },

    consultarSaldo: function() {
        let operacionC = prompt("A) Cuenta ahorro en pesos \nB) Cuenta dólares \nV) Volver al menú principal").toLowerCase();
        switch (operacionC) {
            case "a":
                alert("Su saldo en pesos es de $" + this.balancePesos);
                break;
            case "b":
                alert("Su saldo en USD es de $" + this.balanceUsd);
                break;
            case "v":
                break;
            default:
                alert("Opción no válida");
        }
    },

    verHistorialTransacciones: function() {
        if (this.historialTransacciones.length === 0) {
            alert("No hay transacciones realizadas.");
        } else {
            alert("Historial de transacciones:\n" + this.historialTransacciones.join("\n"));
        }
    },

    iniciar: function() {
        this.iniciarSesion();

        let continuar = true;
        while (continuar) {
            let operacion = prompt("Seleccione el tipo de operación que desea realizar \nA) Transferencia/Depósitos \nB) Extracciones/Adelantos \nC) Dinero en cuenta \nD) Ver historial de transacciones").toLowerCase();
            this.gestionarOperacion(operacion);

            continuar = confirm("¿Desea realizar otra operación?");
        }

        alert("Gracias por usar nuestro servicio");
    }
};


Cajero.iniciar();
