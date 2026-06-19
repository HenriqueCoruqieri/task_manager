import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import ToastMessage from "../toast-message"

const schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
})

const NewTask = () => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const showToast = (message, type) =>
    setToast({ visible: true, message, type })

  const onSubmit = async (data) => {
    const userId = localStorage.getItem("userId")

    const response = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, user_id: userId }),
    })

    if (response.ok) {
      reset()
      showToast("Tarefa criada com sucesso")
    } else {
      const error = await response.json()
      console.error(error)
    }
  }

  return (
    <div className="card w-150 card-lg">
      <ToastMessage
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />
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
