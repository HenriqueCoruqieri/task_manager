import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "../../hooks/use-toast"
import ToastMessage from "../toast-message"
import DateField from "../date-field"


const schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
})

const NewTask = () => {
  const { toast, showToast, dismissToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    const userId = localStorage.getItem("userId")

    const response = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, user_id: userId }),
    })

    if (response.ok) {
      reset()
      showToast("Tarefa criada com sucesso", "success")
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
        onDismiss={dismissToast}
      />
      <div className="card-body card-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-1">
            <h2 className="card-title card-actions text-emerald-500">
              Título da Tarefa
            </h2>
            <input
              {...register("title")}
              type="text"
              className="input input-sm w-full border border-emerald-500"
            />
            {errors.title && (
              <p className="text-error text-sm ">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <h2 className="card-title card-actions text-emerald-500">
              Descrição
            </h2>
            <textarea
              {...register("description")}
              className="textarea textarea-sm w-full h-20 resize-none scrollbar-dark border border-emerald-500 leading-normal"
            />
            {errors.description && (
              <p className="text-error text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex space-x-4 items-center justify-center">
            <DateField label="Abertura" register={register("opening_date")} error={errors.opening_date} />
            <DateField label="Vencimento" register={register("expiration_date")} error={errors.expiration_date} />
          </div>

          <div className="justify-center card-actions mt-6">
            <button
              type="submit"
              className="btn btn-success min-w-37.5 text-white"
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
