import { getTasks, postTasks , deleteTasks, editTasks, editStatus } from "./api.js";
export { msjSinTareas, tareasCompletadas }

let mensaje = document.getElementById("mensaje");

document.getElementById("btnAgregar").addEventListener("click", function () {
  if (inputTarea.value.trim() !== "") {
    postTasks(inputTarea.value);
  } else {
    mensaje.textContent = "Debe ingresar texto";
  }
});

document.getElementById("inputTarea").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (inputTarea.value.trim() !== "") {
      postTasks(inputTarea.value);
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
  }, 50);
}

async function tareasCompletadas() {
  const promesa = await getTasks()
  promesa.forEach(e => {
    if (e.estado === "completo") {
      contador.textContent = parseInt(contador.textContent) + 1;
    }
  });
}
