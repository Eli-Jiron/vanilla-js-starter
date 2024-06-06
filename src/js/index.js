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

function msjSinTareas() {
    let h1 = document.createElement('h1');
    let txt = document.createTextNode('No hay tareas');
    h1.appendChild(txt);
    h1.id = 'sinTareas'
    console.log(listaTareas.childNodes.length);
    if (listaTareas.childNodes.length === 0) { 
        listaTareas.appendChild(h1);
    }
}

function tareasCompletadas(estado) {
    let contador = document.getElementById('contador');
    if (estado === 'completo') {
        contador.textContent = parseInt(contador.textContent)+1;
    }
}

function checklist(id, estado) {
    if (estado === 'incompleto') {
        editarEstado(id, 'completo');
    } else {
        editarEstado(id, 'incompleto');
    }
}

function editar(id, tarea) {
    let modal = document.createElement('div');
    let divModal = document.createElement('div');
    let btnCerrar = document.createElement('button');
    let textoEditar = document.createElement('div');
    let input = document.createElement('input');
    let btnEnviar = document.createElement('button');
    let modalContent = document.createElement('div');
    let divInput = document.createElement('div');
    let txtTarea = document.createTextNode(`Editar: "${tarea}"`);
    btnEnviar.textContent = 'Editar';
    btnCerrar.textContent = 'X';
    input.placeholder = 'Ingrese nueva tarea';

    btnEnviar.className = 'btnTarea';
    input.className = 'inputTarea';
    btnCerrar.id = 'btnCerrar';
    modal.className = 'modal';
    modalContent.className = 'modalContent';
    divModal.className = 'divModal';
    divInput.id = 'downContent';

    textoEditar.appendChild(txtTarea);
    divInput.appendChild(input);
    divInput.appendChild(btnEnviar);
    modalContent.appendChild(textoEditar);
    modalContent.appendChild(divInput)
    divModal.appendChild(btnCerrar);
    divModal.appendChild(modalContent);
    modal.appendChild(divModal);
    document.body.appendChild(modal);

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            if (input.value.trim() !== '') {
                editarTarea(id, input.value);
            }
        }
    });

    btnEnviar.addEventListener('click', function () {
        if (input.value.trim() !== '') {
            editarTarea(id, input.value);
        }
    })

    btnCerrar.addEventListener('click', function () {
        document.body.removeChild(modal);
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
            checklist(divPadre.id, e.estado);
        })
    
        btnEditar.addEventListener('click', function () {
            editar(divPadre.id,  divTarea.textContent)
        })
    
        btnEliminar.addEventListener('click', function () {
            eliminarTarea(divPadre.id);
        })
        tareasCompletadas(e.estado);
    });
    msjSinTareas()
}