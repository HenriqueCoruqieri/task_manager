import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { KeyRound, X } from "lucide-react"
import FieldError from "../field-error"

const schema = z
  .object({
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

const EditPasswordModal = ({ dialogRef, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    await onSave(data.password)
    reset()
    dialogRef.current.close()
  }

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <div className="flex justify-between">
          <div className="flex gap-2 mt-1">
            <KeyRound />
            <h3 className="font-bold text-lg mb-4">Trocar senha</h3>
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
          onSubmit={(event) => handleSubmit(onSubmit)(event)}
          className="flex flex-col space-y-6"
          noValidate
        >
          <div className="relative">
            <input
              {...register("password")}
              type="password"
              placeholder="Nova senha"
              className="input input-bordered w-full"
            />
            <FieldError error={errors.password} />
          </div>

          <div className="relative">
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirmar nova senha"
              className="input input-bordered w-full"
            />
            <FieldError error={errors.confirmPassword} />
          </div>

          <button
            type="submit"
            className="btn btn-primary text-primary-content rounded-full mt-2"
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

export default EditPasswordModal
