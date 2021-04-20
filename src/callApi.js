// const url = 'http://localhost:4400';

const key = process.env.REACT_APP_API_KEY;
const url = `https://${ key }.mockapi.io`;

export const getTasks = async () => {
    let error = null;
    let fetchedTasks = null;

    try {
        const response = await fetch(`${ url }/tasks`);
        fetchedTasks = await response.json();
    } catch (e) {
        error = e;
    }

    return { error, fetchedTasks };
}

export const addTask = async (task) => {
    let error = null;
    let addedTask = null;

    try {
        const response = await fetch(`${ url }/tasks`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        addedTask = await response.json();
    } catch (e){
        error = e;
    }

    return { error, addedTask };
}

export const updateTask = async ({ id, ...rest }) => {
    let error = null;
    let updatedTask = null;

    try {
        const taskToUpdate = await fetchTask(id);
        const response = await fetch(`${url}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...taskToUpdate, ...rest})
        })
        updatedTask = await response.json();
    } catch (e) {
        error = e;
    }

    return {error, updatedTask};
}

export const fetchTask = async (id) => {
    try {
        const response = await fetch(`${ url }/tasks/${ id }`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return await response.json();
    } catch (e) {
        throw e;
    }
}

export const deleteTask = async (id) => {
    let error = null;
    let response = null;

    try {
        response = await fetch(`${ url }/tasks/${ id }`, {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    } catch (e) {
        error = e;
    }
    return { error, response };
}
