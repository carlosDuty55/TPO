window.addEventListener('load', datosNasa());

let cad = `        
<h1>ASTRONOMÍA</h1>
  
<nav>
    <div class="logo">
        <img src="data:image/png;base64,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">
    </div>
    <ul class="menu">
        <li><a href="index.html">Home</a></li>
        <li><a href="tierra.html">La Tierra</a></li>
        <li><a href="elsol.html">El Sol</a></li>
        <li><a href="sist-solar.html">Sistema Solar</a></li>
        <li><a href="universo.html">Universo</a></li>
        <li><a href="form.html">Suscribirse</a></li>
    </ul>
</nav>
`
document.getElementById("idHeader").innerHTML=cad

cad = `
<p> <i class="fa-brands fa-twitter"></i> <i class="fa-brands fa-facebook"></i> <i class="fa-brands fa-instagram"></i> <i class="fa-brands fa-youtube"></i> </p>
        <p>Derechos reservados @2023</p> 
`
document.getElementById("idFooter").innerHTML=cad

if (document.getElementById("idtabla")) {
    cad=`
    <h3>Los planetas</h3>
        <table>
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Descripción</th>
          </tr>
        `
    for (var i = 0; i < data.length; i++) {
      cad+=`
            <tr>
              <td>${data[i].nombre}</td>
              <td><img src="${data[i].imagen}" width="100%"></td>
              <td>${data[i].descripcion}</td>
            </tr>
          `
    }
    cad+=`
      </table>
    `
    console.log(cad)
    document.getElementById("idtabla").innerHTML=cad
  }

 

  function datosNasa(){

    const nasa_key = 'ufaD0MaCwzmUrfGq8XhUaNWUMpNhzQPVag1mXbLW';
    const ruta = `https://api.nasa.gov/planetary/apod?api_key=${nasa_key}`;

    fetch(ruta)
    .then(respuesta => respuesta.json())
    .then(data => mostrarDatos(data))

  }

  function mostrarDatos({date, media_type, title, url}){

    const titulo = document.querySelector('#titulo_nasa');
    titulo.innerHTML = `Título: ${title}`;
    const fecha = document.querySelector('#fecha_nasa');
    fecha.innerHTML = `Fecha: ${date}`;
    const multimedia = document.querySelector('#multimedia');
    if (media_type == 'video'){
      multimedia.innerHTML = `<iframe width="720" height="480" src="${url}" frameborder="0" allowfullscreen></iframe> `
    } else {
      multimedia.innerHTML = `<img src="${url}" class="nasa_img">`
    }

  }

  function validarFormulario(){

    if (document.formulario.nombre.value.length <= 2){
      alert("Ingrese un nombre válido")
      document.formulario.nombre.focus()
      return
    }

    if (document.formulario.apellido.value.length <= 2){
      alert("Ingrese un apellido válido")
      document.formulario.apellido.focus()
      return
    }

    let dniEntero = parseInt(document.formulario.dni.value)
    if (isNaN(dniEntero)){
      alert("Ingrese un número de documento válido")
      document.formulario.dni.focus()
      return
    } else {
      if (document.formulario.dni.value.length < 6 || document.formulario.dni.value.length > 12){
        alert("El número de documento ingresado debe tener entre 6 y 12 caracteres")
        document.formulario.dni.focus()
        return
      }
    }

    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if(!(validEmail.test(document.formulario.email.value))){
      alert("Ingrese un email válido")
        return;
     }

     alert("Gracias por tu suscripción!")
     document.formulario.submit()
     }



