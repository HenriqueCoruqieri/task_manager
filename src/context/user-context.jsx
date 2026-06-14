import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId")
      if (!userId) return

      const response = await fetch(`http://localhost:8000/user/${userId}`)
      const data = await response.json()
      setUserData(data)
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
