import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

const schema = z.object({
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Selecione uma imagem")
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      "A imagem deve ter no máximo 2MB"
    ),
})

const EditImageModal = ({ dialogRef, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    const file = data.image[0]
    const reader = new FileReader()

    reader.onloadend = async () => {
      await onSave(reader.result)
      reset()
      dialogRef.current.close()
    }

    reader.readAsDataURL(file)
  }

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <div className="flex justify-between">
          <div className="flex gap-2 mt-1">
            <Camera />
            <h3 className="font-bold text-lg mb-4">Alterar foto de perfil</h3>
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
          className="flex flex-col space-y-4"
          noValidate
        >
          <div>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <p className="text-error text-sm mt-1">{errors.image.message}</p>
            )}
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

export default EditImageModal
