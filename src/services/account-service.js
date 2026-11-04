const USER_URL = "http://localhost:8000/user"

const JSON_HEADERS = { "Content-Type" : "application/json" }

export const changePassword = (userId, password) =>
    fetch(`${USER_URL}/${userId}`, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify({password}),
    })

export const deleteAccount = (userId) =>
    fetch(`${USER_URL}/${userId}`, { method: "DELETE" })