import { subirTarea } from "./subirTareas.js";

let dato = document.getElementById('inputTarea');
let btnEnviar = document.getElementById('btnAgregar');

class tarea {
    method = 'POST';
    headers = {
    'Content-Type': 'application/json',
    };
    body = '';

    constructor (tarea) {
        this.body = JSON.stringify({tarea});
    }
}

btnEnviar.addEventListener('click' , function () {
    let nuevaTarea = new tarea(dato.value);
    subirTarea(nuevaTarea)
});