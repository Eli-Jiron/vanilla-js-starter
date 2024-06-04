import { subirTarea } from "./post.js";
import { recibirTareas } from "./get.js";

let dato = document.getElementById('inputTarea');
let btnAgregar = document.getElementById('btnAgregar');
let listaTareas = document.getElementById('listaTareas');
let mensaje = document.getElementById('mensaje');

cargarTareas();
async function cargarTareas() {
let promesaCumplida = await recibirTareas()

promesaCumplida.forEach(e => {
    let border = document.createElement('div');
    let divPadre = document.createElement('div');
    let checkbox = document.createElement('input');
    let button = document.createElement('button');
    let divTarea = document.createElement('div');
    let textoTarea = document.createTextNode(e.tarea);

    checkbox.type = 'checkbox'
    button.textContent = 'Borrar'

    border.className = 'tareasBorder'
    divPadre.className = 'tareas'

    divTarea.appendChild(textoTarea); 
    divPadre.appendChild(checkbox)
    divPadre.appendChild(divTarea)
    divPadre.appendChild(button)
    border.appendChild(divPadre)

    listaTareas.appendChild(border);
});
}


btnAgregar.addEventListener('click' , function () {
    if (dato.value !== '') {
        subirTarea(dato.value)
    } else {
        mensaje.textContent = 'Debe ingresar una tarea'
    }
});
