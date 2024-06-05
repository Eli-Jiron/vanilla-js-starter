import { subirTarea } from "./post.js";
import { recibirTareas } from "./get.js";
import { eliminarTarea } from "./delete.js";
import { editarEstado } from "./put.js";

let dato = document.getElementById('inputTarea');
let btnAgregar = document.getElementById('btnAgregar');
let listaTareas = document.getElementById('listaTareas');

async function tareasCompletadas() {
    let contador = document.getElementById('contador');
    let promesa = await recibirTareas();
    promesa.forEach(e => {
        if (e.estado === 'completo') {
            contador.textContent = parseInt(contador.textContent)+1;
        }
    });
}

async function checklist(id) {
    let promesa = await recibirTareas();
    promesa.forEach(e => {
        if (e.id === id) {
            if (e.estado === 'incompleto') {
                editarEstado(id, 'completo');
            } else {
                editarEstado(id, 'incompleto');
            }
        }
    });
}

cargarTareas();
async function cargarTareas() {
let promesa = await recibirTareas();
promesa.forEach(e => {
    let border = document.createElement('div');
    let divPadre = document.createElement('div');
    let checkbox = document.createElement('input');
    let button = document.createElement('button');
    let divTarea = document.createElement('div'); 
    let textoTarea = document.createTextNode(e.tarea);

    checkbox.type = 'checkbox';
    button.textContent = 'Borrar';

    if (e.estado === 'incompleto') {
        checkbox.className = 'checkboxStyle';
    } else {
        checkbox.className = 'check';
    }
    button.className = 'btnStyle'
    border.className = 'tareasBorder';
    divPadre.className = 'tareas';
    checkbox.id = e.id;
    button.id = e.id;

    divTarea.appendChild(textoTarea); 
    divPadre.appendChild(checkbox);
    divPadre.appendChild(divTarea);
    divPadre.appendChild(button);
    border.appendChild(divPadre);

    listaTareas.appendChild(border);

    checkbox.addEventListener('click', function () {
        checklist(checkbox.id);
    })

    button.addEventListener('click', function () {
        eliminarTarea(button.id);
    })

});
tareasCompletadas();
}

btnAgregar.addEventListener('click' , function () {
    let mensaje = document.getElementById('mensaje');
    if (dato.value.trim() !== '') {
        subirTarea(dato.value);
    } else {
        mensaje.textContent = 'Debe ingresar una tarea';
    }
});