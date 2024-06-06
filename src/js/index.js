import { subirTarea } from "./post.js";
import { recibirTareas } from "./get.js";
import { eliminarTarea } from "./delete.js";
import { editarEstado, editarTarea } from "./put.js";

let inputTarea = document.getElementById('inputTarea');
let btnAgregar = document.getElementById('btnAgregar');
let listaTareas = document.getElementById('listaTareas');
let mensaje = document.getElementById('mensaje');

btnAgregar.addEventListener('click', function () {
    if (inputTarea.value.trim() !== '') {
        subirTarea(inputTarea.value);
    } else {
        mensaje.textContent = 'Debe ingresar texto';
    }
});

inputTarea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        if (inputTarea.value.trim() !== '') {
            subirTarea(inputTarea.value);
        } else {
            mensaje.textContent = 'Debe ingresar texto';
        }
    }
});

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

function editar(id, tarea) {
    let modal = document.createElement('div');
    let btnCerrar = document.createElement('button')
    let textoEditar = document.createElement('div');
    let input = document.createElement('input');
    let btnEnviar = document.createElement('button');
    let modalContent = document.createElement('div');

    let txtTarea = document.createTextNode(`Editar: "${tarea}"`)

    btnCerrar.textContent = 'X'
    btnEnviar.textContent = 'Editar'
    modal.className = 'modal'
    modalContent.className = 'modalContent'

    textoEditar.appendChild(txtTarea)
    modalContent.appendChild(btnCerrar);
    modalContent.appendChild(textoEditar);
    modalContent.appendChild(input);
    modalContent.appendChild(btnEnviar);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    btnEnviar.addEventListener('click', function () {
        editarTarea(id, input.value)
    })

    btnCerrar.addEventListener('click', function () {
        document.body.removeChild(modal)
    })
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
        checkbox.className = 'unchecked'
    } else {
        checkbox.className = 'checked'
    }
    border.className = 'tareasBorder';
    divPadre.className = 'tareas';
    divPadre.id = e.id
    btnEditarImg.className = 'btnImg'
    btnEliminarImg.className = 'btnImg'
    btnEditar.className = 'btnEditar'
    btnEliminar.className = 'btnEliminar'
    divBtn.className = 'divBtn'

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

    btnEditar.addEventListener('click', function () {
        editar(divPadre.id,  divTarea.textContent)
    })

    btnEliminar.addEventListener('click', function () {
        eliminarTarea(divPadre.id);
    })

});
tareasCompletadas();
}