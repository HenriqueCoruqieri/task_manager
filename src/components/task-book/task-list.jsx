import { useEffect, useRef, useState } from "react"

import { Trash2, PencilLine } from "lucide-react"
import TaskCard from "../task-card"
import ToastMessage from "../toast-message"
import TaskDetailsModal from "../modals/task-details-modal"
import { useToast } from "../../hooks/use-toast"
import EditTaskModal from "../modals/edit-task-modal"

const TaskList = () => {
  const { toast, showToast, dismissToast } = useToast()
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [viewingTask, setViewingTask] = useState(null)
  const dialogRef = useRef(null)
  const viewDialogRef = useRef(null)

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId")
      const response = await fetch(
        `http://localhost:8000/tasks?user_id=${userId}`
      )
      const data = await response.json()
      setTasks(data.filter((task) => !task.isCompleted))
    }

    fetchTasks()
  }, [])

  const handleEdit = (task) => {
    setEditingTask(task)
    dialogRef.current.showModal()
  }

  const handleView = (task) => {
    setViewingTask(task)
    viewDialogRef.current.showModal()
  }

  const onEditSubmit = async (data) => {
    const response = await fetch(
      `http://localhost:8000/tasks/${editingTask._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    )

    if (response.ok) {
      const updatedTask = await response.json()
      setTasks((current) =>
        current.map((t) => (t._id === editingTask._id ? updatedTask : t))
      )
      dialogRef.current.close()
      showToast("Tarefa editada com sucesso!", "success")
    } else {
      const error = await response.json()
      console.error(error)
      showToast("Erro ao editar tarefa.", "error")
    }
  }

  const handleDelete = async (taskId) => {
    const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setTasks((current) => current.filter((t) => t._id !== taskId))
      showToast("Tarefa excluída.", "success")
    } else {
      const error = await response.json()
      console.error(error)
      showToast("Erro ao excluir tarefa.", "error")
    }
  }

  const handleComplete = async () => {
    await Promise.all(
      selectedTask.map((id) =>
        fetch(`http://localhost:8000/tasks/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isCompleted: true }),
        })
      )
    )

    setTasks((current) => current.filter((t) => !selectedTask.includes(t._id)))
    setSelectedTask([])
  }

  return (
    <div className="min-w-[500px] flex flex-col min-h-0 pb-6">
      <ToastMessage
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={dismissToast}
      />
      <p className="text-xs opacity-60 tracking-wide ml-14 p-4 pb-2">
        Lista de Tarefas
      </p>
      <ul className="list rounded-box flex-1 min-h-0 scrollbar-dark pr-2 mt-1 space-y-4">
        {tasks.map((task, index) => (
          <li key={task._id} className="flex items-center gap-4">
            <button
              className="btn btn-sm text-yellow-500 border-3 border-solid rounded-xl"
              onClick={() => handleEdit(task)}
            >
              <PencilLine />
            </button>
            <TaskCard
              task={task}
              index={index}
              className="w-88 shrink-0"
              onOpen={() => handleView(task)}
              isSelected={selectedTask.includes(task._id)}
              onToggleSelect={() =>
                setSelectedTask((current) =>
                  current.includes(task._id)
                    ? current.filter((id) => id !== task._id)
                    : [...current, task._id]
                )
              }
            />
            <button
              className="btn btn-sm text-red-500 border-3 border-solid rounded-xl"
              onClick={() => handleDelete(task._id)}
            >
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex mt-4 justify-center">
        <button
          disabled={selectedTask.length === 0}
          className="btn btn-success rounded-md w-37.5 "
          onClick={handleComplete}
        >
          Concluir
        </button>
      </div>

      <TaskDetailsModal dialogRef={viewDialogRef} task={viewingTask} />
      <EditTaskModal
        dialogRef={dialogRef}
        task={editingTask}
        onSave={onEditSubmit}
      />
    </div>
  )
}

export default TaskList
