import { useEffect, useState } from "react"
import { UserContext } from "./user-context"
import { getUser } from "../services/user-service"

const loadUser = async () => {
  const userId = localStorage.getItem("userId")
  if (!userId) return null

  const response = await getUser(userId)

  if (!response.ok) {
    const error = await response.text()
    console.error(error)
    return null
  }

  return response.json()
}

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  const fetchUser = async () => {
    setUserData(await loadUser())
  }

  useEffect(() => {
    loadUser().then(setUserData)
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData, fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}
