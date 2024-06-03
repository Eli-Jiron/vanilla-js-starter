async function subirTarea(tareas) {
    try {
        const response = await fetch('http://localhost:3000/api/todo/', tareas);
        const data = response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export { subirTarea }
