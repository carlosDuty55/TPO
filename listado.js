const URL = "https://carlosduty55.pythonanywhere.com/"


// Realizamos la solicitud GET al servidor para obtener todos los productos
fetch(URL + 'suscriptores')
    .then(function (response) {
        if (response.ok) {
            return response.json(); 
    } else {
            // Si hubo un error, lanzar explícitamente una excepción
            // para ser "catcheada" más adelante
            throw new Error('Error al obtener los suscriptores.');
        }
    })
    .then(function (data) {
        let tablaPersonas = document.getElementById('tablaPersonas');


        // Iteramos sobre los productos y agregamos filas a la tabla
        for (let persona of data) {
            let fila = document.createElement('tr');
            fila.innerHTML = '<td>' + persona.codigo + '</td>' +
                '<td>' + persona.nombre + '</td>' +
                '<td align="right">' + persona.apellido + '</td>' +
                '<td align="right">' + persona.dni + '</td>';
            
            //Una vez que se crea la fila con el contenido del producto, se agrega a la tabla utilizando el método appendChild del elemento tablaProductos.
            tablaPersonas.appendChild(fila);
        }
    })
    .catch(function (error) {
        // En caso de error
        alert('Error al agregar el producto.');
        console.error('Error:', error);
    })