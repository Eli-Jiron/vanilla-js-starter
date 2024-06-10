import { getTasks, postTasks , deleteTasks, editTasks, editStatus } from "./api.js";
import { renderTarea, recibir } from "./index.js";
export { msjSinTareas, tareasCompletadas }

let mensaje = document.getElementById("mensaje");
let listaTareas = document.getElementById("listaTareas");

document.getElementById("btnFiltro").addEventListener("click", function () { //Función para eliminar el filtrado de tareas
  inputFiltro.value = "";
  listaTareas.innerHTML = "";
  recibir();
});

document.getElementById("inputFiltro").addEventListener("input", function () { //Función para filtrar tareas por letra
    if (inputFiltro.value.trim() !== "") {
      filtro(inputFiltro.value.toLowerCase());
    } else { //En caso de que el input esté vacío, renderiza todas las tareas
      listaTareas.innerHTML = "";
      recibir();
    }
  });

document.getElementById("btnAgregar").addEventListener("click", function () { //Función para subir tareas al clickear en el botón de "agregar"
  if (inputTarea.value.trim() !== "") { //Validación para evitar subir tareas vacías
    postTasks(inputTarea.value);
    inputTarea.value = "";
    mensaje.textContent = "";
    setTimeout(() => { //Una vez subida, vuelve a renderizar las tareas
      listaTareas.innerHTML = "";
      recibir();
    }, 100);
  } else { //Mensaje en que caso que se intente subir una tarea vacía
    mensaje.textContent = "Debe ingresar texto";
  }
});

document.getElementById("inputTarea").addEventListener("keydown", function (event) { //Función para subir tareas al teclear "ENTER"
    if (event.key === "Enter") {
      if (inputTarea.value.trim() !== "") { //Validación para evitar subir tareas vacías
        postTasks(inputTarea.value);
        inputTarea.value = "";
        mensaje.textContent = "";
        setTimeout(() => { //Una vez subida, vuelve a renderizar las tareas
          listaTareas.innerHTML = "";
          recibir();
        }, 100);
      } else { //Mensaje en que caso que se intente subir una tarea vacía
        mensaje.textContent = "Debe ingresar texto";
      }
    }
  });

function msjSinTareas() { //Un mensaje que se mostrará cuando no hayan tareas en la lista
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

async function tareasCompletadas() { //Función que carga el contador de tareas completadas al cargar la pagina
  const promesa = await getTasks();
  promesa.forEach((e) => {
    if (e.estado === "completo") {
      contador.textContent = parseInt(contador.textContent) + 1;
    }
  });
}

async function filtro(filtro) { //Función que compara tareas con el filtro y renderiza las tareas que coinciden
  listaTareas.innerHTML = "";
  const promesa = await getTasks();
  promesa.forEach((e) => {
    if (e.tarea.toLowerCase().includes(filtro)) {
      renderTarea(e);
    }
  });
}
