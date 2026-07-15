import { useRef, useState } from "react"

import Footer from "../components/footer"
import Header from "../components/header"
import UserMenu from "../components/user-menu"
import EditImageModal from "../components/modals/edit-image-modal"
import EditPasswordModal from "../components/modals/edit-password-modal"
import ToastMessage from "../components/toast-message"
import { useUser } from "../context/user-context"

import { Camera } from "lucide-react"

const Profile = () => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })
  const { userData, setUserData } = useUser()
  const imageDialogRef = useRef(null)
  const passwordDialogRef = useRef(null)

  const showToast = (message, type) =>
    setToast({ visible: true, message, type })

  const handleChangeImage = async (imageUrl) => {
    const userId = localStorage.getItem("userId")

    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: imageUrl }),
    })

    if (response.ok) {
      const updatedUser = await response.json()
      setUserData(updatedUser)
    } else {
      const error = await response.json()
      console.error(error)
    }
  }

  const handleChangePassword = async (password) => {
    const userId = localStorage.getItem("userId")
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (response.ok) {
      showToast("Senha alterada com sucesso!", "success")
    } else {
      const error = await response.json()
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ToastMessage
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />
      <Header />
      <UserMenu />

      <div className="flex flex-1 flex-col items-center justify-center mb-40">
        <div className="flex  mr-55">
          <button
            className="btn btn-circle text-emerald-500 shadow-2xl"
            onClick={() => imageDialogRef.current.showModal()}
          >
            <Camera />
          </button>
        </div>

        <div className="avatar">
          <div className="w-24 rounded-xl min-w-[200px] min-h-[200px] border-emerald-500 border-2 ">
            <img src={userData?.image_url || "/default_profile.png"} />
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
          <button
            className="btn btn-success"
            onClick={() => passwordDialogRef.current.showModal()}
          >
            Trocar senha
          </button>
        </div>
      </div>

      <EditImageModal dialogRef={imageDialogRef} onSave={handleChangeImage} />
      <EditPasswordModal
        dialogRef={passwordDialogRef}
        onSave={handleChangePassword}
      />

      <Footer />
    </div>
  )
}

export default Profile
