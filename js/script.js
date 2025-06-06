//Endpoint de Integrantes - API
const API_URL = "https://retoolapi.dev/3u9Ytp/integrantes";

//Funcion que manda a traer el JSON con GET
async function ObtenerIntegrantes() {
    //Solicitar la respuesta de el servidor
    const respuesta = await fetch(API_URL);

    //Pasamos a JSON la respuesta de el servidor
    const data = await respuesta.json(); //Esto es un JSON

    //Enviamos el JSON  a la funcion
    MostrarDatos(data);
}

//Función para crear las filas de la tabla en base de JSON
//"datos" representara al JSON de donde viene la informacion
function MostrarDatos(datos){

    //Se llama a la tabla con el elemento "id" y luego por el tbody
    const tabla = document.querySelector("#tabla tbody");

    //Para injectar codigo HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla
    
    datos.forEach(integrante => {
        tabla.innerHTML += `
            <tr>
                <td>${integrante.id}</td>
                <td>${integrante.nombre}</td>
                <td>${integrante.apellido}</td>
                <td>${integrante.correo}</td>
                <td>
                    <button>Editar</button>
                    <button onclick="EliminarPersonas(${integrante.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerIntegrantes();





//Proceso para agregar un nuevo integrante
const modal = document.getElementById("mdAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //boton para agregar registro
const btnCerrar = document.getElementById("btnCerrar"); //Boton para cerra rle popup

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abrir el modal al hacer clic en el boton
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
})

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //"e" representa a "submot". Evita que el formulario se envie un solo    

    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApelldio").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !correo)
        {
            alert("Ingresar los valores correctamente");
            return; //Para evitar que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST", //Tipo de solicitud
        headers: {'Content-Type':'application/json'}, //Tipo de dato enviado
        body: JSON.stringify({nombre, apellido, correo})   //Datos enviado
    });


    //Verificar si la API responde que los datos fueron enviados correctamente
    if(respuesta.ok)
        {
            alert("El registro fue agregado correctamente");

            //limpiar el formulario
            document.getElementById("frmAgregar").reset();

            //Cerrar el modal(dialog)
            modal.close();

            //Recargamos la tabla
            ObtenerIntegrantes();
    }else {
        //En caso que la API devuelva un codigo diferencia a 200-299
        alert("El regsitro no pudo ser agregado")
    }

});


//Funcion para borrar registros
async function EliminarPersonas(id){
    const confirmacion = confirm("¿Realmtente deseas eliminar el registro");
    
    //Validamos si el usuario si escogio borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        //Recargar la tabla despues de eliminar
        ObtenerIntegrantes();
    }
}











