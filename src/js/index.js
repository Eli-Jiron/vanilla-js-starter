import { subirTarea } from "./post.js";
import { recibirTareas } from "./get.js";

let dato = document.getElementById('inputTarea');
let btnAgregar = document.getElementById('btnAgregar');
let listaTareas = document.getElementById('listaTareas');

cargarTareas();
async function cargarTareas() {
let promesaCumplida = await recibirTareas()

promesaCumplida.forEach(e => {
    let divBorder = document.createElement('div');
    let divPadre = document.createElement('div');
    let checkbox = document.createElement('input');
    let button = document.createElement('button');
    let divTarea = document.createElement('div');
    let textoTarea = document.createTextNode(e.tarea);

    checkbox.type = 'checkbox'
    button.textContent = 'Borrar'

    divBorder.className = 'tareasBorder'
    divPadre.className = 'tareas'

    divTarea.appendChild(textoTarea); 
    divPadre.appendChild(checkbox)
    divPadre.appendChild(divTarea)
    divPadre.appendChild(button)
    divBorder.appendChild(divPadre)

    listaTareas.appendChild(divBorder);
});
}


btnAgregar.addEventListener('click' , function () {
    subirTarea(dato.value)
});
