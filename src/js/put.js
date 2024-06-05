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

export { editarEstado }