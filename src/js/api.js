async function getTasks() { //Función de metodo GET
  try {
    const response = await fetch("http://localhost:3000/api/todo/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function postTasks(tarea) { //Función de metodo POST
  try {
    const response = await fetch("http://localhost:3000/api/todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tarea, estado: "incompleto" }),
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function deleteTasks(id) { //Función de metodo DELETE
  try {
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function editStatus(id, nuevoEstado) { //Función de metodo PUT para editar el estado
  try {
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado: nuevoEstado }),
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function editTasks(id, nuevaTarea) { //Función de metodo PUT para editar la tarea
  try {
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tarea: nuevaTarea }),
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

export { getTasks, postTasks, deleteTasks, editTasks, editStatus };
