import { BookOpenText, StickyNotePlus } from "lucide-react"
import NewTask from "./new-task"
import TaskList from "./task-list"

import { useState } from "react"

const TaskBook = () => {
  const [activeView, setActiveView] = useState("new-task")
  return (
    <div className="p-4">
      <div className="tabs justify-center gap-2 p-2">
        <a
          className={`tab gap-2 font-bold ${activeView === "new-task" ? "tab-active text-emerald-500" : "text-white"}`}
          onClick={() => setActiveView("new-task")}
        >
          <StickyNotePlus className="size-4" />
          Nova Tarefa
        </a>
        <a
          className={`tab gap-2 font-bold ${activeView === "tasks" ? "tab-active text-emerald-500" : "text-white"}`}
          onClick={() => setActiveView("tasks")}
        >
          <BookOpenText className="size-4" />
          Tarefas
        </a>
      </div>

      <div className="mt-6">
        {activeView == "new-task" ? <NewTask /> : <TaskList />}
      </div>
    </div>
  )
}

export default TaskBook
