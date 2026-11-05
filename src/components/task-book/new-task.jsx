import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "../../hooks/use-toast"
import { getToday, isBeforeDate } from "../../lib/dayjs"
import ToastMessage from "../toast-message"
import DateSelector from "../date-selector"
import { createTask } from "../../services/task-service"
import FieldError from "../field-error"

const isNotPastDate = (date) => !isBeforeDate(date, getToday())

const schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  opening_date: z.iso.date({message: "Informe a abertura"})
    .refine(isNotPastDate, {message: "Data inválida"}),
  expiration_date: z.iso.date({message: "Informe o vencimento"})
    .refine(isNotPastDate, {message: "Data inválida"}),
})
.refine((data) => !isBeforeDate(data.expiration_date, data.opening_date), {
  message: "O vencimento não pode ser antes da abertura",
  path: ["expiration_date"],
})

const NewTask = ({setTasks}) => {
  const { toast, showToast, dismissToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ 
    resolver: zodResolver(schema),
    defaultValues: {opening_date: getToday()},
  })

  const onSubmit = async (data) => {
    const userId = localStorage.getItem("userId")

    const response = await createTask({...data, user_id: userId})

    if (response.ok) {
      const createdTask = await response.json()
      setTasks((current) => [...current, createdTask])
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
          className="space-y-6"
          noValidate
        >
          <div className="relative flex flex-col gap-1">
            <h2 className="card-title card-actions text-primary">
              Título da Tarefa
            </h2>
            <input
              {...register("title")}
              type="text"
              className="input input-sm w-full border border-primary"
            />
            <FieldError error={errors.title} />
          </div>

          <div className="relative flex flex-col gap-1">
            <h2 className="card-title card-actions text-primary">
              Descrição
            </h2>
            <textarea
              {...register("description")}
              className="textarea textarea-sm w-full h-20 resize-none scrollbar-dark border border-primary leading-normal"
            />
            <FieldError error={errors.description} />
          </div>

          <div className="flex items-center justify-center gap-4">
            <DateSelector label="Abertura" register={register("opening_date")} error={errors.opening_date} />
            <DateSelector label="Vencimento" register={register("expiration_date")} error={errors.expiration_date} />
          </div>

          <div className="justify-center card-actions mt-6">
            <button
              type="submit"
              className="btn btn-primary min-w-37.5 text-primary-content"
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
