async function subirTarea(tarea) {
    try {
        const response = await fetch('http://localhost:3000/api/todo/', {
            method : 'POST',
            headers : {
            'Content-Type': 'application/json',
            },
            body : JSON.stringify({tarea})
        });
        const data = response.json();
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
}

export { subirTarea }
