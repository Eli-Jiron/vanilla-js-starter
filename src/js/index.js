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
    let divTarea = document.createElement('div'); 
    let divBtn = document.createElement('div');
    let checkbox = document.createElement('input');
    let btnEliminar = document.createElement('button');
    let btnEditar = document.createElement('button');
    let textoTarea = document.createTextNode(e.tarea);
    let btnEliminarImg = document.createElement('img');
    let btnEditarImg = document.createElement('img');

    btnEditarImg.src = 'https://cdn.discordapp.com/attachments/1048493214971203646/1247963269960962129/P5xaTrav3o3U8hf.png?ex=6661efdd&is=66609e5d&hm=e74c9500616e1192b6a9781955a2d89fce3bceb9ceef43a935798fe5e593c7be&'
    btnEliminarImg.src = 'https://cdn.discordapp.com/attachments/1048493214971203646/1247963269444931584/IP0AYyPEknzepsF.png?ex=6661efdd&is=66609e5d&hm=33233d66aae79eabd2cedaf4fd42c0e9275d41ad16307b1e4d192ea212933852&'
    checkbox.type = 'checkbox';

    if (e.estado === 'incompleto') {
        checkbox.className = 'unchecked';
    } else {
        checkbox.className = 'checked';
    }

    divBtn.className = 'divBtn'
    btnEliminarImg.className = 'btnImg'
    btnEliminar.className = 'btnEliminar'
    btnEditar.className = 'btnEditar'
    btnEditarImg.className = 'btnImg'
    border.className = 'tareasBorder';
    divPadre.className = 'tareas';
    divPadre.id = e.id;

    btnEliminar.appendChild(btnEliminarImg);
    btnEditar.appendChild(btnEditarImg);
    divBtn.appendChild(btnEditar)
    divBtn.appendChild(btnEliminar)
    divTarea.appendChild(textoTarea); 
    divPadre.appendChild(checkbox);
    divPadre.appendChild(divTarea);
    divPadre.appendChild(divBtn);
    border.appendChild(divPadre);

    listaTareas.appendChild(border);

    checkbox.addEventListener('click', function () {
        checklist(divPadre.id);
    })

    btnEliminar.addEventListener('click', function () {
        eliminarTarea(divPadre.id);
    })

});
tareasCompletadas();
}

btnAgregar.addEventListener('click' , function () {
    let mensaje = document.getElementById('mensaje');
    if (dato.value.trim() !== '') {
        subirTarea(dato.value);
    } else {
        mensaje.textContent = 'Debe ingresar texto';
    }
});