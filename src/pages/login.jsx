import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRef } from "react"
import { useNavigate, generatePath } from "react-router-dom"
import { ROUTES } from "../constants/routes"

import { UserRoundKey } from "lucide-react"

import RegisterFormModal from "../components/modals/register-form-modal"
import { useUser } from "../context/user-context"
import ToastMessage from "../components/toast-message"
import { useToast } from "../hooks/use-toast"
import FieldError from "../components/field-error"
import { createUser, loginUser } from "../services/user-service"

const schema = z.object({
  email: z.email({ message: "Email inválido!" }),
  password: z.string().min(1, "Digite a senha para entrar"),
})

const Login = () => {
  const { toast, showToast, dismissToast } = useToast()

  const navigate = useNavigate()
  const registerDialogRef = useRef(null)

  const { fetchUser } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    const response = await loginUser(data)

    if (response.ok) {
      const { token, username, id } = await response.json()
      localStorage.setItem("token", token)
      localStorage.setItem("userId", id)
      await fetchUser()
      navigate(generatePath(ROUTES.home, { username }))
    } else {
      showToast("Usuário ou senha inválidos.", "error")
    }
  }

  const handleRegister = async (data) => {
    const response = await createUser({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password
    })

    if (response.ok) {
      showToast("Usuário cadastrado com sucesso.", "success")
    } else {
      const errorMessage = await response.text()
      showToast(errorMessage, "error")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <ToastMessage
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={dismissToast}
      />

      <div className="flex justify-center">
        <img
          alt="Task Manager Logo"
          src="/task_manager.png"
          className="w-[25%] h-[25%]"
        />
      </div>

      <div className="flex flex-row space-x-2 mt-12">
        <h2 className="font-bold">Login</h2>
        <UserRoundKey />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-6 mt-8">
          <div className="relative">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-lg w-100"
            />
            <FieldError error={errors.email} />
          </div>

          <div className="relative">
            <input
              {...register("password")}
              type="password"
              placeholder="Senha"
              className="input input-lg w-100"
            />
            <FieldError error={errors.password} />
          </div>
        </div>

        <div className="flex flex-col space-y-2 mt-8">
          <button
            type="submit"
            className="btn btn-success border-4 border-solid w-100 rounded-full text-white"
          >
            Login
          </button>
        </div>
      </form>

      <div className="flex flex-col space-y-2 mt-2 w-100">
        <RegisterFormModal
          dialogRef={registerDialogRef}
          onSave={handleRegister}
        />
      </div>
    </div>
  )
}

export default Login
