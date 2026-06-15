import { useRef } from "react"
import { useNavigate } from "react-router-dom"

import Footer from "../components/footer"
import Header from "../components/header"
import UserMenu from "../components/user-menu"
import DeleteAccountModal from "../components/modals/delete-account-modal"

const Account = () => {
  const deleteAccountDialogRef = useRef(null)
  const navigate = useNavigate()

  const handleDeleteAccount = async () => {
    const userId = localStorage.getItem("userId")
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      method: "DELETE",
    })

    if (response.ok) {
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      navigate("/")
    } else {
      const error = await response.json()
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <UserMenu />
      <div className="flex flex-1 flex-col items-center justify-center mb-40">
        <h1 className="text-emerald-500 font-bold text-3xl shadow-3xl">
          Configurações de Conta
        </h1>
        <div className="flex mt-12">
          <button
            className="btn btn-success"
            onClick={() => deleteAccountDialogRef.current.showModal()}
          >
            Deletar Conta
          </button>
        </div>
      </div>

      <DeleteAccountModal
        dialogRef={deleteAccountDialogRef}
        onConfirm={handleDeleteAccount}
      />

      <Footer />
    </div>
  )
}

export default Account
