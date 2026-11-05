import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../constants/routes"

import Footer from "../components/footer"
import Header from "../components/header"
import UserMenu from "../components/user-menu"
import DeleteAccountModal from "../components/modals/delete-account-modal"
import { useToast } from "../hooks/use-toast"
import EditPasswordModal from "../components/modals/edit-password-modal"
import ToastMessage from "../components/toast-message"
import { deleteUser, updateUser } from "../services/user-service"

const Account = () => {
  const {toast, showToast, dismissToast} = useToast()
  const deleteAccountDialogRef = useRef(null)
  const passwordDialogRef = useRef(null)
  const navigate = useNavigate()

  const handleChangePassword = async (password) => {
    const userId = localStorage.getItem("userId")
    const response = await updateUser(userId, { password })

    if(response.ok){
      showToast("Senha alterada com sucesso!", "success")
    } else {
      const error = await response.json()
      console.error(error)
    }
  }

  const handleDeleteAccount = async () => {
    const userId = localStorage.getItem("userId")
    const response = await deleteUser(userId)

    if (response.ok) {
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      navigate(ROUTES.login)
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
      onDismiss={dismissToast}
      />
      <Header />
      <UserMenu />
      <div className="flex flex-1 flex-col items-center justify-center mb-40">
        <h1 className="text-primary font-bold text-3xl shadow-3xl">
          Configurações de Conta
        </h1>
        <div className="flex gap-2 mt-12">
          <button
            className="btn btn-primary"
            onClick={() => passwordDialogRef.current.showModal()}
          >
            Trocar Senha
          </button>

          <button
            className="btn btn-primary"
            onClick={() => deleteAccountDialogRef.current.showModal()}
          >
            Deletar Conta
          </button>
        </div>
      </div>

      <EditPasswordModal 
      dialogRef={passwordDialogRef}
      onSave={handleChangePassword}
      />
      <DeleteAccountModal
        dialogRef={deleteAccountDialogRef}
        onConfirm={handleDeleteAccount}
      />

      <Footer />
    </div>
  )
}

export default Account
