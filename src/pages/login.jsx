import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from "react-router-dom"

import { UserRoundKey } from "lucide-react"

import RegisterButton from "../components/register-button"

const schema = z.object({
  email: z.email({ message: "Email inválido!" }),
  password: z.string().min(1, "Digite a senha para entrar"),
})

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const { token, username } = await response.json()
      localStorage.setItem("token", token)
      navigate(`/${username}/dashboard`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="flex justify-center mb-12">
        <img
          alt="Task Manager Logo"
          src="task_manager.png"
          className="w-[25%] h-[25%]"
        />
      </div>

      <div className="flex flex-row space-x-2 mt-12">
        <h2 className="font-bold">Faça seu login</h2>
        <UserRoundKey />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-4 mt-12">
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-lg w-100"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Senha"
              className="input input-lg w-100"
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
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
        <RegisterButton />
      </div>
    </div>
  )
}

export default Login
