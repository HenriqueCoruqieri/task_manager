const USER_URL = "http://localhost:8000/user"

const JSON_HEADERS = {"Content-Type" : "application/json"}

export const changeProfileimage = (userId, imageUrl) => 
    fetch(`${USER_URL}/${userId}`, {
        method: "PATCH",
        headers: JSON_HEADERS,
        body: JSON.stringify({ image_url: imageUrl }),
    })