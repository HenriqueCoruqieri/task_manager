import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { NotebookPen } from "lucide-react"

const schema = z
  .object({
    firstName: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().min(1, "Email é obrigatório").email({ message: "Email inválido" }),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

const RegisterButton = () => {
  const modal = useRef(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:8000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      }),
    })

    if (response.ok) {
      modal.current.close()
      reset()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } else {
      const error = await response.json()
      console.error(error)
    }
  }

  const handleOpen = () => {
    reset()
    modal.current.showModal()
  }

  return (
    <div className="flex flex-col justify-center">
      {success && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Usuário cadastrado com sucesso!</span>
          </div>
        </div>
      )}
      <button
        type="button"
        className="btn border-4 border-solid rounded-full"
        onClick={handleOpen}
      >
        Cadastrar
      </button>

      <dialog ref={modal} className="modal">
        <div className="modal-box">
          <div className="flex gap-2">
            <NotebookPen />
            <h3 className="font-bold text-lg mb-4">Cadastro</h3>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
            noValidate
          >
            <div>
              <input
                {...register("firstName")}
                type="text"
                placeholder="Nome"
                className="input input-bordered w-full"
              />
              {errors.firstName && (
                <p className="text-error text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("lastName")}
                type="text"
                placeholder="Sobrenome"
                className="input input-bordered w-full"
              />
              {errors.lastName && (
                <p className="text-error text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Senha"
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirmar Senha"
                className="input input-bordered w-full"
              />
              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-success text-white rounded-full mt-2"
            >
              Confirmar
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>fechar</button>
        </form>
      </dialog>
    </div>
  )
}

export default RegisterButton
