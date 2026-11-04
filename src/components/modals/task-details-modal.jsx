import { X } from "lucide-react"
import DateField from "../date-field"

const TaskDetailsModal = ({ dialogRef, task }) => {
  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex flex-col">
            <h1 className="font-bold text-lg uppercase wrap-break-word min-w-0 text-emerald-500">
              {task?.title}
            </h1>

            {task?.expiration_date && (
              <div className="flex gap-2">
                <DateField label="Abertura" date={task.opening_date} />
                <DateField label="Vencimento" date={task.expiration_date} />
              </div>
            )}

          </div>

          <button
            type="button"
            className="btn btn-sm btn-circle rounded-full shrink-0"
            onClick={() => dialogRef.current.close()}
          >
            <X />
          </button>
        </div>
        
        <p className="text-sm whitespace-pre-wrap wrap-break max-h-[60vh] scrollbar-dark pr-2">
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
