import { getTasks, postTasks , deleteTasks, editTasks, editStatus } from "./api.js";
import { checklist, msjSinTareas, tareasCompletadas } from "./functions.js";
export { renderTarea, recibir }

let listaTareas = document.getElementById("listaTareas");
let contador = document.getElementById("contador");

tareasCompletadas();

msjSinTareas();

recibir();
async function recibir() { //Recibe la info desde la api y la pasa como parametro a ser renderizara
  const promesa = await getTasks();
  promesa.forEach((e) => {
    renderTarea(e);
  });
}

function renderTarea(e) { //Función encargada de renderizar las tareas
  let border = document.createElement("div");
  let divPadre = document.createElement("div");
  let divTarea = document.createElement("div");
  let divBtn = document.createElement("div");
  let checkbox = document.createElement("input");
  let btnEliminar = document.createElement("button");
  let btnEditar = document.createElement("button");
  let textoTarea = document.createTextNode(e.tarea);
  let btnEliminarImg = document.createElement("img");
  let btnEditarImg = document.createElement("img");

  btnEditarImg.src = "https://autumn.revolt.chat/attachments/PsiPkuNbVmVeeaSwfPqXvap1luWr87prb5XP3GaYIb";
  btnEliminarImg.src = "https://autumn.revolt.chat/attachments/wFIHXe0d91Rb_yLIbiSq9ZK9NyB-QpKEuTHIC1RxLB";
  checkbox.type = "checkbox";

  if (e.estado === "incompleto") {
    checkbox.className = "unchecked";
  } else {
    checkbox.className = "checked";
  }
  border.className = "tareasBorder";
  divPadre.className = "tareas";
  divPadre.id = e.id;
  btnEditarImg.className = "btnImg";
  btnEliminarImg.className = "btnImg";
  btnEditar.className = "btnEditar";
  btnEliminar.className = "btnEliminar";
  divBtn.className = "divBtn";

  btnEliminar.appendChild(btnEliminarImg);
  btnEditar.appendChild(btnEditarImg);
  divBtn.appendChild(btnEditar);
  divBtn.appendChild(btnEliminar);
  divTarea.appendChild(textoTarea);
  divPadre.appendChild(checkbox);
  divPadre.appendChild(divTarea);
  divPadre.appendChild(divBtn);
  border.appendChild(divPadre);
  listaTareas.appendChild(border);

  btnEliminar.addEventListener("click", function () { //Elimina la tarea tanto de la pagina como de la api, resta uno al contador de tareas completadas
    if (contador.textContent !== "0") {
      contador.textContent = parseInt(contador.textContent) - 1;
    }
    listaTareas.removeChild(border);
    deleteTasks(divPadre.id);
    msjSinTareas();
  });
  btnEditar.addEventListener("click", function () { //Lanza un modal para editar la tarea
    renderModal(divPadre.id, divTarea);
  });

  checkbox.addEventListener("click", function () { //Función de los checkbox, cambia el estado de la tarea tanto en la pagina como en la api; suma o resta al contador dependiendo de su estado
    if (checkbox.className === "unchecked") {
      editStatus(divPadre.id, "completo");
      checkbox.className = "checked";
      contador.textContent = parseInt(contador.textContent) + 1;
    } else {
      editStatus(divPadre.id, "incompleto");
      checkbox.className = "unchecked";
      contador.textContent = parseInt(contador.textContent) - 1;
    }
  });
}

function renderModal(id, tarea) { //Función que renderiza un modal para editar tareas
  let modal = document.createElement("div");
  let divModal = document.createElement("div");
  let btnCerrar = document.createElement("button");
  let textoEditar = document.createElement("div");
  let input = document.createElement("input");
  let btnEnviar = document.createElement("button");
  let modalContent = document.createElement("div");
  let divInput = document.createElement("div");
  let txtTarea = document.createTextNode(`Editar: "${tarea.textContent}"`);
  btnEnviar.textContent = "Editar";
  btnCerrar.textContent = "X";
  input.placeholder = "Ingrese nueva tarea";
  btnEnviar.className = "btnTarea";
  input.className = "inputTarea";
  btnCerrar.id = "btnCerrar";
  modal.className = "modal";
  modalContent.className = "modalContent";
  divModal.className = "divModal";
  divInput.id = "downContent";

  textoEditar.appendChild(txtTarea);
  divInput.appendChild(input);
  divInput.appendChild(btnEnviar);
  modalContent.appendChild(textoEditar);
  modalContent.appendChild(divInput);
  divModal.appendChild(btnCerrar);
  divModal.appendChild(modalContent);
  modal.appendChild(divModal);
  document.body.appendChild(modal);

  input.addEventListener("keydown", function (event) { //Función para editar la tarea al teclear "ENTER"
    if (event.key === "Enter") {
      if (input.value.trim() !== "") { //Valida que el espacio no esté vacío
        //Edita la tarea tanto en la pagina como en la api y cierra el modal
        editTasks(id, input.value);
        tarea.textContent = input.value;
        document.body.removeChild(modal);
      }
    }
  });

  btnEnviar.addEventListener("click", function () { //Función para editar la tarea al clicklear en el botón "Editar"
    if (input.value.trim() !== "") { //Valida que el espacio no esté vacío
      //Edita la tarea tanto en la pagina como en la api y cierra el modal
      editTasks(id, input.value);
      tarea.textContent = input.value;
      document.body.removeChild(modal);
    }
  });

  btnCerrar.addEventListener("click", function () { //Cierra el modal
    document.body.removeChild(modal);
  });
}
