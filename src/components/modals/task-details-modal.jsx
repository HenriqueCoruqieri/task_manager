import { X } from "lucide-react"
import { formatDisplayDate } from "../../lib/dayjs"

const TaskDetailsModal = ({ dialogRef, task }) => {
  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="font-bold text-lg uppercase break-words min-w-0 text-emerald-500">
            {task?.title}
          </h3>
        
          {task?.expiration_date && (
          <div className="flex gap-2 text-sm">
            <p className="text-xs">
              <span className="font-semibold text-emerald-500">Abertura: </span>
              {formatDisplayDate(task.opening_date)}
            </p>
            <p className="text-xs">
              <span className="font-semibold text-emerald-500">Vencimento: </span>
              {formatDisplayDate(task.expiration_date)}
            </p>
          </div>
        )}

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
