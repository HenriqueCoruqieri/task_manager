import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  const fetchUser = async () => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      setUserData(null)
      return
    }

    const response = await fetch(`http://localhost:8000/user/${userId}`)

    if (!response.ok) {
      const error = await response.text()
      console.error(error)
      return
    }

    const data = await response.json()
    setUserData(data)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData, fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
