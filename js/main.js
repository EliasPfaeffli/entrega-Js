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
        this.usuario = document.getElementById("usuario").value;
        this.contrasenia = document.getElementById("contrasenia").value;
        if (this.usuario && this.contrasenia) {
            document.getElementById("login").classList.add("hidden");
            document.getElementById("menu").classList.remove("hidden");
            document.getElementById("mensaje").textContent = "Bienvenido " + this.usuario;
        } else {
            document.getElementById("mensaje").textContent = "Ingrese su usuario y PIN.";
        }
    },

    mostrarTransferenciaDeposito: function() {
        const operacionesDiv = document.getElementById("operaciones");
        operacionesDiv.innerHTML = `
            <h2>Transferencia/Depósito</h2>
            <button onclick="Cajero.transferencia()">Transferencia</button>
            <button onclick="Cajero.deposito()">Depósito</button>
            <button onclick="Cajero.volverMenu()">Volver al menú principal</button>
        `;
        operacionesDiv.classList.remove("hidden");
    },

    mostrarExtraccion: function() {
        const operacionesDiv = document.getElementById("operaciones");
        operacionesDiv.innerHTML = `
            <h2>Extracción/Adelanto</h2>
            <button onclick="Cajero.extraccionPesos()">Extracción en pesos</button>
            <button onclick="Cajero.extraccionUsd()">Extracción en dólares</button>
            <button onclick="Cajero.volverMenu()">Volver al menú principal</button>
        `;
        operacionesDiv.classList.remove("hidden");
    },

    volverMenu: function() {
        document.getElementById("operaciones").classList.add("hidden");
    },

    transferencia: function() {
        let alias = prompt("Ingrese Alias o CBU");
        this.transferencia = parseFloat(prompt("Ingrese monto a transferir:"));
        this.balancePesos -= this.transferencia;
        this.historialTransacciones.push(`Transferencia de $${this.transferencia} a ${alias}`);
        alert("¡Transferencia enviada!");
        this.volverMenu();
    },

    deposito: function() {
        let cuenta = prompt("Ingrese número de cuenta a depositar:");
        let deposito = parseFloat(prompt("Ingrese monto a depositar:"));
        this.historialTransacciones.push(`Depósito de $${deposito} en la cuenta ${cuenta}`);
        alert("¡Depositado con éxito!");
        this.volverMenu();
    },

    extraccionPesos: function() {
        this.extraccionPesos = parseFloat(prompt("¿Cuánto pesos querés extraer?"));
        this.balancePesos -= this.extraccionPesos;
        this.historialTransacciones.push(`Extracción de $${this.extraccionPesos} en pesos`);
        alert("¡Extracción de $" + this.extraccionPesos + " exitosa!");
        this.volverMenu();
    },

    extraccionUsd: function() {
        this.extraccionUsd = parseFloat(prompt("¿Cuántos USD querés extraer?"));
        this.balanceUsd -= this.extraccionUsd;
        this.historialTransacciones.push(`Extracción de $${this.extraccionUsd} en USD`);
        alert("¡Extracción exitosa!");
        this.volverMenu();
    },

    consultarSaldo: function() {
        const operacionesDiv = document.getElementById("operaciones");
        operacionesDiv.innerHTML = `
            <h2>Consultar Saldo</h2>
            <p>Saldo en pesos: $${this.balancePesos}</p>
            <p>Saldo en USD: $${this.balanceUsd}</p>
            <button onclick="Cajero.volverMenu()">Volver al menú principal</button>
        `;
        operacionesDiv.classList.remove("hidden");
    },

    verHistorialTransacciones: function() {
        const operacionesDiv = document.getElementById("operaciones");
        let historial = this.historialTransacciones.length === 0 ? "No hay transacciones realizadas." : this.historialTransacciones.join("<br>");
        operacionesDiv.innerHTML = `
            <h2>Historial de Transacciones</h2>
            <p>${historial}</p>
            <button onclick="Cajero.volverMenu()">Volver al menú principal</button>
        `;
        operacionesDiv.classList.remove("hidden");
    },

    iniciar: function() {
        this.iniciarSesion();
    }
};