async function editarEstado(id, nuevoEstado) {
    try {
        const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({estado: nuevoEstado})
        });
        const data = await response.json();
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function editarTarea(id, nuevaTarea) {
    try {
        const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({tarea: nuevaTarea})
        });
        const data = await response.json();
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export { editarEstado, editarTarea }