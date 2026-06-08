import { useEffect, useState } from "react"

import { PencilLine } from "lucide-react"

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:8000/tasks")
      const data = await response.json()
      setTasks(data)
    }

    fetchTasks()
  }, [])

  return (
    <div className="min-w-[500px]">
      <ul className="list rounded-box space-y-4">
        <li className="text-xs opacity-60 tracking-wide ml-14 p-4 pb-2">
          Lista de Tarefas
        </li>

        {tasks.map((task, index) => (
          <li key={task._id} className="flex items-center gap-4">
            <button className="btn btn-sm border-2 border-white border-solid rounded-xl mt-2">
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
        >
          Concluir
        </button>
      </div>
    </div>
  )
}

export default TaskList
