async function recibirTareas() {
    try {
        const response = await fetch('http://localhost:3000/api/todo/');
        const data = response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

export { recibirTareas }