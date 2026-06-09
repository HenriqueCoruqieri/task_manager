import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { PencilLine, X } from "lucide-react"

const schema = z.object({
  title: z.string().min(1, "Informe o novo título da tarefa"),
  description: z.string().min(1, "Digite a nova descrição da tarefa"),
})

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:8000/tasks")
      const data = await response.json()
      setTasks(data)
    }

    fetchTasks()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const handleEdit = (task) => {
    setEditingTask(task)
    reset({ title: task.title, description: task.description })
    dialogRef.current.showModal()
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
    } else {
      const error = await response.json()
      console.error(error)
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
    <div className="min-w-[500px]">
      <ul className="list rounded-box space-y-4">
        <li className="text-xs opacity-60 tracking-wide ml-14 p-4 pb-2">
          Lista de Tarefas
        </li>

        {tasks.map((task, index) => (
          <li key={task._id} className="flex items-center gap-4">
            <button
              className="btn btn-sm border-2 border-white border-solid rounded-xl"
              onClick={() => handleEdit(task)}
            >
              <PencilLine />
            </button>
            <div className="list-row flex-1 bg-emerald-600">
              <div className="text-4xl font-thin opacity-30 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="list-col-grow">
                <h1 className="font-bold uppercase">{task.title}</h1>
                <h3 className="text-xs font-semibold opacity-60">
                  {task.description}
                </h3>
              </div>
              <div className="mt-2">
                <input
                  className="checkbox checkbox-neutral"
                  type="checkbox"
                  checked={selectedTask.includes(task._id)}
                  onChange={() =>
                    setSelectedTask((current) =>
                      current.includes(task._id)
                        ? current.filter((id) => id !== task._id)
                        : [...current, task._id]
                    )
                  }
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex mt-4 justify-center">
        <button
          disabled={selectedTask.length === 0}
          className="btn btn-success rounded-md w-[150px] ml-19"
          onClick={handleComplete}
        >
          Concluir
        </button>
      </div>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <div className="flex justify-between">
            <div className="flex gap-2 mt-1">
              <PencilLine />
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
            onSubmit={handleSubmit(onEditSubmit)}
            className="flex flex-col space-y-4"
            noValidate
          >
            <div>
              <h2>Novo título</h2>
              <input
                {...register("title")}
                type="text"
                placeholder="Título"
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-error text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <h2>Nova descrição</h2>
              <input
                {...register("description")}
                type="text"
                placeholder="Descrição"
                className="input input-bordered w-full"
              />
              {errors.description && (
                <p className="text-error text-sm mt-1">
                  {errors.description.message}
                </p>
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
    </div>
  )
}

export default TaskList
