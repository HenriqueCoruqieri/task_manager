import { useEffect, useState } from "react"

import Footer from "../components/footer"
import Header from "../components/header"
import UserMenu from "../components/user-menu"
import { Camera } from "lucide-react"

const Profile = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId")
      const response = await fetch(`http://localhost:8000/user/${userId}`)
      const data = await response.json()
      setUserData(data)
    }

    fetchUser()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <UserMenu />

      <div className="flex flex-1 flex-col items-center justify-center mb-40">
        <div className="flex  mr-55">
          <button className="btn btn-circle text-emerald-500 shadow-2xl">
            <Camera />
          </button>
        </div>

        <div className="avatar">
          <div className="w-24 rounded-xl min-w-[200px] min-h-[200px] border-emerald-500 border-2 ">
            <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
          </div>
        </div>

        <div className="font-semibold mt-2">
          {userData && (
            <div className="opacity-90 tracking-wide space-y-2">
              <h1 className="text-center text-2xl">
                {userData.first_name} {userData.last_name}
              </h1>
              <p className="text-sm">{userData.email}</p>
              <p className="text-sm">********</p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <button className="btn btn-success">Trocar senha</button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Profile
