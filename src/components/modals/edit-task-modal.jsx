import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { X, Pencil } from "lucide-react"
import FieldError from "../field-error"

const schema = z.object({
    title: z.string().min(1, "Informe o novo título da tarefa"),
    description: z.string().min(1, "Digite a nova descrição da tarefa"),
  })

const EditTaskModal = ({dialogRef, task, onSave}) => {
    const {register, handleSubmit, formState: {errors}, reset } =
    useForm({resolver: zodResolver(schema)})

    useEffect(() => {
        if(task){
            reset({title: task.title, description: task.description})
        }
    }, [task, reset])

    const onSubmit = async(data) => {
        await onSave(data)
    }
    
    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box">
          <div className="flex justify-between">
            <div className="flex gap-2 mt-1">
              <Pencil />
              <h3 className="font-bold text-lg mb-4">Editar Tarefa</h3>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-circle rounded-full"
              onClick={() => dialogRef.current.close()}
            >
              <X />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
            noValidate
          >
            <div className="relative">
              <h2>Novo título</h2>
              <input
                {...register("title")}
                type="text"
                placeholder="Título"
                className="input input-bordered w-full"
              />
              <FieldError error={errors.title} />
            </div>

            <div className="relative">
              <h2>Nova descrição</h2>
              <textarea
                {...register("description")}
                type="text-area"
                placeholder="Descrição"
                className="textarea textarea-sm w-full h-20 resize-none scrollbar-dark border leading-normal"
              />
              <FieldError error={errors.description} />
            </div>

            <button
              type="submit"
              className="btn btn-success text-white rounded-full mt-2"
            >
              Salvar
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>fechar</button>
        </form>
        </dialog>
    )
}

export default EditTaskModal