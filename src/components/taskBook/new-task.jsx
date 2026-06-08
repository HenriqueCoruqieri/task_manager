import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

const schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
})

const NewTask = () => {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      reset()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } else {
      const error = await response.json()
      console.error(error)
    }
  }

  return (
    <div className="card w-150 card-lg">
      {success && (
        <div className="toast toast-top toast-center z-50 mt-18">
          <div className="alert alert-success">
            <span>Tarefa criada com sucesso!</span>
          </div>
        </div>
      )}
      <div className="card-body space-y-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-2">
            <h2 className="card-title card-actions text-emerald-500">
              Título da Tarefa
            </h2>
            <input
              {...register("title")}
              type="text"
              className="input input-md w-full border border-emerald-500"
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="card-title card-actions text-emerald-500">
              Descrição
            </h2>
            <input
              {...register("description")}
              type="text"
              className="input input-md w-full border border-emerald-500"
            />
            {errors.description && (
              <p className="text-error text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="justify-center card-actions mt-6">
            <button
              type="submit"
              className="btn btn-success min-w-[150px] text-white"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTask
