import { X } from "lucide-react"

const TaskDetailsModal = ({ dialogRef, task }) => {
  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="font-bold text-lg uppercase break-words min-w-0 text-emerald-500">
            {task?.title}
          </h3>
          <button
            type="button"
            className="btn btn-sm btn-circle rounded-full shrink-0"
            onClick={() => dialogRef.current.close()}
          >
            <X />
          </button>
        </div>
        <p className="text-sm whitespace-pre-wrap break-words max-h-[60vh] scrollbar-dark pr-2">
          {task?.description}
        </p>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>fechar</button>
      </form>
    </dialog>
  )
}

export default TaskDetailsModal
