const USER_URL = "http://localhost:8000/user"

const JSON_HEADERS = { "Content-Type": "application/json" }

export const getUser = (userId) => fetch(`${USER_URL}/${userId}`)

export const createUser = (user) =>
    fetch(USER_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(user),
    })

export const loginUser = (credentials) =>
    fetch(`${USER_URL}/login`, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(credentials)
    })

export const updateUser = (userId, updates) =>
    fetch(`${USER_URL}/${userId}`, {
        method: "PATCH",
        headers: JSON_HEADERS,
        body: JSON.stringify(updates)
    })

export const deleteUser = (userId) =>
    fetch(`${USER_URL}/${userId}`, {method: "DELETE"})