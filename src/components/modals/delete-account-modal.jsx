import { UserRoundX, X } from "lucide-react"

const DeleteAccountModal = ({ dialogRef, onConfirm }) => {
  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <div className="flex justify-between">
          <div className="flex gap-2 mt-1">
            <UserRoundX />
            <h3 className="font-bold text-lg mb-4">Deleção de conta</h3>
          </div>

          <button type="button" className="btn btn-sm btn-circle rounded-full">
            <X />
          </button>
        </div>

        <p className="mb-4">Ao excluir a conta não será possível recupera-la</p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="btn btn-success w-18 rounded-full shadow-xl"
            onClick={() => dialogRef.current.close()}
          >
            Sair
          </button>
          <button
            type="button"
            className="btn btn-error w-18 text-white rounded-full"
            onClick={onConfirm}
          >
            Apagar
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>fechar</button>
      </form>
    </dialog>
  )
}

export default DeleteAccountModal
