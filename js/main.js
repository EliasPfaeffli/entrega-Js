// Simulador Cajero

const Cajero = {
    saldo: 785090, 
    historialTransacciones: [], 
    transaccionesPorPagina: 5, 
    paginaActual: 1, 

    iniciarSesion: function() {
        const usuario = document.getElementById('usuario').value;
        const contrasenia = document.getElementById('contrasenia').value;

        // Simulación de inicio de sesión exitoso con cualquier usuario y PIN
        if (usuario.trim() !== '' && contrasenia.trim() !== '') {
            this.usuarioActual = usuario;
            document.getElementById('login').classList.add('hidden');
            document.getElementById('menu').classList.remove('hidden');
            this.mostrarMensaje('Bienvenido, ' + usuario + '!');
        } else {
            this.mostrarMensaje('Por favor, ingrese un usuario y PIN válidos.');
        }
    },

    mostrarTransferenciaDeposito: function() {
        this.ocultarOperaciones();
        const operacionesDiv = document.getElementById('operaciones');
        operacionesDiv.classList.remove('hidden');
        operacionesDiv.innerHTML = `
            <h2>Transferencia/Depósito</h2>
            <input type="text" id="monto" placeholder="Monto">
            <input type="text" id="destino" placeholder="CBU, Alias o Número de Cuenta">
            <button onclick="Cajero.realizarTransferenciaDeposito()">Realizar</button>
        `;
    },

    realizarTransferenciaDeposito: function() {
        const monto = parseFloat(document.getElementById('monto').value);
        const destino = document.getElementById('destino').value;

        if (!isNaN(monto) && monto > 0 && destino) {
            this.saldo += monto; // Aumenta el saldo con el monto ingresado
            this.registrarTransaccion('Transferencia/Depósito de ' + monto + ' a ' + destino);
            this.mostrarMensaje('Transferencia/Depósito de ' + monto + ' a ' + destino + ' realizado.');
        } else {
            this.mostrarMensaje('Por favor, complete todos los campos con valores válidos.');
        }

        this.ocultarOperaciones();
    },

    mostrarExtraccion: function() {
        this.ocultarOperaciones();
        const operacionesDiv = document.getElementById('operaciones');
        operacionesDiv.classList.remove('hidden');
        operacionesDiv.innerHTML = `
            <h2>Extracción/Adelanto</h2>
            <input type="text" id="monto" placeholder="Monto">
            <button onclick="Cajero.realizarExtraccion()">Realizar</button>
        `;
    },

    realizarExtraccion: function() {
        const monto = parseFloat(document.getElementById('monto').value);

        if (!isNaN(monto) && monto > 0 && monto <= this.saldo) {
            this.saldo -= monto; // Disminuye el saldo con el monto ingresado
            this.registrarTransaccion('Extracción/Adelanto de ' + monto);
            this.mostrarMensaje('Extracción/Adelanto de ' + monto + ' realizado.');
        } else {
            this.mostrarMensaje('Fondos insuficientes o monto inválido.');
        }

        this.ocultarOperaciones();
    },

    consultarSaldo: function() {
        this.ocultarOperaciones();
        this.mostrarMensaje('Tu saldo actual es ' + this.saldo + '.');
    },

    verHistorialTransacciones: function() {
        this.ocultarOperaciones();
        const operacionesDiv = document.getElementById('operaciones');
        operacionesDiv.classList.remove('hidden');

        // Calcula el índice inicial y final para mostrar las transacciones de la página actual
        const startIndex = (this.paginaActual - 1) * this.transaccionesPorPagina;
        const endIndex = startIndex + this.transaccionesPorPagina;
        const transaccionesMostradas = this.historialTransacciones.slice(startIndex, endIndex);

        let historialHTML = '<h2>Historial de Transacciones</h2>';
        if (transaccionesMostradas.length > 0) {
            historialHTML += '<ul>';
            transaccionesMostradas.forEach(transaccion => {
                historialHTML += `<li>${transaccion}</li>`;
            });
            historialHTML += '</ul>';
        } else {
            historialHTML += '<p>No hay transacciones para mostrar.</p>';
        }

        // Botón para mostrar más transacciones si hay más disponibles
        if (this.historialTransacciones.length > endIndex) {
            historialHTML += `<button onclick="Cajero.mostrarMasTransacciones()">Mostrar más</button>`;
        }

        operacionesDiv.innerHTML = historialHTML;
    },

    mostrarMasTransacciones: function() {
        this.paginaActual++;
        this.verHistorialTransacciones();
    },

    registrarTransaccion: function(descripcion) {
        // Agrega la transacción al historial
        this.historialTransacciones.unshift(descripcion); // Añade la nueva transacción al inicio del arreglo
    },

    mostrarMensaje: function(mensaje) {
        const mensajeDiv = document.getElementById('mensaje');
        mensajeDiv.innerHTML = `<p>${mensaje}</p>`;
    },

    ocultarOperaciones: function() {
        const operacionesDiv = document.getElementById('operaciones');
        operacionesDiv.innerHTML = '';
        operacionesDiv.classList.add('hidden');
    }
};