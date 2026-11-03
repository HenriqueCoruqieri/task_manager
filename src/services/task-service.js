const TASKS_URL = "http://localhost:8000/tasks"

const JSON_HEADERS = {"Content-Type": "application/json"}

export const getTasks = (userId) => fetch(`${TASKS_URL}?user_id=${userId}`)

export const createTask = (task) =>
    fetch(TASKS_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(task),
    })

export const updateTask = (taskId, updates) =>
    fetch(`${TASKS_URL}/${taskId}`, {
        method: "PATCH",
        headers: JSON_HEADERS,
        body: JSON.stringify(updates)
    })

export const deleteTask = (taskId) =>
    fetch(`${TASKS_URL}/${taskId}`, {method: "DELETE"})