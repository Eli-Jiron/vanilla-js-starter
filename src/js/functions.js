import { getTasks, postTasks , deleteTasks, editTasks, editStatus } from "./api.js";
import { renderTarea, recibir } from "./index.js";
export { msjSinTareas, tareasCompletadas }

let mensaje = document.getElementById("mensaje");
let listaTareas = document.getElementById("listaTareas");

document.getElementById("btnFiltro").addEventListener("click", function () {
  inputFiltro.value = "";
  listaTareas.innerHTML = "";
  recibir();
});

document.getElementById("inputFiltro").addEventListener("input", function (event) {
    if (inputFiltro.value.trim() !== "") {
      filtro(inputFiltro.value.toLowerCase());
    } else {
      listaTareas.innerHTML = "";
      recibir();
    }
  });

document.getElementById("btnAgregar").addEventListener("click", function () {
  if (inputTarea.value.trim() !== "") {
    postTasks(inputTarea.value);
    inputTarea.value = "";
    mensaje.textContent = "";
    setTimeout(() => {
      listaTareas.innerHTML = "";
      recibir();
    }, 100);
  } else {
    mensaje.textContent = "Debe ingresar texto";
  }
});

document.getElementById("inputTarea").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (inputTarea.value.trim() !== "") {
        postTasks(inputTarea.value);
        inputTarea.value = "";
        mensaje.textContent = "";
        setTimeout(() => {
          listaTareas.innerHTML = "";
          recibir();
        }, 100);
      } else {
        mensaje.textContent = "Debe ingresar texto";
      }
    }
  });

function msjSinTareas() {
  setTimeout(() => {
    let h1 = document.createElement("h1");
    let txt = document.createTextNode("No hay tareas");
    h1.appendChild(txt);
    h1.id = "sinTareas";
    if (listaTareas.childNodes.length === 0) {
      listaTareas.appendChild(h1);
    }
  }, 100);
}

async function tareasCompletadas() {
  const promesa = await getTasks();
  promesa.forEach((e) => {
    if (e.estado === "completo") {
      contador.textContent = parseInt(contador.textContent) + 1;
    }
  });
}

async function filtro(buscar) {
  listaTareas.innerHTML = "";
  const promesa = await getTasks();
  promesa.forEach((e) => {
    if (e.tarea.toLowerCase().includes(buscar)) {
      renderTarea(e);
    }
  });
}
