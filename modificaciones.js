const URL = "https://carlosduty55.pythonanywhere.com/"


const app = Vue.createApp({ 
    data() {
        return {
            codigo: '',
            nombre: '',
            apellido: '',
            dni: '',
            mostrarDatosProducto: false,
        };
    },


    methods: {
        obtenerProducto() {
            fetch(URL + 'form/' + this.codigo)
                .then(response =>  {
                    if (response.ok) {
                        return response.json()
                    } else {
                        //Si la respuesta es un error, lanzamos una excepción para ser "catcheada" más adelante en el catch.
                        throw new Error('Error al obtener los datos del producto.')
                    }
                })


                .then(data => {
                    this.nombre = data.nombre;
                    this.apellido = data.apellido;
                    this.dni = data.dni;
                    this.mostrarDatosProducto = true;
                })
                .catch(error => {
                    console.log(error);
                    alert('Código no encontrado.');
                })
        },
        
        /*seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            this.imagenUrlTemp = URL.createObjectURL(file); // Crea una URL temporal para la vista previa
        },*/

        guardarCambios() {
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('nombre', this.nombre);
            formData.append('apellido', this.apellido);
            formData.append('dni', this.dni);


           /* if (this.imagenSeleccionada) {
                formData.append('imagen', this.imagenSeleccionada, this.imagenSeleccionada.name);
            } */


            //Utilizamos fetch para realizar una solicitud PUT a la API y guardar los cambios.
            fetch(URL + 'form/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
            .then(response => {
                //Si la respuesta es exitosa, utilizamos response.json() para parsear la respuesta en formato JSON.
                if (response.ok) {
                    return response.json()
                } else {
                    //Si la respuesta es un error, lanzamos una excepción.
                    throw new Error('Error al guardar los cambios del suscriptor.')
                }
            })
            .then(data => {
                alert('Persona actualizada correctamente.');
                this.limpiarFormulario();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar el suscriptor.');
            });
        },
        limpiarFormulario() {
            this.codigo = '';
            this.nombre = '';
            this.apellido = '';
            this.dni = '';
            this.mostrarDatosProducto = false;
        }
    }
});


app.mount('#app');