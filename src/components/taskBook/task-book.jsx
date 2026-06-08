import { BookOpenText, StickyNotePlus } from "lucide-react"
import NewTask from "./new-task"
import TaskList from "./task-list"

import { useState } from "react"

const TaskBook = () => {
  const [activeView, setActiveView] = useState("new-task")
  return (
    <div className="p-4">
      <div className="breadcrumbs rounded-xl text-emerald-500 font-bold">
        <ul className="w-full justify-center">
          <li className="space-x-2">
            <StickyNotePlus />
            <a onClick={() => setActiveView("new-task")}>Nova Tarefa</a>
          </li>
          <li className="space-x-2">
            <BookOpenText />
            <a onClick={() => setActiveView("tasks")}>Tarefas</a>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        {activeView == "new-task" ? <NewTask /> : <TaskList />}
      </div>
    </div>
  )
}

export default TaskBook
