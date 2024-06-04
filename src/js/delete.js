async function eliminarTarea(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
            method: 'DELETE',
        });
        const data = response.json();
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export { eliminarTarea }