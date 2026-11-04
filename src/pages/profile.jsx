import { useRef } from "react"

import Footer from "../components/footer"
import Header from "../components/header"
import UserMenu from "../components/user-menu"
import EditImageModal from "../components/modals/edit-image-modal"
import { Camera } from "lucide-react"

import { useUser } from "../context/user-context"
import { updateUser } from "../services/user-service"

const Profile = () => {
  
  const { userData, setUserData } = useUser()
  const imageDialogRef = useRef(null)
  

  const handleChangeImage = async (imageUrl) => {
    const userId = localStorage.getItem("userId")
    const response = await updateUser(userId, {image_url: imageUrl})

    if (response.ok) {
      const updatedUser = await response.json()
      setUserData(updatedUser)
    } else {
      const error = await response.json()
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen"> 
      <Header />
      <UserMenu />

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex  mr-55">
          <button
            className="btn btn-circle text-emerald-500 shadow-2xl"
            onClick={() => imageDialogRef.current.showModal()}
          >
            <Camera />
          </button>
        </div>

        <div className="avatar">
          <div className="w-24 rounded-xl min-w-40 min-h-55 border-emerald-500 border-2">
            <img src={userData?.image_url || "/default_profile.png"} />
          </div>
        </div>

        <div className="font-semibold mt-2">
          {userData && (
            <div className="opacity-90 tracking-wide space-y-1">
              <h1 className="text-center text-2xl">
                {userData.first_name} {userData.last_name}
              </h1>
              <p className="text-sm">{userData.email}</p>
              <p className="text-sm">********</p>
            </div>
          )}
        </div>
      </div>

      <EditImageModal dialogRef={imageDialogRef} onSave={handleChangeImage} />
      <Footer />
    </div>
  )
}

export default Profile